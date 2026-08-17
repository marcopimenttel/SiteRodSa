const env = import.meta.env

export const config = {
  candidateName: 'Rodrigo Sá',
  ballotNumber: '11111',
  party: 'PP-AM',
  role: 'Candidato a Deputado Estadual',
  slogan: 'O nosso estado merece essa vitória',
  contactEmail: (env.VITE_CONTACT_EMAIL as string) || 'contato@rodrigosa.com.br',
  /** Exibição do WhatsApp (rodapé) */
  whatsappDisplay: '(92) 98147-7787',
  /** WhatsApp da campanha — DDI+DDD, só números */
  whatsappNumber: ((env.VITE_WHATSAPP_NUMBER as string) || '5592981477787').replace(/\D/g, ''),
  social: {
    /** Canal oficial WhatsApp (ícones de redes) */
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

/** WhatsApp da campanha (botão flutuante / menu) */
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
