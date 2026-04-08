import type { QRConfig, QRGenerateResponse } from "../types";

export async function generateQRFromServer(config: QRConfig): Promise<string> {
  const response = await fetch("/api/qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? `Server error: ${response.status}`);
  }

  const data: QRGenerateResponse = await response.json();
  return data.svg;
}
