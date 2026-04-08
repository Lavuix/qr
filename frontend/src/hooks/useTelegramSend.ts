import { useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRConfig } from "../types";

type GetExportOptions = (size: number) => ConstructorParameters<typeof QRCodeStyling>[0];

const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN as string | undefined;

async function sendFileToTelegram(chatId: number, blob: Blob, filename: string) {
  const formData = new FormData();
  formData.append("chat_id", String(chatId));
  formData.append("document", blob, filename);
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    method: "POST",
    body: formData,
  });
}

function makeTempDiv() {
  const div = document.createElement("div");
  div.style.cssText = "position:fixed;left:-9999px;top:0;visibility:hidden";
  document.body.appendChild(div);
  return div;
}

export function useTelegramSend(config: QRConfig, getExportOptions: GetExportOptions) {
  const tg = typeof window !== "undefined" ? (window as any).Telegram?.WebApp : null;
  const chatId = tg?.initDataUnsafe?.user?.id as number | undefined;
  const exportSize = config.options.size;

  const sendSVG = useCallback(() => {
    if (!chatId || !BOT_TOKEN) return;
    const div = makeTempDiv();
    const instance = new QRCodeStyling(getExportOptions(exportSize));
    instance.append(div);
    setTimeout(() => {
      const svgEl = div.querySelector("svg");
      if (svgEl) {
        const blob = new Blob([new XMLSerializer().serializeToString(svgEl)], { type: "image/svg+xml" });
        sendFileToTelegram(chatId, blob, "qr-code.svg").finally(() => document.body.removeChild(div));
      } else {
        document.body.removeChild(div);
      }
    }, 200);
  }, [chatId, getExportOptions, exportSize]);

  const sendPNG = useCallback(() => {
    if (!chatId || !BOT_TOKEN) return;
    const div = makeTempDiv();
    const instance = new QRCodeStyling({ ...getExportOptions(exportSize), type: "canvas" });
    instance.append(div);
    setTimeout(() => {
      const canvas = div.querySelector("canvas");
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            sendFileToTelegram(chatId, blob, "qr-code.png").finally(() => document.body.removeChild(div));
          } else {
            document.body.removeChild(div);
          }
        }, "image/png");
      } else {
        document.body.removeChild(div);
      }
    }, 300);
  }, [chatId, getExportOptions, exportSize]);

  const isTelegram = !!chatId && !!BOT_TOKEN;
  return { sendSVG, sendPNG, isTelegram };
}
