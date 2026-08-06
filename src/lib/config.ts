const env = import.meta.env

export const config = {
  candidateName: 'Rodrigo Sá',
  ballotNumber: '11111',
  party: 'PP-AM',
  role: 'Candidato a Deputado Estadual',
  slogan: 'O nosso estado merece essa vitória',
  contactEmail: (env.VITE_CONTACT_EMAIL as string) || 'contato@rodrigosa.com.br',
  /** WhatsApp Business da campanha (menu) — só números DDI+DDD */
  whatsappNumber: ((env.VITE_WHATSAPP_NUMBER as string) || '').replace(/\D/g, ''),
  social: {
    /** Canal oficial WhatsApp (ícones + botão flutuante) */
    whatsapp:
      (env.VITE_WHATSAPP_CHANNEL_URL as string) ||
      'https://whatsapp.com/channel/0029Vb2faCYGehEEImNSqr26',
    instagram: (env.VITE_INSTAGRAM_URL as string) || 'https://www.instagram.com/delegadorodrigosa/',
    facebook: (env.VITE_FACEBOOK_URL as string) || 'https://www.facebook.com/DelegadoRodrigoSa',
    x: (env.VITE_X_URL as string) || 'https://x.com/DelRodrigoSa',
    tiktok: (env.VITE_TIKTOK_URL as string) || 'https://www.tiktok.com/@delegadorodrigosa',
    flickr: (env.VITE_FLICKR_URL as string) || '',
  },
} as const

/** Canal WhatsApp (redes / FAB) */
export function hasWhatsAppChannel() {
  return Boolean(config.social.whatsapp)
}

export function whatsappChannelUrl() {
  return hasWhatsAppChannel() ? config.social.whatsapp : null
}

/** WhatsApp Business da campanha (botão do menu) */
export function hasWhatsAppBusiness() {
  return config.whatsappNumber.length >= 10
}

export function whatsappBusinessUrl(message?: string) {
  if (!hasWhatsAppBusiness()) return null
  const text = encodeURIComponent(
    message ?? `Olá! Quero saber mais sobre a campanha do Rodrigo Sá ${config.ballotNumber}.`,
  )
  return `https://wa.me/${config.whatsappNumber}?text=${text}`
}

/** @deprecated use hasWhatsAppBusiness / hasWhatsAppChannel */
export function hasWhatsApp() {
  return hasWhatsAppBusiness()
}

/** @deprecated use whatsappBusinessUrl / whatsappChannelUrl */
export function whatsappUrl(message?: string) {
  return whatsappBusinessUrl(message)
}
