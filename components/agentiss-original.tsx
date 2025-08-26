"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

// AGENTISS - Landing (React + Tailwind)
// Atendimento automático (atendentes de IA) + Landing Pages
// CTAs para WhatsApp com mensagens personalizadas por seção
// Toggle Mensal/Anual (-15%), drag-scroll em pricing, Hero com chat (áudio), FAQ

export default function AGENTISSLanding() {
  useReveal()

  // --- Pricing state: canal e billing ---
  type ChannelKey = "wpp" | "wpp_ig" | "wpp_ig_fb"
  const [channel, setChannel] = useState<ChannelKey>("wpp")
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  // Drag para pricing row
  const pricingRef = useRef<HTMLElement | null>(null)
  useDragScroll(pricingRef)

  // Helper: WhatsApp link
  const wppLink = (text: string) => `https://wa.me/5514991071072?text=${encodeURIComponent(text)}`
  const channelLabel: Record<ChannelKey, string> = {
    wpp: "WhatsApp",
    wpp_ig: "WhatsApp + Instagram",
    wpp_ig_fb: "WhatsApp + Instagram + Facebook",
  }

  // Preços base mensais
  const basePriceMatrix: Record<ChannelKey, { basic: number; pro: number; premium: number }> = {
    wpp: { basic: 397, pro: 597, premium: 997 },
    wpp_ig: { basic: 597, pro: 797, premium: 1197 },
    wpp_ig_fb: { basic: 997, pro: 1297, premium: 1697 },
  }
  // Preços ajustados pelo billing (anual com 15% OFF mensalizado)
  const priceMatrix = ((): typeof basePriceMatrix => {
    const adjusted: any = {}
    ;(Object.keys(basePriceMatrix) as ChannelKey[]).forEach((ch) => {
      adjusted[ch] = {}
      ;(Object.keys(basePriceMatrix[ch]) as (keyof (typeof basePriceMatrix)["wpp"])[]).forEach((tier) => {
        const v = basePriceMatrix[ch][tier]
        adjusted[ch][tier] = billing === "yearly" ? Math.round(v * 0.85) : v
      })
    })
    return adjusted
  })()

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white antialiased">
      <SEO />
      <InlineStyles />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/0 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <nav className="hidden md:flex gap-6 text-sm" aria-label="Navegação principal">
              <a href="#product" className="nav-link">
                Atendimento
              </a>
              <a href="#lp" className="nav-link">
                Landing Pages
              </a>
              <a href="#agents" className="nav-link">
                Segmentos
              </a>
              <a href="#demo" className="nav-link">
                Demos
              </a>
              <a href="#pricing" className="nav-link">
                Planos
              </a>
              <a href="#cases" className="nav-link">
                Casos
              </a>
              <a href="#faq" className="nav-link">
                FAQ
              </a>
              <a href="#contact" className="nav-link">
                Contato
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={wppLink(
                "Olá, vim do topo do site agentiss.shop e quero uma demo. Setor: [digite]. Canais: [Whats/IG/FB]. Melhor horário?",
              )}
              className="btn-primary btn-shine"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* HERO - Conversa WhatsApp */}
        <section className="relative mt-10 overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 md:p-12">
          {/* BG decor */}
          <div
            className="absolute inset-0 -z-10 animate-bgShift opacity-60"
            style={{
              background:
                "radial-gradient(1000px 500px at 10% 10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(900px 400px at 90% 0%, rgba(168,85,247,.16), transparent 60%)",
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="reveal">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Atendentes de IA que vendem e marcam consultas 24/7
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl">
                Tire dúvidas em tempo real, <strong className="font-semibold">marque e confirme consultas</strong>,{" "}
                <strong className="font-semibold">qualifique leads</strong> e integre com WhatsApp, Instagram e
                Facebook. Também criamos <strong className="font-semibold">Landing Pages</strong> que direcionam para as
                redes e aumentam a conversão.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo("pricing")
                  }}
                  className="btn-primary btn-shine"
                >
                  Ver Planos
                </a>
                <a
                  href={wppLink(
                    "Olá, vi a demo no hero da agentiss.shop e quero testar agora. Objetivo: marcar consultas/qualificar leads. Negócio: [digite].",
                  )}
                  className="btn-outline"
                >
                  Pedir Demo
                </a>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <div className="tile">
                  <dt className="text-xs text-white/60">Tempo economizado (média)</dt>
                  <dd className="text-lg font-semibold">~12h / semana</dd>
                </div>
                <div className="tile">
                  <dt className="text-xs text-white/60">SLA de primeira resposta</dt>
                  <dd className="text-lg font-semibold">&lt; 5s</dd>
                </div>
              </dl>
            </div>

            {/* Chat mock com rolagem e áudio */}
            <div className="reveal">
              <div className="tilt-3d group relative w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden min-h-[460px] h-[520px] md:h-[580px]">
                <div className="absolute inset-0 p-5 grid grid-rows-[auto_1fr_auto] min-h-0">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <div className="w-8 h-8 rounded-full bg-green-500/30 border border-green-300/40" />
                    <div>
                      <div className="text-sm font-semibold">Clínica Vida — Atendimento</div>
                      <div className="text-[10px] text-white/60">online agora • WhatsApp</div>
                    </div>
                  </div>
                  <div className="pt-3 space-y-2 overflow-y-auto pr-2 chat-scroll" aria-label="Conversa de atendimento">
                    <MsgUser>Olá! Vocês têm atendimento amanhã à tarde?</MsgUser>
                    <MsgAgent>
                      Olá! Posso agendar para <strong>15:30</strong> ou <strong>17:00</strong>. Prefere qual horário?
                      Posso confirmar seus dados.
                    </MsgAgent>
                    <MsgUser>17:00 está ótimo. Precisa de algum documento?</MsgUser>
                    <MsgAgent>
                      Perfeito! Documento com foto. Se preferir, envie um <strong>áudio</strong> com seus dados.
                    </MsgAgent>
                    <MsgUserAudio duration="0:07" />
                    <MsgAgentAudio duration="0:05" text="Consulta confirmada às 17:00. Até breve!" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3">
                    <Metric label="Consultas marcadas" value="+18%*" />
                    <Metric label="Primeira resposta" value="&lt; 5s" />
                    <Metric label="Satisfação" value="9.2/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE NICHES */}
        <section
          aria-label="Nichos em destaque"
          className="mt-8 mb-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
          style={{ ["--marquee-dur" as any]: "36s" }}
        >
          <div className="marquee-mask">
            <div className="marquee-track">
              {niches
                .concat(niches)
                .concat(niches)
                .map((n, i) => (
                  <span key={i} className="marquee-pill">
                    {n}
                  </span>
                ))}
            </div>
          </div>
          <p className="sr-only">Nichos atendidos: {niches.join(", ")}</p>
        </section>

        {/* DEMOS - 3 nichos com CTAs */}
        <section id="demo" className="mt-12 reveal">
          <h2 className="text-2xl font-bold tracking-tight">Demonstração por nicho</h2>
          <p className="mt-2 text-white/80">Veja como nossos atendentes de IA conduzem a conversa e geram valor.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <DemoCard
              title="Pizzaria — Upsell rápido"
              lines={[
                { from: "user", text: "Boa noite! Tem pizza grande de pepperoni?" },
                {
                  from: "agent",
                  text: "Temos sim! Hoje a grande sai por R$ 69. Quer adicionar borda recheada por +R$ 8? Chega em 30–40min.",
                },
                { from: "user", text: "Pode ser com borda. Pago no cartão." },
                { from: "agent", text: "Perfeito! Pedido confirmado. Quer uma coquinha gelada por +R$ 7?" },
              ]}
              ctaHref={wppLink(
                "Olá, vi a demo de Pizzaria na agentiss.shop e quero implementar upsell no WhatsApp. Média de pedidos/dia: [digite].",
              )}
              ctaLabel="Quero esse fluxo"
            />
            <DemoCard
              title="Clínica de Estética — Agenda & lembrete"
              lines={[
                { from: "user", text: "Faz limpeza de pele? Quanto custa?" },
                { from: "agent", text: "Fazemos sim! R$ 189. Tenho horários amanhã 14:00 e 16:30. Qual prefere?" },
                { from: "user", text: "16:30." },
                { from: "agent", text: "Agendado! Envio um lembrete 1h antes e instruções pré-procedimento." },
              ]}
              ctaHref={wppLink(
                "Olá, vi a demo de Clínica de Estética na agentiss.shop e quero agendamento com lembretes automáticos. Procedimento principal: [digite].",
              )}
              ctaLabel="Quero igual na minha clínica"
            />
            <DemoCard
              title="Advocacia — Triagem inteligente"
              lines={[
                { from: "user", text: "Sofri um acidente de trânsito, posso processar?" },
                {
                  from: "agent",
                  text: "Sinto muito! Vou fazer 3 perguntas rápidas: data do acidente, se houve BO e se há laudos médicos.",
                },
                { from: "user", text: "Foi dia 12/08, tem BO e laudo." },
                { from: "agent", text: "Ótimo. Posso agendar consultoria gratuita de 20min amanhã às 10:30?" },
              ]}
              ctaHref={wppLink(
                "Olá, vi a demo de Advocacia na agentiss.shop e quero triagem automática (BO, datas, laudos). Especialidade: [digite].",
              )}
              ctaLabel="Quero essa triagem"
            />
          </div>
        </section>

        {/* FEATURES - foco em atendimento */}
        <section id="product" className="mt-16 reveal">
          <h2 className="text-2xl font-bold tracking-tight">Atendimento automático que resolve</h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Respostas imediatas, qualificação de leads, <strong>agendamento/confirmação</strong> e integrações com
            CRM/Calendário. Multicanal: WhatsApp, Instagram e Facebook.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature icon="💬" title="Atendimento 24/7" desc="Tira dúvidas, envia instruções e coleta dados sem filas.">
              <a
                className="mt-4 inline-block btn-outline"
                href={wppLink(
                  "Quero atendimento 24/7 com agendamento e qualificação. Canais: [Whats, IG, FB]. Segmento: [digite]. Origem: features agentiss.shop.",
                )}
              >
                Quero atender 24/7
              </a>
            </Feature>
            <Feature
              icon="📅"
              title="Agenda & Confirmação"
              desc="Propõe horários, confirma presença e envia lembretes."
            >
              <a
                className="mt-4 inline-block btn-outline"
                href={wppLink(
                  "Quero agenda e confirmação automáticas integradas ao meu calendário. Origem: features agentiss.shop.",
                )}
              >
                Quero agendar automático
              </a>
            </Feature>
            <Feature icon="🔗" title="Integrações" desc="CRM/Calendário, leitura de PDF e transcrição de áudios.">
              <a
                className="mt-4 inline-block btn-outline"
                href={wppLink("Preciso integrar CRM/Calendário e ler PDFs/áudios. Origem: features agentiss.shop.")}
              >
                Quero integrar
              </a>
            </Feature>
          </div>
        </section>

        {/* LANDING PAGES */}
        <section id="lp" className="mt-16 reveal">
          <h2 className="text-2xl font-bold tracking-tight">Landing Pages que convertem e levam às suas redes</h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Criamos LPs rápidas, com SEO básico, <strong>CTA direto para WhatsApp/Instagram</strong> e captura de leads.
            Empresas com LP tendem a ver aumento de conversões (ex.: <strong>+22% a +35%</strong> em leads)*.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature icon="⚡" title="Performance" desc="Pages leves, carregamento rápido e tracking." />
            <Feature icon="🎯" title="Conversão" desc="CTA direto para WhatsApp/DM e formulários otimizados." />
            <Feature icon="📈" title="Mensuração" desc="Relatórios simples e integração com pixel/GA." />
          </div>
          <div className="mt-6">
            <a
              className="btn-primary btn-shine"
              href={wppLink(
                "Quero uma Landing Page com CTA para Whats/IG e captação de leads. Segmento: [digite]. Origem: LP agentiss.shop.",
              )}
            >
              Quero uma LP
            </a>
          </div>
          <p className="mt-3 text-xs text-white/50">
            *Valores ilustrativos, variam por setor e tráfego. Validamos com experimentos A/B.
          </p>
        </section>

        {/* SEGMENTOS */}
        <section id="agents" className="mt-16 reveal">
          <h2 className="text-2xl font-bold tracking-tight">Soluções por segmento</h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Templates de atendimento prontos, personalizáveis por tom e regras de negócio.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AgentCard
              title="Secretária Clínica"
              price="Incluída no plano"
              bullets={["Agenda/Confirmação", "Pré-triagem", "Lembretes no WhatsApp"]}
              ctaHref={wppLink(
                "Quero o template Secretária Clínica da agentiss.shop. Integrações desejadas: [Calendário/CRM].",
              )}
            />
            <AgentCard
              title="Atendente Imobiliário"
              price="Incluída no plano"
              bullets={["Captação de interesse", "Agendar visita", "Envio de PDF do imóvel"]}
              featured
              ctaHref={wppLink(
                "Quero o template Atendente Imobiliário da agentiss.shop. Envio de PDF, agendar visita e qualificação.",
              )}
            />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-16 reveal" data-selected-channel={channel}>
          <h2 className="text-2xl font-bold tracking-tight">Planos e canais</h2>
          <p className="mt-2 text-white/80">
            Selecione o canal e a cobrança. Limites: <strong>Básico até 300</strong>, <strong>Pro até 1200</strong>,{" "}
            <strong>Premium até 3000</strong> atendimentos/mês; <strong>Enterprise</strong> acima disso.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-white/70">Canal:</span>
            <div className="segmented">
              <button
                aria-pressed={channel === "wpp"}
                className={channel === "wpp" ? "on" : ""}
                onClick={() => setChannel("wpp")}
              >
                WhatsApp
              </button>
              <button
                aria-pressed={channel === "wpp_ig"}
                className={channel === "wpp_ig" ? "on" : ""}
                onClick={() => setChannel("wpp_ig")}
              >
                Whats + Instagram
              </button>
              <button
                aria-pressed={channel === "wpp_ig_fb"}
                className={channel === "wpp_ig_fb" ? "on" : ""}
                onClick={() => setChannel("wpp_ig_fb")}
              >
                Whats + Insta + Facebook
              </button>
            </div>
            <span className="ml-6 text-xs text-white/70">Cobrança:</span>
            <div className="segmented">
              <button
                aria-pressed={billing === "monthly"}
                className={billing === "monthly" ? "on" : ""}
                onClick={() => setBilling("monthly")}
              >
                Mensal
              </button>
              <button
                aria-pressed={billing === "yearly"}
                className={billing === "yearly" ? "on" : ""}
                onClick={() => setBilling("yearly")}
              >
                Anual -15%
              </button>
            </div>
          </div>
          <div className="mt-2 text-xs text-white/60">
            {billing === "yearly"
              ? `Economize 15%. Cobrança anual: Básico R$ ${(basePriceMatrix[channel].basic * 12 * 0.85) | 0}, Pro R$ ${(basePriceMatrix[channel].pro * 12 * 0.85) | 0}, Premium R$ ${(basePriceMatrix[channel].premium * 12 * 0.85) | 0}.`
              : "Cancele quando quiser."}
          </div>

          {/* Linha única com drag-scroll */}
          <div
            ref={pricingRef}
            data-drag-scroll="true"
            className="mt-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          >
            <div className="grid grid-cols-4 gap-6 min-w-[1100px]">
              {(["basic", "pro", "premium"] as const).map((tier) => {
                const label =
                  tier === "basic" ? "Básico — Atende+" : tier === "pro" ? "Pro Performance" : "Premium Voice AI"
                const leads =
                  tier === "basic"
                    ? "Até 300 atendimentos/mês"
                    : tier === "pro"
                      ? "Até 1200 atendimentos/mês"
                      : "Até 3000 atendimentos/mês"
                const features =
                  tier === "basic"
                    ? ["Transcreve áudio", "Marca consulta", "Respostas rápidas"]
                    : tier === "pro"
                      ? ["Tudo do Básico", "Lê PDF", "Qualificação avançada"]
                      : ["Tudo do Pro", "Responde áudio com voz", "Fluxos avançados"]
                const price = `R$ ${priceMatrix[channel][tier]}`
                const msg = `Quero o Plano ${label} (${channelLabel[channel]}) no modo ${billing === "monthly" ? "Mensal" : "Anual -15%"}. Limite: ${leads}. Origem: Planos agentiss.shop.`
                return (
                  <PriceCard
                    key={tier}
                    name={label}
                    leads={leads}
                    features={features}
                    price={price}
                    featured={tier === "pro"}
                    ctaLabel="Escolher"
                    ctaHref={wppLink(msg)}
                  />
                )
              })}
              <PriceCard
                name="Enterprise"
                leads="> 3000 atendimentos/mês"
                features={["Canais adicionais", "SLA dedicado", "Onboarding"]}
                price="Sob consulta"
                ctaLabel="Falar com vendas"
                ctaHref={wppLink(
                  `Quero o Plano Enterprise (+3000/mês) em ${channelLabel[channel]}. Necessito SLA dedicado e onboarding. Origem: Planos agentiss.shop.`,
                )}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Voz TTS, excedentes de atendimentos e integrações premium podem ser cobrados à parte.
          </p>
        </section>

        {/* TESTIMONIALS */}
        <section id="cases" className="mt-16 reveal">
          <h2 className="text-2xl font-bold tracking-tight">Casos de sucesso</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              name="Clínica Cardio+"
              role="Saúde"
              text="Agendamento automatizado e lembretes reduziram faltas em 19%."
            />
            <Testimonial
              name="Imobiliária Luz"
              role="Imóveis"
              text="Qualificação de leads via WhatsApp agilizou visitas e propostas."
            />
            <Testimonial name="Curso Alfa" role="Educação" text="LP + atendente de IA aumentaram conversões em 24%." />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-16 reveal">
          <h2 className="text-2xl font-bold tracking-tight">Perguntas frequentes</h2>
          <div className="mt-6 space-y-3">
            {faqData.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="mt-16 reveal rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Pronto para testar um atendente virtual?</h3>
              <p className="mt-2 text-white/80">Agende uma demo de 20 minutos ou peça um piloto gratuito.</p>
              <div className="mt-6 flex gap-3">
                <a
                  href={wppLink("Olá, quero uma demo. Origem: seção Contato agentiss.shop. Disponibilidade: [digite].")}
                  className="btn-primary btn-shine"
                >
                  Pedir demo
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo("pricing")
                  }}
                  className="btn-outline"
                >
                  Ver preços
                </a>
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                location.href = wppLink("Olá, enviei o formulário do contato no agentiss.shop e quero conversar.")
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm text-white/70">
                  Nome
                </label>
                <input id="name" name="name" required className="input" placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-white/70">
                  E‑mail
                </label>
                <input id="email" name="email" type="email" required className="input" placeholder="seu@exemplo.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-white/70">
                  Mensagem
                </label>
                <textarea id="message" name="message" className="input min-h-28" placeholder="Conte o que precisa" />
              </div>
              <div>
                <button type="submit" className="btn-success w-full">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="py-14 text-sm text-white/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} AGENTISS — Atendentes de IA & Landing Pages</div>
            <div className="flex gap-4">
              {" "}
              <a className="hover:text-white/90" href="#">
                Termos
              </a>{" "}
              <a className="hover:text-white/90" href="#">
                Política
              </a>{" "}
            </div>
          </div>
        </footer>

        <SmokeTests />
      </main>
    </div>
  )
}

/* ----------------- Hooks ----------------- */
function useReveal() {
  const once = useRef(false)
  useEffect(() => {
    if (once.current) return
    once.current = true
    if (typeof window === "undefined") return

    const els = Array.from(document.querySelectorAll(".reveal")) as HTMLElement[]

    const markVisible = (el: HTMLElement) => el.classList.add("is-visible")
    const inViewport = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh * 0.9 && r.bottom > 0
    }

    // Reveal immediately the ones in view
    els.forEach((el) => {
      if (inViewport(el)) markVisible(el)
    })

    // IO for the rest (with fallback)
    let io: IntersectionObserver | null = null
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) markVisible(e.target as HTMLElement)
          })
        },
        { threshold: 0.15 },
      )
      els.forEach((el) => io!.observe(el))
    } else {
      requestAnimationFrame(() => els.forEach(markVisible))
    }

    // Safety: ensure nothing stays hidden
    const safety = setTimeout(() => {
      els.forEach(markVisible)
    }, 1200)

    return () => {
      if (io) io.disconnect()
      clearTimeout(safety)
    }
  }, [])
}

function useDragScroll<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let isDown = false
    let startX = 0
    let scrollLeft = 0
    const onDown = (e: PointerEvent) => {
      isDown = true
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
      el.classList.add("dragging")
    }
    const onMove = (e: PointerEvent) => {
      if (!isDown) return
      const x = e.pageX - el.offsetLeft
      const walk = x - startX
      el.scrollLeft = scrollLeft - walk
    }
    const onUp = () => {
      isDown = false
      el.classList.remove("dragging")
    }
    el.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      el.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [ref])
}

/* ----------------- SEO ----------------- */
function SEO() {
  useEffect(() => {
    if (typeof document === "undefined") return
    document.title = "AGENTISS — Atendentes de IA (Atendimento 24/7) & Landing Pages"
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property='${name}']` : `meta[name='${name}']`
      let el = document.head.querySelector(sel) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement("meta")
        if (prop) el.setAttribute("property", name)
        else el.setAttribute("name", name)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }
    setMeta(
      "description",
      "Atendentes de IA no WhatsApp, Instagram e Facebook: tiram dúvidas, marcam/confirmam consultas e qualificam leads. Também criamos Landing Pages que direcionam para as redes e aumentam conversões.",
    )
    setMeta(
      "keywords",
      "atendimento automático, atendente virtual, agendamento WhatsApp, chatbot Instagram, chatbot Facebook, landing page, captação de leads",
    )
    setMeta("og:title", "AGENTISS — Atendentes de IA & Landing Pages", true)
    setMeta("og:description", "Atendimento 24/7 com marcação de consultas e LPs que convertem.", true)
    setMeta("og:type", "website", true)
  }, [])
  return null
}

/* ----------------- Inline Styles ----------------- */
function InlineStyles() {
  return (
    <style>{`
      .nav-link { position:relative; color:rgba(255,255,255,.9); }
      .nav-link::after { content:""; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#818cf8; transition: width .25s; }
      .nav-link:hover::after { width:100%; }
      .tile{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:.9rem; padding:1rem; box-shadow: 0 18px 35px rgba(0,0,0,.35); }
      .input{ width:100%; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.06); color:white; border-radius:.8rem; padding:.6rem .9rem; transition:border .2s, box-shadow .2s, background .2s; }
      .input:focus{ outline:none; border-color:#818cf8; box-shadow:0 0 0 4px rgba(129,140,248,.2); background:rgba(255,255,255,.08); }
      .btn-primary{ display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.2rem; border-radius:.9rem; background:#6366f1; color:white; font-weight:700; box-shadow: 0 12px 26px rgba(99,102,241,.35); transition: transform .2s, box-shadow .2s; position:relative; overflow:hidden; }
      .btn-primary:hover{ transform: translateY(-2px); box-shadow: 0 16px 40px rgba(99,102,241,.45); }
      .btn-outline{ display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.2rem; border-radius:.9rem; border:1px solid rgba(255,255,255,.25); color:white; background:transparent; transition: transform .2s, box-shadow .2s, background .2s; }
      .btn-outline:hover{ transform: translateY(-2px); background:rgba(255,255,255,.06); box-shadow: 0 12px 26px rgba(0,0,0,.35); }
      .btn-success{ display:inline-flex; align-items:center; justify-content:center; padding:.8rem 1rem; border-radius:.9rem; background:#16a34a; color:white; font-weight:700; box-shadow: 0 12px 26px rgba(22,163,74,.35); transition: transform .2s, box-shadow .2s; }
      .btn-success:hover{ transform: translateY(-2px); box-shadow: 0 16px 40px rgba(22,163,74,.45); }
      .btn-shine::before{ content:""; position:absolute; inset:-1px; background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 40%, transparent 60%); transform: translateX(-120%); transition: transform .8s; }
      .btn-shine:hover::before{ transform: translateX(120%); }
      @keyframes bgShift { 0%{ filter:hue-rotate(0deg); } 50%{ filter:hue-rotate(25deg); } 100%{ filter:hue-rotate(0deg); } }
      .animate-bgShift{ animation: bgShift 14s ease-in-out infinite; }
      @keyframes float { 0%{ transform: translateY(0px); } 50%{ transform: translateY(-12px); } 100%{ transform: translateY(0px);} }
      @keyframes float2 { 0%{ transform: translateY(0px); } 50%{ transform: translateY(10px); } 100%{ transform: translateY(0px);} }
      .animate-float{ animation: float 8s ease-in-out infinite; }
      .animate-float2{ animation: float2 10s ease-in-out infinite; }
      .tilt-3d{ perspective: 1000px; transform-style: preserve-3d; }
      .tilt-3d{ transform: rotateX(0deg) rotateY(0deg); transition: transform .5s; }
      .tilt-3d:hover{ transform: rotateX(6deg) rotateY(-6deg); }
      .marquee-mask{ overflow:hidden; border-radius:1rem; }
      .marquee-track{ display:flex; gap:12px; padding:14px; width: max-content; will-change: transform; transform: translate3d(0,0,0); animation: marquee var(--marquee-dur, 36s) linear infinite; }
      .marquee-mask:hover .marquee-track{ animation-play-state: paused; }
      .marquee-pill{ white-space:nowrap; padding:.5rem .9rem; border-radius:9999px; background: rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.25); box-shadow: 0 4px 14px rgba(0,0,0,.35); font-weight:700; color:white; backdrop-filter: blur(6px); }
      @keyframes marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
      .reveal{ opacity:0; transform: translateY(18px); }
      .reveal.is-visible{ opacity:1; transform: translateY(0); transition: opacity .7s ease, transform .7s ease; }
      .chat-scroll{ scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.35) transparent; }
      .chat-scroll::-webkit-scrollbar{ width:8px; }
      .chat-scroll::-webkit-scrollbar-track{ background: transparent; }
      .chat-scroll::-webkit-scrollbar-thumb{ background: rgba(255,255,255,.25); border-radius:999px; }
      .segmented{ display:inline-flex; border:1px solid rgba(255,255,255,.15); border-radius:.75rem; padding:.25rem; background: rgba(255,255,255,.06); backdrop-filter: blur(8px); }
      .segmented button{ font-size:.8rem; padding:.45rem .7rem; border-radius:.55rem; color:white; opacity:.75; transition:.2s; }
      .segmented button:hover{ opacity:1; }
      .segmented button.on{ background:#16a34a; opacity:1; box-shadow: 0 6px 18px rgba(22,163,74,.35); }
      .no-scrollbar::-webkit-scrollbar{ display:none; }
      .no-scrollbar{ -ms-overflow-style: none; scrollbar-width: none; }
      .dragging{ cursor: grabbing !important; user-select: none; }
      .bubble{ max-width:80%; border:1px solid rgba(255,255,255,.2); border-radius:1rem; padding:.5rem .75rem; font-size:.9rem; }
      .bubble-user{ background: rgba(255,255,255,.15); }
      .bubble-agent{ background: rgba(16,185,129,.25); border-color: rgba(110,231,183,.45); }
      .audio-pill{ display:flex; align-items:center; gap:.5rem; }
      .audio-bars{ display:flex; gap:2px; align-items:end; }
      .audio-bars span{ width:3px; height:10px; background: rgba(255,255,255,.8); border-radius:2px; animation: bar .9s ease-in-out infinite alternate; }
      .audio-bars span:nth-child(2){ animation-delay:.1s }
      .audio-bars span:nth-child(3){ animation-delay:.2s }
      .audio-bars span:nth-child(4){ animation-delay:.3s }
      @keyframes bar { from{ transform: scaleY(.5) } to{ transform: scaleY(1.2) } }
    `}</style>
  )
}

/* ----------------- UI Atoms ----------------- */
function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 grid place-items-center shadow-inner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="7" r="2" stroke="white" strokeWidth="1" />
          <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1" />
          <circle cx="18" cy="7" r="2" stroke="white" strokeWidth="1" />
          <path d="M7.2 8.2L10.9 11.3" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M13.1 11.3L16.8 8.2" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-sm font-bold tracking-wide">AGENTISS</span>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/10 border border-white/15 px-3 py-2">
      <div className="text-[10px] text-white/70" dangerouslySetInnerHTML={{ __html: label }} />
      <div className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  )
}

function MsgUser({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30" />
      <div className="bubble bubble-user">{children}</div>
    </div>
  )
}
function MsgAgent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start justify-end">
      <div className="bubble bubble-agent">{children}</div>
      <div className="w-7 h-7 rounded-full bg-emerald-400/40 border border-emerald-200/40" />
    </div>
  )
}
function MsgUserAudio({ duration }: { duration: string }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30" />
      <div className="bubble bubble-user">
        <div className="audio-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <div className="audio-bars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="text-xs opacity-80">{duration}</span>
        </div>
        <div className="mt-1 text-[10px] opacity-60">Áudio do cliente</div>
      </div>
    </div>
  )
}
function MsgAgentAudio({ duration, text }: { duration: string; text: string }) {
  return (
    <div className="flex gap-2 items-start justify-end">
      <div className="bubble bubble-agent">
        <div className="audio-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <div className="audio-bars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="text-xs opacity-80">{duration}</span>
        </div>
        <div className="mt-1 text-xs opacity-90">{text}</div>
        <div className="mt-1 text-[10px] opacity-60">Resposta por voz</div>
      </div>
      <div className="w-7 h-7 rounded-full bg-emerald-400/40 border border-emerald-200/40" />
    </div>
  )
}

function Feature({
  icon,
  title,
  desc,
  children,
}: { icon: string; title: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_18px_35px_rgba(0,0,0,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(0,0,0,.45)]">
      <div className="text-3xl select-none">{icon}</div>
      <h4 className="mt-4 font-semibold tracking-tight">{title}</h4>
      <p className="mt-2 text-sm text-white/80">{desc}</p>
      {children}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12), 0 10px 40px rgba(129,140,248,.25)" }}
      />
    </div>
  )
}

function AgentCard({
  title,
  price,
  bullets,
  featured,
  ctaHref,
}: { title: string; price: string; bullets: string[]; featured?: boolean; ctaHref: string }) {
  return (
    <div
      data-testid="agent-card"
      className={`group relative rounded-2xl border ${featured ? "border-emerald-400/40" : "border-white/10"} bg-white/5 p-5 backdrop-blur-md shadow-[0_18px_35px_rgba(0,0,0,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(0,0,0,.45)]`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <div className="text-xs font-bold text-white/70">{price}</div>
      </div>
      <ul className="mt-3 text-sm text-white/80 space-y-1">
        {bullets.map((b) => (
          <li key={b} className="hover:text-white transition-colors">
            • {b}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <a className="w-full btn-primary btn-shine inline-flex justify-center" href={ctaHref}>
          Usar template
        </a>
      </div>
      {featured && (
        <div className="absolute -top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-emerald-500/30 border border-emerald-300/40 backdrop-blur-md">
          POPULAR
        </div>
      )}
    </div>
  )
}

function PriceCard({
  name,
  features,
  price,
  leads,
  featured,
  ctaLabel,
  ctaHref,
}: {
  name: string
  features: string[]
  price: string
  leads: string
  featured?: boolean
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <div
      data-testid="price-card"
      className={`group relative rounded-2xl border ${featured ? "border-emerald-400/40" : "border-white/10"} bg-white/5 p-6 backdrop-blur-md shadow-[0_18px_35px_rgba(0,0,0,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(0,0,0,.45)]`}
    >
      <h4 className="font-bold tracking-tight">{name}</h4>
      <div className="mt-1 text-3xl font-extrabold pc-price" data-plan={name}>
        {price}
        {price !== "Sob consulta" && <span className="ml-1 text-xs font-normal text-white/70">/mês</span>}
      </div>
      <div className="mt-1 text-xs text-white/70">{leads}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {features.map((b) => (
          <li key={b} className="hover:text-white transition-colors">
            • {b}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {ctaHref ? (
          <a className={`w-full btn-primary btn-shine inline-flex justify-center ${featured ? "" : ""}`} href={ctaHref}>
            {ctaLabel || (featured ? "Plano recomendado" : "Escolher")}
          </a>
        ) : (
          <button className={`w-full btn-primary btn-shine ${featured ? "" : ""}`}>
            {ctaLabel || (featured ? "Plano recomendado" : "Escolher")}
          </button>
        )}
      </div>
      {featured && (
        <div className="absolute -top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-emerald-500/30 border border-emerald-300/40 backdrop-blur-md">
          RECOMENDADO
        </div>
      )}
    </div>
  )
}

function Testimonial({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div
      data-testid="testimonial-card"
      className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_18px_35px_rgba(0,0,0,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(0,0,0,.45)]"
    >
      <p className="text-sm text-white/90">“{text}”</p>
      <div className="mt-4 text-sm font-semibold">{name}</div>
      <div className="text-xs text-white/60">{role}</div>
    </div>
  )
}

function DemoCard({
  title,
  lines,
  ctaHref,
  ctaLabel,
}: { title: string; lines: { from: "user" | "agent"; text: string }[]; ctaHref: string; ctaLabel: string }) {
  return (
    <div
      data-testid="demo-card"
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md shadow-[0_18px_35px_rgba(0,0,0,.35)]"
    >
      <div className="mb-3 font-semibold tracking-tight">{title}</div>
      <div className="space-y-2">
        {lines.map((l, i) => (
          <div key={i} className={`flex gap-2 items-start ${l.from === "agent" ? "justify-end" : ""}`}>
            {l.from === "user" && <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30" />}
            <div
              className={`max-w-[80%] rounded-xl border px-3 py-2 text-sm ${l.from === "agent" ? "bg-emerald-500/25 border-emerald-300/30" : "bg-white/15 border-white/20"}`}
            >
              {l.text}
            </div>
            {l.from === "agent" && (
              <div className="w-6 h-6 rounded-full bg-emerald-400/40 border border-emerald-200/40" />
            )}
          </div>
        ))}
      </div>
      <a className="mt-4 inline-flex btn-outline" href={ctaHref}>
        {ctaLabel}
      </a>
    </div>
  )
}

/* ----------------- Data ----------------- */
const niches = [
  "Clínicas & Consultórios",
  "Imobiliárias",
  "Educação & Cursos",
  "Oficinas & Serviços",
  "Beleza & Estética",
  "Academias",
  "E‑commerce & Suporte",
  "Restaurantes",
  "Pet Shops",
  "Delivery & Logística",
  "Eventos",
  "Fintechs",
]

/* ----------------- FAQ ----------------- */
const faqData = [
  {
    q: "Preciso ter site ou dá para começar só com WhatsApp?",
    a: "Dá para começar só com WhatsApp. O atendente virtual funciona direto no app.",
  },
  {
    q: "Quantos atendentes de IA posso ter?",
    a: "Você pode contratar múltiplos atendentes de acordo com seus canais e planos.",
  },
  {
    q: "Como funciona o limite de atendimentos/mês?",
    a: "Cada interação concluída conta como 1 atendimento. Temos limites de 300, 1200, 3000 ou Enterprise.",
  },
  { q: "Tenho agenda no Google/Outlook — dá para integrar?", a: "Sim, integramos com os principais calendários." },
  { q: "Vocês fazem Landing Pages também?", a: "Sim, criamos LPs rápidas e otimizadas que aumentam a conversão." },
  { q: "Tem teste gratuito?", a: "Sim, oferecemos piloto grátis de até 7 dias em alguns planos." },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
      <button className="flex justify-between w-full text-left font-semibold" onClick={() => setOpen(!open)}>
        {q}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-2 text-sm text-white/80">{a}</p>}
    </div>
  )
}

/* ----------------- Smoke tests ----------------- */
function SmokeTests() {
  useEffect(() => {
    try {
      const needed = ["product", "lp", "agents", "demo", "pricing", "cases", "faq", "contact"]
      needed.forEach((id) => {
        if (!document.getElementById(id)) console.warn(`[SmokeTest] faltando seção #${id}`)
      })
      const chat = document.querySelector(".chat-scroll") as HTMLElement | null
      if (!chat || getComputedStyle(chat).overflowY === "visible") console.warn("[SmokeTest] Chat sem rolagem interna.")
      const prices = Array.from(document.querySelectorAll(".pc-price")) as HTMLElement[]
      if (prices.length < 3) console.warn("[SmokeTest] Esperado ≥3 planos com preço.")
    } catch (e) {
      console.warn("[SmokeTest] erro:", e)
    }
  }, [])
  return null
}
