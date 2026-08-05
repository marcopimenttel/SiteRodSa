import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero'
import { Historia } from '@/components/sections/Historia'
import { Detran } from '@/components/sections/Detran'
import { Camara } from '@/components/sections/Camara'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { Galeria } from '@/components/sections/Galeria'
import { Propostas } from '@/components/sections/Propostas'
import { Redes } from '@/components/sections/Redes'
import { Apoiador } from '@/components/sections/Apoiador'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <div aria-hidden className="h-px w-full bg-[#fdb814]/80" />
      <Historia />
      <Detran />
      <Camara />
      <Depoimentos />
      <Galeria />
      <Propostas />
      <Redes />
      <Apoiador />
    </>
  )
}
