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
    const instance = getInstance();
    if (!instance) return;
    instance.update(getExportOptions(exportSize));
    setTimeout(() => {
      instance.download({ name: "qr-code", extension: "png" });
      setTimeout(() => instance.update(getExportOptions(PREVIEW_SIZE)), 100);
    }, 150);
  }, [getInstance, getExportOptions, exportSize]);

  return { downloadSVG, downloadPNG };
}
