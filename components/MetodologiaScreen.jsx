/* global React, PageHero, SectionHead, Eyebrow, band, CONTAINER, useIsMobile */
const { Button, Badge, FeatureCard, Card } = window.JorgeIsazaDesignSystem_6b05d8;

function MetodologiaScreen({ onNavigate }) {
  const isMobile = useIsMobile();

  const stages = [
    { c: 'terracotta', n: '01', t: 'Reconocer', d: 'Mirar de frente la experiencia difícil y darle un nombre, sin juicio ni prisa. Lo que se nombra deja de gobernar desde la sombra.',
      bullets: ['Identificar el bloqueo de raíz', 'Nombrar la emoción sin huir', 'Crear un espacio seguro para mirarla'] },
    { c: 'forest', n: '02', t: 'Transformar', d: 'Resignificar lo vivido y liberar el patrón que detiene el crecimiento. La experiencia deja de ser herida y se vuelve aprendizaje.',
      bullets: ['Liberar el patrón heredado', 'Resignificar la historia personal', 'Recuperar la capacidad de elegir'] },
    { c: 'lavender', n: '03', t: 'Integrar', d: 'Convertir el aprendizaje en hábitos conscientes que sostienen la vida nueva, día a día, en lo cotidiano y en los vínculos.',
      bullets: ['Hábitos conscientes y sostenibles', 'Vínculos más sanos y honestos', 'Una práctica que perdura'] },
  ];

  const principles = [
    { t: 'Calidez antes que técnica', d: 'Ningún proceso avanza sin sentirse seguro. La calidez es el método, no un adorno.' },
    { t: 'La raíz, no el síntoma', d: 'Trabajamos el origen del bloqueo, no su manifestación pasajera.' },
    { t: 'A tu propio ritmo', d: 'Cada persona sostiene su proceso al paso que puede. Sin forzar, sin comparar.' },
    { t: 'Del dolor al aprendizaje', d: 'Lo vivido no se borra: se transforma en algo que te sostiene y te enseña.' },
  ];

  const formats = [
    { c: 'terracotta', e: 'Mentoría 1:1', t: 'Proceso individual', d: 'Acompañamiento privado y profundo para transformar la raíz de un bloqueo.' },
    { c: 'ochre', e: 'En comunidad', t: 'Talleres y círculos', d: 'Encuentros grupales para crecer acompañado y compartir el camino.' },
    { c: 'peach', e: 'A tu ritmo', t: 'Cursos y cuadernos', d: 'Material guiado para sostener la práctica entre sesiones, desde donde estés.' },
  ];

  return (
    <div data-screen-label="Metodologia">
      <section style={metStyles.hero}>
        <div style={metStyles.heroBg}>
          <img src={(window.__resources && window.__resources.methodHero) || 'assets/method-hero.jpg'}
            alt="Dos personas en silueta celebran con los brazos en alto frente al mar al atardecer"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={metStyles.heroScrim}></div>
        </div>
        <div style={{ ...metStyles.heroInner, ...(isMobile && { padding: '64px 16px' }) }}>
          <div style={{ marginBottom: 18 }}>
            <Badge uppercase variant="cream">Metodología</Badge>
          </div>
          <h1 style={{ ...metStyles.heroTitle, ...(isMobile && { fontSize: 34, letterSpacing: '-1px' }) }}>Un camino para sanar la raíz</h1>
          <p style={{ ...metStyles.heroLead, ...(isMobile && { fontSize: 15 }) }}>
            Más de 30 años de investigación en desarrollo humano, condensados en un
            proceso por etapas: claro, humano y sostenido con calidez. No es teoría
            suelta — es un camino que se camina.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => onNavigate('contacto')}>Empezar mi proceso</Button>
            <Button size="lg" variant="onColor" onClick={() => onNavigate('about')}>Conocer al Dr. Isaza</Button>
          </div>
        </div>
      </section>

      {/* THREE STAGES */}
      <section style={band({ paddingTop: 48 })}>
        <SectionHead eyebrow="El proceso" title="Tres etapas, un mismo hilo: la calidez" maxTitle="20ch" />
        <div style={{ ...metStyles.stageGrid, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          {stages.map((s) => {
            const dark = s.c === 'terracotta' || s.c === 'forest';
            const ink = dark ? 'var(--color-on-dark)' : 'var(--color-ink)';
            const sub = dark ? 'rgba(246,239,225,0.82)' : 'var(--color-body)';
            return (
              <FeatureCard key={s.n} color={s.c} eyebrow={`Etapa ${s.n}`} title={s.t}
                media={
                  <ul style={metStyles.bullets}>
                    {s.bullets.map((b, j) => (
                      <li key={j} style={{ ...metStyles.bullet, color: sub }}>
                        <span style={{ ...metStyles.tick, color: ink, borderColor: dark ? 'rgba(246,239,225,0.4)' : 'var(--color-hairline)' }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                }>
                {s.d}
              </FeatureCard>
            );
          })}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section style={metStyles.principlesWrap}>
        <div style={{ ...metStyles.principlesInner, ...(isMobile && { padding: '40px 16px' }) }}>
          <SectionHead eyebrow="Lo que sostiene el método" title="Cuatro principios innegociables" maxTitle="18ch" />
          <div style={{ ...metStyles.principlesGrid, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
            {principles.map((p, i) => (
              <div key={i} style={metStyles.principle}>
                <span style={metStyles.principleNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div style={metStyles.principleTitle}>{p.t}</div>
                  <p style={metStyles.principleDesc}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section style={band()}>
        <div style={metStyles.rowHead}>
          <SectionHead eyebrow="Cómo se vive" title="Formatos para cada momento" maxTitle="16ch" />
          <Button variant="text" onClick={() => onNavigate('recursos')}>Ver recursos →</Button>
        </div>
        <div style={{ ...metStyles.grid3, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          {formats.map((f, i) => (
            <FeatureCard key={i} color={f.c} eyebrow={f.e} title={f.t}
              media={<Button variant="onColor" size="sm" onClick={() => onNavigate('contacto')}>Reservar</Button>}>
              {f.d}
            </FeatureCard>
          ))}
        </div>
      </section>

      {/* QUOTE band */}
      <section style={{ ...metStyles.quoteWrap, ...(isMobile && { padding: '24px 16px 64px' }) }}>
        <figure style={{ ...metStyles.quote, ...(isMobile && { padding: '64px 24px' }) }}>
          <div style={metStyles.quoteBg}>
            <img src={(window.__resources && window.__resources.grupoComunidad) || 'assets/grupo-comunidad.jpg'}
              alt="Grupo de personas sonriendo juntas en un encuentro"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
            <div style={metStyles.quoteScrim}></div>
          </div>
          <div style={metStyles.quoteInner}>
            <p style={{ ...metStyles.quoteText, ...(isMobile && { fontSize: 22, letterSpacing: '-0.5px' }) }}>
              "No se trata de borrar lo que dolió, sino de transformarlo en una raíz que te sostenga."
            </p>
            <figcaption style={metStyles.quoteCap}>Dr. Jorge H. Isaza</figcaption>
          </div>
        </figure>
      </section>
    </div>
  );
}

const metStyles = {
  hero: { position: 'relative', minHeight: 560, display: 'flex', alignItems: 'center', overflow: 'hidden', marginBottom: 8 },
  heroBg: { position: 'absolute', inset: 0, zIndex: 0 },
  heroScrim: { position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(28,18,10,0.82) 0%, rgba(28,18,10,0.6) 42%, rgba(28,18,10,0.28) 70%, rgba(28,18,10,0.12) 100%)' },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: CONTAINER, width: '100%', margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  heroTitle: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 60, lineHeight: 1.02, letterSpacing: '-2.2px', color: 'var(--color-on-dark)', maxWidth: '14ch', textWrap: 'balance' },
  heroLead: { margin: '20px 0 0', fontSize: 19, lineHeight: 1.55, color: 'rgba(246,239,225,0.9)', maxWidth: '52ch', textWrap: 'pretty' },

  stageGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'start' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 },
  bullets: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 },
  bullet: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, lineHeight: 1.4 },
  tick: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', border: '1px solid', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 },

  principlesWrap: { background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', borderBottom: '1px solid var(--color-hairline)', margin: '40px 0' },
  principlesInner: { maxWidth: CONTAINER, margin: '0 auto', padding: '72px 32px', display: 'flex', flexDirection: 'column', gap: 36 },
  principlesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 },
  principle: { display: 'flex', gap: 18, alignItems: 'flex-start' },
  principleNum: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, color: 'var(--color-terracotta)', letterSpacing: '-0.5px', flexShrink: 0, width: 32 },
  principleTitle: { fontWeight: 600, fontSize: 19, color: 'var(--color-ink)', marginBottom: 4 },
  principleDesc: { margin: 0, fontSize: 15.5, lineHeight: 1.55, color: 'var(--color-body)', maxWidth: '40ch' },

  rowHead: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' },

  quoteWrap: { maxWidth: CONTAINER, margin: '0 auto', padding: '24px 32px 96px' },
  quote: { position: 'relative', margin: 0, borderRadius: 'var(--radius-xl)', padding: '96px 56px', textAlign: 'center', overflow: 'hidden' },
  quoteBg: { position: 'absolute', inset: 0, zIndex: 0 },
  quoteScrim: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(24,15,8,0.72) 0%, rgba(24,15,8,0.62) 50%, rgba(24,15,8,0.74) 100%)' },
  quoteInner: { position: 'relative', zIndex: 1 },
  quoteText: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 34, lineHeight: 1.18, letterSpacing: '-1px', color: 'var(--color-on-dark)', maxWidth: '24ch', marginLeft: 'auto', marginRight: 'auto', textWrap: 'balance' },
  quoteCap: { marginTop: 20, fontSize: 15, fontWeight: 600, color: 'var(--color-peach)' },
};

window.MetodologiaScreen = MetodologiaScreen;
