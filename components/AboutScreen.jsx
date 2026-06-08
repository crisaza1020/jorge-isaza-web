/* global React, PageHero, SectionHead, Eyebrow, band, CONTAINER */
const { Button, Badge, FeatureCard, Card } = window.JorgeIsazaDesignSystem_6b05d8;

function AboutScreen({ onNavigate }) {
  const stats = [
    { n: '30+', l: 'años acompañando procesos' },
    { n: '12.000+', l: 'personas y familias' },
    { n: '40+', l: 'talleres y formaciones' },
  ];

  const timeline = [
    { y: '1994', t: 'El primer círculo', d: 'Comienza a acompañar grupos de desarrollo humano y a investigar la raíz emocional del bloqueo.' },
    { y: '2003', t: 'La metodología por etapas', d: 'Consolida el proceso Reconocer · Transformar · Integrar tras una década de práctica.' },
    { y: '2014', t: 'Formación de acompañantes', d: 'Empieza a formar mentores para sostener la metodología en más comunidades.' },
    { y: 'Hoy', t: 'Una comunidad que sana', d: 'Miles de personas y familias en proceso, con recursos abiertos para acompañar el camino.' },
  ];

  const values = [
    { c: 'terracotta', e: 'Cómo acompaña', t: 'Con presencia, no con prisa', d: 'Sostiene cada proceso sin forzar tiempos. La persona marca el ritmo; él marca la dirección.' },
    { c: 'forest', e: 'Desde dónde', t: 'Rigor e investigación', d: 'Tres décadas observando qué sana de verdad, depurando lo que no sirve.' },
    { c: 'lavender', e: 'Para qué', t: 'Una vida más plena', d: 'No busca aliviar el síntoma: busca que vuelvas a habitarte con libertad.' },
  ];

  return (
    <div data-screen-label="About">
      {/* HERO — portrait + bio */}
      <section style={aboutStyles.hero}>
        <div style={aboutStyles.heroCopy}>
          <Badge uppercase variant="cream" style={{ marginBottom: 18 }}>Dr. Jorge H. Isaza</Badge>
          <h1 style={aboutStyles.h1}>Investigador y mentor en desarrollo humano</h1>
          <p style={aboutStyles.lead}>
            Durante más de 30 años, el Dr. Jorge Isaza ha creado metodologías para
            la sanación emocional, el crecimiento personal y el fortalecimiento del
            potencial humano. Su trabajo acompaña a personas y familias a superar
            bloqueos, transformar experiencias difíciles y construir una vida más
            sana, segura, feliz y próspera.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => onNavigate('contacto')}>Reservar una sesión</Button>
            <Button size="lg" variant="secondary" onClick={() => onNavigate('metodologia')}>Ver la metodología</Button>
          </div>
        </div>
        <div style={aboutStyles.heroArt}>
          <img src={(window.__resources && window.__resources.aboutPortrait) || 'assets/about-portrait.jpg'}
            alt="El Dr. Jorge Isaza hablando con micrófono ante un público"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: 24 }} />
        </div>
      </section>

      {/* STATS strip */}
      <section style={aboutStyles.statsWrap}>
        <div style={aboutStyles.stats}>
          {stats.map((s, i) => (
            <div key={i} style={aboutStyles.stat}>
              <div style={aboutStyles.statN}>{s.n}</div>
              <div style={aboutStyles.statL}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY — quote + body */}
      <section style={band({ paddingTop: 64 })}>
        <div style={aboutStyles.philo}>
          <div style={aboutStyles.philoLeft}>
            <Eyebrow>Su mirada</Eyebrow>
            <p style={aboutStyles.philoQuote}>“Toda persona tiene un potencial intacto bajo el dolor. Mi trabajo es ayudar a destaparlo.”</p>
          </div>
          <div style={aboutStyles.philoBody}>
            <p style={aboutStyles.bodyP}>
              Para Jorge Isaza, el desarrollo humano no es motivación pasajera ni
              fórmulas rápidas. Es un proceso honesto que empieza por mirar la raíz:
              eso que aprendimos a callar y que, sin saberlo, sigue gobernando cómo
              vivimos y cómo amamos.
            </p>
            <p style={aboutStyles.bodyP}>
              Su método combina rigor e investigación con una calidez profundamente
              humana. No promete borrar lo vivido; promete acompañarte a transformarlo
              en una raíz firme desde la cual crecer.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={aboutStyles.timeWrap}>
        <div style={aboutStyles.timeInner}>
          <div style={aboutStyles.timeCol}>
            <SectionHead eyebrow="Trayectoria" title="Tres décadas de acompañar procesos" maxTitle="18ch" />
            <div style={aboutStyles.timeline}>
              {timeline.map((e, i) => (
                <div key={i} style={aboutStyles.tItem}>
                  <div style={aboutStyles.tYear}>{e.y}</div>
                  <div style={aboutStyles.tDot}></div>
                  <div style={aboutStyles.tBody}>
                    <div style={aboutStyles.tTitle}>{e.t}</div>
                    <p style={aboutStyles.tDesc}>{e.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={aboutStyles.timeArt}>
            <img src={(window.__resources && window.__resources.aboutTimeline) || 'assets/about-timeline.jpg'}
              alt="Una persona celebrando frente a su laptop"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: 24 }} />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={band()}>
        <SectionHead eyebrow="Quién es como mentor" title="La forma de acompañar" maxTitle="16ch" align="left" />
        <div style={aboutStyles.grid3}>
          {values.map((v, i) => (
            <FeatureCard key={i} color={v.c} eyebrow={v.e} title={v.t}>{v.d}</FeatureCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={aboutStyles.ctaWrap}>
        <div style={aboutStyles.cta}>
          <div style={aboutStyles.ctaArt}>
            <img src={(window.__resources && window.__resources.aboutCta) || 'assets/about-cta.jpg'}
              alt="Dos personas chocando las manos en señal de conexión"
              style={{ display: 'block', width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <div style={aboutStyles.ctaCopy}>
            <h2 style={aboutStyles.ctaH}>Empecemos tu proceso, juntos</h2>
            <p style={aboutStyles.ctaSub}>Reserva una primera sesión de escucha. Sin compromiso, a tu ritmo.</p>
          </div>
          <Button size="lg" onClick={() => onNavigate('contacto')}>Reservar sesión</Button>
        </div>
      </section>
    </div>
  );
}

const aboutStyles = {
  hero: { maxWidth: CONTAINER, margin: '0 auto', padding: '64px 32px 32px', display: 'grid', gridTemplateColumns: '6fr 5fr', gap: 56, alignItems: 'center' },
  heroCopy: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  h1: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 52, lineHeight: 1.04, letterSpacing: '-2px', color: 'var(--color-ink)', maxWidth: '15ch', textWrap: 'balance' },
  lead: { margin: '20px 0 28px', fontSize: 18, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '50ch', textWrap: 'pretty' },
  heroArt: { height: 480 },

  statsWrap: { background: 'var(--color-forest)', margin: '24px 0 0' },
  stats: { maxWidth: CONTAINER, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 },
  stat: { display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' },
  statN: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 48, letterSpacing: '-1.5px', color: 'var(--color-on-dark)', lineHeight: 1 },
  statL: { fontSize: 15, color: 'rgba(246,239,225,0.8)' },

  philo: { display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 56, alignItems: 'start' },
  philoLeft: { display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 100 },
  philoQuote: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32, lineHeight: 1.18, letterSpacing: '-1px', color: 'var(--color-ink)', maxWidth: '18ch', textWrap: 'balance' },
  philoBody: {},
  bodyP: { margin: '0 0 18px', fontSize: 17, lineHeight: 1.65, color: 'var(--color-body)', maxWidth: '52ch', textWrap: 'pretty' },

  timeWrap: { background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)', margin: '48px 0' },
  timeInner: { maxWidth: CONTAINER, margin: '0 auto', padding: '72px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' },
  timeCol: { display: 'flex', flexDirection: 'column', gap: 40 },
  timeArt: { alignSelf: 'stretch', minHeight: 460 },
  timeline: { display: 'flex', flexDirection: 'column' },
  tItem: { display: 'grid', gridTemplateColumns: '120px 24px 1fr', gap: 20, alignItems: 'start', paddingBottom: 36 },
  tYear: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, color: 'var(--color-terracotta)', letterSpacing: '-0.5px', textAlign: 'right' },
  tDot: { width: 14, height: 14, borderRadius: '50%', background: 'var(--color-terracotta)', marginTop: 6, justifySelf: 'center', boxShadow: '0 0 0 4px var(--color-surface-soft), 0 0 0 5px var(--color-hairline)' },
  tBody: { paddingTop: 1 },
  tTitle: { fontWeight: 600, fontSize: 19, color: 'var(--color-ink)', marginBottom: 4 },
  tDesc: { margin: 0, fontSize: 15.5, lineHeight: 1.55, color: 'var(--color-body)', maxWidth: '52ch' },

  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 },

  ctaWrap: { maxWidth: CONTAINER, margin: '0 auto', padding: '32px 32px 96px' },
  cta: { background: 'var(--color-surface-card)', borderRadius: 'var(--radius-xl)', padding: '40px 48px', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' },
  ctaArt: { flexShrink: 0 },
  ctaCopy: { flex: 1, minWidth: 240 },
  ctaH: { margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32, letterSpacing: '-0.8px', color: 'var(--color-ink)' },
  ctaSub: { margin: 0, fontSize: 16, color: 'var(--color-body)' },
};

window.AboutScreen = AboutScreen;
