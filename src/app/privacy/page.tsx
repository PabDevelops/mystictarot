import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad / Privacy Policy — Mystic Tarot",
  description: "Política de privacidad de Mystic Tarot.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-mystic-400 hover:text-mystic-300 text-sm mb-10 inline-flex items-center gap-2 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Volver / Back
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 mt-6">Política de Privacidad</h1>
        <p className="text-slate-500 text-sm mb-10">Última actualización: 1 de julio de 2025</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos personales recabados a través de <strong>Mystic Tarot</strong> (mystictarot-neon.vercel.app) es su propietario. Para cualquier consulta relacionada con privacidad, puedes contactar a través de los canales indicados en el sitio.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Datos que recopilamos</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Datos de pago:</strong> Gestionados exclusivamente por Stripe, Inc. Mystic Tarot no almacena números de tarjeta ni datos financieros.</li>
              <li><strong className="text-slate-200">Datos de uso anónimos:</strong> A través de Vercel Analytics recopilamos datos agregados y anónimos de navegación (páginas visitadas, país de origen, tipo de dispositivo). No se utilizan cookies de rastreo.</li>
              <li><strong className="text-slate-200">Preferencias locales:</strong> Tu idioma preferido y créditos disponibles se almacenan en el almacenamiento local de tu navegador (localStorage) y nunca se transmiten a nuestros servidores.</li>
              <li><strong className="text-slate-200">Texto de consulta:</strong> La intención que seleccionas y las cartas de tu tirada se envían a la API de Groq para generar la lectura. No se almacenan ni asocian a tu identidad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Finalidad del tratamiento</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Procesar pagos y gestionar créditos de tiradas.</li>
              <li>Generar lecturas de tarot personalizadas mediante inteligencia artificial.</li>
              <li>Mejorar el servicio mediante estadísticas anónimas de uso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Base legal</h2>
            <p className="text-slate-400">El tratamiento se basa en la ejecución del servicio solicitado por el usuario (Art. 6.1.b RGPD) y en el interés legítimo del responsable para analizar el uso del servicio de forma anónima (Art. 6.1.f RGPD).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Terceros encargados del tratamiento</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Stripe, Inc.</strong> — Procesador de pagos. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-mystic-400 hover:underline">Política de privacidad de Stripe</a></li>
              <li><strong className="text-slate-200">Vercel, Inc.</strong> — Alojamiento y analytics. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-mystic-400 hover:underline">Política de privacidad de Vercel</a></li>
              <li><strong className="text-slate-200">Groq, Inc.</strong> — Generación de texto por IA. <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-mystic-400 hover:underline">Política de privacidad de Groq</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Cookies</h2>
            <p className="text-slate-400">Este sitio <strong className="text-slate-200">no utiliza cookies</strong> propias de rastreo o publicidad. Vercel Analytics funciona sin cookies. El almacenamiento local (localStorage) es de uso exclusivo funcional.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Derechos del usuario</h2>
            <p className="text-slate-400">De acuerdo con el RGPD, tienes derecho a acceder, rectificar, suprimir, oponerte y solicitar la portabilidad de tus datos. Dado que no almacenamos datos personales identificables en nuestros servidores, puedes ejercer estos derechos eliminando los datos de tu propio navegador (localStorage) o contactando con nosotros para cualquier consulta sobre datos gestionados por terceros.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Menores de edad</h2>
            <p className="text-slate-400">Mystic Tarot es un servicio de entretenimiento no dirigido a menores de 16 años. Si eres menor de esa edad, te pedimos que no utilices el servicio.</p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-6 text-sm text-slate-500">
          <Link href="/terms" className="hover:text-mystic-400 transition-colors">Términos de Uso</Link>
          <Link href="/" className="hover:text-mystic-400 transition-colors">🔮 Mystic Tarot</Link>
        </div>
      </div>
    </div>
  );
}
