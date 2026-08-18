import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { formasAjuda } from '@/data/noticias'
import { config } from '@/lib/config'
import { Reveal } from '@/components/Reveal'
import { MoldurasCta } from '@/components/MoldurasCta'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Apoiador() {
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cidade, setCidade] = useState('')
  const [ajudas, setAjudas] = useState<string[]>([])

  const toggleAjuda = (item: string) => {
    setAjudas((prev) => (prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !whatsapp.trim() || !cidade.trim()) {
      toast.error('Preencha nome, WhatsApp e cidade/bairro.')
      return
    }
    if (ajudas.length === 0) {
      toast.error('Selecione ao menos uma forma de ajudar.')
      return
    }

    const subject = encodeURIComponent(`Quero apoiar — ${nome}`)
    const body = encodeURIComponent(
      [
        `Nome: ${nome}`,
        `WhatsApp: ${whatsapp}`,
        `Cidade/Bairro: ${cidade}`,
        `Quero ajudar como: ${ajudas.join(', ')}`,
        '',
        `Campanha Rodrigo Sá ${config.ballotNumber}`,
      ].join('\n'),
    )

    window.location.href = `mailto:${config.contactEmail}?subject=${subject}&body=${body}`
    toast.success('Abrindo seu e-mail para enviar o apoio.')
  }

  return (
    <section id="apoiador" className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/images/apoiador.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy/90" />

      <div className="container-site section-pad relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal variant="left">
          <div>
            <p className="section-eyebrow text-gold/90">Participe</p>
            <h2 className="section-title">Seja um apoiador</h2>
            <p className="mt-4 max-w-md text-white/75">
              Junte-se à campanha Rodrigo Sá {config.ballotNumber}. Sua ajuda faz a diferença em
              cada bairro e município do Amazonas.
            </p>
            <div className="mt-6">
              <MoldurasCta />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} variant="right">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/15 bg-white/95 p-6 text-foreground shadow-xl sm:p-8"
            id="contato"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(92) 99999-9999"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Bairro / Cidade</Label>
                <Input
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Ex: Centro, Manaus"
                  required
                />
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Quero ajudar como...</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {formasAjuda.map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={ajudas.includes(item)}
                        onCheckedChange={() => toggleAjuda(item)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Button type="submit" variant="gold" size="lg" className="w-full">
                Enviar meu apoio
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Seus dados serão usados apenas para contato da campanha, conforme a{' '}
                <a href="/privacidade" className="underline underline-offset-2">
                  Política de Privacidade
                </a>
                .
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
