/* @ds-bundle: {"format":3,"namespace":"JorgeIsazaDesignSystem_6b05d8","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"FeatureCard","sourcePath":"components/core/FeatureCard.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"}],"sourceHashes":{"assets/image-slot.js":"9309434cb09c","components/core/Avatar.jsx":"ff47a97ccb74","components/core/Badge.jsx":"0df3bac3e05e","components/core/Button.jsx":"4a2586e97ede","components/core/Card.jsx":"508bba89f8e5","components/core/FeatureCard.jsx":"06e3284c08cd","components/core/Input.jsx":"7a369d10cec3","components/core/Tabs.jsx":"a758f87ff83d","ui_kits/website/BookingScreen.jsx":"509ca39d8484","ui_kits/website/Footer.jsx":"ed3bd53181c2","ui_kits/website/HomeScreen.jsx":"aa8b19908e0a","ui_kits/website/ProgramsScreen.jsx":"724a915ac459","ui_kits/website/TopNav.jsx":"2bea511ab389"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JorgeIsazaDesignSystem_6b05d8 = window.JorgeIsazaDesignSystem_6b05d8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/image-slot.js", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — round image or initials. Sizes sm/md/lg. Warm tinted fallback.
 */
function Avatar({
  src,
  name = '',
  size = 'md',
  style,
  ...rest
}) {
  const sizes = {
    sm: 32,
    md: 44,
    lg: 64
  };
  const px = sizes[size] || sizes.md;
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: px,
      height: px,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-peach)',
      color: 'var(--color-ink)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: px * 0.38,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '·');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small pill label. Cream-fill by default; brand-tinted variants
 * for category accents. Use caption type. Optional uppercase eyebrow style.
 */
function Badge({
  children,
  variant = 'cream',
  uppercase = false,
  style,
  ...rest
}) {
  const variants = {
    cream: {
      background: 'var(--color-surface-card)',
      color: 'var(--color-body)'
    },
    terracotta: {
      background: 'rgba(199,93,63,0.14)',
      color: 'var(--color-terracotta)'
    },
    forest: {
      background: 'rgba(44,74,64,0.14)',
      color: 'var(--color-forest)'
    },
    ochre: {
      background: 'rgba(226,167,63,0.18)',
      color: '#8a6411'
    },
    sage: {
      background: 'rgba(111,148,118,0.18)',
      color: '#3f5e46'
    },
    solid: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)'
    }
  };
  const upper = uppercase ? {
    textTransform: 'uppercase',
    letterSpacing: 'var(--type-caption-uppercase-ls)',
    fontSize: 'var(--type-caption-uppercase-size)',
    fontWeight: 600
  } : {
    fontSize: 'var(--type-caption-size)',
    fontWeight: 'var(--type-caption-weight)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      lineHeight: 1.4,
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      ...upper,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary CTA primitive for the Jorge Isaza system.
 * Variants: primary (near-black), secondary (cream + hairline),
 * onColor (white, for use over saturated feature cards), text (inline link).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 36,
      padding: '0 14px',
      fontSize: 13
    },
    md: {
      height: 44,
      padding: '0 20px',
      fontSize: 'var(--type-button-size)'
    },
    lg: {
      height: 52,
      padding: '0 28px',
      fontSize: 15
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--type-button-weight)',
    lineHeight: 1,
    letterSpacing: 0,
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background-color 140ms ease, color 140ms ease, border-color 140ms ease, transform 80ms ease',
    whiteSpace: 'nowrap',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)'
    },
    secondary: {
      background: 'var(--color-canvas)',
      color: 'var(--color-ink)',
      borderColor: 'var(--color-hairline)'
    },
    onColor: {
      background: 'var(--color-canvas)',
      color: 'var(--color-ink)'
    },
    text: {
      background: 'transparent',
      color: 'var(--color-ink)',
      height: 'auto',
      padding: 0
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — neutral content container on cream canvas with a warm hairline.
 * No heavy shadow. Variants: content (canvas+hairline), cream (surface-card),
 * soft (surface-soft). 16px radius, 24px padding by default.
 */
function Card({
  children,
  variant = 'content',
  padding,
  radius,
  style,
  ...rest
}) {
  const variants = {
    content: {
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-hairline)'
    },
    cream: {
      background: 'var(--color-surface-card)',
      border: 'none'
    },
    soft: {
      background: 'var(--color-surface-soft)',
      border: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: radius || 'var(--radius-lg)',
      padding: padding || 'var(--space-lg)',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/FeatureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FeatureCard — the signature saturated single-color card. 24px radius,
 * 32px padding, no shadow. Text color auto-flips: white on the dark
 * saturations (terracotta, forest), ink on the light ones (lavender, peach,
 * ochre, cream). Cycle colors across a page — never repeat one in a row.
 */
function FeatureCard({
  color = 'terracotta',
  eyebrow,
  title,
  children,
  media,
  style,
  ...rest
}) {
  const palette = {
    terracotta: {
      background: 'var(--color-terracotta)',
      dark: true
    },
    forest: {
      background: 'var(--color-forest)',
      dark: true
    },
    lavender: {
      background: 'var(--color-lavender)',
      dark: false
    },
    peach: {
      background: 'var(--color-peach)',
      dark: false
    },
    ochre: {
      background: 'var(--color-ochre)',
      dark: false
    },
    cream: {
      background: 'var(--color-surface-card)',
      dark: false
    }
  };
  const c = palette[color] || palette.terracotta;
  const ink = c.dark ? 'var(--color-on-dark)' : 'var(--color-ink)';
  const sub = c.dark ? 'rgba(246,239,225,0.82)' : 'var(--color-body)';
  const eye = c.dark ? 'rgba(246,239,225,0.7)' : 'var(--color-muted)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: c.background,
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-xl)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-caption-uppercase-size)',
      fontWeight: 600,
      letterSpacing: 'var(--type-caption-uppercase-ls)',
      textTransform: 'uppercase',
      color: eye
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-display-sm-size)',
      fontWeight: 600,
      lineHeight: 'var(--type-display-sm-lh)',
      letterSpacing: 'var(--type-display-sm-ls)',
      color: ink
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-md-size)',
      lineHeight: 'var(--type-body-md-lh)',
      color: sub,
      maxWidth: '46ch'
    }
  }, children), media && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-xs)'
    }
  }, media));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field on cream canvas with a warm hairline border.
 * 44px tall, 12px radius. Border thickens to ink on focus.
 */
function Input({
  label,
  hint,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--color-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      height: 44,
      padding: '0 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-md-size)',
      color: 'var(--color-ink)',
      background: 'var(--color-canvas)',
      border: `1px solid ${error ? 'var(--color-error)' : focused ? 'var(--color-ink)' : 'var(--color-hairline)'}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      transition: 'border-color 140ms ease',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: error ? 'var(--color-error)' : 'var(--color-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — pill-shaped category tabs (sub-nav). Inactive: transparent + muted.
 * Active: cream-card fill + ink text. Controlled or uncontrolled.
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--color-surface-soft)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(it.value),
      style: {
        border: 'none',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--type-nav-link-size)',
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--color-ink)' : 'var(--color-muted)',
        background: on ? 'var(--color-surface-card)' : 'transparent',
        transition: 'background-color 140ms ease, color 140ms ease'
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BookingScreen.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
const {
  Button,
  Badge,
  Card,
  Input
} = window.JorgeIsazaDesignSystem_6b05d8;
function BookingScreen({
  onNavigate
}) {
  const [step, setStep] = useState(0); // 0 = form, 1 = confirmed
  const [slot, setSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const slots = ['Lun 9 jun · 10:00', 'Lun 9 jun · 16:00', 'Mié 11 jun · 11:00', 'Jue 12 jun · 18:00', 'Vie 13 jun · 09:00', 'Vie 13 jun · 15:00'];
  const canSubmit = slot !== null && name.trim() && email.includes('@');
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Booking",
    style: bookStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: bookStyles.left
  }, /*#__PURE__*/React.createElement(Badge, {
    uppercase: true,
    variant: "cream",
    style: {
      marginBottom: 18
    }
  }, "Primera sesi\xF3n \xB7 sin compromiso"), /*#__PURE__*/React.createElement("h1", {
    style: bookStyles.h1
  }, "Reserva una sesi\xF3n de escucha"), /*#__PURE__*/React.createElement("p", {
    style: bookStyles.lead
  }, "30 minutos para conocernos y entender desde d\xF3nde empezar tu proceso. C\xE1lido, privado y a tu ritmo."), /*#__PURE__*/React.createElement("ul", {
    style: bookStyles.list
  }, ['Espacio seguro y confidencial', 'En línea, desde donde estés', 'Sin compromiso de continuidad'].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: bookStyles.li
  }, /*#__PURE__*/React.createElement("span", {
    style: bookStyles.tick
  }, "\u2713"), t)))), /*#__PURE__*/React.createElement(Card, {
    variant: "content",
    padding: "32px",
    style: bookStyles.panel
  }, step === 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    style: bookStyles.panelH
  }, "Elige un horario"), /*#__PURE__*/React.createElement("div", {
    style: bookStyles.slots
  }, slots.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setSlot(i),
    style: {
      ...bookStyles.slot,
      ...(slot === i ? bookStyles.slotOn : {})
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Tu nombre",
    placeholder: "Nombre completo",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Correo electr\xF3nico",
    placeholder: "tu@correo.com",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    disabled: !canSubmit,
    onClick: () => setStep(1),
    style: {
      marginTop: 24,
      width: '100%'
    }
  }, "Confirmar reserva")) : /*#__PURE__*/React.createElement("div", {
    style: bookStyles.done
  }, /*#__PURE__*/React.createElement("div", {
    style: bookStyles.check
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: bookStyles.panelH
  }, "Reserva confirmada"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 4px',
      color: 'var(--color-body)'
    }
  }, "Te esperamos el"), /*#__PURE__*/React.createElement("p", {
    style: bookStyles.slotConfirmed
  }, slots[slot]), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 24px',
      color: 'var(--color-muted)',
      fontSize: 14
    }
  }, "Enviamos los detalles a ", email, "."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate('home')
  }, "Volver al inicio"))));
}
const bookStyles = {
  wrap: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '64px 32px 96px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 56,
    alignItems: 'start'
  },
  left: {
    paddingTop: 12
  },
  h1: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 52,
    lineHeight: 1.05,
    letterSpacing: '-2px',
    color: 'var(--color-ink)',
    maxWidth: '14ch'
  },
  lead: {
    margin: '18px 0 28px',
    fontSize: 18,
    lineHeight: 1.55,
    color: 'var(--color-body)',
    maxWidth: '40ch'
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 16,
    color: 'var(--color-body-strong)'
  },
  tick: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'var(--color-mint)',
    color: 'var(--color-forest)',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0
  },
  panel: {},
  panelH: {
    margin: '0 0 16px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: 20,
    color: 'var(--color-ink)'
  },
  slots: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    marginBottom: 24
  },
  slot: {
    padding: '12px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-hairline)',
    background: 'var(--color-canvas)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--color-body)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 140ms ease, background 140ms ease'
  },
  slotOn: {
    borderColor: 'var(--color-ink)',
    borderWidth: 2,
    background: 'var(--color-surface-card)',
    color: 'var(--color-ink)',
    fontWeight: 600
  },
  done: {
    textAlign: 'center',
    padding: '20px 0'
  },
  check: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'var(--color-success)',
    color: '#fff',
    fontSize: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 18px'
  },
  slotConfirmed: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 26,
    letterSpacing: '-0.5px',
    color: 'var(--color-ink)'
  }
};
window.BookingScreen = BookingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BookingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React */

/* Cream-tinted footer — Jorge NEVER uses a dark footer. */
function Footer() {
  const cols = [{
    h: 'Programas',
    items: ['Mentoría 1:1', 'Talleres', 'Círculos', 'Cursos']
  }, {
    h: 'Metodología',
    items: ['Las tres etapas', 'Historias', 'Investigación']
  }, {
    h: 'Recursos',
    items: ['Cuadernos', 'Blog', 'Newsletter']
  }, {
    h: 'Contacto',
    items: ['Reservar sesión', 'Escríbenos', 'Prensa']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: footStyles.foot
  }, /*#__PURE__*/React.createElement("div", {
    style: footStyles.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: footStyles.brandCol
  }, /*#__PURE__*/React.createElement("div", {
    style: footStyles.brand
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "40",
    height: "40",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: footStyles.word
  }, "Jorge Isaza")), /*#__PURE__*/React.createElement("p", {
    style: footStyles.tag
  }, "Desarrollo humano, sanaci\xF3n emocional y crecimiento personal. M\xE1s de 30 a\xF1os acompa\xF1ando procesos.")), cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: footStyles.col
  }, /*#__PURE__*/React.createElement("div", {
    style: footStyles.colH
  }, c.h), c.items.map((it, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    href: "#",
    style: footStyles.link,
    onClick: e => e.preventDefault()
  }, it))))), /*#__PURE__*/React.createElement("div", {
    style: footStyles.bottom
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Jorge H. Isaza \xB7 Desarrollo humano"), /*#__PURE__*/React.createElement("span", null, "Hecho con calidez")));
}
const footStyles = {
  foot: {
    background: 'var(--color-surface-soft)',
    borderTop: '1px solid var(--color-hairline)',
    paddingTop: 80
  },
  inner: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 32px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    gap: 40
  },
  brandCol: {},
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14
  },
  word: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: '-0.6px',
    color: 'var(--color-ink)'
  },
  tag: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.55,
    color: 'var(--color-body)',
    maxWidth: '34ch'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  colH: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--color-ink)',
    marginBottom: 4
  },
  link: {
    fontSize: 14,
    color: 'var(--color-muted)',
    textDecoration: 'none'
  },
  bottom: {
    maxWidth: 'var(--container-max)',
    margin: '48px auto 0',
    padding: '24px 32px',
    borderTop: '1px solid var(--color-hairline)',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: 'var(--color-muted)'
  }
};
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
/* global React */
const {
  Button,
  Badge,
  FeatureCard,
  Card,
  Avatar
} = window.JorgeIsazaDesignSystem_6b05d8;
function HomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Home"
  }, /*#__PURE__*/React.createElement("section", {
    style: homeStyles.hero
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.heroLeft
  }, /*#__PURE__*/React.createElement(Badge, {
    uppercase: true,
    variant: "cream",
    style: {
      marginBottom: 20
    }
  }, "30 a\xF1os acompa\xF1ando procesos"), /*#__PURE__*/React.createElement("h1", {
    style: homeStyles.h1
  }, "Sanar la ra\xEDz para crecer de verdad"), /*#__PURE__*/React.createElement("p", {
    style: homeStyles.lead
  }, "Metodolog\xEDas de desarrollo humano que ayudan a superar bloqueos, transformar experiencias dif\xEDciles y construir una vida m\xE1s plena y consciente."), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.heroBtns
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => onNavigate('booking')
  }, "Reservar una sesi\xF3n"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => onNavigate('programs')
  }, "Ver los programas")), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.proof
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.avatars
  }, ['Ana Ruiz', 'León P', 'Marta', 'Caro'].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginLeft: i ? -10 : 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: "sm"
  })))), /*#__PURE__*/React.createElement("span", {
    style: homeStyles.proofText
  }, "+12.000 personas en proceso de transformaci\xF3n"))), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.heroArt
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "home-hero-art",
    shape: "rounded",
    radius: "24",
    placeholder: "Ilustraci\xF3n 3D c\xE1lida \u2014 monta\xF1as / figura en calma",
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      background: 'var(--color-surface-soft)'
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: homeStyles.band
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.bandHead
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: homeStyles.eyebrow
  }, "Metodolog\xEDa"), /*#__PURE__*/React.createElement("h2", {
    style: homeStyles.h2
  }, "Un proceso por etapas, sostenido con calidez")), /*#__PURE__*/React.createElement("div", {
    style: homeStyles.grid3
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    color: "terracotta",
    eyebrow: "Etapa 01",
    title: "Reconocer"
  }, "Mirar de frente la experiencia dif\xEDcil y darle un nombre sin juicio."), /*#__PURE__*/React.createElement(FeatureCard, {
    color: "forest",
    eyebrow: "Etapa 02",
    title: "Transformar"
  }, "Resignificar lo vivido y liberar el bloqueo que detiene el crecimiento."), /*#__PURE__*/React.createElement(FeatureCard, {
    color: "lavender",
    eyebrow: "Etapa 03",
    title: "Integrar"
  }, "Convertir el aprendizaje en h\xE1bitos conscientes que sostienen la vida nueva.")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...homeStyles.grid3,
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    color: "peach",
    eyebrow: "Acompa\xF1amiento",
    title: "Mentor\xEDa individual 1:1",
    media: /*#__PURE__*/React.createElement(Button, {
      variant: "onColor",
      size: "sm",
      onClick: () => onNavigate('booking')
    }, "Reservar")
  }, "Un espacio seguro y privado para sostener tu proceso, a tu ritmo."), /*#__PURE__*/React.createElement(FeatureCard, {
    color: "ochre",
    eyebrow: "En comunidad",
    title: "Talleres y c\xEDrculos",
    media: /*#__PURE__*/React.createElement(Button, {
      variant: "onColor",
      size: "sm",
      onClick: () => onNavigate('programs')
    }, "Ver fechas")
  }, "Encuentros grupales para crecer acompa\xF1ado y compartir el camino."))), /*#__PURE__*/React.createElement("section", {
    style: homeStyles.band
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.grid3
  }, [{
    q: 'Cambió por completo mi forma de habitar el mundo. Por fin respiro.',
    n: 'Ana Ruiz',
    r: 'Mentoría 1:1'
  }, {
    q: 'Aprendí a sostener mis emociones en vez de huir de ellas.',
    n: 'León Posada',
    r: 'Taller anual'
  }, {
    q: 'Un método cálido y profundo. Nunca me sentí sola en el proceso.',
    n: 'Marta Gil',
    r: 'Círculo mensual'
  }].map((t, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    variant: "cream"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: t.n
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--color-ink)'
    }
  }, t.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-muted)'
    }
  }, t.r))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--color-body-strong)'
    }
  }, "\u201C", t.q, "\u201D"))))), /*#__PURE__*/React.createElement("section", {
    style: homeStyles.ctaWrap
  }, /*#__PURE__*/React.createElement("div", {
    style: homeStyles.cta
  }, /*#__PURE__*/React.createElement("h2", {
    style: homeStyles.ctaH
  }, "Da el primer paso hacia tu transformaci\xF3n hoy"), /*#__PURE__*/React.createElement("p", {
    style: homeStyles.ctaSub
  }, "Reserva una primera sesi\xF3n de escucha, sin compromiso."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => onNavigate('booking')
  }, "Reservar sesi\xF3n"))));
}
const homeStyles = {
  hero: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '72px 32px',
    display: 'grid',
    gridTemplateColumns: '7fr 5fr',
    gap: 48,
    alignItems: 'center'
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  h1: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 64,
    lineHeight: 1.0,
    letterSpacing: '-2.5px',
    color: 'var(--color-ink)',
    maxWidth: '13ch'
  },
  lead: {
    margin: '22px 0 28px',
    fontSize: 18,
    lineHeight: 1.55,
    color: 'var(--color-body)',
    maxWidth: '46ch'
  },
  heroBtns: {
    display: 'flex',
    gap: 14
  },
  proof: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginTop: 32
  },
  avatars: {
    display: 'flex'
  },
  proofText: {
    fontSize: 14,
    color: 'var(--color-muted)'
  },
  heroArt: {
    height: 420
  },
  band: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '48px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  bandHead: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 8
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--color-muted)'
  },
  h2: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 40,
    lineHeight: 1.1,
    letterSpacing: '-1px',
    color: 'var(--color-ink)',
    maxWidth: '18ch'
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 20
  },
  ctaWrap: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '48px 32px 96px'
  },
  cta: {
    background: 'var(--color-surface-soft)',
    borderRadius: 'var(--radius-xl)',
    padding: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 14
  },
  ctaH: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 40,
    lineHeight: 1.1,
    letterSpacing: '-1px',
    color: 'var(--color-ink)',
    maxWidth: '20ch'
  },
  ctaSub: {
    margin: '0 0 12px',
    fontSize: 17,
    color: 'var(--color-body)'
  }
};
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProgramsScreen.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
const {
  Button,
  Badge,
  Card,
  FeatureCard,
  Tabs
} = window.JorgeIsazaDesignSystem_6b05d8;
function ProgramsScreen({
  onNavigate
}) {
  const [tab, setTab] = useState('todos');
  const programs = [{
    cat: 'mentorias',
    color: 'terracotta',
    eyebrow: 'Mentoría 1:1',
    title: 'Proceso individual',
    desc: 'Acompañamiento privado de 8 sesiones para transformar la raíz de un bloqueo.',
    price: 'Desde $480'
  }, {
    cat: 'talleres',
    color: 'forest',
    eyebrow: 'Taller intensivo',
    title: 'Sanar para crecer',
    desc: 'Tres días de inmersión grupal en la metodología completa.',
    price: '$320'
  }, {
    cat: 'talleres',
    color: 'lavender',
    eyebrow: 'Círculo mensual',
    title: 'Comunidad consciente',
    desc: 'Encuentro mensual en vivo para sostener la práctica entre pares.',
    price: '$40 / mes'
  }, {
    cat: 'recursos',
    color: 'peach',
    eyebrow: 'Curso a tu ritmo',
    title: 'Hábitos que sostienen',
    desc: 'Programa grabado de 6 módulos sobre hábitos conscientes.',
    price: '$120'
  }, {
    cat: 'mentorias',
    color: 'ochre',
    eyebrow: 'Mentoría grupal',
    title: 'Camino compartido',
    desc: 'Grupos reducidos de 6 personas durante 10 semanas.',
    price: '$260'
  }, {
    cat: 'recursos',
    color: 'cream',
    eyebrow: 'Lectura',
    title: 'Cuadernos de práctica',
    desc: 'Guías descargables para acompañar cada etapa del proceso.',
    price: 'Gratis'
  }];
  const filtered = tab === 'todos' ? programs : programs.filter(p => p.cat === tab);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Programs"
  }, /*#__PURE__*/React.createElement("section", {
    style: progStyles.head
  }, /*#__PURE__*/React.createElement(Badge, {
    uppercase: true,
    style: {
      marginBottom: 18
    }
  }, "Programas"), /*#__PURE__*/React.createElement("h1", {
    style: progStyles.h1
  }, "Caminos para cada momento de tu proceso"), /*#__PURE__*/React.createElement("p", {
    style: progStyles.lead
  }, "Elige el acompa\xF1amiento que mejor sostiene d\xF3nde est\xE1s hoy."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      label: 'Todos',
      value: 'todos'
    }, {
      label: 'Mentorías',
      value: 'mentorias'
    }, {
      label: 'Talleres',
      value: 'talleres'
    }, {
      label: 'Recursos',
      value: 'recursos'
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    style: progStyles.grid
  }, filtered.map((p, i) => /*#__PURE__*/React.createElement(FeatureCard, {
    key: i,
    color: p.color,
    eyebrow: p.eyebrow,
    title: p.title,
    media: /*#__PURE__*/React.createElement("div", {
      style: progStyles.cardFoot
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 15,
        color: p.color === 'terracotta' || p.color === 'forest' ? 'var(--color-on-dark)' : 'var(--color-ink)'
      }
    }, p.price), /*#__PURE__*/React.createElement(Button, {
      variant: "onColor",
      size: "sm",
      onClick: () => onNavigate('booking')
    }, "Reservar"))
  }, p.desc))));
}
const progStyles = {
  head: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '64px 32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  h1: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 56,
    lineHeight: 1.05,
    letterSpacing: '-2px',
    color: 'var(--color-ink)',
    maxWidth: '16ch'
  },
  lead: {
    margin: '18px 0 0',
    fontSize: 18,
    color: 'var(--color-body)',
    maxWidth: '44ch'
  },
  grid: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '24px 32px 96px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 20
  },
  cardFoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  }
};
window.ProgramsScreen = ProgramsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProgramsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TopNav.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
const {
  Button,
  Badge
} = window.JorgeIsazaDesignSystem_6b05d8;

/* Cream top navigation — pinned bar, 64px tall. */
function TopNav({
  route,
  onNavigate
}) {
  const links = [{
    label: 'Inicio',
    value: 'home'
  }, {
    label: 'Metodología',
    value: 'home'
  }, {
    label: 'Programas',
    value: 'programs'
  }, {
    label: 'Historias',
    value: 'home'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: navStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: navStyles.inner
  }, /*#__PURE__*/React.createElement("button", {
    style: navStyles.brand,
    onClick: () => onNavigate('home')
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "34",
    height: "34",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: navStyles.word
  }, "Jorge Isaza")), /*#__PURE__*/React.createElement("nav", {
    style: navStyles.links
  }, links.map((l, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onNavigate(l.value),
    style: {
      ...navStyles.link,
      color: route === l.value && l.value !== 'home' ? 'var(--color-ink)' : 'var(--color-muted)'
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: navStyles.right
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    size: "sm"
  }, "Iniciar sesi\xF3n"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => onNavigate('booking')
  }, "Reservar sesi\xF3n"))));
}
const navStyles = {
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    height: 64,
    background: 'rgba(253,248,239,0.86)',
    backdropFilter: 'saturate(140%) blur(8px)',
    borderBottom: '1px solid var(--color-hairline)'
  },
  inner: {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    height: '100%',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  },
  word: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 19,
    letterSpacing: '-0.6px',
    color: 'var(--color-ink)'
  },
  links: {
    display: 'flex',
    gap: 28
  },
  link: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--type-nav-link-size)',
    fontWeight: 500
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 14
  }
};
window.TopNav = TopNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TopNav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
