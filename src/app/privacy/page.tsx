"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Bullet = { label?: string; text: string; link?: { label: string; url: string } };
type Section = { heading: string; body?: string; intro?: string; bullets?: Bullet[] };
type LangContent = { title: string; updated: string; back: string; sections: Section[]; footerLinks: { label: string; href: string }[] };

const content: Record<"EN" | "ES", LangContent> = {
  EN: {
    title: "Privacy Policy",
    updated: "Last updated: July 1, 2025",
    back: "Back",
    sections: [
      {
        heading: "1. Data Controller",
        body: "The data controller for personal data collected through Mystic Tarot (mystictarot-neon.vercel.app) is its owner. For any privacy-related queries, please contact us through the channels indicated on the site.",
      },
      {
        heading: "2. Data We Collect",
        bullets: [
          { label: "Payment data:", text: "Handled exclusively by Stripe, Inc. Mystic Tarot does not store card numbers or financial data." },
          { label: "Anonymous usage data:", text: "Through Vercel Analytics we collect aggregated, anonymous browsing data (pages visited, country of origin, device type). No tracking cookies are used." },
          { label: "Local preferences:", text: "Your preferred language and available credits are stored in your browser's localStorage and are never transmitted to our servers." },
          { label: "Query text:", text: "The intention you select and the cards in your spread are sent to the Groq API to generate the reading. They are not stored or linked to your identity." },
        ],
      },
      {
        heading: "3. Purpose of Processing",
        bullets: [
          { text: "To process payments and manage reading credits." },
          { text: "To generate personalised tarot readings via artificial intelligence." },
          { text: "To improve the service through anonymous usage statistics." },
        ],
      },
      {
        heading: "4. Legal Basis",
        body: "Processing is based on the performance of the service requested by the user (Art. 6.1.b GDPR) and on the legitimate interest of the controller to analyse service use anonymously (Art. 6.1.f GDPR).",
      },
      {
        heading: "5. Third-Party Processors",
        bullets: [
          { label: "Stripe, Inc.", text: "Payment processor.", link: { label: "Stripe Privacy Policy", url: "https://stripe.com/privacy" } },
          { label: "Vercel, Inc.", text: "Hosting and analytics.", link: { label: "Vercel Privacy Policy", url: "https://vercel.com/legal/privacy-policy" } },
          { label: "Groq, Inc.", text: "AI text generation.", link: { label: "Groq Privacy Policy", url: "https://groq.com/privacy-policy/" } },
        ],
      },
      {
        heading: "6. Cookies",
        body: "This site does not use its own tracking or advertising cookies. Vercel Analytics operates without cookies. localStorage is used exclusively for functional purposes.",
      },
      {
        heading: "7. User Rights",
        body: "Under GDPR, you have the right to access, rectify, erase, object to, and request portability of your data. Since we do not store identifiable personal data on our servers, you may exercise these rights by clearing your browser's localStorage, or by contacting us for queries about data managed by third parties.",
      },
      {
        heading: "8. Minors",
        body: "Mystic Tarot is an entertainment service not intended for users under 16 years of age. If you are under that age, please do not use the service.",
      },
    ],
    footerLinks: [{ label: "Terms of Use", href: "/terms" }, { label: "🔮 Mystic Tarot", href: "/" }],
  },
  ES: {
    title: "Política de Privacidad",
    updated: "Última actualización: 1 de julio de 2025",
    back: "Volver",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: "El responsable del tratamiento de los datos personales recabados a través de Mystic Tarot (mystictarot-neon.vercel.app) es su propietario. Para cualquier consulta relacionada con privacidad, puedes contactar a través de los canales indicados en el sitio.",
      },
      {
        heading: "2. Datos que recopilamos",
        bullets: [
          { label: "Datos de pago:", text: "Gestionados exclusivamente por Stripe, Inc. Mystic Tarot no almacena números de tarjeta ni datos financieros." },
          { label: "Datos de uso anónimos:", text: "A través de Vercel Analytics recopilamos datos agregados y anónimos de navegación (páginas visitadas, país de origen, tipo de dispositivo). No se utilizan cookies de rastreo." },
          { label: "Preferencias locales:", text: "Tu idioma preferido y créditos disponibles se almacenan en el localStorage de tu navegador y nunca se transmiten a nuestros servidores." },
          { label: "Texto de consulta:", text: "La intención que seleccionas y las cartas de tu tirada se envían a la API de Groq para generar la lectura. No se almacenan ni asocian a tu identidad." },
        ],
      },
      {
        heading: "3. Finalidad del tratamiento",
        bullets: [
          { text: "Procesar pagos y gestionar créditos de tiradas." },
          { text: "Generar lecturas de tarot personalizadas mediante inteligencia artificial." },
          { text: "Mejorar el servicio mediante estadísticas anónimas de uso." },
        ],
      },
      {
        heading: "4. Base legal",
        body: "El tratamiento se basa en la ejecución del servicio solicitado por el usuario (Art. 6.1.b RGPD) y en el interés legítimo del responsable para analizar el uso del servicio de forma anónima (Art. 6.1.f RGPD).",
      },
      {
        heading: "5. Terceros encargados del tratamiento",
        bullets: [
          { label: "Stripe, Inc.", text: "Procesador de pagos.", link: { label: "Política de privacidad de Stripe", url: "https://stripe.com/privacy" } },
          { label: "Vercel, Inc.", text: "Alojamiento y analytics.", link: { label: "Política de privacidad de Vercel", url: "https://vercel.com/legal/privacy-policy" } },
          { label: "Groq, Inc.", text: "Generación de texto por IA.", link: { label: "Política de privacidad de Groq", url: "https://groq.com/privacy-policy/" } },
        ],
      },
      {
        heading: "6. Cookies",
        body: "Este sitio no utiliza cookies propias de rastreo o publicidad. Vercel Analytics funciona sin cookies. El almacenamiento local (localStorage) es de uso exclusivo funcional.",
      },
      {
        heading: "7. Derechos del usuario",
        body: "De acuerdo con el RGPD, tienes derecho a acceder, rectificar, suprimir, oponerte y solicitar la portabilidad de tus datos. Dado que no almacenamos datos personales identificables en nuestros servidores, puedes ejercer estos derechos eliminando los datos de tu propio navegador (localStorage) o contactando con nosotros para cualquier consulta sobre datos gestionados por terceros.",
      },
      {
        heading: "8. Menores de edad",
        body: "Mystic Tarot es un servicio de entretenimiento no dirigido a menores de 16 años. Si eres menor de esa edad, te pedimos que no utilices el servicio.",
      },
    ],
    footerLinks: [{ label: "Términos de Uso", href: "/terms" }, { label: "🔮 Mystic Tarot", href: "/" }],
  },
};

export default function PrivacyPage() {
  const [lang, setLang] = useState<"EN" | "ES">("EN");

  useEffect(() => {
    const saved = localStorage.getItem("tarotLanguage");
    if (saved === "ES" || saved === "EN") setLang(saved);
  }, []);

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10 mt-6">
          <Link href="/" className="text-mystic-400 hover:text-mystic-300 text-sm inline-flex items-center gap-2 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            {t.back}
          </Link>
          <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-white/5">
            <button onClick={() => { setLang("EN"); localStorage.setItem("tarotLanguage", "EN"); }} className={`px-3 py-1 rounded text-xs font-bold transition-all ${lang === "EN" ? "bg-purple-700 text-white" : "text-slate-500 hover:text-slate-300"}`}>EN</button>
            <button onClick={() => { setLang("ES"); localStorage.setItem("tarotLanguage", "ES"); }} className={`px-3 py-1 rounded text-xs font-bold transition-all ${lang === "ES" ? "bg-purple-700 text-white" : "text-slate-500 hover:text-slate-300"}`}>ES</button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
        <p className="text-slate-500 text-sm mb-10">{t.updated}</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm">
          {t.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-white mb-3">{section.heading}</h2>
              {section.body && <p className="text-slate-400">{section.body}</p>}
              {section.bullets && (
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                  {section.bullets.map((b, j) => (
                    <li key={j}>
                      {b.label && <strong className="text-slate-200">{b.label} </strong>}
                      {b.text}
                      {b.link && (
                        <> — <a href={b.link.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{b.link.label}</a></>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6 text-sm text-slate-500">
          {t.footerLinks.map((l, i) => (
            <Link key={i} href={l.href} className="hover:text-purple-400 transition-colors">{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
