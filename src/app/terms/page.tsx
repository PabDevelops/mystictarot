import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Uso / Terms of Use — Mystic Tarot",
  description: "Términos y condiciones de uso de Mystic Tarot.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-mystic-400 hover:text-mystic-300 text-sm mb-10 inline-flex items-center gap-2 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Volver / Back
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 mt-6">Términos de Uso</h1>
        <p className="text-slate-500 text-sm mb-10">Última actualización: 1 de julio de 2025</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Naturaleza del servicio</h2>
            <p className="text-slate-400">Mystic Tarot es una aplicación de <strong className="text-slate-200">entretenimiento e inspiración personal</strong>. Las lecturas generadas por inteligencia artificial son ficticias y no constituyen consejo profesional de ningún tipo (médico, legal, financiero, psicológico ni espiritual). El usuario acepta que el servicio se ofrece únicamente con fines de ocio.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Aceptación de los términos</h2>
            <p className="text-slate-400">El acceso y uso de Mystic Tarot implica la aceptación plena de estos Términos de Uso. Si no estás de acuerdo con alguna de las condiciones aquí establecidas, te rogamos que no utilices el servicio.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Acceso gratuito y créditos de pago</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>El servicio ofrece <strong className="text-slate-200">3 lecturas gratuitas por día</strong>, renovadas automáticamente cada 24 horas.</li>
              <li>Los usuarios pueden adquirir <strong className="text-slate-200">paquetes de créditos adicionales</strong> mediante pago a través de Stripe.</li>
              <li>Los créditos adquiridos se almacenan localmente en el navegador del usuario. <strong className="text-slate-200">No son reembolsables</strong> una vez concedidos.</li>
              <li>Los créditos no caducan mientras el usuario conserve los datos de su navegador.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Pagos y facturación</h2>
            <p className="text-slate-400">Los pagos son procesados por <strong className="text-slate-200">Stripe, Inc.</strong> de forma segura. Mystic Tarot no almacena datos de tarjetas de crédito. Los precios mostrados incluyen los impuestos aplicables. En caso de disputa sobre un cargo, el usuario debe contactar con el soporte antes de iniciar un contracargo con su banco.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Uso aceptable</h2>
            <p className="text-slate-400 mb-2">El usuario se compromete a no:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Intentar manipular el sistema de créditos o eludir el sistema de pago.</li>
              <li>Usar el servicio para fines ilegales o que puedan causar daño a terceros.</li>
              <li>Realizar ingeniería inversa del sistema.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Disponibilidad del servicio</h2>
            <p className="text-slate-400">Mystic Tarot se ofrece "tal cual" y no garantiza disponibilidad ininterrumpida. El servicio depende de APIs de terceros (Groq, Stripe, Vercel) cuya disponibilidad está fuera del control del propietario.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitación de responsabilidad</h2>
            <p className="text-slate-400">El propietario de Mystic Tarot no será responsable de ningún daño directo, indirecto, incidental o consecuente derivado del uso o la imposibilidad de uso del servicio. Las lecturas generadas son producto de un sistema de inteligencia artificial y no deben tomarse como verdad ni como guía para decisiones importantes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Modificaciones</h2>
            <p className="text-slate-400">El propietario se reserva el derecho a modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en esta página. El uso continuado del servicio tras dichos cambios implica su aceptación.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Ley aplicable</h2>
            <p className="text-slate-400">Estos términos se rigen por la legislación española y de la Unión Europea. Para cualquier controversia, las partes se someten a los juzgados y tribunales competentes según la normativa aplicable.</p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-mystic-400 transition-colors">Política de Privacidad</Link>
          <Link href="/" className="hover:text-mystic-400 transition-colors">🔮 Mystic Tarot</Link>
        </div>
      </div>
    </div>
  );
}
