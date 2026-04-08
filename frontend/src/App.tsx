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

    </div>
  );
}
