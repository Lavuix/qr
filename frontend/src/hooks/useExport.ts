import { useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRConfig } from "../types";
import { PREVIEW_SIZE } from "./useQRRenderer";

type GetExportOptions = (size: number) => ConstructorParameters<typeof QRCodeStyling>[0];

export function useExport(
  getInstance: () => QRCodeStyling | null,
  config: QRConfig,
  getExportOptions: GetExportOptions
) {
  const exportSize = config.options.size;

  const downloadSVG = useCallback(async () => {
    const instance = getInstance();
    if (!instance) return;
    instance.update(getExportOptions(exportSize));
    instance.download({ name: "qr-code", extension: "svg" });
    setTimeout(() => instance.update(getExportOptions(PREVIEW_SIZE)), 300);
  }, [getInstance, getExportOptions, exportSize]);

  const downloadPNG = useCallback(async () => {
    // Create a canvas-type instance for PNG — SVG→canvas conversion loses custom dot shapes
    const options = { ...getExportOptions(exportSize), type: "canvas" as const };
    const tempInstance = new QRCodeStyling(options);
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);
    tempInstance.append(tempDiv);
    setTimeout(() => {
      tempInstance.download({ name: "qr-code", extension: "png" });
      setTimeout(() => document.body.removeChild(tempDiv), 1000);
    }, 200);
  }, [getExportOptions, exportSize]);

  return { downloadSVG, downloadPNG };
}
