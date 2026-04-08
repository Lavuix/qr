import { useRef, useState } from "react";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

interface FileUploadProps {
  logoDataUrl: string | null;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}

export function FileUpload({ logoDataUrl, onUpload, onRemove }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Допустимые форматы: PNG, JPG, WebP, GIF, SVG");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Файл слишком большой. Максимум 2 MB");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") onUpload(result);
    };
    reader.readAsDataURL(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    setError(null);
    onRemove();
  }

  if (logoDataUrl) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <img src={logoDataUrl} alt="Logo" className="h-10 w-10 rounded object-contain" />
        <span className="flex-1 text-sm text-gray-600 truncate">Логотип загружен</span>
        <button
          type="button"
          onClick={handleRemove}
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Удалить
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={[
          "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-4 text-center transition-colors",
          error
            ? "border-red-300 bg-red-50 hover:border-red-400"
            : "border-gray-200 hover:border-brand-500 hover:bg-brand-50",
        ].join(" ")}
      >
        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-brand-600">Загрузить логотип</span> или перетащить сюда
        </p>
        <p className="text-xs text-gray-400">PNG, JPG, WebP, GIF, SVG · до 2 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
