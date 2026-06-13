/* global React, PageHero, SectionHead, Eyebrow, band, CONTAINER, useIsMobile */
const { useState } = React;
const { Button, Badge, FeatureCard, Card, Tabs } = window.JorgeIsazaDesignSystem_6b05d8;

function RecursosScreen({ onNavigate }) {
  const [tab, setTab] = useState('todos');
  const isMobile = useIsMobile();

  const resources = [
    { type: 'articulo', tipo: 'Artículo', color: 'terracotta', t: 'Cómo sostener una emoción difícil sin huir', meta: '5 min de lectura', cta: 'Leer' },
    { type: 'guia', tipo: 'Guía PDF', color: 'cream', t: 'Cuaderno: encontrar la raíz de un bloqueo', meta: 'Descarga gratuita · 12 pág.', cta: 'Descargar' },
    { type: 'podcast', tipo: 'Podcast', color: 'forest', t: 'Relaciones conscientes: dejar de repetir patrones', meta: 'Episodio 14 · 38 min', cta: 'Escuchar' },
    { type: 'video', tipo: 'Video', color: 'lavender', t: 'Las tres etapas del proceso, explicadas', meta: 'Charla · 18 min', cta: 'Ver' },
    { type: 'articulo', tipo: 'Artículo', color: 'ochre', t: 'Qué es el desarrollo humano (y qué no es)', meta: '7 min de lectura', cta: 'Leer' },
    { type: 'guia', tipo: 'Guía PDF', color: 'peach', t: 'Hábitos conscientes para sostener tu vida nueva', meta: 'Descarga gratuita · 16 pág.', cta: 'Descargar' },
    { type: 'podcast', tipo: 'Podcast', color: 'terracotta', t: 'Familias que sanan juntas', meta: 'Episodio 11 · 44 min', cta: 'Escuchar' },
    { type: 'video', tipo: 'Video', color: 'forest', t: 'Una práctica de 5 minutos para volver a ti', meta: 'Práctica guiada · 6 min', cta: 'Ver' },
    { type: 'articulo', tipo: 'Artículo', color: 'lavender', t: 'Seguridad emocional: el suelo de toda relación', meta: '6 min de lectura', cta: 'Leer' },
  ];

  const filtered = tab === 'todos' ? resources : resources.filter((r) => r.type === tab);

  return (
    <div data-screen-label="Recursos">
      <PageHero eyebrow="Recursos"
        title="Aprende y practica a tu ritmo"
        lead="Artículos, cuadernos descargables, episodios de podcast y videos para acompañar tu proceso entre sesiones. Material cálido y práctico, sin tecnicismos."
        maxTitle="15ch" />

      {/* FEATURED resource */}
      <section style={{ ...band({ paddingTop: 24 }) }}>
        <div style={{ ...recStyles.featured, ...(isMobile && { gridTemplateColumns: '1fr', gap: 24, padding: 20 }) }}>
          <div style={{ ...recStyles.featuredArt, ...(isMobile && { height: 200 }) }}>
            <img src={(window.__resources && window.__resources.recFeatured) || 'assets/rec-featured.png'}
              alt="Portada del episodio destacado del podcast"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} />
          </div>
          <div style={recStyles.featuredCopy}>
            <Badge uppercase variant="terracotta" style={{ marginBottom: 16 }}>Destacado · Podcast</Badge>
            <h2 style={{ ...recStyles.featuredTitle, ...(isMobile && { fontSize: 24, letterSpacing: '-0.5px' }) }}>Sanar la raíz: la conversación completa</h2>
            <p style={{ ...recStyles.featuredLead, ...(isMobile && { fontSize: 15 }) }}>
              El Dr. Isaza explica, en un episodio especial, por qué el dolor no
              se borra sino que se transforma — y cómo empezar tu propio proceso hoy.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button className="secondary-button" onClick={() => onNavigate('contacto')}>Escuchar episodio</Button>
              <span style={{ fontSize: 14, color: 'var(--color-muted)' }}>Episodio 15 · 52 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section style={band({ paddingTop: 16, gap: 28 })}>
        <div style={{ ...recStyles.filterRow, ...(isMobile && { flexDirection: 'column', alignItems: 'flex-start' }) }}>
          <SectionHead eyebrow="Biblioteca" title="Explora por tipo" maxTitle="14ch" />
          <Tabs value={tab} onChange={setTab} items={[
            { label: 'Todos', value: 'todos' },
            { label: 'Artículos', value: 'articulo' },
            { label: 'Guías PDF', value: 'guia' },
            { label: 'Podcast', value: 'podcast' },
            { label: 'Videos', value: 'video' },
          ]} />
        </div>

        <div style={{ ...recStyles.grid, ...(isMobile && { gridTemplateColumns: '1fr' }) }}>
          {filtered.map((r, i) => {
            const dark = r.color === 'terracotta' || r.color === 'forest';
            return (
              <button key={r.t} className="secondary-button" onClick={() => onNavigate('contacto')} style={recStyles.cardBtn}>
                <article style={recStyles.card}>
                  <image-slot id={`rec-thumb-${r.type}-${i}`} shape="rounded" radius="14"
                    placeholder={r.tipo}
                    style={{ display: 'block', width: '100%', height: 150, background: 'var(--color-surface-soft)' }}></image-slot>
                  <div style={recStyles.cardBody}>
                    <Badge variant={dark ? (r.color === 'forest' ? 'forest' : 'terracotta') : 'cream'} uppercase>{r.tipo}</Badge>
                    <h3 style={recStyles.cardTitle}>{r.t}</h3>
                    <div style={recStyles.cardFoot}>
                      <span style={recStyles.cardMeta}>{r.meta}</span>
                      <span style={recStyles.cardCta}>{r.cta} →</span>
                    </div>
                  </div>
                </article>
              </button>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER nudge */}
      <section style={{ ...recStyles.ctaWrap, ...(isMobile && { padding: '24px 16px 64px' }) }}>
        <div style={{ ...recStyles.cta, ...(isMobile && { flexDirection: 'column', padding: '32px 24px' }) }}>
          <div>
            <h2 style={{ ...recStyles.ctaH, ...(isMobile && { fontSize: 24 }) }}>¿Prefieres que lleguen a ti?</h2>
            <p style={recStyles.ctaSub}>Recibe cada nuevo recurso en tu correo, junto a una práctica breve para la semana.</p>
          </div>
          <Button className="primary-button" size="lg" onClick={() => onNavigate('contacto')}>Suscribirme al boletín</Button>
        </div>
      </section>
    </div>
  );
}

const recStyles = {
  featured: { display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 40, alignItems: 'center', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-xl)', padding: 32 },
  featuredArt: { height: 300 },
  featuredCopy: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 12 },
  featuredTitle: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: '-1px', color: 'var(--color-ink)', maxWidth: '16ch', textWrap: 'balance' },
  featuredLead: { margin: '16px 0 24px', fontSize: 17, lineHeight: 1.55, color: 'var(--color-body)', maxWidth: '44ch' },

  filterRow: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 },
  cardBtn: { display: 'block', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%' },
  card: { background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-lg)', padding: 14, display: 'flex', flexDirection: 'column', gap: 14, height: '100%', transition: 'border-color 140ms ease, transform 140ms ease' },
  cardBody: { display: 'flex', flexDirection: 'column', gap: 12, padding: '2px 6px 8px', alignItems: 'flex-start' },
  cardTitle: { margin: 0, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 18, lineHeight: 1.3, letterSpacing: '-0.2px', color: 'var(--color-ink)', textWrap: 'pretty' },
  cardFoot: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%', marginTop: 2 },
  cardMeta: { fontSize: 13, color: 'var(--color-muted)' },
  cardCta: { fontSize: 13.5, fontWeight: 600, color: 'var(--color-terracotta)' },

  ctaWrap: { maxWidth: CONTAINER, margin: '0 auto', padding: '32px 32px 96px' },
  cta: { background: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-xl)', padding: '48px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' },
  ctaH: { margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32, letterSpacing: '-0.8px', color: 'var(--color-ink)' },
  ctaSub: { margin: 0, fontSize: 16, color: 'var(--color-body)', maxWidth: '46ch' },
};

window.RecursosScreen = RecursosScreen;
