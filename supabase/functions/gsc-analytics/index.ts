import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_search_console';
const SITE_URL = 'https://altersvorsorge-rechner.com/';
const SITE_ENC = encodeURIComponent(SITE_URL);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // AuthN: require admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return json({ error: 'Unauthorized' }, 401);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const { data: roleRow } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    if (!roleRow) return json({ error: 'Forbidden' }, 403);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GSC_KEY = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY');
    if (!LOVABLE_API_KEY || !GSC_KEY) return json({ error: 'Connector not configured' }, 500);

    const body = await req.json().catch(() => ({}));
    const days = Math.min(Math.max(Number(body.days) || 28, 7), 90);
    const dimension = ['date', 'query', 'page', 'country', 'device'].includes(body.dimension)
      ? body.dimension
      : 'date';
    const rowLimit = Math.min(Number(body.rowLimit) || 25, 1000);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 2); // GSC 2-day lag
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const queryBody = {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: [dimension],
      rowLimit,
    };

    const res = await fetch(
      `${GATEWAY_URL}/webmasters/v3/sites/${SITE_ENC}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': GSC_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryBody),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return json({ error: `GSC ${res.status}`, details: data }, 502);
    }

    return json({
      rows: data.rows ?? [],
      dimension,
      startDate: fmt(startDate),
      endDate: fmt(endDate),
    });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Unknown error' }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
