import { pdf } from "@react-pdf/renderer";
import React from "react";
import { NewsletterChecklistPDF } from "@/components/pdf/NewsletterChecklistPDF";

export async function generateNewsletterChecklistPDFBase64(): Promise<string> {
  const element = React.createElement(NewsletterChecklistPDF) as any;
  const blob = await pdf(element).toBlob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
