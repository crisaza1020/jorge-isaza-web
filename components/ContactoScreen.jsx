/* global React, PageHero, Eyebrow, CONTAINER, useIsMobile */
const { useState, useEffect, useRef } = React;
const { Button, Badge, Card, Input } = window.JorgeIsazaDesignSystem_6b05d8;

const CALENDLY_URL = 'https://calendly.com/jorgeisazamind/conversemos';

/* Calendly inline widget — loads the official script once and renders the embed */
function CalendlyWidget() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const height = isMobile ? Math.max(window.innerHeight - 68, 650) : 750;

  useEffect(() => {
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
    if (window.Calendly && ref.current) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: ref.current,
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <div>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <div
        ref={ref}
        className="calendly-inline-widget"
        data-url={CALENDLY_URL + '?hide_gdpr_banner=1&hide_event_type_details=1&background_color=fdf8ef&text_color=1c1a17&primary_color=c75d3f'}
        style={{ minWidth: 280, height, overflow: 'hidden' }}
      />
    </div>
  );
}

function ContactoScreen() {
  const [mode, setMode] = useState('reserva');
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const isMobile = useIsMobile();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const canSend = form.name.trim() && form.email.includes('@') && form.msg.trim().length > 4;

  const faqs = [
    { q: '¿La primera sesión tiene costo?', a: 'No. La sesión de escucha es gratuita, dura 30 minutos y no implica ningún compromiso de continuidad.' },
    { q: '¿Las sesiones son en línea o presenciales?', a: 'Trabajamos principalmente en línea, para que puedas acompañarte desde donde estés. También hay encuentros presenciales en talleres y círculos.' },
    { q: '¿Funciona para familias o solo individual?', a: 'Ambos. Hay procesos individuales, de pareja y familiares, además de talleres y círculos en comunidad.' },
    { q: '¿Cuánto dura un proceso completo?', a: 'Depende de cada persona. La metodología se vive a tu ritmo; muchos procesos individuales se estructuran en torno a 8 sesiones.' },
  ];

  const contactMethods = [
    { e: 'Correo', v: 'hola@jorgeisaza.com', sub: 'Respondemos en 24–48h' },
    { e: 'WhatsApp', v: '+57 300 000 0000', sub: 'Lun a Vie · 9:00–17:00' },
    { e: 'Redes', v: '@jorgeisaza', sub: 'Instagram · YouTube · Spotify' },
  ];

  return (
    <div data-screen-label="Contacto">
      <PageHero eyebrow="Contacto"
        title="Da el primer paso, te acompañamos"
        lead="Reserva una sesión de escucha sin compromiso, o escríbenos un mensaje. Cálido, privado y a tu ritmo."
        maxTitle="15ch" />

      <section style={{ ...cStyles.layout, ...(isMobile && { gridTemplateColumns: '1fr', padding: '16px 16px 48px', gap: 24 }) }}>
        {/* LEFT — panel principal */}
        <div style={cStyles.main}>
          <div style={cStyles.toggle}>
            <button onClick={() => setMode('reserva')}
              style={{ ...cStyles.toggleBtn, ...(mode === 'reserva' ? cStyles.toggleOn : {}) }}>
              Reservar sesión
            </button>
            <button onClick={() => setMode('mensaje')}
              style={{ ...cStyles.toggleBtn, ...(mode === 'mensaje' ? cStyles.toggleOn : {}) }}>
              Enviar mensaje
            </button>
          </div>

          {mode === 'reserva' ? (
            <div style={cStyles.calendlyWrap}>
              <p style={cStyles.panelSub}>
                Elige el día y horario que mejor te funcione. La primera sesión es gratuita y sin compromiso.
              </p>
              <CalendlyWidget />
            </div>
          ) : (
            <Card variant="content" padding="32px">
              {sent ? (
                <div style={cStyles.done}>
                  <div style={cStyles.check}>✓</div>
                  <h3 style={cStyles.panelH}>Mensaje enviado</h3>
                  <p style={{ margin: '0 0 24px', color: 'var(--color-body)', maxWidth: '34ch', marginLeft: 'auto', marginRight: 'auto' }}>
                    Gracias, {form.name.split(' ')[0]}. Te responderemos a {form.email} muy pronto.
                  </p>
                  <Button className="secondary-button" variant="secondary" onClick={() => { setSent(false); setForm({ name: '', email: '', msg: '' }); }}>Escribir otro</Button>
                </div>
              ) : (
                <>
                  <h3 style={cStyles.panelH}>Cuéntanos en qué podemos acompañarte</h3>
                  <p style={cStyles.panelSub}>Te leeremos con calma y te responderemos personalmente.</p>
                  <div style={cStyles.fields}>
                    <Input label="Tu nombre" placeholder="Nombre completo" value={form.name} onChange={set('name')} />
                    <Input label="Correo electrónico" placeholder="tu@correo.com" value={form.email} onChange={set('email')} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={cStyles.label}>Tu mensaje</label>
                      <textarea value={form.msg} onChange={set('msg')} rows={5}
                        placeholder="¿Desde dónde escribes? Cuéntanos lo que quieras compartir."
                        style={cStyles.textarea} />
                    </div>
                  </div>
                  <Button className="primary-button" size="lg" disabled={!canSend} onClick={() => setSent(true)} style={{ marginTop: 24, width: '100%' }}>
                    Enviar mensaje
                  </Button>
                </>
              )}
            </Card>
          )}
        </div>

        {/* RIGHT — beneficios + contacto */}
        <aside style={{ ...cStyles.side, ...(isMobile && { position: 'static' }) }}>
          <Card variant="cream" padding="28px">
            <Eyebrow>Una sesión de escucha incluye</Eyebrow>
            <ul style={cStyles.list}>
              {[
                'Espacio seguro y confidencial',
                'En línea, desde donde estés',
                'Sin compromiso de continuidad',
                'Acompañamiento a tu ritmo',
              ].map((t, i) => (
                <li key={i} style={cStyles.li}><span style={cStyles.tick}>✓</span>{t}</li>
              ))}
            </ul>
          </Card>

          <div style={cStyles.methods}>
            {contactMethods.map((m, i) => (
              <div key={i} style={cStyles.method}>
                <div style={cStyles.methodE}>{m.e}</div>
                <div style={cStyles.methodV}>{m.v}</div>
                <div style={cStyles.methodSub}>{m.sub}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* FAQ */}
      <section style={cStyles.faqWrap}>
        <div style={cStyles.faqInner}>
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 style={{ ...cStyles.faqH, ...(isMobile && { fontSize: 26, letterSpacing: '-0.5px' }) }}>Antes de empezar, quizá te preguntas…</h2>
          <div style={cStyles.faqList}>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={cStyles.faqItem}>
                  <button onClick={() => setOpenFaq(open ? -1 : i)} style={cStyles.faqQ}>
                    <span>{f.q}</span>
                    <span style={{ ...cStyles.faqSign, transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  <div style={{ ...cStyles.faqA, maxHeight: open ? 200 : 0, opacity: open ? 1 : 0, marginTop: open ? 10 : 0 }}>
                    {f.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

const cStyles = {
  layout: { maxWidth: CONTAINER, margin: '0 auto', padding: '24px 32px 64px', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 40, alignItems: 'start' },
  main: { display: 'flex', flexDirection: 'column', gap: 18 },
  toggle: { display: 'inline-flex', gap: 4, padding: 4, background: 'var(--color-surface-soft)', borderRadius: 'var(--radius-pill)', alignSelf: 'flex-start' },
  toggleBtn: { border: 'none', cursor: 'pointer', padding: '9px 20px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--color-muted)', background: 'transparent', transition: 'background 140ms ease, color 140ms ease' },
  toggleOn: { background: 'var(--color-surface-card)', color: 'var(--color-ink)', fontWeight: 600 },

  calendlyWrap: { display: 'flex', flexDirection: 'column', gap: 12 },
  panelH: { margin: '0 0 6px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 20, color: 'var(--color-ink)' },
  panelSub: { margin: '0', fontSize: 15, color: 'var(--color-body)', maxWidth: '48ch' },
  fields: { display: 'flex', flexDirection: 'column', gap: 16 },
  label: { fontSize: 14, fontWeight: 600, color: 'var(--color-ink)' },
  textarea: { fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--color-ink)', background: 'var(--color-canvas)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-md)', padding: '12px 16px', outline: 'none', resize: 'vertical', lineHeight: 1.55 },

  done: { textAlign: 'center', padding: '20px 0' },
  check: { width: 56, height: 56, borderRadius: '50%', background: 'var(--color-success)', color: '#fff', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' },

  side: { display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 88 },
  list: { listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 },
  li: { display: 'flex', alignItems: 'center', gap: 12, fontSize: 15.5, color: 'var(--color-body-strong)' },
  tick: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'var(--color-mint)', color: 'var(--color-forest)', fontSize: 13, fontWeight: 700, flexShrink: 0 },

  methods: { display: 'flex', flexDirection: 'column', gap: 2 },
  method: { padding: '16px 4px', borderBottom: '1px solid var(--color-hairline)' },
  methodE: { fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 4 },
  methodV: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.5px', color: 'var(--color-ink)' },
  methodSub: { fontSize: 13.5, color: 'var(--color-muted)', marginTop: 2 },

  faqWrap: { background: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-hairline)' },
  faqInner: { maxWidth: 820, margin: '0 auto', padding: '72px 32px 88px', display: 'flex', flexDirection: 'column', gap: 8 },
  faqH: { margin: '10px 0 24px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: '-1px', color: 'var(--color-ink)', maxWidth: '20ch', textWrap: 'balance' },
  faqList: { display: 'flex', flexDirection: 'column' },
  faqItem: { borderBottom: '1px solid var(--color-hairline)' },
  faqQ: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' },
  faqSign: { fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-terracotta)', transition: 'transform 180ms ease', flexShrink: 0, lineHeight: 1 },
  faqA: { overflow: 'hidden', fontSize: 16, lineHeight: 1.6, color: 'var(--color-body)', maxWidth: '60ch', transition: 'max-height 220ms ease, opacity 180ms ease, margin-top 180ms ease', paddingBottom: 0 },
};

window.ContactoScreen = ContactoScreen;
