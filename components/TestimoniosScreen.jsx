/* global React, PageHero, SectionHead, Eyebrow, band, CONTAINER */
const { useState } = React;
const { Button, Badge, Card, Avatar, Tabs } = window.JorgeIsazaDesignSystem_6b05d8;

function TestimoniosScreen({ onNavigate }) {
  const [tab, setTab] = useState('todos');

  const res = (k) => (window.__resources && window.__resources[k]) || null;
  const items = [
    { cat: 'mentoria', n: 'Ana Ruiz', r: 'Mentoría 1:1', face: res('faceAna') || 'assets/face-ana.jpg', q: 'Cambió por completo mi forma de habitar el mundo. Aprendí a mirar lo que evitaba durante años y, por fin, respiro distinto.' },
    { cat: 'taller', n: 'León Posada', r: 'Taller anual', face: res('faceLeon') || 'assets/face-leon.jpg', q: 'Aprendí a sostener mis emociones en vez de huir de ellas. Hoy reacciono menos y elijo más.' },
    { cat: 'circulo', n: 'Marta Gil', r: 'Círculo mensual', face: res('faceMarta') || 'assets/face-marta.jpg', q: 'Un método cálido y profundo. Nunca me sentí sola en el proceso, ni siquiera en lo más difícil.' },
    { cat: 'familia', n: 'Familia Restrepo', r: 'Proceso familiar', face: res('faceFamilia') || 'assets/face-familia.jpg', q: 'Volvimos a hablarnos de verdad. La metodología nos dio un lenguaje común para sanar juntos.' },
    { cat: 'mentoria', n: 'Daniel Vélez', r: 'Mentoría 1:1', face: res('faceDaniel') || 'assets/face-daniel.jpg', q: 'Llegué roto y con miedo. Salí con herramientas y, sobre todo, con una raíz firme para sostenerme.' },
    { cat: 'taller', n: 'Carolina M.', r: 'Taller intensivo', face: res('faceCarolina') || 'assets/face-carolina.jpg', q: 'Tres días que valieron por años de terapia que no terminaban de tocar el fondo del asunto.' },
    { cat: 'circulo', n: 'Sofía Ángel', r: 'Círculo mensual', face: res('faceSofia') || 'assets/face-sofia.jpg', q: 'El círculo se volvió mi lugar seguro. Crecer acompañada lo cambió todo para mí.' },
    { cat: 'familia', n: 'Pedro y Lucía', r: 'Proceso de pareja', q: 'Dejamos de repetir la misma pelea. Ahora entendemos de dónde venía y la cuidamos distinto.' },
  ];

  const filtered = tab === 'todos' ? items : items.filter((t) => t.cat === tab);
  const featured = items[0];

  return (
    <div data-screen-label="Testimonios">
      <PageHero eyebrow="Testimonios"
        title="Historias de quienes sanaron la raíz"
        lead="Personas y familias que transformaron su experiencia difícil en una vida más plena. Estas son sus palabras."
        maxTitle="16ch" />

      {/* FEATURED testimonial */}
      <section style={band({ paddingTop: 24 })}>
        <div style={tStyles.featured}>
          <div style={tStyles.featuredArt}>
            <img src={featured.face} alt={`Retrato de ${featured.n}`}
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', borderRadius: 20 }} />
          </div>
          <div style={tStyles.featuredCopy}>
            <span style={tStyles.quoteMark}>“</span>
            <p style={tStyles.featuredQuote}>{featured.q}</p>
            <div style={tStyles.featuredWho}>
              <Avatar name={featured.n} src={featured.face} size="md" />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: 17 }}>{featured.n}</div>
                <div style={{ fontSize: 14, color: 'var(--color-muted)' }}>{featured.r}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section style={band({ paddingTop: 16, gap: 28 })}>
        <div style={tStyles.filterRow}>
          <SectionHead eyebrow="Más voces" title="Filtra por tipo de proceso" maxTitle="16ch" />
          <Tabs value={tab} onChange={setTab} items={[
            { label: 'Todos', value: 'todos' },
            { label: 'Mentoría', value: 'mentoria' },
            { label: 'Talleres', value: 'taller' },
            { label: 'Círculos', value: 'circulo' },
            { label: 'Familias', value: 'familia' },
          ]} />
        </div>

        <div style={tStyles.grid}>
          {filtered.map((t, i) => (
            <Card key={t.n} variant="cream" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={tStyles.cardQuote}>“{t.q}”</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                <Avatar name={t.n} src={t.face} size="sm" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: 15 }}>{t.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{t.r}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={tStyles.ctaWrap}>
        <div style={tStyles.cta}>
          <Eyebrow style={{ color: 'rgba(246,239,225,0.7)' }}>Tu historia, la próxima</Eyebrow>
          <h2 style={tStyles.ctaH}>El primer paso también puede ser tuyo</h2>
          <p style={tStyles.ctaSub}>Reserva una sesión de escucha y empieza a transformar tu raíz.</p>
          <Button size="lg" variant="onColor" onClick={() => onNavigate('contacto')}>Reservar sesión</Button>
        </div>
      </section>
    </div>
  );
}

const tStyles = {
  featured: { display: 'grid', gridTemplateColumns: '4fr 7fr', gap: 48, alignItems: 'center', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-xl)', padding: 40 },
  featuredArt: { height: 320 },
  featuredCopy: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  quoteMark: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 64, lineHeight: 0.6, color: 'var(--color-terracotta)', marginBottom: 8 },
  featuredQuote: { margin: '0 0 24px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 30, lineHeight: 1.25, letterSpacing: '-0.8px', color: 'var(--color-ink)', maxWidth: '24ch', textWrap: 'balance' },
  featuredWho: { display: 'flex', alignItems: 'center', gap: 12 },

  filterRow: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' },
  cardQuote: { margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--color-body-strong)', textWrap: 'pretty' },

  ctaWrap: { maxWidth: CONTAINER, margin: '0 auto', padding: '32px 32px 96px' },
  cta: { background: 'var(--color-terracotta)', borderRadius: 'var(--radius-xl)', padding: '72px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 },
  ctaH: { margin: '6px 0 0', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 42, lineHeight: 1.08, letterSpacing: '-1.4px', color: 'var(--color-on-dark)', maxWidth: '18ch', textWrap: 'balance' },
  ctaSub: { margin: '0 0 14px', fontSize: 17, color: 'rgba(246,239,225,0.85)', maxWidth: '40ch' },
};

window.TestimoniosScreen = TestimoniosScreen;
