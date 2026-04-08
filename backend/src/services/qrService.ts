import QRCode from "qrcode";
import type { QRConfig } from "shared";

function escapeWifiField(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/"/g, '\\"').replace(/,/g, "\\,");
}

function buildDataString(config: QRConfig): string {
  const { content } = config;
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

function injectLogo(svg: string, logoDataUrl: string, qrSize: number): string {
  const logoSize = Math.round(qrSize * 0.2);
  const offset = Math.round((qrSize - logoSize) / 2);
  const logoImage = `<image href="${logoDataUrl}" x="${offset}" y="${offset}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>`;
  return svg.replace("</svg>", `${logoImage}</svg>`);
}

function applyColors(svg: string, fg: string, bg: string): string {
  // Replace black fill (#000000 or black) with foreground color
  // Replace white fill (#ffffff or white) with background color
  let result = svg;
  result = result.replace(/fill="#000000"/g, `fill="${fg}"`);
  result = result.replace(/fill="#ffffff"/g, `fill="${bg}"`);
  result = result.replace(/fill="black"/g, `fill="${fg}"`);
  result = result.replace(/fill="white"/g, `fill="${bg}"`);
  return result;
}

export async function generateQRSvg(config: QRConfig): Promise<string> {
  const { options, customization } = config;
  const data = buildDataString(config);

  const svgString = await QRCode.toString(data, {
    type: "svg",
    width: options.size,
    margin: options.margin,
    errorCorrectionLevel: options.errorCorrection,
    color: {
      dark: customization.foregroundColor,
      light: customization.backgroundColor,
    },
  });

  let result = svgString;

  if (customization.logoDataUrl) {
    result = injectLogo(result, customization.logoDataUrl, options.size);
  }

  return result;
}
