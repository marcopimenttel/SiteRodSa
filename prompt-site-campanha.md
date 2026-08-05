# PROMPT — Site de Campanha para Candidato a Deputado Estadual (AM)

## CONTEXTO
Crie um site institucional completo de campanha política para **[NOME DO CANDIDATO]**, atualmente vereador de Manaus/AM, candidato a **Deputado Estadual do Amazonas** nas eleições de 2026. O site deve transmitir credibilidade, proximidade com o povo, histórico de trabalho legislativo e propostas claras para o estado.

Use como referência de estrutura e tom o site: https://drvirgiliomendonca.com.br/ (site limpo, cores institucionais, foco em história pessoal + trabalho + propostas), mas com identidade visual e conteúdo 100% autorais e exclusivos do candidato.

## OBJETIVO DO SITE
- Apresentar o candidato de forma humana e confiável.
- Mostrar o histórico como vereador de Manaus (mandatos, projetos, indicações, leis aprovadas).
- Apresentar propostas para o cargo de Deputado Estadual (foco no Amazonas como um todo, não só Manaus).
- Gerar contato direto via WhatsApp e captar apoiadores/voluntários.
- Ser 100% responsivo (mobile first, já que boa parte do eleitorado acessa pelo celular).

## STACK TÉCNICA OBRIGATÓRIA

- **Framework:** React 19 + TypeScript + Vite (ou TanStack Start se disponível)
- **Roteamento:** TanStack Router com file-based routing (`src/routes/`)
- **Estilização:** Tailwind CSS v4 (via `@import "tailwindcss"` em `src/styles.css`), com variáveis CSS OKLCH para theming
- **Componentes UI:** shadcn/ui (style "new-york"), Lucide React (ícones)
- **Backend:** Supabase (Auth + Postgres com Row Level Security)
- **Estado global:** Zustand (com persistência em localStorage)
- **Data fetching:** TanStack Query (`@tanstack/react-query`)
- **Gráficos:** Recharts
- **Datas:** date-fns (locale pt-BR)
- **Notificações:** Sonner (toast)
- **Fonte:** Inter (Google Fonts) — carregada via `<link>` no `<head>`

## ESTRUTURA DE PÁGINAS/SEÇÕES

### 1. Header / Menu fixo
- Logo do candidato (nome + número do candidato + partido)
- Menu: Início | Minha História | Trabalho na Câmara | Propostas | Notícias | Contato
- Botão destacado "Fale Comigo" (WhatsApp)
- Ícones de redes sociais (Instagram, Facebook, TikTok, X)

### 2. Seção Hero (banner principal)
- Foto profissional do candidato (meio corpo, sorrindo, transmitindo confiança)
- Frase de efeito / slogan de campanha
- Nome completo + "Vereador de Manaus | Candidato a Deputado Estadual [NÚMERO]"
- Botão CTA: "Fale Comigo no WhatsApp"

### 3. Minha História
- Texto em 1ª pessoa contando trajetória: formação, profissão anterior, entrada na vida pública, motivação para a política
- Marcos de carreira (formação acadêmica, cargos ocupados, ano de eleição como vereador, votos recebidos)

### 4. Família / Lado Pessoal (opcional, mas recomendado)
- Foto e breve texto humanizando o candidato (esposa/marido, filhos, valores familiares)
- Ajuda a criar conexão emocional com o eleitor

### 5. Trabalho na Câmara Municipal de Manaus
- Números em destaque (contadores animados): nº de Requerimentos, Indicações, Projetos de Lei, Leis Aprovadas
- Cards com links para: Transparência (Portal da Câmara Municipal de Manaus - CMM), Conquistas, Mídia/Imprensa, Matérias Legislativas
- Pequeno resumo do que já foi entregue para a cidade

### 6. Propostas para o Amazonas (Deputado Estadual)
Grid de cards com ícones, cobrindo temas estaduais (ajustar conforme a pauta real do candidato), por exemplo:
- Educação
- Saúde
- Segurança Pública
- Infraestrutura e Mobilidade
- Interior do Amazonas / Municípios
- Meio Ambiente e Sustentabilidade
- Geração de Emprego e Renda
- Cultura e Esporte
- Direitos do Cidadão
- Desenvolvimento Econômico Regional

### 7. Notícias / Agenda (se possível)
- Bloco com últimas ações, eventos de rua, agenda de campanha, matérias na imprensa

### 8. Redes Sociais
- Seção convidando o visitante a seguir o candidato, com ícones grandes e links diretos

### 9. Seja um Apoiador / Voluntário (diferencial importante em site de campanha)
- Formulário simples: nome, WhatsApp, bairro/cidade, "quero ajudar como..." (múltipla escolha: distribuir material, divulgar nas redes, ser coordenador de bairro, etc.)

### 10. Rodapé
- Logo
- E-mail, telefone, endereço do gabinete/comitê
- Redes sociais
- Texto legal: "Material de campanha eleitoral. Prestação de contas: [link do TSE, quando disponível]"
- Créditos de desenvolvimento

## REQUISITOS TÉCNICOS
- Site responsivo (mobile first)
- Performance otimizada (imagens comprimidas, carregamento rápido)
- SEO básico (título, meta description, dados estruturados, sitemap)
- Botão flutuante de WhatsApp fixo em todas as páginas
- Formulário de contato/voluntariado integrado a e-mail ou planilha (Google Sheets/CRM)
- Certificado SSL (https)
- Compatível com LGPD (aviso de cookies e política de privacidade, já que haverá coleta de dados de apoiadores)
- Google Analytics ou Meta Pixel para acompanhar tráfego e criar públicos para anúncios

## IDENTIDADE VISUAL
- Cores: [DEFINIR — geralmente cores do partido + cores institucionais (ex: azul, verde, amarelo)]
- Tipografia: moderna, séria, legível (ex: Montserrat, Poppins, Inter)
- Fotos: profissionais, em alta resolução, mostrando o candidato em contato com a população, na tribuna da Câmara, com a família
- Tom de voz: próximo, direto, esperançoso, sem promessas vazias — priorizar dados concretos (números de projetos, leis, atendimentos)

## CONTEÚDO QUE PRECISO FORNECER (checklist para o candidato)
- [ ] Nome completo e nome de urna + número do candidato + partido/coligação
- [ ] Biografia resumida e detalhada
- [ ] Fotos em alta resolução (institucionais e de campanha/rua)
- [ ] Números do mandato como vereador (requerimentos, indicações, projetos de lei, leis aprovadas)
- [ ] Lista de propostas para o mandato estadual
- [ ] Links das redes sociais e WhatsApp oficial de campanha
- [ ] Logo/marca de campanha (se já existir) ou briefing para criação
- [ ] E-mail e telefone de contato do gabinete/comitê
- [ ] Frase/slogan de campanha

## OBSERVAÇÃO IMPORTANTE
Este site deve seguir as normas do TSE para propaganda eleitoral na internet (Lei 9.504/97 e resoluções do TSE vigentes para o pleito de 2026), incluindo, quando aplicável, identificação do responsável pelo site e prestação de contas. Recomenda-se validar o conteúdo final com o setor jurídico/eleitoral da campanha antes da publicação.
