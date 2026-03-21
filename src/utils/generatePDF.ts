import { pdf } from "@react-pdf/renderer";
import React from "react";
import { AuswertungPDF, type AuswertungData } from "@/components/pdf/AuswertungPDF";

export async function generatePDFBase64(data: AuswertungData): Promise<string> {
  const element = React.createElement(AuswertungPDF, { data }) as any;
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

export async function captureChart(): Promise<string> {
  const el = document.getElementById("pdf-chart-capture");
  if (!el) return "";

  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: "#ffffff",
  });
  return canvas.toDataURL("image/png").split(",")[1];
}
