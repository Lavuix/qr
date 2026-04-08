import type { QRType } from "../types";

const TABS: { value: QRType; label: string }[] = [
  { value: "url", label: "URL" },
  { value: "text", label: "Текст" },
  { value: "wifi", label: "Wi-Fi" },
];

interface TabSelectorProps {
  activeType: QRType;
  onSelect: (type: QRType) => void;
}

export function TabSelector({ activeType, onSelect }: TabSelectorProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onSelect(tab.value)}
          className={[
            "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
            activeType === tab.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
