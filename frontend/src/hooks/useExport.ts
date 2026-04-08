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

  const downloadPNG = useCallback(() => {
    // Use a canvas-type instance so dots render natively (no SVG→canvas blurring)
    const opts = { ...getExportOptions(exportSize), type: "canvas" as const };
    const tempInstance = new QRCodeStyling(opts);
    const div = document.createElement("div");
    div.style.cssText = "position:fixed;left:-9999px;top:-9999px;visibility:hidden";
    document.body.appendChild(div);
    tempInstance.append(div);
    // Give canvas time to render before downloading
    setTimeout(() => {
      tempInstance.download({ name: "qr-code", extension: "png" });
      setTimeout(() => document.body.removeChild(div), 2000);
    }, 300);
  }, [getExportOptions, exportSize]);

  return { downloadSVG, downloadPNG };
}
