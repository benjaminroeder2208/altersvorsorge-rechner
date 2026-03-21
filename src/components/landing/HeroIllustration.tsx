import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const curvePath = "M 40 280 C 80 260, 120 220, 160 200 S 240 140, 280 110 S 340 50, 380 30";
const areaPath = `${curvePath} L 380 300 L 40 300 Z`;

const HeroIllustration = () => (
  <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background circles */}
    <motion.circle
      cx="210" cy="160" r="155"
      fill="#1B4FD8" opacity="0.06"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.06 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
    />
    <motion.circle
      cx="210" cy="160" r="115"
      fill="#1B4FD8" opacity="0.06"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.06 }}
      transition={{ duration: 0.8, delay: 0.3, ease }}
    />

    {/* Filled area under curve */}
    <motion.path
      d={areaPath}
      fill="#1B4FD8"
      opacity="0.06"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ duration: 1, delay: 0.6 }}
    />

    {/* Animated curve */}
    <motion.path
      d={curvePath}
      stroke="#1B4FD8"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease }}
    />

    {/* Amber accent dots on curve */}
    <motion.circle cx="120" cy="230" r="5" fill="#F59E0B"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
    />
    <motion.circle cx="240" cy="140" r="8" fill="#F59E0B"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.4 }}
    />
    <motion.circle cx="360" cy="40" r="5" fill="#F59E0B"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.4 }}
    />

    {/* Data card 1 — bottom left */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -4, 4, -4, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.9 },
        y: { duration: 3, delay: 1.4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <rect x="20" y="210" width="150" height="72" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="20" y="210" width="4" height="72" rx="2" fill="#1B4FD8" />
      <text x="36" y="230" fontSize="10" fill="#9CA3AF" fontFamily="system-ui" letterSpacing="0.05em">KAPITAL MIT 67</text>
      <text x="36" y="252" fontSize="14" fontWeight="700" fill="#1B4FD8" fontFamily="system-ui">255.570 €</text>
      <text x="36" y="270" fontSize="11" fill="#9CA3AF" fontFamily="system-ui">bei 150 € / Monat</text>
    </motion.g>

    {/* Data card 2 — mid right */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, 4, -4, 4, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 1.1 },
        y: { duration: 3.5, delay: 1.6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <rect x="260" y="100" width="155" height="72" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="260" y="100" width="4" height="72" rx="2" fill="#F59E0B" />
      <text x="276" y="120" fontSize="10" fill="#9CA3AF" fontFamily="system-ui" letterSpacing="0.05em">STAATL. FÖRDERUNG</text>
      <text x="276" y="142" fontSize="14" fontWeight="700" fill="#F59E0B" fontFamily="system-ui">+16.740 €</text>
      <text x="276" y="160" fontSize="11" fill="#9CA3AF" fontFamily="system-ui">kumuliert über 30 Jahre</text>
    </motion.g>

    {/* Mini bar chart — bottom right */}
    <motion.g
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.6, delay: 1.3, ease }}
      style={{ transformOrigin: "bottom" }}
    >
      <rect x="340" y="260" width="16" height="24" rx="3" fill="#1B4FD8" opacity="0.15" />
      <rect x="362" y="245" width="16" height="39" rx="3" fill="#1B4FD8" opacity="0.25" />
      <rect x="384" y="225" width="16" height="59" rx="3" fill="#1B4FD8" opacity="0.4" />
    </motion.g>
  </svg>
);

export default HeroIllustration;
