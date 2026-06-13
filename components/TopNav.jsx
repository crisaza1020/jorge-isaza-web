/* global React, NAV */
const { useState } = React;
const { Button } = window.JorgeIsazaDesignSystem_6b05d8;

/* Cream sticky top navigation, 68px tall. Collapses to a sheet under 920px. */
function TopNav({ route, onNavigate }) {
  const [open, setOpen] = useState(false);

  const go = (v) => { setOpen(false); onNavigate(v); };

  return (
    <header style={navStyles.bar}>
      <div className="nav-inner" style={navStyles.inner}>
        <button style={navStyles.brand} onClick={() => go('home')} aria-label="Inicio">
          <img src={(window.__resources && window.__resources.logoMark) || 'assets/logo-mark.svg'} width="42" height="42" alt="Logo Jorge Isaza" />
          <span style={navStyles.word}>Jorge Isaza</span>
        </button>

        <nav className="nav-links" style={navStyles.links}>
          {NAV.map((l) => {
            const on = route === l.value;
            return (
              <button key={l.value} onClick={() => go(l.value)}
                style={{ ...navStyles.link, color: on ? 'var(--color-ink)' : 'var(--color-muted)' }}>
                {l.label}
                <span style={{ ...navStyles.dot, opacity: on ? 1 : 0 }}></span>
              </button>
            );
          })}
        </nav>

        <div style={navStyles.right}>
          <Button size="sm" onClick={() => go('contacto')}>Reservar sesión</Button>
          <button className="nav-burger" style={navStyles.burger} aria-label="Menú" onClick={() => setOpen((o) => !o)}>
            <span style={{ ...navStyles.burgerLine, transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }}></span>
            <span style={{ ...navStyles.burgerLine, opacity: open ? 0 : 1 }}></span>
            <span style={{ ...navStyles.burgerLine, transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none' }}></span>
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-sheet" style={navStyles.sheet}>
          {NAV.map((l) => (
            <button key={l.value} onClick={() => go(l.value)}
              style={{ ...navStyles.sheetLink, color: route === l.value ? 'var(--color-ink)' : 'var(--color-body)' }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

const navStyles = {
  bar: {
    position: 'sticky', top: 0, zIndex: 40, height: 68,
    background: 'rgba(253,248,239,0.86)',
    backdropFilter: 'saturate(140%) blur(8px)',
    WebkitBackdropFilter: 'saturate(140%) blur(8px)',
    borderBottom: '1px solid var(--color-hairline)',
  },
  inner: {
    maxWidth: 'var(--container-max)', margin: '0 auto', height: '100%',
    padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 },
  word: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.6px', color: 'var(--color-ink)' },
  links: { display: 'flex', gap: 26, alignItems: 'center' },
  link: {
    position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, padding: '6px 0',
    transition: 'color 140ms ease',
  },
  dot: {
    position: 'absolute', left: '50%', bottom: -2, width: 5, height: 5, marginLeft: -2.5,
    borderRadius: '50%', background: 'var(--color-terracotta)', transition: 'opacity 140ms ease',
  },
  right: { display: 'flex', alignItems: 'center', gap: 12 },
  burger: { display: 'none', flexDirection: 'column', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: 6 },
  burgerLine: { width: 20, height: 2, borderRadius: 2, background: 'var(--color-ink)', transition: 'transform 160ms ease, opacity 160ms ease' },
  sheet: {
    display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 20px 16px',
    background: 'var(--color-canvas)', borderBottom: '1px solid var(--color-hairline)',
  },
  sheetLink: {
    textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 500, padding: '12px 4px',
    borderBottom: '1px solid var(--color-hairline)',
  },
};

/* Responsive: hide inline links + show burger under 920px via a style tag. */
const navCss = document.createElement('style');
navCss.textContent = `
  @media (max-width: 920px) {
    .nav-links { display: none !important; }
    .nav-burger { display: flex !important; }
  }
  @media (max-width: 768px) {
    .nav-inner { padding-left: 16px !important; padding-right: 16px !important; }
  }
`;
document.head.appendChild(navCss);

window.TopNav = TopNav;
