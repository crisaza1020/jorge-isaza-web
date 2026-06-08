/* global React, SectionHead, Eyebrow, band, CONTAINER, useIsMobile */
const { Button, Badge, FeatureCard, Card, Avatar } = window.JorgeIsazaDesignSystem_6b05d8;

function HomeScreen({ onNavigate }) {
  const isMobile = useIsMobile();

  return (
    <div data-screen-label="Home">
      {/* HERO 7/5 split */}
      <section style={{ ...homeStyles.hero, ...(isMobile && { gridTemplateColumns: '1fr', padding: '40px 20px 24px', gap: 28 }) }}>
        <div style={homeStyles.heroLeft}>
          <Badge uppercase variant="cream" style={{ marginBottom: 20 }}>30 años acompañando procesos</Badge>
          <h1 style={{ ...homeStyles.h1, ...(isMobile && { fontSize: 38, letterSpacing: '-1.5px' }) }}>Sanar la raíz para crecer de verdad</h1>
          <p style={{ ...homeStyles.lead, ...(isMobile && { fontSize: 16, margin: '16px 0 20px' }) }}>
            Desarrollo humano y bienestar integral para personas y familias.
            Fortalece tu salud emocional, mejora tus relaciones y construye una
            vida más sana, segura, feliz y próspera.
          </p>
          <div style={homeStyles.heroBtns}>
            <Button size="lg" onClick={() => onNavigate('contacto')}>Da el primer paso</Button>
            <Button size="lg" variant="secondary" onClick={() => onNavigate('metodologia')}>Conoce la metodología</Button>
          </div>
          <div style={homeStyles.proof}>
            <div style={homeStyles.avatars}>
              {['Ana Ruiz', 'León P', 'Marta', 'Caro'].map((n, i) => (
                <div key={i} style={{ marginLeft: i ? -10 : 0 }}><Avatar name={n} size="sm" /></div>
              ))}
            </div>
            <span style={homeStyles.proofText}>+12.000 personas y familias en proceso de transformación</span>
          </div>
        </div>
        <div style={{ ...homeStyles.heroArt, ...(isMobile && { height: 240 }) }}>
          <img src={(window.__resources && window.__resources.heroCumbre) || 'assets/hero-cumbre.jpg'} alt="Silueta de una persona con los brazos abiertos en la cima de una montaña al amanecer"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} />
        </div>
      </section>

      {/* PILARES */}
      <section style={band({ paddingTop: 40 })}>
        <SectionHead eyebrow="Bienestar integral"
          title="Cuatro raíces de una vida plena"
          lead="Cada proceso fortalece, a la vez, lo que sostiene tu bienestar: por dentro y en tus vínculos." />
        <div style={{ ...homeStyles.grid4, ...(isMobile && { gridTemplateColumns: '1fr 1fr' }) }}>
          {[
            { c: 'terracotta', e: 'Por dentro', t: 'Salud emocional', d: 'Reconocer y sostener lo que sientes en lugar de huir de ello.' },
            { c: 'forest', e: 'Con otros', t: 'Relaciones sanas', d: 'Vínculos más honestos, seguros y libres de viejos patrones.' },
            { c: 'lavender', e: 'Contigo', t: 'Conciencia de ti', d: 'Conocerte con honestidad para decidir desde tu raíz, no desde el miedo.' },
            { c: 'peach', e: 'Hacia adelante', t: 'Vida próspera', d: 'Construir, con calma, una vida más sana, segura, feliz y próspera.' },
          ].map((p, i) => (
            <FeatureCard key={i} color={p.c} eyebrow={p.e} title={p.t}>{p.d}</FeatureCard>
          ))}
        </div>
      </section>

      {/* METODOLOGÍA teaser */}
      <section style={homeStyles.methodWrap}>
        <div style={{ ...homeStyles.methodInner, ...(isMobile && { gridTemplateColumns: '1fr', padding: '40px 16px', gap: 28 }) }}>
          <div style={{ ...homeStyles.methodArt, ...(isMobile && { height: 220 }) }}>
            <img src={(window.__resources && window.__resources.methodCirculo) || 'assets/method-circulo.jpg'} alt="Grupo de personas tomadas de las manos en alto, celebrando juntas"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} />
          </div>
          <div style={homeStyles.methodCopy}>
            <Eyebrow>La metodología</Eyebrow>
            <h2 style={{ ...homeStyles.h2, ...(isMobile && { fontSize: 28, letterSpacing: '-0.6px' }) }}>Un proceso por etapas, sostenido con calidez</h2>
            <p style={homeStyles.bodyP}>
              No es teoría suelta: es un camino guiado, paso a paso, para transformar
              la experiencia difícil en aprendizaje que sostiene tu vida.
            </p>
            <ol style={homeStyles.steps}>
              {[
                { n: '01', t: 'Reconocer', d: 'Mirar de frente lo vivido y darle un nombre sin juicio.' },
                { n: '02', t: 'Transformar', d: 'Resignificar la experiencia y liberar el bloqueo.' },
                { n: '03', t: 'Integrar', d: 'Convertir el aprendizaje en hábitos conscientes.' },
              ].map((s) => (
                <li key={s.n} style={homeStyles.step}>
                  <span style={homeStyles.stepNum}>{s.n}</span>
                  <div>
                    <div style={homeStyles.stepTitle}>{s.t}</div>
                    <div style={homeStyles.stepDesc}>{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <Button onClick={() => onNavigate('metodologia')}>Ver la metodología completa</Button>
          </div>
        </div>
      </section>

      {/* RECURSOS teaser */}
      <section style={band()}>
        <div style={homeStyles.rowHead}>
          <SectionHead eyebrow="Recursos" title="Para acompañar tu día a día" maxTitle="16ch" />
          <Button variant="text" onClick={() => onNavigate('recursos')}>Ver todos los recursos →</Button>
        </div>
        <div style={{ ...homeStyles.grid3, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          {[
            { c: 'ochre', k: 'Artículo', t: 'Cómo sostener una emoción difícil', m: '5 min de lectura' },
            { c: 'cream', k: 'Guía PDF', t: 'Cuaderno: la raíz de un bloqueo', m: 'Descarga gratuita' },
            { c: 'forest', k: 'Podcast', t: 'Hablemos de relaciones conscientes', m: 'Episodio · 38 min' },
          ].map((r, i) => (
            <button key={i} onClick={() => onNavigate('recursos')} style={homeStyles.resetBtn}>
              <FeatureCard color={r.c} eyebrow={r.k} title={r.t}
                media={<span style={{ fontSize: 14, fontWeight: 600, color: (r.c === 'forest') ? 'var(--color-on-dark)' : 'var(--color-muted)' }}>{r.m}</span>}>
              </FeatureCard>
            </button>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL strip */}
      <section style={band()}>
        <SectionHead eyebrow="Historias reales" title="Lo que cambia cuando sanas la raíz" maxTitle="18ch" />
        <div style={{ ...homeStyles.grid3, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          {[
            { q: 'Cambió por completo mi forma de habitar el mundo. Por fin respiro.', n: 'Ana Ruiz', r: 'Mentoría 1:1', face: (window.__resources && window.__resources.faceAna) || 'assets/face-ana.jpg' },
            { q: 'Aprendí a sostener mis emociones en vez de huir de ellas.', n: 'León Posada', r: 'Taller anual', face: (window.__resources && window.__resources.faceDaniel) || 'assets/face-daniel.jpg' },
            { q: 'Un método cálido y profundo. Nunca me sentí sola en el proceso.', n: 'Marta Gil', r: 'Círculo mensual', face: (window.__resources && window.__resources.faceSofia) || 'assets/face-sofia.jpg' },
          ].map((t, i) => (
            <Card key={i} variant="cream">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <Avatar name={t.n} src={t.face} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>{t.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{t.r}</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--color-body-strong)' }}>"{t.q}"</p>
            </Card>
          ))}
        </div>
        <div>
          <Button variant="text" onClick={() => onNavigate('testimonios')}>Leer más testimonios →</Button>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ ...homeStyles.ctaWrap, ...(isMobile && { padding: '24px 16px 64px' }) }}>
        <div style={{ ...homeStyles.cta, ...(isMobile && { padding: '48px 24px' }) }}>
          <Eyebrow style={{ color: 'rgba(246,239,225,0.7)' }}>Empieza hoy</Eyebrow>
          <h2 style={{ ...homeStyles.ctaH, ...(isMobile && { fontSize: 30, letterSpacing: '-0.8px' }) }}>Da el primer paso hacia tu transformación</h2>
          <p style={{ ...homeStyles.ctaSub, ...(isMobile && { fontSize: 15 }) }}>Reserva una primera sesión de escucha, sin compromiso. Cálida, privada y a tu ritmo.</p>
          <Button size="lg" variant="onColor" onClick={() => onNavigate('contacto')}>Reservar sesión de escucha</Button>
        </div>
      </section>
    </div>
  );
}

const homeStyles = {
  hero: { maxWidth: CONTAINER, margin: '0 auto', padding: '64px 32px 24px', display: 'grid', gridTemplateColumns: '6fr 6fr', gap: 48, alignItems: 'center' },
  heroLeft: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  h1: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 64, lineHeight: 1.0, letterSpacing: '-2.5px', color: 'var(--color-ink)', maxWidth: '13ch', textWrap: 'balance' },
  lead: { margin: '22px 0 28px', fontSize: 18, lineHeight: 1.55, color: 'var(--color-body)', maxWidth: '48ch', textWrap: 'pretty' },
  heroBtns: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  proof: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 32 },
  avatars: { display: 'flex' },
  proofText: { fontSize: 14, color: 'var(--color-muted)', maxWidth: '28ch' },
  heroArt: { height: 460 },

  grid4: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 },

  h2: { margin: '4px 0 0', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 40, lineHeight: 1.1, letterSpacing: '-1px', color: 'var(--color-ink)', maxWidth: '16ch', textWrap: 'balance' },
  bodyP: { margin: '16px 0 24px', fontSize: 17, lineHeight: 1.55, color: 'var(--color-body)', maxWidth: '44ch' },

  methodWrap: { background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)', margin: '40px 0' },
  methodInner: { maxWidth: CONTAINER, margin: '0 auto', padding: '72px 32px', display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 56, alignItems: 'center' },
  methodArt: { height: 420 },
  methodCopy: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  steps: { listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 },
  step: { display: 'flex', gap: 16, alignItems: 'flex-start' },
  stepNum: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--color-terracotta)', width: 28, flexShrink: 0, letterSpacing: '-0.5px' },
  stepTitle: { fontWeight: 600, fontSize: 17, color: 'var(--color-ink)' },
  stepDesc: { fontSize: 15, color: 'var(--color-body)', marginTop: 2 },

  rowHead: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' },
  resetBtn: { display: 'block', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%' },

  ctaWrap: { maxWidth: CONTAINER, margin: '0 auto', padding: '40px 32px 96px' },
  cta: { background: 'var(--color-forest)', borderRadius: 'var(--radius-xl)', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 },
  ctaH: { margin: '6px 0 0', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 44, lineHeight: 1.08, letterSpacing: '-1.4px', color: 'var(--color-on-dark)', maxWidth: '18ch', textWrap: 'balance' },
  ctaSub: { margin: '0 0 14px', fontSize: 17, color: 'rgba(246,239,225,0.82)', maxWidth: '42ch' },
};

window.HomeScreen = HomeScreen;
