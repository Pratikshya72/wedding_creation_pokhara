import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ArrowRight, Calendar, Check, Mail, Phone, Pin, SocialIcon, User, WhatsApp } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'
import { site, whatsappLink } from '../data/site'
import { services } from '../data/services'

const EMPTY = { name: '', email: '', phone: '', date: '', location: '', services: [], message: '', website: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please tell us your name.'
  if (!v.email.trim()) e.email = 'Please add your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'That email address doesn’t look quite right.'
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = 'Please check the phone number.'
  if (!v.date) e.date = 'Please choose your wedding date (an approximate date is fine).'
  if (!v.location.trim()) e.location = 'Where will you be celebrating?'
  if (!v.message.trim()) e.message = 'Tell us a little about your plans.'
  return e
}

const formatDate = (d) =>
  d ? new Date(`${d}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

function composeMessage(v) {
  return [
    `Hello ${site.fullName}! New wedding enquiry:`,
    '',
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.phone ? `Phone: ${v.phone}` : null,
    `Wedding date: ${formatDate(v.date)}`,
    `Location: ${v.location}`,
    v.services.length && `Interested in: ${v.services.join(', ')}`,
    '',
    v.message,
  ]
    .filter((l) => typeof l === 'string')
    .join('\n')
}

export default function Contact() {
  usePageMeta(
    'Contact',
    'Enquire about wedding photography and films with Wedding Creation Pokhara. Call, WhatsApp or send your wedding date and plans.',
  )
  const [params] = useSearchParams()
  const preselect = params.get('service')
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    services: preselect && services.some((s) => s.title === preselect) ? [preselect] : [],
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const toggleService = (t) =>
    setValues((v) => ({ ...v, services: v.services.includes(t) ? v.services.filter((s) => s !== t) : [...v.services, t] }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.website) return // honeypot -bots fill hidden fields
    const errs = validate(values)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }

    const text = composeMessage(values)
    if (site.formEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `Wedding enquiry - ${values.name}`,
            _template: 'table',
            _replyto: values.email,
            Name: values.name,
            Email: values.email,
            Phone: values.phone || 'Not given',
            'Wedding date': formatDate(values.date),
            Location: values.location,
            'Interested in': values.services.join(', ') || 'Not selected',
            Message: values.message,
          }),
        })
        if (!res.ok) throw new Error(String(res.status))
        const data = await res.json().catch(() => ({}))
        if (String(data.success) === 'false') throw new Error(data.message || 'not accepted')
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }
    // No backend configured: hand the enquiry to WhatsApp, pre-filled.
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setStatus('sent')
  }

  const field = (name, label, props = {}, hint) => {
    const invalid = Boolean(errors[name])
    const describedBy = invalid ? `${name}-err` : hint ? `${name}-hint` : undefined
    const shared = {
      id: name,
      name,
      value: values[name],
      onChange: set(name),
      'aria-invalid': invalid,
      'aria-describedby': describedBy,
      placeholder: props.placeholder,
    }
    return (
      <div className={props.wide ? 'sm:col-span-2' : ''}>
        <label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
          <span>
            {label}
            {!props.optional && (
              <span aria-hidden="true" className="ml-1 text-pink">
                *
              </span>
            )}
          </span>
          {props.optional && <span className="text-xs font-normal text-stone">Optional</span>}
        </label>
        <div className="relative">
          {props.icon && (
            <span
              className={`pointer-events-none absolute left-4 text-stone ${props.as === 'textarea' ? 'top-4' : 'top-1/2 -translate-y-1/2'}`}
              aria-hidden="true"
            >
              {props.icon}
            </span>
          )}
          {props.as === 'textarea' ? (
            <textarea {...shared} rows={5} className={`input resize-y ${props.icon ? 'pl-12' : ''}`} />
          ) : (
            <input
              {...shared}
              type={props.type ?? 'text'}
              autoComplete={props.autoComplete}
              min={props.min}
              inputMode={props.inputMode}
              className={`input ${props.icon ? 'pl-12' : ''}`}
            />
          )}
        </div>
        {hint && !invalid && (
          <p id={`${name}-hint`} className="mt-2 text-xs text-stone">
            {hint}
          </p>
        )}
        {invalid && (
          <p id={`${name}-err`} role="alert" className="mt-2 text-sm text-rose">
            {errors[name]}
          </p>
        )}
      </div>
    )
  }

  const group = (title, note) => (
    <div className="mb-6 flex items-center gap-4">
      <h3 className="shrink-0 font-serif text-2xl font-normal text-ink">{title}</h3>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      {note && <span className="text-xs text-stone max-sm:hidden">{note}</span>}
    </div>
  )

  const instagram = site.socials.find((s) => s.label === 'Instagram')

  return (
    <>
      <PageHero
        image="weddings-dsc00836"
        height="short"
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s <em>begin</em>
          </>
        }
        intro="Share your date and plans -we reply personally to every enquiry."
      />

      <section className="container-x grid gap-20 py-24 lg:grid-cols-12 lg:gap-12 lg:py-36">
        {/* Form */}
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">
              Booking <em>enquiry</em>
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-taupe">
              The more you tell us about your day, the better we can help. Fields marked <span className="text-rose">*</span>{' '}
              are required.
            </p>
          </Reveal>

          {status === 'sent' ? (
            <div role="status" className="fade-in mt-14 border border-line bg-paper p-8 sm:p-12">
              <p className="eyebrow text-pink">Thank you</p>
              <p className="display mt-4 text-4xl italic">
                {site.formEndpoint ? 'Your enquiry is on its way.' : 'Almost there -send it on WhatsApp.'}
              </p>
              <p className="mt-5 max-w-md leading-relaxed text-taupe">
                {site.formEndpoint
                  ? 'We’ll get back to you personally, usually with availability for your date.'
                  : 'Your enquiry is written and ready to send. If WhatsApp didn’t open by itself, press the button below, then tap send.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {!site.formEndpoint && (
                  <a href={whatsappLink(composeMessage(values))} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                    Open WhatsApp
                  </a>
                )}
                {site.email && (
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`Wedding enquiry -${values.name}`)}&body=${encodeURIComponent(composeMessage(values))}`}
                    className="btn btn-dark"
                  >
                    Send by email instead
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setValues(EMPTY)
                    setStatus('idle')
                  }}
                  className="eyebrow link-line px-2 text-taupe"
                >
                  New enquiry
                </button>
              </div>
            </div>
          ) : (
            <form
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              aria-label="Wedding enquiry form"
              className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-40px_rgb(228_0_124/0.45)]"
            >
              <div className="h-1.5 bg-pink" aria-hidden="true" />
              <div className="space-y-12 p-6 sm:p-10">
                <section aria-label="About you">
                  {group('About you')}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {field('name', 'Your names', { autoComplete: 'name', placeholder: 'You & your partner', icon: <User />, wide: true })}
                    {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com', icon: <Mail /> })}
                    {field('phone', 'Phone / WhatsApp', {
                      type: 'tel',
                      autoComplete: 'tel',
                      optional: true,
                      inputMode: 'tel',
                      placeholder: '+977 98…',
                      icon: <Phone />,
                    })}
                  </div>
                </section>

                <section aria-label="Your celebration">
                  {group('Your celebration')}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {field('date', 'Wedding date', { type: 'date', min: today, icon: <Calendar /> }, 'An approximate date is fine.')}
                    {field('location', 'Location / venue', { placeholder: 'e.g. a lakeside venue in Pokhara', icon: <Pin /> })}
                  </div>
                </section>

                <fieldset>
                  <legend className="sr-only">Services you are interested in (optional)</legend>
                  {group('What would you like?', 'Optional · choose any')}
                  <div className="flex flex-wrap gap-2.5">
                    {services.map((s) => {
                      const on = values.services.includes(s.title)
                      return (
                        <label
                          key={s.slug}
                          className={`inline-flex cursor-pointer items-center rounded-full border px-4 py-2.5 text-sm transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink/40 ${
                            on
                              ? 'border-pink bg-pink text-white shadow-[0_8px_18px_-10px_rgb(228_0_124/0.8)]'
                              : 'border-line bg-paper/60 text-taupe hover:border-pink hover:text-pink'
                          }`}
                        >
                          <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleService(s.title)} />
                          <Check className={`transition-all duration-300 ${on ? 'mr-2 w-4 opacity-100' : 'mr-0 w-0 opacity-0'}`} />
                          {s.title}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <section aria-label="Your message">
                  {group('Tell us about your day')}
                  {field('message', 'Your message', {
                    as: 'textarea',
                    placeholder: 'Ceremonies, number of days, what matters most to you…',
                  })}
                </section>

                {/* Honeypot (hidden from people and screen readers) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this empty</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                </div>

                {status === 'error' && (
                  <p role="alert" className="rounded-lg bg-rose/10 px-4 py-3 text-sm text-rose">
                    Something went wrong sending your enquiry. Please try again, or message us on WhatsApp.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4 border-t border-line bg-paper px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <p className="flex items-center gap-3 text-sm text-taupe">
                  {site.formEndpoint && (
                    <>
                      <Mail className="shrink-0 text-pink" />
                      We reply personally to every enquiry.
                    </>
                  )}
                  {!site.formEndpoint && (
                    <>
                      <WhatsApp className="h-5 w-5 shrink-0 text-pink" />
                      Your enquiry opens in WhatsApp, ready to send.
                    </>
                  )}
                </p>
                <button type="submit" disabled={status === 'sending'} className="btn btn-pink shrink-0 rounded-full disabled:opacity-50">
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  <ArrowRight className="w-6" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Direct contact */}
        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Direct contact">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <a
                href={whatsappLink("Hello Wedding Creation! I'd like to ask about our wedding.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-pink p-7 text-white transition-colors duration-500 hover:bg-pink-deep"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-white">
                  <WhatsApp />
                </span>
                <span>
                  <span className="eyebrow block text-white/80">Fastest reply</span>
                  <span className="mt-1 block font-serif text-2xl font-light italic">Chat on WhatsApp</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={100}>
              <ul className="mt-10 space-y-7">
                <li className="flex gap-5">
                  <Phone className="mt-1 shrink-0 text-stone" />
                  <div>
                    <p className="eyebrow text-pink">Call</p>
                    <a href={site.phoneHref} className="link-line mt-1.5 inline-block text-lg">
                      {site.phoneDisplay}
                    </a>
                  </div>
                </li>
                {site.email && (
                  <li className="flex gap-5">
                    <Mail className="mt-1 shrink-0 text-stone" />
                    <div>
                      <p className="eyebrow text-pink">Email</p>
                      <a href={`mailto:${site.email}`} className="link-line mt-1.5 inline-block text-lg break-all">
                        {site.email}
                      </a>
                    </div>
                  </li>
                )}
                <li className="flex gap-5">
                  <Pin className="mt-1 shrink-0 text-stone" />
                  <div>
                    <p className="eyebrow text-pink">Studio</p>
                    <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-1.5 inline-block text-lg">
                      {site.address}
                    </a>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12 border-t border-line pt-8">
                <p className="eyebrow text-pink">Follow our work</p>
                <ul className="mt-3 space-y-0">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-2.5">
                        <SocialIcon label={s.label} />
                        <span className="link-line">{s.handle}</span>
                        <span className="sr-only">on {s.label} (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {instagram && (
              <Reveal delay={300}>
                <p className="mt-12 font-serif text-2xl leading-snug font-light text-taupe italic">&ldquo;{site.bio}.&rdquo;</p>
              </Reveal>
            )}
          </div>
        </aside>
      </section>

    </>
  )
}
