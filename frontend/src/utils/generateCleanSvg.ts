import QRCode from "qrcode";
import type { QRConfig } from "../types";
import { buildQRDataString } from "./buildQRData";

const ROUNDED_DOT_TYPES = new Set(["rounded", "dots", "extra-rounded", "classy-rounded"]);

/** Decode data URL → raw string */
function decodeDataUrl(dataUrl: string): string {
  const [header, body] = dataUrl.split(",");
  if (header.includes("base64")) {
    return atob(body);
  }
  return decodeURIComponent(body);
}

/**
 * For SVG logos: inline the SVG markup as a <g transform="..."> so Figma
 * sees it as vector, not a raster image.
 * For raster logos (PNG/JPG/WebP): keep <image href="..."/>.
 */
function buildLogoElement(
  logoDataUrl: string,
  x: number,
  y: number,
  w: number,
  h: number
): string {
  if (logoDataUrl.startsWith("data:image/svg+xml")) {
    const raw = decodeDataUrl(logoDataUrl)
      .replace(/<\?xml[^?]*\?>/gi, "")
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .trim();

    // Parse logo's own viewBox to get scale factor
    const vbMatch = raw.match(/viewBox=["'][\d.]+ [\d.]+ ([\d.]+) ([\d.]+)["']/);
    const logoVbW = vbMatch ? parseFloat(vbMatch[1]) : w;
    const logoVbH = vbMatch ? parseFloat(vbMatch[2]) : h;
    const scaleX = (w / logoVbW).toFixed(6);
    const scaleY = (h / logoVbH).toFixed(6);

    // Extract inner SVG content (strip outer <svg> wrapper)
    const inner = raw.replace(/<svg[^>]*>/i, "").replace(/<\/svg\s*>/i, "");

    return `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) scale(${scaleX},${scaleY})">${inner}</g>`;
  }

  // Raster image
  return `<image href="${logoDataUrl}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" preserveAspectRatio="xMidYMid meet"/>`;
}

function injectLogo(
  svg: string,
  logoDataUrl: string,
  logoSizeFraction: number,
  bgColor: string,
  dotType: string
): string {
  const vbMatch = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const vbW = vbMatch ? parseFloat(vbMatch[1]) : 37;
  const vbH = vbMatch ? parseFloat(vbMatch[2]) : 37;

  const logoW = vbW * logoSizeFraction;
  const logoH = vbH * logoSizeFraction;
  const logoX = (vbW - logoW) / 2;
  const logoY = (vbH - logoH) / 2;

  // Background: small padding so logo doesn't touch QR modules
  const pad = logoW * 0.06;
  const bgX = logoX - pad;
  const bgY = logoY - pad;
  const bgW = logoW + pad * 2;
  const bgH = logoH + pad * 2;
  const rx = ROUNDED_DOT_TYPES.has(dotType) ? (bgW * 0.18).toFixed(2) : "0";

  const bgRect = `<rect x="${bgX.toFixed(2)}" y="${bgY.toFixed(2)}" width="${bgW.toFixed(2)}" height="${bgH.toFixed(2)}" fill="${bgColor}" rx="${rx}" ry="${rx}"/>`;
  const logoEl = buildLogoElement(logoDataUrl, logoX, logoY, logoW, logoH);

  // Insert BEFORE </svg> — both elements render on top of QR paths (correct)
  // Background rect goes first so logo renders above it
  return svg.replace("</svg>", `${bgRect}${logoEl}</svg>`);
}

export async function generateCleanSvg(config: QRConfig): Promise<string> {
  const data = buildQRDataString(config.content);
  const { options, customization } = config;

  let svg = await QRCode.toString(data, {
    type: "svg",
    width: options.size,
    margin: options.margin,
    errorCorrectionLevel: options.errorCorrection,
    color: {
      dark: customization.foregroundColor,
      light: customization.backgroundColor,
    },
  });

  if (customization.logoDataUrl) {
    svg = injectLogo(
      svg,
      customization.logoDataUrl,
      customization.logoSize,
      customization.backgroundColor,
      customization.dotType
    );
  }

  return svg;
}
