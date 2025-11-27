// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE: string;
    // add more here if you need
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
