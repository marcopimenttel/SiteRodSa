/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_WHATSAPP_CHANNEL_URL: string
  readonly VITE_INSTAGRAM_URL: string
  readonly VITE_FACEBOOK_URL: string
  readonly VITE_X_URL: string
  readonly VITE_TIKTOK_URL: string
  readonly VITE_FLICKR_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
