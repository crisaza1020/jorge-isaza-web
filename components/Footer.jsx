/* global React, NAV */
const { Button } = window.JorgeIsazaDesignSystem_6b05d8;

/* Cream-tinted footer — Jorge NEVER uses a dark footer. */
function Footer({ onNavigate }) {
  const cols = [
    { h: 'Explora', items: [
      { t: 'Metodología', r: 'metodologia' },
      { t: 'Recursos', r: 'recursos' },
      { t: 'Dr. Jorge Isaza', r: 'about' },
      { t: 'Testimonios', r: 'testimonios' },
    ]},
    { h: 'Recursos', items: [
      { t: 'Artículos', r: 'recursos' },
      { t: 'Guías PDF', r: 'recursos' },
      { t: 'Podcast', r: 'recursos' },
      { t: 'Videos', r: 'recursos' },
    ]},
    { h: 'Contacto', items: [
      { t: 'Reservar sesión', r: 'contacto' },
      { t: 'Escríbenos', r: 'contacto' },
      { t: 'Preguntas frecuentes', r: 'contacto' },
    ]},
  ];

  const go = (r) => (e) => { e.preventDefault(); onNavigate(r); };

  return (
    <footer style={footStyles.foot}>
      {/* Newsletter strip */}
      <div style={footStyles.news}>
        <div style={footStyles.newsInner}>
          <div>
            <h3 style={footStyles.newsH}>Acompáñate cada semana</h3>
            <p style={footStyles.newsP}>Una carta breve con una práctica para sostener tu proceso. Sin ruido.</p>
          </div>
          <form style={footStyles.newsForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="tu@correo.com" style={footStyles.newsInput} aria-label="Tu correo" />
            <Button type="submit" size="md">Suscribirme</Button>
          </form>
        </div>
      </div>

      <div style={footStyles.inner}>
        <div style={footStyles.brandCol}>
          <button style={footStyles.brand} onClick={() => onNavigate('home')} aria-label="Inicio">
            <img src={(window.__resources && window.__resources.logoMark) || 'assets/logo-mark.svg'} width="40" height="40" alt="" />
            <span style={footStyles.word}>Jorge Isaza</span>
          </button>
          <p style={footStyles.tag}>
            Desarrollo humano, sanación emocional y crecimiento personal.
            Más de 30 años acompañando procesos de transformación.
          </p>
          <div style={footStyles.social}>
            {['Instagram', 'YouTube', 'Spotify'].map((s) => (
              <a key={s} href="#" onClick={(e) => e.preventDefault()} style={footStyles.socialLink}>{s}</a>
            ))}
          </div>
        </div>
        {cols.map((c, i) => (
          <div key={i} style={footStyles.col}>
            <div style={footStyles.colH}>{c.h}</div>
            {c.items.map((it, j) => (
              <a key={j} href={'#' + it.r} style={footStyles.link} onClick={go(it.r)}>{it.t}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={footStyles.bottom}>
        <span>© 2026 Jorge H. Isaza · Desarrollo humano y bienestar integral</span>
        <span style={footStyles.madeWith}>Hecho con calidez</span>
      </div>
    </footer>
  );
}

const footStyles = {
  foot: { background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)', marginTop: 32 },
  news: { borderBottom: '1px solid var(--color-hairline)' },
  newsInner: {
    maxWidth: 'var(--container-max)', margin: '0 auto', padding: '40px 32px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
  },
  newsH: { margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, letterSpacing: '-0.6px', color: 'var(--color-ink)' },
  newsP: { margin: 0, fontSize: 15, color: 'var(--color-body)', maxWidth: '40ch' },
  newsForm: { display: 'flex', gap: 10, alignItems: 'center', flex: '0 0 auto' },
  newsInput: {
    height: 44, width: 240, maxWidth: '60vw', padding: '0 16px', fontFamily: 'var(--font-body)', fontSize: 15,
    color: 'var(--color-ink)', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-md)', outline: 'none',
  },
  inner: {
    maxWidth: 'var(--container-max)', margin: '0 auto', padding: '56px 32px 0',
    display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: 40,
  },
  brandCol: { display: 'flex', flexDirection: 'column' },
  brand: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, background: 'none', border: 'none', padding: 0, cursor: 'pointer' },
  word: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', color: 'var(--color-ink)' },
  tag: { margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--color-body)', maxWidth: '38ch' },
  social: { display: 'flex', gap: 16, marginTop: 18 },
  socialLink: { fontSize: 13, fontWeight: 500, color: 'var(--color-muted)', textDecoration: 'none' },
  col: { display: 'flex', flexDirection: 'column', gap: 11 },
  colH: { fontSize: 13, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 },
  link: { fontSize: 14, color: 'var(--color-muted)', textDecoration: 'none' },
  bottom: {
    maxWidth: 'var(--container-max)', margin: '48px auto 0', padding: '24px 32px',
    borderTop: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between',
    fontSize: 13, color: 'var(--color-muted)', flexWrap: 'wrap', gap: 8,
  },
  madeWith: { color: 'var(--color-terracotta)' },
};

window.Footer = Footer;
