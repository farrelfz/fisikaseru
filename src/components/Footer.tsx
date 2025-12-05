const footerLinks = [
  { label: "Kontak", href: "mailto:halo@fisikaseru.com" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kebijakan", href: "/kebijakan-privasi" },
  { label: "Ketentuan", href: "/terms" }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1b2a3f] bg-[#0b1424] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 md:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-3">
          <p className="font-display text-xl text-[#FFD700]">FisikaSeru</p>
          <p className="text-sm text-white/70">Belajar Fisika Jadi Lebih Seru.</p>
          <p className="text-sm text-white/60">
            Lab virtual, roadmap, dan kuis adaptif yang terus berkembang bersama komunitas pelajar dari seluruh Indonesia.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
          {footerLinks.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-[#1b2a3f] bg-[#050a12]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FisikaSeru. All rights reserved.</p>
          <p className="italic">“Fisika nasional rasa edtech dunia.”</p>
        </div>
      </div>
    </footer>
  );
}
