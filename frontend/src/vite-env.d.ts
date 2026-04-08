/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TG_BOT_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
