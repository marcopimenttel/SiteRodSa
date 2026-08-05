const env = import.meta.env

export const config = {
  candidateName: 'Rodrigo Sá',
  ballotNumber: '11111',
  party: 'PP-AM',
  role: 'Candidato a Deputado Estadual',
  slogan: 'O nosso estado merece essa vitória',
  contactEmail: (env.VITE_CONTACT_EMAIL as string) || 'contato@rodrigosa.com.br',
  whatsappNumber: ((env.VITE_WHATSAPP_NUMBER as string) || '').replace(/\D/g, ''),
  social: {
    instagram: (env.VITE_INSTAGRAM_URL as string) || 'https://www.instagram.com/delegadorodrigosa/',
    facebook: (env.VITE_FACEBOOK_URL as string) || 'https://www.facebook.com/DelegadoRodrigoSa',
    x: (env.VITE_X_URL as string) || '',
    tiktok: (env.VITE_TIKTOK_URL as string) || '',
    flickr: (env.VITE_FLICKR_URL as string) || '',
  },
} as const

export function hasWhatsApp() {
  return config.whatsappNumber.length >= 10
}

export function whatsappUrl(message?: string) {
  if (!hasWhatsApp()) return null
  const text = encodeURIComponent(
    message ?? `Olá! Quero saber mais sobre a campanha do Rodrigo Sá ${config.ballotNumber}.`,
  )
  return `https://wa.me/${config.whatsappNumber}?text=${text}`
}
