import { useQRConfig } from "./hooks/useQRConfig";
import { useTelegram } from "./hooks/useTelegram";
import { TabSelector } from "./components/TabSelector";
import { LeftPanel } from "./components/panels/LeftPanel";
import { RightPanel } from "./components/panels/RightPanel";

export default function App() {
  const { config, dispatch } = useQRConfig();
  const { isTelegram } = useTelegram();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50" style={isTelegram ? { paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" } : {}}>
      {/* Header — скрываем в Telegram, там есть нативный back */}
      {!isTelegram && (
        <header className="border-b border-gray-100 bg-white px-6 py-4 shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" rx="0.5" />
                  <rect x="18" y="14" width="3" height="3" rx="0.5" />
                  <rect x="14" y="18" width="3" height="3" rx="0.5" />
                  <rect x="18" y="18" width="3" height="3" rx="0.5" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">QR Generator</span>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              Production
            </span>
          </div>
        </header>
      )}

      {/* Main */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 sm:py-6">
        {/* Tabs */}
        <div className="mb-4 sm:mb-6">
          <TabSelector
            activeType={config.content.type}
            onSelect={(type) => dispatch({ type: "SET_QR_TYPE", payload: type })}
          />
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <LeftPanel config={config} dispatch={dispatch} />
          </div>
          <div className="lg:w-[440px]">
            <div className="lg:sticky lg:top-6">
              <RightPanel config={config} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer — скрываем в Telegram */}
      {!isTelegram && (
        <footer className="border-t border-gray-100 bg-white px-6 py-3 text-center text-xs text-gray-400">
          QR Generator — production-ready, SVG-first
        </footer>
      )}
    </div>
  );
}
