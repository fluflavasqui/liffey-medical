import {
  clinic, images, booking, bookingGroups, announcement, nav, quickServices, feesAtAGlance,
  aboutPillars, serviceAreas, faqs, bloodCategories, bloodTests, stiTests, visaDestinations,
  priceCategories, prices, policies, schemeFees, cancellationNote, transport,
} from './data.js';
import { icon, logoMark } from './icons.js';

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const euro = (n) => (typeof n === 'number' ? `€${n}` : n);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const bookBtn = (key = '', label = 'Book online', cls = 'btn--primary') =>
  `<button type="button" class="btn ${cls}" data-book="${key}">${icon('calendar')}<span>${label}</span></button>`;
const callBtn = (cls = 'btn--ghost') =>
  `<a class="btn ${cls}" href="${clinic.phoneHref}">${icon('phone')}<span>Call ${clinic.phone}</span></a>`;

const sectionHead = ({ eyebrow, title, lead, center }) => `
  <header class="section-head${center ? ' section-head--center' : ''}" data-reveal>
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h2 class="h2">${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </header>`;

const pageHero = ({ crumb, eyebrow, title, lead, facts = [], actions = '', image, imageAlt = '', narrow }) => `
  <section class="page-hero${image ? ' page-hero--media' : ''}">
    <div class="container${narrow ? ' narrow' : ''} page-hero__grid">
      <div class="page-hero__copy">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a>${icon('chevronRight')}<span aria-current="page">${crumb}</span></nav>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
        <h1 class="h1">${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        ${facts.length ? `<ul class="fact-chips">${facts.map((f) => `<li>${icon(f[0])}<span>${f[1]}</span></li>`).join('')}</ul>` : ''}
        ${actions ? `<div class="btn-row">${actions}</div>` : ''}
      </div>
      ${image ? `<figure class="page-hero__media"><img src="${image}" alt="${imageAlt}" loading="eager" decoding="async"></figure>` : ''}
    </div>
  </section>`;

const accordion = (items, name = 'acc') => `
  <div class="accordion">
    ${items.map((it, i) => `
      <details class="accordion__item" name="${name}" ${it.open ? 'open' : ''}>
        <summary><span>${it.q}</span><span class="accordion__icon" aria-hidden="true"></span></summary>
        <div class="accordion__body">${it.a}</div>
      </details>`).join('')}
  </div>`;

const embed = (key, { tall } = {}) => {
  const b = booking[key];
  return `
  <div class="embed${tall ? ' embed--tall' : ''}">
    <div class="embed__bar">
      <span>${icon('lock')} Online booking · ${b.short}</span>
      <a href="${b.url}" target="_blank" rel="noopener">Open in new tab ${icon('externalLink')}</a>
    </div>
    <div class="embed__frame">
      <div class="embed__loading"><span class="spinner" aria-hidden="true"></span>Loading available times…</div>
      <iframe title="${b.label} — online booking" src="${b.url}" loading="lazy"></iframe>
    </div>
  </div>`;
};

const cancellation = () => `
  <aside class="notice notice--soft" data-reveal>
    ${icon('info')}
    <p><strong>Cancellations.</strong> ${cancellationNote}</p>
  </aside>`;

/* ---------- shared blocks ---------- */
function locationBlock() {
  return `
  <section class="section" id="location">
    <div class="container">
      ${sectionHead({ eyebrow: 'Find us', title: 'In the heart of Dublin city centre', lead: 'Just off Capel Street, minutes from Henry Street and within walking distance of Smithfield.' })}
      <div class="location">
        <div class="location__map" data-reveal>
          <iframe title="Map showing Liffey Medical, 8A Little Britain Street, Dublin 7" src="${clinic.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="location__info" data-reveal>
          <div class="card card--address">
            <div class="card__icon">${icon('mapPin')}</div>
            <div>
              <h3 class="h4">Liffey Medical</h3>
              <address>${clinic.addressLines.join('<br>')}</address>
              <div class="btn-row btn-row--tight">
                <a class="btn btn--sm btn--primary" href="${clinic.mapsUrl}" target="_blank" rel="noopener">${icon('mapPin')}<span>Get directions</span></a>
                <button type="button" class="btn btn--sm btn--ghost" data-copy="${clinic.addressText}">${icon('copy')}<span>Copy address</span></button>
              </div>
            </div>
          </div>
          <ul class="transport">
            ${transport.map((t) => `
              <li>
                <span class="transport__icon">${icon(t.icon)}</span>
                <div>
                  <h3 class="h5">${t.title}</h3>
                  <p>${t.text}</p>
                  ${t.chips ? `<ul class="bus-chips" aria-label="Bus routes">${t.chips.map((c) => `<li>${c}</li>`).join('')}</ul>` : ''}
                </div>
              </li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

function contactCards() {
  return `
  <div class="contact-grid">
    <a class="contact-card" href="${clinic.phoneHref}" data-reveal>
      <span class="contact-card__icon">${icon('phone')}</span>
      <span class="contact-card__label">Phone reception</span>
      <strong>${clinic.phone}</strong>
      <span class="contact-card__hint">Appointments and general enquiries</span>
    </a>
    <a class="contact-card" href="mailto:${clinic.email}" data-reveal>
      <span class="contact-card__icon">${icon('mail')}</span>
      <span class="contact-card__label">Email (admin only)</span>
      <strong>${clinic.email}</strong>
      <span class="contact-card__hint">Please do not email medical queries — these must be discussed at your consultation.</span>
    </a>
    <a class="contact-card contact-card--alert" href="${clinic.outOfHours.href}" data-reveal>
      <span class="contact-card__icon">${icon('alert')}</span>
      <span class="contact-card__label">Out of hours</span>
      <strong>${clinic.outOfHours.name} · ${clinic.outOfHours.phone}</strong>
      <span class="contact-card__hint">For emergencies outside our clinic hours. In a life-threatening emergency call 999 or 112.</span>
    </a>
  </div>`;
}

function ctaBand(title = 'Need to see a doctor?', text = 'Book online in a few clicks, or call our reception team — new patients are always welcome.', key = '') {
  return `
  <section class="section section--tight">
    <div class="container">
      <div class="cta-band" data-reveal>
        <div>
          <h2 class="h2">${title}</h2>
          <p>${text}</p>
        </div>
        <div class="btn-row">
          ${bookBtn(key, 'Book online', 'btn--light btn--lg')}
          ${callBtn('btn--outline-light btn--lg')}
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- pages ---------- */
function renderHome() {
  return `
  <section class="hero">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="eyebrow eyebrow--pill"><span class="pulse" aria-hidden="true"></span>GP Practice · Dublin City Centre</p>
        <h1 class="display">Your city-centre GP, <em>just off Capel Street.</em></h1>
        <p class="lead lead--lg">Expert GP care in a comfortable and caring environment. New patients welcome — you don’t need to be registered to book your first appointment.</p>
        <div class="btn-row">
          ${bookBtn('', 'Book an appointment', 'btn--primary btn--lg')}
          ${callBtn('btn--ghost btn--lg')}
        </div>
        <ul class="hero__checks">
          <li>${icon('check')}<span>New patients welcome</span></li>
          <li>${icon('check')}<span>No deposit for GP visits</span></li>
          <li>${icon('check')}<span>In clinic or by phone</span></li>
        </ul>
      </div>
      <div class="hero__media">
        <figure class="hero__img">
          <img src="${images.bridge}" alt="The Ha’penny Bridge over the River Liffey, Dublin, lit up at night" fetchpriority="high" decoding="async">
        </figure>
        <div class="float-card float-card--price">
          <span class="float-card__label">GP consultation</span>
          <strong>€75</strong>
          <span class="float-card__meta">In clinic or by phone</span>
        </div>
        <div class="float-card float-card--doc">
          <img src="${images.drTim}" alt="" width="48" height="48" loading="lazy">
          <div>
            <span class="float-card__label">Clinical Lead</span>
            <strong>Dr Tim Hinchey</strong>
            <span class="float-card__meta">MICGP</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--quick">
    <div class="container">
      ${sectionHead({ eyebrow: 'Book online', title: 'How can we help today?', lead: 'Choose what you need — every service shows its price up front.' })}
      <div class="quick-grid">
        ${quickServices.map((s) => `
          <a class="quick-card" href="${s.href}" data-reveal>
            <span class="quick-card__icon">${icon(s.icon)}</span>
            <span class="quick-card__price">${s.price}</span>
            <h3 class="h4">${s.title}</h3>
            <p>${s.text}</p>
            <span class="quick-card__go">${icon('arrowRight')}</span>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container split">
      <div class="split__copy" data-reveal>
        <p class="eyebrow">Transparent pricing</p>
        <h2 class="h2">Clear fees, no surprises</h2>
        <p class="lead">All fees are paid at the time of consultation. Some services might be reimbursable from your health insurance — we’ll issue a receipt on request so you can claim.</p>
        <ul class="ticks">
          <li>${icon('check')}<span>No additional consultation charge for blood tests</span></li>
          <li>${icon('check')}<span>Results by phone with our doctor, plus an emailed copy</span></li>
          <li>${icon('check')}<span>Social welfare / IB1 / illness benefit forms issued</span></li>
        </ul>
        <a class="link-arrow" href="#/prices">See the full price list ${icon('arrowRight')}</a>
      </div>
      <div class="fee-card" data-reveal>
        <div class="fee-card__head"><span>City centre · New patients</span>${icon('tag')}</div>
        <ul class="fee-list">
          ${feesAtAGlance.map(([n, p, note]) => `
            <li><span class="fee-list__name">${n}${note ? `<small>${note}</small>` : ''}</span><span class="fee-list__dots" aria-hidden="true"></span><strong>${p}</strong></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--navy">
    <div class="container about">
      <figure class="about__photo" data-reveal>
        <img src="${images.drTim}" alt="Dr Tim Hinchey, Clinical Lead at Liffey Medical" loading="lazy">
        <figcaption><strong>Dr Tim Hinchey</strong><span>BM, BCh, BA, BAO, DOWH, MICGP · Clinical Lead</span></figcaption>
      </figure>
      <div class="about__copy">
        <p class="eyebrow eyebrow--light" data-reveal>About Liffey Medical</p>
        <h2 class="h2" data-reveal>GP practice in Dublin city centre</h2>
        <p class="lead" data-reveal>Our Clinical Lead is Dr Tim Hinchey, MICGP — Member of the Irish College of General Practitioners.</p>
        <ul class="pillars">
          ${aboutPillars.map((p) => `
            <li data-reveal>
              <span class="pillars__icon">${icon(p.icon)}</span>
              <div><h3 class="h5">${p.title}</h3><p>${p.text}</p></div>
            </li>`).join('')}
        </ul>
        <a class="link-arrow link-arrow--light" href="#/about" data-reveal>Meet the team ${icon('arrowRight')}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: 'Our services', title: 'The full range of general practice', lead: 'From doctor appointments and diagnostic testing to treatment and referrals.' })}
      <div class="tabs" data-tabs data-reveal>
        <div class="tabs__list" role="tablist" aria-label="Our services">
          ${serviceAreas.map((s, i) => `
            <button type="button" role="tab" id="tab-${s.id}" aria-controls="panel-${s.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${s.id}">
              ${icon(s.icon)}<span>${s.title}</span>
            </button>`).join('')}
        </div>
        ${serviceAreas.map((s, i) => `
          <div class="tabs__panel" role="tabpanel" id="panel-${s.id}" aria-labelledby="tab-${s.id}" ${i === 0 ? '' : 'hidden'} tabindex="0">
            <span class="tabs__panel-icon">${icon(s.icon)}</span>
            <h3 class="h3">${s.title}</h3>
            <p>${s.text}</p>
            <ul class="tag-list">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
            <div class="btn-row">
              ${bookBtn(s.book, 'Book now')}
              ${s.href ? `<a class="btn btn--ghost" href="${s.href}"><span>Learn more</span>${icon('arrowRight')}</a>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      ${sectionHead({ eyebrow: 'How it works', title: 'Booking is simple', center: true })}
      <ol class="steps">
        <li data-reveal><span class="steps__num">1</span><h3 class="h4">Choose your service</h3><p>GP visit, phone consultation, blood test, STI screen, PrEP or visa medical.</p></li>
        <li data-reveal><span class="steps__num">2</span><h3 class="h4">Pick a time online</h3><p>Use our online booking system. You don’t need to be registered for your first appointment.</p></li>
        <li data-reveal><span class="steps__num">3</span><h3 class="h4">Visit us</h3><p>8A Little Britain Street, off Capel Street — a short walk from the Luas Red line at Jervis.</p></li>
      </ol>
      <div class="btn-row btn-row--center" data-reveal>${bookBtn('', 'Start booking', 'btn--primary btn--lg')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container faq">
      <div class="faq__intro" data-reveal>
        <p class="eyebrow">Good to know</p>
        <h2 class="h2">Frequently asked questions</h2>
        <p class="lead">Can’t find your answer? Call reception on <a href="${clinic.phoneHref}">${clinic.phone}</a>.</p>
        <a class="link-arrow" href="#/policies">Read our practice policies ${icon('arrowRight')}</a>
      </div>
      <div data-reveal>${accordion(faqs, 'faq')}</div>
    </div>
  </section>

  ${locationBlock()}
  ${ctaBand()}`;
}

function renderGP(sub) {
  const tabs = [
    { id: 'clinic', key: 'gp', title: 'In clinic', price: '€75', icon: 'stethoscope',
      heading: 'Book GP Consultation',
      body: `<p>Book your private doctor consultation using our booking system. You don’t need to be registered in order to make your first appointment.</p>
        <ul class="ticks"><li>${icon('check')}<span>New patients welcome</span></li><li>${icon('check')}<span>No deposit required</span></li><li>${icon('check')}<span>8A Little Britain Street, off Capel Street</span></li></ul>
        <p class="muted">GP consultations are also available by phone, with some evening availability. <a href="#/gp-appointments/phone">Book a phone consultation</a>.</p>` },
    { id: 'phone', key: 'phone', title: 'By phone', price: '€75', icon: 'phoneCall',
      heading: 'Book GP Telephone Consultation',
      body: `<p>Book your doctor phone consultation using our booking system. You don’t need to be registered in order to make your first appointment.</p>
        <ul class="ticks"><li>${icon('check')}<span>New patients welcome</span></li><li>${icon('check')}<span>Some evening availability</span></li><li>${icon('check')}<span>Speak to a GP from wherever you are</span></li></ul>` },
    { id: 'schemes', key: 'schemes', title: 'Medical card & EHIC', price: 'Scheme', icon: 'card',
      heading: 'Medical Cards and EHIC Cards',
      body: `<p>If your medical card is registered to our practice, please book a <strong>‘Medical Card Consultation’</strong>.</p>
        <p>Patients who have eligible European Health Insurance Cards (EHIC) may book an <strong>‘EHIC Consultation’</strong>.</p>
        <aside class="notice">${icon('info')}<p>Please read our <a href="#/policies">practice policies</a> before booking your appointment, including services not covered by the medical card.</p></aside>` },
  ];
  const active = tabs.find((t) => t.id === sub) ? sub : 'clinic';
  return `
  ${pageHero({
    crumb: 'GP appointments', eyebrow: 'New patients welcome', title: 'Book a GP appointment',
    lead: 'See a doctor in our city-centre clinic or speak to a GP by phone. Choose the option that suits you and pick a time below.',
    facts: [['euro', '€75 consultation'], ['check', 'No deposit required'], ['clock', 'Some evening phone availability']],
  })}
  <section class="section section--flush-top">
    <div class="container">
      <div class="seg" data-tabs data-sync-route="gp-appointments">
        <div class="seg__list" role="tablist" aria-label="Appointment type">
          ${tabs.map((t) => `
            <button type="button" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${t.id === active}" tabindex="${t.id === active ? 0 : -1}" data-tab="${t.id}">
              ${icon(t.icon)}<span class="seg__title">${t.title}</span><span class="seg__price">${t.price}</span>
            </button>`).join('')}
        </div>
        ${tabs.map((t) => `
          <div class="seg__panel" role="tabpanel" id="panel-${t.id}" aria-labelledby="tab-${t.id}" ${t.id === active ? '' : 'hidden'}>
            <div class="book-layout">
              <div class="book-layout__info">
                <h2 class="h3">${t.heading}</h2>
                ${t.body}
                <div class="mini-contact">
                  <span>Prefer to book by phone?</span>
                  <a href="${clinic.phoneHref}">${icon('phone')} ${clinic.phone}</a>
                </div>
              </div>
              ${embed(t.key, { tall: true })}
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>
  <section class="section section--tight">
    <div class="container">${cancellation()}</div>
  </section>`;
}

function renderBloods() {
  return `
  ${pageHero({
    crumb: 'Blood tests', eyebrow: 'Doctor-led blood test clinic', title: 'Blood Test Clinic',
    lead: 'At Liffey Medical, we offer a wide range of blood screening tests — with some of the best rates and the fastest turnaround times.',
    facts: [['check', 'No referral needed'], ['user', 'No need to be registered'], ['euro', 'No extra consultation charge']],
    actions: `${bookBtn('bloods', 'Book a blood test', 'btn--primary btn--lg')}`,
    image: images.bloods, imageAlt: 'Blood test at Liffey Medical in Dublin city centre',
  })}
  <section class="section section--tight">
    <div class="container">
      <ul class="info-strip" data-reveal>
        <li>${icon('phoneCall')}<div><strong>Results by phone</strong><span>A follow-up call with our doctor</span></div></li>
        <li>${icon('mail')}<div><strong>Emailed lab report</strong><span>A copy of your results for your records</span></div></li>
        <li>${icon('euro')}<div><strong>No hidden fees</strong><span>No additional consultation charge</span></div></li>
        <li>${icon('user')}<div><strong>Ages 15+</strong><span>Service offered to those 15 years+</span></div></li>
      </ul>
    </div>
  </section>
  <section class="section section--flush-top">
    <div class="container">
      <div class="toolbar" data-reveal>
        <div class="chips" role="group" aria-label="Filter tests by category" data-filter-group="bloods">
          ${bloodCategories.map((c, i) => `<button type="button" class="chip" aria-pressed="${i === 0}" data-filter="${c.id}">${c.label}</button>`).join('')}
        </div>
        <p class="toolbar__count" aria-live="polite"><span data-count="bloods">${bloodTests.length}</span> tests</p>
      </div>
      <div class="test-grid" data-filter-target="bloods">
        ${bloodTests.map((t) => {
          const total = new Set((t.groups || []).flatMap((g) => g[1])).size;
          return `
          <article class="test-card${t.popular ? ' test-card--featured' : ''}" data-cat="${t.cat}">
            <header class="test-card__head">
              <div>
                ${t.popular ? '<span class="badge">Most comprehensive</span>' : ''}
                <h3 class="h4">${t.name}</h3>
                <span class="test-card__cat">${bloodCategories.find((c) => c.id === t.cat).label}</span>
              </div>
              <strong class="test-card__price">${euro(t.price)}</strong>
            </header>
            ${t.text ? `<p>${t.text}</p>` : ''}
            ${t.groups ? `
              <details class="included" ${t.popular ? 'open' : ''}>
                <summary>${icon('testTube')} What’s included <span class="included__n">${total} markers</span>${icon('chevronDown', 'included__chev')}</summary>
                <div class="included__body">
                  ${t.groups.map(([label, items]) => `
                    <div class="included__group">
                      ${t.groups.length > 1 ? `<h4>${label}</h4>` : ''}
                      <ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>
                    </div>`).join('')}
                </div>
              </details>` : ''}
            ${t.extra ? `<p class="test-card__extra">${icon('info')} ${t.extra}</p>` : ''}
            <footer class="test-card__foot">${bookBtn(t.book, 'Book this test', 'btn--soft btn--sm')}</footer>
          </article>`;
        }).join('')}
      </div>
    </div>
  </section>
  <section class="section section--tight"><div class="container">${cancellation()}</div></section>
  ${ctaBand('Not sure which test you need?', 'Book a GP consultation and our doctor will advise you — or call reception for help choosing.', 'gp')}`;
}

function renderSTI() {
  return `
  ${pageHero({
    crumb: 'Sexual health', eyebrow: 'Confidential & reassuring', title: 'Sexual Health Clinic',
    lead: 'Professional, confidential and reassuring care in an environment where you will feel comfortable.',
    facts: [['zap', 'Rapid HIV results in 20 min'], ['shield', 'Fully confidential'], ['check', 'No referral needed']],
    actions: `${bookBtn('sti', 'Book an STI screen', 'btn--primary btn--lg')}`,
    image: images.sti, imageAlt: 'Sexual health clinic at Liffey Medical',
  })}
  <section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: 'Our tests', title: 'Choose your screen', lead: 'We use the most up-to-date and advanced molecular diagnostics. All samples are processed by the National Virus Reference Laboratory (NVRL).' })}
      <div class="plan-grid">
        ${stiTests.map((t) => `
          <article class="plan${t.featured ? ' plan--featured' : ''}" data-reveal>
            ${t.featured ? '<span class="badge badge--light">Most complete</span>' : ''}
            <h3 class="h4">${t.name}</h3>
            <p class="plan__price">${euro(t.price)}</p>
            <p class="plan__sample">${icon(t.featured ? 'testTube' : t.name.includes('Rapid') ? 'zap' : 'testTube')} ${t.sample}</p>
            <ul class="plan__list">${t.covers.map((c) => `<li>${icon('check')}<span>${c}</span></li>`).join('')}</ul>
            ${t.text ? `<p class="plan__text">${t.text}</p>` : ''}
            ${bookBtn('sti', 'Book now', t.featured ? 'btn--light' : 'btn--soft')}
          </article>`).join('')}
      </div>
      <p class="fine" data-reveal>Rectal and throat swab tests are available on request at an additional cost. Genital Herpes and Genital Warts are assessed for at clinical examination.</p>
    </div>
  </section>
  <section class="section section--sand">
    <div class="container two-col">
      <div class="panel" data-reveal>
        <span class="panel__icon">${icon('clipboard')}</span>
        <h2 class="h3">Before your visit</h2>
        <ol class="checklist">
          <li><strong>Urine sample</strong> (for Chlamydia and Gonorrhoea) and/or <strong>blood sample</strong> (for HIV, Hepatitis B, Hepatitis C and Syphilis).</li>
          <li>Please <strong>don’t pass urine for two hours</strong> before your screen — or bring a sample of your first-void (morning) urine to your consultation.</li>
          <li>You <strong>do not need a referral</strong> to use our STI service.</li>
        </ol>
      </div>
      <div class="panel" data-reveal>
        <span class="panel__icon">${icon('info')}</span>
        <h2 class="h3">Good to know</h2>
        <ul class="ticks">
          <li>${icon('check')}<span>Our Rapid HIV Test is processed in our clinic while you wait (20 minutes).</span></li>
          <li>${icon('check')}<span>If you are currently symptomatic and require a doctor consultation at the same time as your screen, an additional charge will apply.</span></li>
          <li>${icon('check')}<span>Looking for HIV prevention? <a href="#/prep">Learn about our PrEP service</a>.</span></li>
        </ul>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: 'Book online', title: 'Pick a time that suits you' })}
      <div data-reveal>${embed('sti', { tall: true })}</div>
      <div class="spacer"></div>
      ${cancellation()}
    </div>
  </section>`;
}

function renderPrep() {
  return `
  ${pageHero({
    crumb: 'PrEP', eyebrow: 'HIV prevention', title: 'PrEP Service at Liffey Medical',
    lead: 'Pre-exposure prophylaxis (PrEP) is now offered as a GP service at Liffey Medical.',
    facts: [['shield', 'About 99% effective'], ['pill', 'Free medication for eligible patients'], ['euro', '€130 per consultation']],
    actions: `${bookBtn('prep', 'Book your PrEP consultation', 'btn--primary btn--lg')}`,
  })}
  <section class="section">
    <div class="container split split--top">
      <div class="split__copy" data-reveal>
        <p class="eyebrow">What is PrEP?</p>
        <h2 class="h2">A safe and effective daily pill</h2>
        <p class="lead">PrEP is a safe and effective daily medication (pill) for people who do not have HIV and are at high risk of infection. When taken correctly, PrEP has been found to be about <strong>99% effective</strong>.</p>
        <aside class="notice notice--teal">${icon('pill')}<p><strong>No charge for PrEP medication for eligible patients.</strong> PrEP medication is provided through the HSE and our doctor will register you for this service at your consultation.</p></aside>
      </div>
      <div class="fee-stack" data-reveal>
        <h2 class="h4 fee-stack__title">PrEP fees</h2>
        <div class="fee-row">
          <div><h3 class="h5">Initial consultation</h3><p>Includes STI screen, kidney function test and prescription fee.</p></div>
          <strong>€130</strong>
        </div>
        <div class="fee-row">
          <div><h3 class="h5">Three-month review</h3><p>Includes STI screen, kidney function test and prescription fee.</p></div>
          <strong>€130</strong>
        </div>
      </div>
    </div>
  </section>
  <section class="section section--sand">
    <div class="container">
      ${sectionHead({ eyebrow: 'Your PrEP journey', title: 'How it works', center: true })}
      <ol class="steps">
        <li data-reveal><span class="steps__num">1</span><h3 class="h4">Initial consultation</h3><p>Meet our doctor for your STI screen, kidney function test and prescription.</p></li>
        <li data-reveal><span class="steps__num">2</span><h3 class="h4">HSE registration</h3><p>Our doctor registers eligible patients for free PrEP medication through the HSE.</p></li>
        <li data-reveal><span class="steps__num">3</span><h3 class="h4">Three-month reviews</h3><p>Regular reviews, each including an STI screen, kidney function test and prescription.</p></li>
      </ol>
    </div>
  </section>
  <section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: 'Book online', title: 'Book your PrEP consultation' })}
      <div data-reveal>${embed('prep', { tall: true })}</div>
      <div class="spacer"></div>
      ${cancellation()}
    </div>
  </section>`;
}

function renderVisa() {
  return `
  ${pageHero({
    crumb: 'Visa medicals', eyebrow: 'Experts in visa medicals', title: 'Visa Medicals',
    lead: 'An efficient service, competitive pricing and fast turnaround times. All blood testing and physical exams are done on-site at Liffey Medical.',
    facts: [['euro', 'From €320 · most €420'], ['clock', 'Usually 7 calendar days'], ['calendar', '30-minute appointment']],
    actions: `${bookBtn('visa', 'Book a visa medical', 'btn--primary btn--lg')}<a class="btn btn--ghost btn--lg" href="#quote">${icon('mail')}<span>Get a quote</span></a>`,
    image: images.visa, imageAlt: 'Visa medicals at Liffey Medical',
  })}
  <section class="section">
    <div class="container two-col two-col--wide">
      <div data-reveal>
        <p class="eyebrow">Destinations we cover include</p>
        <h2 class="h3">Tailored to your destination</h2>
        <ul class="dest-chips">${visaDestinations.map((d) => `<li>${icon('globe')}${d}</li>`).join('')}</ul>
        <p class="muted">Going somewhere else? <a href="#quote">Ask us for a quote</a>.</p>
      </div>
      <div class="panel" data-reveal>
        <span class="panel__icon">${icon('clipboard')}</span>
        <h2 class="h3">Usually includes</h2>
        <ul class="ticks">
          <li>${icon('check')}<span>Physical exam with our doctor</span></li>
          <li>${icon('check')}<span>Blood tests</span></li>
          <li>${icon('check')}<span>ECG</span></li>
          <li>${icon('check')}<span>Chest x-ray (conducted by our radiology partner)</span></li>
        </ul>
        <p class="muted">We collate all test results and examinations for you and prepare your medical to the exacting standards of the consulates.</p>
      </div>
    </div>
  </section>
  <section class="section section--sand">
    <div class="container">
      ${sectionHead({ eyebrow: 'Step by step', title: 'How your visa medical works', center: true })}
      <ol class="steps steps--four">
        <li data-reveal><span class="steps__num">1</span><h3 class="h4">Book & pay deposit</h3><p>Book your 30-minute appointment online. A €130 deposit secures your booking.</p></li>
        <li data-reveal><span class="steps__num">2</span><h3 class="h4">On-site tests</h3><p>Physical exam, bloods and ECG are all done at Liffey Medical.</p></li>
        <li data-reveal><span class="steps__num">3</span><h3 class="h4">Chest x-ray</h3><p>If required, we refer you to Alliance Medical in Smithfield (charged separately).</p></li>
        <li data-reveal><span class="steps__num">4</span><h3 class="h4">Your medical</h3><p>Turnaround for all tests is usually seven calendar days.</p></li>
      </ol>
    </div>
  </section>
  <section class="section">
    <div class="container two-col">
      <div class="panel panel--warn" data-reveal>
        <span class="panel__icon">${icon('alert')}</span>
        <h2 class="h3">Please bring</h2>
        <ul class="ticks">
          <li>${icon('check')}<span>Your <strong>passport</strong> — essential for ID verification.</span></li>
          <li>${icon('check')}<span>A <strong>passport-sized photo</strong> — some destinations require one stamped by our doctor.</span></li>
        </ul>
        <p class="muted">The cost of your visa medical depends on your destination and the tests required. Packages start from €320; the standard price for most visa medicals is €420. Chest x-rays are charged separately by Alliance Medical.</p>
      </div>
      <form class="panel quote" id="quote" data-quote novalidate data-reveal>
        <span class="panel__icon">${icon('mail')}</span>
        <h2 class="h3">Get a price quotation</h2>
        <p class="muted">Tell us your destination and we’ll let you know the cost. This opens an email to ${clinic.email} — attach the official form if possible.</p>
        <label class="field">
          <span>Destination</span>
          <select name="destination" required>
            <option value="">Select a country…</option>
            ${visaDestinations.map((d) => `<option>${d}</option>`).join('')}
            <option value="other">Other destination</option>
          </select>
        </label>
        <label class="field" data-other hidden>
          <span>Which country?</span>
          <input name="other" type="text" autocomplete="off" placeholder="e.g. Oman">
        </label>
        <label class="field">
          <span>Your name</span>
          <input name="name" type="text" autocomplete="name" required>
        </label>
        <p class="field-error" data-error hidden>Please choose a destination and enter your name.</p>
        <button type="submit" class="btn btn--primary">${icon('mail')}<span>Compose email</span></button>
      </form>
    </div>
  </section>
  <section class="section section--flush-top">
    <div class="container">
      ${sectionHead({ eyebrow: 'Book online', title: 'Book your 30-minute visa medical', lead: 'To secure this booking we require a deposit of €130.' })}
      <div data-reveal>${embed('visa', { tall: true })}</div>
      <div class="spacer"></div>
      <aside class="notice notice--soft" data-reveal>${icon('info')}<p><strong>Deposit & cancellations.</strong> All cancellations incur a €15 admin fee. If a patient cancels within less than 24 hours (for Monday appointments this means 5pm on the previous Friday) or does not attend, the deposit is not refunded.</p></aside>
    </div>
  </section>`;
}

function renderPrices() {
  return `
  ${pageHero({
    crumb: 'Price list', eyebrow: 'Transparent pricing', title: 'Price List',
    lead: 'Clear, upfront fees for every service. Consultations with other investigations, e.g. ECG or specialist bloods, will cost more — please ask our reception at time of booking.',
    narrow: true,
  })}
  <section class="section section--flush-top">
    <div class="container narrow">
      <div class="price-tools" data-reveal>
        <label class="search">
          ${icon('search')}
          <span class="sr-only">Search services</span>
          <input type="search" placeholder="Search a service — e.g. STI, ear, visa" data-price-search autocomplete="off">
        </label>
        <div class="chips" role="group" aria-label="Filter by category" data-filter-group="prices">
          ${priceCategories.map((c, i) => `<button type="button" class="chip" aria-pressed="${i === 0}" data-filter="${c.id}">${c.label}</button>`).join('')}
        </div>
      </div>
      <div class="price-table" data-filter-target="prices" data-reveal>
        ${priceCategories.filter((c) => c.id !== 'all').map((c) => `
          <section class="price-group" data-group="${c.id}">
            <h2 class="price-group__title">${c.label}</h2>
            <ul>
              ${prices.filter((p) => p.cat === c.id).map((p) => `
                <li class="price-row" data-cat="${p.cat}" data-text="${esc((p.name + ' ' + (p.note || '')).toLowerCase())}">
                  <div><span class="price-row__name">${p.name}</span>${p.note ? `<span class="price-row__note">${p.note}</span>` : ''}</div>
                  <strong class="price-row__price${/free/i.test(p.price) ? ' is-free' : ''}">${p.price}</strong>
                </li>`).join('')}
            </ul>
          </section>`).join('')}
        <div class="empty" data-empty hidden>
          ${icon('search')}
          <p><strong>No services match your search.</strong> Call reception on <a href="${clinic.phoneHref}">${clinic.phone}</a> and we’ll help.</p>
        </div>
      </div>
      <div class="notes" data-reveal>
        <aside class="notice notice--soft">${icon('info')}<p><strong>Prepaid appointments.</strong> ${cancellationNote}</p></aside>
        <aside class="notice notice--soft">${icon('fileText')}<p><strong>Payment & insurance.</strong> All fees must be paid at time of consultation. Some services might be reimbursable from your health insurance — the amount will depend on your individual policy. We will issue a receipt on request so you can claim expenses. An admin charge may apply for receipts more than three months old.</p></aside>
      </div>
      <p class="fine">Looking for blood test details? <a href="#/blood-tests">See every blood test and what’s included</a>. Medical card holders: see <a href="#/policies/card-fees">services not covered by the medical card</a>.</p>
    </div>
  </section>
  ${ctaBand()}`;
}

function renderAbout() {
  return `
  ${pageHero({
    crumb: 'About & contact', eyebrow: 'About us', title: 'A friendly GP practice in the city centre',
    lead: 'Liffey Medical is located on Little Britain Street in Dublin city centre — just off Capel Street, minutes from Henry Street and within walking distance of Smithfield.',
    actions: `${bookBtn('gp', 'Book an appointment', 'btn--primary btn--lg')}${callBtn('btn--ghost btn--lg')}`,
  })}
  <section class="section">
    <div class="container">
      ${sectionHead({ eyebrow: 'Our team', title: 'Meet the people who’ll look after you' })}
      <div class="team">
        <article class="person person--lead" data-reveal>
          <img src="${images.drTim}" alt="Dr Tim Hinchey" loading="lazy">
          <div class="person__body">
            <p class="eyebrow">Clinical Lead</p>
            <h3 class="h3">Dr Tim Hinchey</h3>
            <p class="person__creds">BM, BCh, BA, BAO, DOWH, MICGP</p>
            <p>Originally from the west of Ireland, Dr Tim graduated in Medicine from Trinity College, Dublin. He is a member of the Irish College of General Practitioners (ICGP).</p>
            <p>He is interested in all areas of General Practice, with special interests in:</p>
            <ul class="tag-list">
              <li>Preventative medicine</li><li>Mental health</li><li>STIs and PrEP</li><li>Sports medicine</li>
            </ul>
          </div>
        </article>
        <article class="person" data-reveal>
          <img src="${images.isabella}" alt="Isabella, Clinic Receptionist" loading="lazy">
          <div class="person__body">
            <p class="eyebrow">Clinic Receptionist</p>
            <h3 class="h3">Isabella</h3>
            <p>Isabella runs our front of house and is always available to assist patients with their queries.</p>
            <a class="link-arrow" href="${clinic.phoneHref}">Call reception ${icon('arrowRight')}</a>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section class="section section--sand" id="contact">
    <div class="container">
      ${sectionHead({ eyebrow: 'Contact', title: 'Get in touch' })}
      ${contactCards()}
    </div>
  </section>
  ${locationBlock()}`;
}

function renderPolicies() {
  return `
  ${pageHero({
    crumb: 'Practice policies', eyebrow: 'Before you book', title: 'Practice Policies',
    lead: 'How our practice works — appointments, prescriptions, results and fees.',
    narrow: true,
  })}
  <section class="section section--flush-top">
    <div class="container narrow">
      <div data-reveal>${accordion(policies.map((p, i) => ({ q: p.title, a: `<p>${p.text}</p>`, open: i === 0 })), 'policy')}</div>
    </div>
  </section>
  <section class="section section--sand" id="card-fees">
    <div class="container narrow">
      ${sectionHead({ eyebrow: 'Medical card / U6 visit card / Over 70 card', title: 'Services not covered', lead: 'Some services we provide are not covered by these cards and, as such, will incur a fee.' })}
      <div class="price-table price-table--plain" data-reveal>
        <ul>
          ${schemeFees.map(([n, p]) => `<li class="price-row"><div><span class="price-row__name">${n}</span></div><strong class="price-row__price">${p}</strong></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>`;
}

function renderNotFound() {
  return `
  <section class="section not-found">
    <div class="container narrow">
      <p class="eyebrow">Page not found</p>
      <h1 class="h1">We couldn’t find that page</h1>
      <p class="lead">It may have moved. Try one of these instead:</p>
      <div class="btn-row">${bookBtn('', 'Book an appointment')}<a class="btn btn--ghost" href="#/">Back to home</a><a class="btn btn--ghost" href="#/prices">Price list</a></div>
    </div>
  </section>`;
}

const routes = {
  '': { title: 'GP Practice in Dublin City Centre', render: renderHome },
  'gp-appointments': { title: 'Book a GP Appointment', render: renderGP, tabs: true },
  'blood-tests': { title: 'Blood Test Clinic', render: renderBloods },
  'sexual-health': { title: 'Sexual Health & STI Clinic', render: renderSTI },
  prep: { title: 'PrEP Service', render: renderPrep },
  'visa-medicals': { title: 'Visa Medicals', render: renderVisa },
  prices: { title: 'Price List', render: renderPrices },
  about: { title: 'About Us & Contact', render: renderAbout },
  policies: { title: 'Practice Policies', render: renderPolicies },
};

/* ---------- chrome: announcement, header, footer, action bar ---------- */
function renderAnnouncement() {
  const el = $('#announcement');
  if (store.get('dismissed:' + announcement.id)) { el.remove(); return; }
  el.className = 'announcement';
  el.innerHTML = `
    <div class="container announcement__inner">
      <p>${icon('syringe')}<span>${announcement.text}</span>
        <button type="button" class="announcement__cta" data-book="${announcement.book}">${announcement.cta} ${icon('arrowRight')}</button></p>
      <button type="button" class="announcement__close" data-dismiss-announcement aria-label="Dismiss announcement">${icon('x')}</button>
    </div>`;
}

function renderHeader() {
  $('#site-header').innerHTML = `
    <div class="container header__inner">
      <a class="logo" href="#/" aria-label="Liffey Medical — home">
        ${logoMark}
        <span class="logo__text"><strong>Liffey Medical</strong><span>GP Practice · Dublin City Centre</span></span>
      </a>
      <nav class="nav" aria-label="Main">
        <ul class="nav__list">
          ${nav.map((n) => n.children ? `
            <li class="nav__item nav__item--dropdown" data-dropdown>
              <button type="button" class="nav__link" aria-expanded="false" aria-controls="services-menu" data-dropdown-toggle data-nav="${n.path.join(' ')}">
                ${n.label}${icon('chevronDown', 'nav__chev')}
              </button>
              <div class="dropdown" id="services-menu">
                ${n.children.map((c) => `
                  <a class="dropdown__item" href="${c.href}">
                    <span class="dropdown__icon">${icon(c.icon)}</span>
                    <span class="dropdown__text"><strong>${c.label}</strong><span>${c.desc}</span></span>
                    <span class="dropdown__price">${c.price}</span>
                  </a>`).join('')}
              </div>
            </li>` : `
            <li class="nav__item"><a class="nav__link" href="${n.href}" data-nav="${n.path}">${n.label}</a></li>`).join('')}
        </ul>
      </nav>
      <div class="header__actions">
        <a class="header__phone" href="${clinic.phoneHref}">${icon('phone')}<span>${clinic.phone}</span></a>
        ${bookBtn('', 'Book online', 'btn--primary btn--sm header__book')}
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
          <span class="sr-only">Menu</span>${icon('menu', 'menu-toggle__open')}${icon('x', 'menu-toggle__close')}
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <nav class="container" aria-label="Mobile">
        <ul>
          <li><a href="#/">Home</a></li>
          ${nav.flatMap((n) => n.children ? n.children : [n]).map((n) => `<li><a href="${n.href}">${n.label}${icon('chevronRight')}</a></li>`).join('')}
          <li><a href="#/policies">Practice Policies${icon('chevronRight')}</a></li>
        </ul>
        <div class="mobile-menu__cta">
          ${bookBtn('', 'Book online', 'btn--primary btn--lg btn--block')}
          ${callBtn('btn--ghost btn--lg btn--block')}
        </div>
      </nav>
    </div>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  $('#site-footer').innerHTML = `
    <div class="container footer__grid">
      <div class="footer__brand">
        <a class="logo logo--light" href="#/">${logoMark}<span class="logo__text"><strong>Liffey Medical</strong><span>GP Practice · Dublin City Centre</span></span></a>
        <p>Expert GP healthcare across the full range of general practice, in a comfortable and caring environment.</p>
        ${bookBtn('', 'Book online', 'btn--light btn--sm')}
      </div>
      <div>
        <h2 class="footer__title">Services</h2>
        <ul>
          <li><a href="#/gp-appointments">GP consultation</a></li>
          <li><a href="#/gp-appointments/phone">Phone consultation</a></li>
          <li><a href="#/gp-appointments/schemes">Medical card & EHIC</a></li>
          <li><a href="#/blood-tests">Blood Test Clinic</a></li>
          <li><a href="#/sexual-health">Sexual Health & STI</a></li>
          <li><a href="#/prep">PrEP Service</a></li>
          <li><a href="#/visa-medicals">Visa Medicals</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__title">Practice</h2>
        <ul>
          <li><a href="#/about">About us</a></li>
          <li><a href="#/prices">Price list</a></li>
          <li><a href="#/policies">Practice policies</a></li>
          <li><a href="#/about/location">Getting here</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__title">Contact</h2>
        <address class="footer__contact">
          <span>${clinic.addressLines.join('<br>')}</span>
          <a href="${clinic.phoneHref}">${icon('phone')}${clinic.phone}</a>
          <a href="mailto:${clinic.email}">${icon('mail')}${clinic.email}</a>
        </address>
        <p class="footer__alert">${icon('alert')}<span>Out of hours emergencies: <a href="${clinic.outOfHours.href}">${clinic.outOfHours.name} ${clinic.outOfHours.phone}</a></span></p>
      </div>
    </div>
    <div class="container footer__bottom">
      <p>© Liffey Medical ${year}</p>
      <p class="footer__concept">Design concept prepared for Liffey Medical — not the official website. Official site: <a href="${clinic.officialSite}" rel="noopener">liffeymedical.ie</a></p>
    </div>`;
}

function renderActionBar() {
  const bar = $('#action-bar');
  bar.innerHTML = `
    <a href="${clinic.phoneHref}">${icon('phone')}<span>Call</span></a>
    <button type="button" class="action-bar__book" data-book="">${icon('calendar')}<span>Book online</span></button>
    <a href="${clinic.mapsUrl}" target="_blank" rel="noopener">${icon('mapPin')}<span>Directions</span></a>`;
}

/* ---------- booking drawer ---------- */
const drawer = { el: null, lastFocus: null };

function renderDrawer() {
  drawer.el = $('#booking');
  drawer.el.innerHTML = `
    <div class="drawer__scrim" data-close-booking></div>
    <div class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <header class="drawer__head">
        <button type="button" class="icon-btn" data-booking-back aria-label="Back to all services" hidden>${icon('arrowLeft')}</button>
        <div class="drawer__titles">
          <p class="drawer__eyebrow" data-booking-eyebrow>Book online</p>
          <h2 class="drawer__title" id="booking-title" data-booking-title>What do you need?</h2>
        </div>
        <button type="button" class="icon-btn" data-close-booking aria-label="Close booking">${icon('x')}</button>
      </header>
      <div class="drawer__body" data-booking-body></div>
    </div>`;
}

function bookingList() {
  return `
    <p class="drawer__intro">Choose a service to see available times. New patients welcome — no registration needed for your first appointment.</p>
    ${bookingGroups.map((g) => `
      <div class="book-group">
        <h3 class="book-group__title">${g.title}</h3>
        ${g.keys.map((k) => {
          const b = booking[k];
          return `
          <button type="button" class="book-option" data-booking-pick="${k}">
            <span class="book-option__icon">${icon(b.icon)}</span>
            <span class="book-option__text"><strong>${b.label}</strong><span>${b.note}</span></span>
            <span class="book-option__price">${b.price}</span>
            ${icon('chevronRight', 'book-option__chev')}
          </button>`;
        }).join('')}
      </div>`).join('')}
    <div class="drawer__help">
      ${icon('phone')}<p>Prefer to talk to someone? Call reception on <a href="${clinic.phoneHref}">${clinic.phone}</a>.</p>
    </div>`;
}

function setBookingView(key) {
  const body = $('[data-booking-body]', drawer.el);
  const back = $('[data-booking-back]', drawer.el);
  const title = $('[data-booking-title]', drawer.el);
  const eyebrow = $('[data-booking-eyebrow]', drawer.el);
  if (!key || !booking[key]) {
    title.textContent = 'What do you need?';
    eyebrow.textContent = 'Book online';
    back.hidden = true;
    body.innerHTML = bookingList();
    body.classList.remove('drawer__body--frame');
    return;
  }
  const b = booking[key];
  title.textContent = b.label;
  eyebrow.textContent = b.price;
  back.hidden = false;
  body.classList.add('drawer__body--frame');
  body.innerHTML = `
    <p class="drawer__note">${icon('info')}<span>${b.note}</span></p>
    ${embed(key)}
    <p class="drawer__fallback">Trouble loading? <a href="${b.url}" target="_blank" rel="noopener">Open the booking page</a> or call <a href="${clinic.phoneHref}">${clinic.phone}</a>.</p>`;
  bindEmbeds(body);
}

function openBooking(key) {
  drawer.lastFocus = document.activeElement;
  closeMenus();
  setBookingView(key);
  drawer.el.hidden = false;
  document.documentElement.classList.add('is-locked');
  requestAnimationFrame(() => drawer.el.classList.add('is-open'));
  setTimeout(() => $('.drawer__panel [data-close-booking]', drawer.el).focus(), 60);
}

function closeBooking() {
  if (drawer.el.hidden) return;
  drawer.el.classList.remove('is-open');
  document.documentElement.classList.remove('is-locked');
  setTimeout(() => {
    drawer.el.hidden = true;
    $('[data-booking-body]', drawer.el).innerHTML = '';
  }, reduceMotion ? 0 : 280);
  drawer.lastFocus?.focus?.();
}

function trapFocus(e) {
  if (drawer.el.hidden || e.key !== 'Tab') return;
  const f = $$('button:not([hidden]), a[href], iframe, input, select', $('.drawer__panel', drawer.el)).filter((x) => x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0];
  const last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------- interactions ---------- */
function bindEmbeds(root) {
  $$('.embed iframe', root).forEach((f) => {
    f.addEventListener('load', () => f.closest('.embed').classList.add('is-loaded'), { once: true });
  });
}

function selectTab(btn, { updateRoute = true } = {}) {
  const wrap = btn.closest('[data-tabs]');
  const id = btn.dataset.tab;
  $$('[role="tab"]', wrap).forEach((t) => {
    const on = t === btn;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
  });
  $$('[role="tabpanel"]', wrap).forEach((p) => { p.hidden = p.id !== `panel-${id}`; });
  if (updateRoute && wrap.dataset.syncRoute) {
    history.replaceState(null, '', `#/${wrap.dataset.syncRoute}/${id}`);
  }
}

function applyFilter(groupName) {
  const group = $(`[data-filter-group="${groupName}"]`);
  const target = $(`[data-filter-target="${groupName}"]`);
  if (!group || !target) return;
  const cat = $('[aria-pressed="true"]', group)?.dataset.filter || 'all';

  if (groupName === 'bloods') {
    let n = 0;
    $$('[data-cat]', target).forEach((card) => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.hidden = !show;
      if (show) n += 1;
    });
    $('[data-count="bloods"]').textContent = n;
    return;
  }

  // prices: category + free-text search
  const q = ($('[data-price-search]')?.value || '').trim().toLowerCase();
  let total = 0;
  $$('.price-group', target).forEach((g) => {
    let n = 0;
    $$('.price-row', g).forEach((row) => {
      const show = (cat === 'all' || row.dataset.cat === cat) && (!q || row.dataset.text.includes(q));
      row.hidden = !show;
      if (show) n += 1;
    });
    g.hidden = n === 0;
    total += n;
  });
  $('[data-empty]', target).hidden = total > 0;
}

function toast(msg) {
  const t = $('#toast');
  t.innerHTML = `${icon('check')}<span>${esc(msg)}</span>`;
  t.classList.add('is-visible');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('is-visible'), 2600);
}

function closeMenus() {
  const menu = $('#mobile-menu');
  const toggle = $('[data-menu-toggle]');
  if (menu && !menu.hidden) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
  $$('[data-dropdown]').forEach((d) => {
    d.classList.remove('is-open');
    $('[data-dropdown-toggle]', d).setAttribute('aria-expanded', 'false');
  });
}

function onClick(e) {
  const t = e.target;

  const book = t.closest('[data-book]');
  if (book) { e.preventDefault(); openBooking(book.dataset.book); return; }

  const pick = t.closest('[data-booking-pick]');
  if (pick) { setBookingView(pick.dataset.bookingPick); $('[data-booking-back]', drawer.el).focus(); return; }

  if (t.closest('[data-booking-back]')) { setBookingView(null); return; }
  if (t.closest('[data-close-booking]')) { closeBooking(); return; }

  const tab = t.closest('[data-tab]');
  if (tab) { selectTab(tab); return; }

  const chip = t.closest('[data-filter]');
  if (chip) {
    const group = chip.closest('[data-filter-group]');
    $$('[data-filter]', group).forEach((c) => c.setAttribute('aria-pressed', c === chip));
    applyFilter(group.dataset.filterGroup);
    return;
  }

  const copy = t.closest('[data-copy]');
  if (copy) {
    const text = copy.dataset.copy;
    (navigator.clipboard?.writeText(text) || Promise.reject())
      .then(() => toast('Address copied'))
      .catch(() => toast(text));
    return;
  }

  if (t.closest('[data-dismiss-announcement]')) {
    store.set('dismissed:' + announcement.id, '1');
    $('#announcement')?.remove();
    return;
  }

  if (t.closest('[data-menu-toggle]')) {
    const menu = $('#mobile-menu');
    const open = menu.hidden;
    menu.hidden = !open;
    t.closest('[data-menu-toggle]').setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    return;
  }

  const dd = t.closest('[data-dropdown-toggle]');
  if (dd) {
    const item = dd.closest('[data-dropdown]');
    const open = !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    dd.setAttribute('aria-expanded', String(open));
    return;
  }
  if (!t.closest('[data-dropdown]')) {
    $$('[data-dropdown].is-open').forEach((d) => {
      d.classList.remove('is-open');
      $('[data-dropdown-toggle]', d).setAttribute('aria-expanded', 'false');
    });
  }

  // In-page anchors (#quote, #location) — scroll without breaking the hash router.
  const a = t.closest('a[href^="#"]');
  if (a && !a.getAttribute('href').startsWith('#/')) {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      target.focus?.({ preventScroll: true });
    }
    return;
  }

  if (t.closest('#mobile-menu a')) closeMenus();
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    if (!drawer.el.hidden) closeBooking();
    else closeMenus();
  }
  trapFocus(e);

  // Arrow-key navigation between tabs
  const tab = e.target.closest?.('[role="tab"]');
  if (tab && ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
    const tabs = $$('[role="tab"]', tab.closest('[role="tablist"]'));
    let i = tabs.indexOf(tab);
    if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = tabs.length - 1;
    else i = (i + (['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : -1) + tabs.length) % tabs.length;
    e.preventDefault();
    tabs[i].focus();
    selectTab(tabs[i]);
  }
}

function onInput(e) {
  if (e.target.matches('[data-price-search]')) applyFilter('prices');
}

function onChange(e) {
  if (e.target.matches('[data-quote] select[name="destination"]')) {
    const other = $('[data-other]');
    other.hidden = e.target.value !== 'other';
    if (!other.hidden) $('input', other).focus();
  }
}

function onSubmit(e) {
  const form = e.target.closest('[data-quote]');
  if (!form) return;
  e.preventDefault();
  const data = new FormData(form);
  const dest = data.get('destination') === 'other' ? (data.get('other') || '').trim() : data.get('destination');
  const name = (data.get('name') || '').trim();
  const err = $('[data-error]', form);
  if (!dest || !name) { err.hidden = false; return; }
  err.hidden = true;
  const subject = `Visa medical quote — ${dest}`;
  const body = `Hello Liffey Medical,\n\nI would like a price quotation for a visa medical for ${dest}.\nI have attached the official form (if available).\n\nKind regards,\n${name}`;
  window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ---------- reveal on scroll ---------- */
// Position-based rather than IntersectionObserver: a fast jump past a section
// (anchor link, End key) must still reveal it, never leave it invisible.
function revealPassed() {
  const limit = window.innerHeight * 0.94;
  $$('[data-reveal]:not(.is-visible)').forEach((el) => {
    if (reduceMotion || el.getBoundingClientRect().top < limit) el.classList.add('is-visible');
  });
}

/* ---------- router ---------- */
let firstRender = true;
function router() {
  const hash = location.hash;
  if (hash && !hash.startsWith('#/')) return; // plain in-page anchor
  const [path = '', sub = ''] = hash.replace(/^#\/?/, '').split('/');
  const route = routes[path];
  const main = $('#main');

  closeMenus();
  main.innerHTML = route ? route.render(sub) : renderNotFound();
  document.title = `${route ? route.title : 'Page not found'} — Liffey Medical | GP Dublin City Centre`;

  $$('[data-nav]').forEach((el) => {
    const on = el.dataset.nav.split(' ').includes(path);
    el.classList.toggle('is-active', on);
    if (el.tagName === 'A') {
      if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    }
  });

  bindEmbeds(main);
  main.classList.remove('page-enter');
  void main.offsetWidth;
  main.classList.add('page-enter');

  const anchor = sub && !route?.tabs && document.getElementById(sub);
  if (anchor) {
    // Jump straight to the section, then correct once late layout (fonts, map) settles.
    const jump = () => anchor.scrollIntoView({ behavior: 'auto', block: 'start' });
    requestAnimationFrame(jump);
    setTimeout(() => { if (Math.abs(anchor.getBoundingClientRect().top - $('#site-header').offsetHeight) > 40) jump(); }, 450);
  } else if (!firstRender) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  if (!firstRender) main.focus({ preventScroll: true });
  firstRender = false;
  requestAnimationFrame(revealPassed);
}

/* ---------- boot ---------- */
let scrollTick = false;
function onScroll() {
  if (scrollTick) return;
  scrollTick = true;
  requestAnimationFrame(() => {
    $('#site-header').classList.toggle('is-scrolled', window.scrollY > 8);
    revealPassed();
    scrollTick = false;
  });
}

function init() {
  renderAnnouncement();
  renderHeader();
  renderFooter();
  renderActionBar();
  renderDrawer();

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('input', onInput);
  document.addEventListener('change', onChange);
  document.addEventListener('submit', onSubmit);
  window.addEventListener('hashchange', router);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Desktop: open the services dropdown on hover too.
  const dd = $('[data-dropdown]');
  if (dd && window.matchMedia('(hover: hover)').matches) {
    let timer;
    dd.addEventListener('pointerenter', () => { clearTimeout(timer); dd.classList.add('is-open'); $('[data-dropdown-toggle]', dd).setAttribute('aria-expanded', 'true'); });
    dd.addEventListener('pointerleave', () => { timer = setTimeout(() => { dd.classList.remove('is-open'); $('[data-dropdown-toggle]', dd).setAttribute('aria-expanded', 'false'); }, 160); });
  }

  onScroll();
  router();
  document.documentElement.classList.add('is-ready');
}

init();
