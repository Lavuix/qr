import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRConfig } from "../types";
import { buildQRDataString } from "../utils/buildQRData";

export const PREVIEW_SIZE = 300;

function toQRStylingOptions(
  config: QRConfig,
  size = PREVIEW_SIZE
): ConstructorParameters<typeof QRCodeStyling>[0] {
  const { options, customization } = config;
  const data = buildQRDataString(config.content);

  return {
    width: size,
    height: size,
    type: "svg",
    data,
    margin: options.margin,
    qrOptions: {
      errorCorrectionLevel: options.errorCorrection,
    },
    dotsOptions: {
      color: customization.foregroundColor,
      type: customization.dotType,
    },
    cornersSquareOptions: {
      color: customization.foregroundColor,
      type: customization.cornerSquareType,
    },
    cornersDotOptions: {
      color: customization.foregroundColor,
      type: customization.cornerDotType,
    },
    backgroundOptions: {
      color: customization.backgroundColor,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 4,
      imageSize: customization.logoSize,
    },
    ...(customization.logoDataUrl ? { image: customization.logoDataUrl } : {}),
  };
}

export function useQRRenderer(config: QRConfig, hasValidContent: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<QRCodeStyling | null>(null);

  // Create instance once on mount — always at PREVIEW_SIZE
  useEffect(() => {
    const instance = new QRCodeStyling(toQRStylingOptions(config, PREVIEW_SIZE));
    instanceRef.current = instance;
    if (containerRef.current) {
      instance.append(containerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update on config change — keep at PREVIEW_SIZE, never use config.options.size
  useEffect(() => {
    if (!instanceRef.current || !hasValidContent) return;
    instanceRef.current.update(toQRStylingOptions(config, PREVIEW_SIZE));
  }, [config, hasValidContent]);

  return {
    containerRef,
    getInstance: () => instanceRef.current,
    getExportOptions: (exportSize: number) => toQRStylingOptions(config, exportSize),
  };
}
