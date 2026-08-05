import { createFileRoute, Link } from '@tanstack/react-router'
import { config } from '@/lib/config'

export const Route = createFileRoute('/privacidade')({
  component: PrivacidadePage,
})

function PrivacidadePage() {
  return (
    <article className="section-pad pt-28">
      <div className="container-site prose prose-neutral max-w-3xl">
        <p className="section-eyebrow text-primary/70">LGPD</p>
        <h1 className="section-title text-4xl text-navy-deep sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-6 text-muted-foreground">
          Esta página descreve como a campanha {config.candidateName} ({config.ballotNumber}) trata
          dados pessoais coletados neste site, em conformidade com a Lei Geral de Proteção de Dados
          (Lei nº 13.709/2018).
        </p>

        <h2 className="mt-10 text-2xl font-bold text-navy-deep">1. Dados coletados</h2>
        <p className="mt-3 text-muted-foreground">
          Por meio do formulário de voluntários, podemos receber nome, WhatsApp, bairro/cidade e a
          forma como deseja apoiar a campanha. Também utilizamos cookies essenciais para lembrar sua
          preferência de consentimento.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-deep">2. Finalidade</h2>
        <p className="mt-3 text-muted-foreground">
          Os dados são usados exclusivamente para contato relacionado à campanha eleitoral,
          organização de voluntariado e comunicação institucional.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-deep">3. Compartilhamento</h2>
        <p className="mt-3 text-muted-foreground">
          Não vendemos dados pessoais. O compartilhamento ocorre apenas quando necessário para a
          operação da campanha ou por obrigação legal.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-deep">4. Seus direitos</h2>
        <p className="mt-3 text-muted-foreground">
          Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail{' '}
          <a className="text-primary underline" href={`mailto:${config.contactEmail}`}>
            {config.contactEmail}
          </a>
          .
        </p>

        <h2 className="mt-8 text-2xl font-bold text-navy-deep">5. Contato</h2>
        <p className="mt-3 text-muted-foreground">
          Dúvidas sobre privacidade: {config.contactEmail}
        </p>

        <p className="mt-10">
          <Link to="/" className="font-semibold text-primary hover:underline">
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </article>
  )
}
