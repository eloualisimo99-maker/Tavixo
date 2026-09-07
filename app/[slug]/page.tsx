import { notFound } from "next/navigation";
import { supabase } from "../supabase";

type Profile = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  job: string | null;
  bio: string | null;
  phone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  website: string | null;
  address: string | null;
  photo_url: string | null;
};

function cleanWhatsApp(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function normalizeUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

const themes: Record<string, { label: string; icon: string; bg: string; accent: string; soft: string; button: string }> = {
  barber: { label: "BARBER & GROOMING", icon: "✂️", bg: "#11100F", accent: "#D6A85F", soft: "#211C15", button: "#D6A85F" },
  makeup: { label: "BEAUTY STUDIO", icon: "💄", bg: "#FBF5F3", accent: "#B56B78", soft: "#F2E2E4", button: "#B56B78" },
  "real-estate": { label: "REAL ESTATE", icon: "🏠", bg: "#F4F7FA", accent: "#173B5E", soft: "#E4EBF2", button: "#173B5E" },
  restaurant: { label: "RESTAURANT", icon: "🍽️", bg: "#18130F", accent: "#E2A24D", soft: "#2A2118", button: "#E2A24D" },
  gym: { label: "FITNESS & COACHING", icon: "🏋️", bg: "#0D1013", accent: "#B8FF3D", soft: "#192013", button: "#B8FF3D" },
  photographer: { label: "PHOTOGRAPHY", icon: "📸", bg: "#101010", accent: "#FFFFFF", soft: "#202020", button: "#FFFFFF" },
  shop: { label: "BOUTIQUE", icon: "🛍️", bg: "#F7F4EF", accent: "#6E5841", soft: "#EDE6DC", button: "#6E5841" },
  business: { label: "DIGITAL BUSINESS CARD", icon: "◆", bg: "#07111F", accent: "#00D9FF", soft: "#10263A", button: "#00D9FF" },
};

function Action({ href, icon, title, subtitle, dark, accent }: { href: string; icon: string; title: string; subtitle?: string; dark: boolean; accent: string }) {
  return (
    <a href={href} className={`flex items-center gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5 ${dark ? "border-white/10 bg-white/[0.06] hover:bg-white/[0.1]" : "border-black/10 bg-white hover:shadow-lg"}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: dark ? `${accent}20` : `${accent}15` }}>{icon}</span>
      <span className="min-w-0">
        <span className={`block text-sm font-black ${dark ? "text-white" : "text-[#171717]"}`}>{title}</span>
        {subtitle && <span className={`mt-0.5 block truncate text-xs ${dark ? "text-white/40" : "text-black/45"}`}>{subtitle}</span>}
      </span>
      <span className={`ml-auto text-lg ${dark ? "text-white/30" : "text-black/25"}`}>→</span>
    </a>
  );
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, error } = await supabase.from("profiles").select("*").eq("slug", slug).single();
  if (error || !data) notFound();

  const p = data as Profile;
  const theme = themes[p.category || "business"] || themes.business;
  const dark = ["barber", "restaurant", "gym", "photographer", "business"].includes(p.category || "business");
  const whatsapp = p.whatsapp ? cleanWhatsApp(p.whatsapp) : "";
  const socials = [
    p.instagram ? { href: normalizeUrl(p.instagram), icon: "◎", title: "Instagram", value: p.instagram } : null,
    p.facebook ? { href: normalizeUrl(p.facebook), icon: "f", title: "Facebook", value: p.facebook } : null,
    p.linkedin ? { href: normalizeUrl(p.linkedin), icon: "in", title: "LinkedIn", value: p.linkedin } : null,
    p.website ? { href: normalizeUrl(p.website), icon: "↗", title: "Website", value: p.website } : null,
  ].filter(Boolean) as { href: string; icon: string; title: string; value: string }[];

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 md:py-10" style={{ background: theme.bg, color: dark ? "white" : "#171717" }}>
      <div className="mx-auto max-w-md">
        <div className="overflow-hidden rounded-[34px] border shadow-2xl" style={{ borderColor: dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.08)" }}>
          <div className="relative px-6 pb-8 pt-7" style={{ background: dark ? theme.bg : theme.soft }}>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-black tracking-[0.25em]" style={{ color: theme.accent }}>TAVIXO</div>
              <div className="text-lg">{theme.icon}</div>
            </div>

            <div className="mt-10 text-center">
              {p.photo_url ? (
                <img src={p.photo_url} alt={p.name} className="mx-auto h-28 w-28 rounded-full object-cover shadow-xl ring-4" style={{ borderColor: theme.accent }} />
              ) : (
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full text-4xl font-black shadow-xl" style={{ background: theme.accent, color: dark ? theme.bg : "white" }}>{p.name.charAt(0).toUpperCase()}</div>
              )}
              <div className="mt-5 text-[10px] font-black tracking-[0.22em]" style={{ color: theme.accent }}>{theme.label}</div>
              <h1 className="mt-2 text-3xl font-black tracking-tight">{p.name}</h1>
              {p.job && <p className={`mt-2 text-sm font-bold ${dark ? "text-white/55" : "text-black/50"}`}>{p.job}</p>}
              {p.bio && <p className={`mx-auto mt-4 max-w-sm text-sm leading-6 ${dark ? "text-white/55" : "text-black/55"}`}>{p.bio}</p>}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {p.phone && <a href={`tel:${p.phone}`} className="rounded-2xl px-4 py-3 text-center text-sm font-black shadow-lg transition hover:-translate-y-0.5" style={{ background: theme.accent, color: dark ? theme.bg : "white" }}>📞 Appeler</a>}
              {whatsapp && <a href={`https://wa.me/${whatsapp}`} className="rounded-2xl border px-4 py-3 text-center text-sm font-black transition hover:-translate-y-0.5" style={{ borderColor: theme.accent, color: theme.accent }}>💬 WhatsApp</a>}
            </div>
          </div>

          <div className={`p-5 ${dark ? "bg-[#0A0D11]" : "bg-white"}`}>
            {p.category === "barber" && <div className="mb-5 rounded-2xl p-5" style={{ background: theme.soft }}><p className="text-xs font-black tracking-[0.18em]" style={{ color: theme.accent }}>SERVICES</p><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold"><span>✂️ Coupe</span><span>🪒 Barbe</span><span>💈 Styling</span></div></div>}
            {p.category === "makeup" && <div className="mb-5 rounded-2xl p-5" style={{ background: theme.soft }}><p className="text-xs font-black tracking-[0.18em]" style={{ color: theme.accent }}>BEAUTY</p><p className="mt-2 text-sm font-bold">Makeup • Events • Bridal</p></div>}
            {p.category === "real-estate" && <div className="mb-5 rounded-2xl p-5" style={{ background: theme.soft }}><p className="text-xs font-black tracking-[0.18em]" style={{ color: theme.accent }}>IMMOBILIER</p><p className="mt-2 text-sm font-bold">Contactez-moi pour vos projets de location, achat ou vente.</p></div>}
            {p.category === "restaurant" && <div className="mb-5 rounded-2xl p-5" style={{ background: theme.soft }}><p className="text-xs font-black tracking-[0.18em]" style={{ color: theme.accent }}>À LA CARTE</p><p className="mt-2 text-sm font-bold">Découvrez notre établissement et contactez-nous pour une réservation.</p></div>}

            <div className="space-y-3">
              {p.address && <Action href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`} icon="📍" title="Localisation" subtitle={p.address} dark={dark} accent={theme.accent} />}
              {socials.map((s) => <Action key={s.title} href={s.href} icon={s.icon} title={s.title} subtitle={s.value} dark={dark} accent={theme.accent} />)}
            </div>

            <a
              href={`data:text/vcard;charset=utf-8,BEGIN:VCARD%0AVERSION:3.0%0AFN:${encodeURIComponent(p.name)}%0A${p.phone ? `TEL:${encodeURIComponent(p.phone)}%0A` : ""}${p.website ? `URL:${encodeURIComponent(p.website)}%0A` : ""}END:VCARD`}
              download={`${p.slug}.vcf`}
              className="mt-5 block w-full rounded-2xl px-5 py-4 text-center text-sm font-black shadow-lg transition hover:-translate-y-0.5"
              style={{ background: theme.accent, color: dark ? theme.bg : "white" }}
            >
              ＋ Enregistrer le contact
            </a>

            <div className="mt-6 text-center text-[9px] font-black tracking-[0.2em] opacity-30">POWERED BY TAVIXO</div>
          </div>
        </div>
      </div>
    </main>
  );
}
