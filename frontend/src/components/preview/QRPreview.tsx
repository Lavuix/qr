import { Component, type ReactNode } from "react";
import type { QRConfig } from "../../types";
import { useQRRenderer, PREVIEW_SIZE } from "../../hooks/useQRRenderer";
import { useExport } from "../../hooks/useExport";
import { useTelegramSend } from "../../hooks/useTelegramSend";
import { isQRContentValid } from "../../utils/buildQRData";
import { DownloadButtons } from "./DownloadButtons";

class QRErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 p-8 text-center">
          <p className="text-sm font-medium text-red-700">Ошибка рендеринга</p>
          <button type="button" onClick={() => this.setState({ hasError: false })} className="text-xs text-red-500 underline">
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function QRPreviewInner({ config, isValid }: { config: QRConfig; isValid: boolean }) {
  const { containerRef, getInstance, getExportOptions } = useQRRenderer(config, isValid);
  const { downloadSVG, downloadPNG } = useExport(getInstance, config, getExportOptions);
  const { sendSVG, sendPNG, isTelegram } = useTelegramSend(config, getExportOptions);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}>
        {!isValid && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Введите данные для генерации</p>
          </div>
        )}
        <div
          ref={containerRef}
          data-qr-container
          className="overflow-hidden rounded-xl"
          style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
        />
      </div>
      <div className="flex flex-col items-center gap-1.5 w-full">
        <DownloadButtons
          onDownloadSVG={isTelegram ? sendSVG : downloadSVG}
          onDownloadPNG={isTelegram ? sendPNG : downloadPNG}
          disabled={!isValid}
          isTelegram={isTelegram}
        />
        <p className="text-xs text-gray-400">Экспорт: {config.options.size} × {config.options.size} px</p>
      </div>
    </div>
  );
}

export function QRPreview({ config }: { config: QRConfig }) {
  const isValid = isQRContentValid(config.content);
  return (
    <QRErrorBoundary>
      <QRPreviewInner config={config} isValid={isValid} />
    </QRErrorBoundary>
  );
}
