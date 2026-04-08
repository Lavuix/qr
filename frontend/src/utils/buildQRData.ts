import type { QRContent } from "../types";

function escapeWifiField(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/"/g, '\\"')
    .replace(/,/g, "\\,");
}

export function buildQRDataString(content: QRContent): string {
  switch (content.type) {
    case "url":
      return content.url;
    case "text":
      return content.text;
    case "wifi": {
      const enc = content.encryption === "None" ? "nopass" : content.encryption;
      const ssid = escapeWifiField(content.ssid);
      const password = escapeWifiField(content.password);
      return `WIFI:T:${enc};S:${ssid};P:${password};H:${content.hidden};;`;
    }
  }
}

export function isQRContentValid(content: QRContent): boolean {
  switch (content.type) {
    case "url":
      return content.url.trim().length > 0;
    case "text":
      return content.text.trim().length > 0;
    case "wifi":
      return content.ssid.trim().length > 0;
  }
}
