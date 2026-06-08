/* global React */
/* Shared helpers + nav config for the Jorge Isaza site. */

const NAV = [
  { label: 'Inicio', value: 'home' },
  { label: 'Metodología', value: 'metodologia' },
  { label: 'Recursos', value: 'recursos' },
  { label: 'Dr. Jorge Isaza', value: 'about' },
  { label: 'Testimonios', value: 'testimonios' },
  { label: 'Contacto', value: 'contacto' },
];

/* Cycle of saturated feature-card colors — never repeat in a row. */
const CARD_CYCLE = ['terracotta', 'forest', 'lavender', 'peach', 'ochre', 'cream'];
const isDarkCard = (c) => c === 'terracotta' || c === 'forest';

const CONTAINER = 'var(--container-max)';

/* Eyebrow — small uppercase label above headlines. */
function Eyebrow({ children, style }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
      letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted)', ...style,
    }}>
      {children}
    </span>
  );
}

/* Section heading block: eyebrow + display h2 + optional lead. */
function SectionHead({ eyebrow, title, lead, align = 'left', maxTitle = '20ch', style }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left', ...style,
    }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 style={{
        margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 40, lineHeight: 1.1, letterSpacing: '-1px',
        color: 'var(--color-ink)', maxWidth: maxTitle, textWrap: 'balance',
      }}>{title}</h2>
      {lead && (
        <p style={{
          margin: 0, fontSize: 18, lineHeight: 1.55, color: 'var(--color-body)',
          maxWidth: '50ch', textWrap: 'pretty',
        }}>{lead}</p>
      )}
    </div>
  );
}

/* Page hero band on cream — eyebrow + big display title + lead. */
function PageHero({ eyebrow, title, lead, children, maxTitle = '15ch' }) {
  return (
    <section style={{
      maxWidth: CONTAINER, margin: '0 auto', padding: '72px 32px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    }}>
      {eyebrow && (
        <div style={{ marginBottom: 18 }}>
          <window.JorgeIsazaDesignSystem_6b05d8.Badge uppercase variant="cream">{eyebrow}</window.JorgeIsazaDesignSystem_6b05d8.Badge>
        </div>
      )}
      <h1 style={{
        margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 60, lineHeight: 1.02, letterSpacing: '-2.2px',
        color: 'var(--color-ink)', maxWidth: maxTitle, textWrap: 'balance',
      }}>{title}</h1>
      {lead && (
        <p style={{
          margin: '20px 0 0', fontSize: 19, lineHeight: 1.55,
          color: 'var(--color-body)', maxWidth: '52ch', textWrap: 'pretty',
        }}>{lead}</p>
      )}
      {children}
    </section>
  );
}

const band = (extra) => ({
  maxWidth: CONTAINER, margin: '0 auto', padding: '56px 32px',
  display: 'flex', flexDirection: 'column', gap: 28, ...extra,
});

Object.assign(window, { NAV, CARD_CYCLE, isDarkCard, CONTAINER, Eyebrow, SectionHead, PageHero, band });
