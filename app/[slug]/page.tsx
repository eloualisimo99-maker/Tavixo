import { notFound } from "next/navigation";
import { supabase } from "../supabase";

type Profile = {
  id: string;
  name: string;
  slug: string;
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
  category: string | null;
};

const themes: Record<
  string,
  {
    label: string;
    icon: string;
    bg: string;
    accent: string;
    soft: string;
    text: string;
    muted: string;
  }
> = {
  barber: {
    label: "BARBER & GROOMING",
    icon: "✂️",
    bg: "#11100F",
    accent: "#D6A85F",
    soft: "#211C15",
    text: "#FFFFFF",
    muted: "#B8B0A5",
  },

  makeup: {
    label: "BEAUTY STUDIO",
    icon: "💄",
    bg: "#FBF5F3",
    accent: "#B56B78",
    soft: "#F2E2E4",
    text: "#24191C",
    muted: "#76666A",
  },

  "real-estate": {
    label: "REAL ESTATE",
    icon: "🏠",
    bg: "#F4F7FA",
    accent: "#173B5E",
    soft: "#E4EBF2",
    text: "#14202B",
    muted: "#607080",
  },

  restaurant: {
    label: "RESTAURANT",
    icon: "🍽️",
    bg: "#18130F",
    accent: "#E2A24D",
    soft: "#2A2118",
    text: "#FFFFFF",
    muted: "#BDB4A9",
  },

  gym: {
    label: "FITNESS & COACHING",
    icon: "🏋️",
    bg: "#0D1013",
    accent: "#B8FF3D",
    soft: "#192013",
    text: "#FFFFFF",
    muted: "#A8B0B6",
  },

  photographer: {
    label: "PHOTOGRAPHY",
    icon: "📸",
    bg: "#101010",
    accent: "#FFFFFF",
    soft: "#202020",
    text: "#FFFFFF",
    muted: "#A8A8A8",
  },

  shop: {
    label: "BOUTIQUE",
    icon: "🛍️",
    bg: "#F7F4EF",
    accent: "#6E5841",
    soft: "#EDE6DC",
    text: "#211C18",
    muted: "#766D64",
  },

  business: {
    label: "DIGITAL BUSINESS CARD",
    icon: "◆",
    bg: "#07111F",
    accent: "#00D9FF",
    soft: "#10263A",
    text: "#FFFFFF",
    muted: "#91A5B5",
  },
};

function normalizeWhatsApp(value: string) {
  return value.replace(/[^\d]/g, "");
}

function getSocialLinks(profile: Profile) {
  return [
    {
      name: "Instagram",
      value: profile.instagram,
      icon: "◎",
    },
    {
      name: "Facebook",
      value: profile.facebook,
      icon: "f",
    },
    {
      name: "LinkedIn",
      value: profile.linkedin,
      icon: "in",
    },
    {
      name: "Website",
      value: profile.website,
      icon: "↗",
    },
  ].filter((item) => item.value);
}

function ActionButton({
  href,
  children,
  primary = false,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  accent: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex min-h-[54px] flex-1 items-center justify-center rounded-2xl px-5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
      style={{
        background: primary ? accent : "rgba(255,255,255,0.06)",
        color: primary ? "#111111" : "#FFFFFF",
        border: primary
          ? "none"
          : "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {children}
    </a>
  );
}

function SectionTitle({
  icon,
  title,
  accent,
}: {
  icon: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
        style={{
          background: `${accent}18`,
          color: accent,
        }}
      >
        {icon}
      </div>

      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
}

function BarberTemplate({
  profile,
  theme,
}: {
  profile: Profile;
  theme: (typeof themes)[string];
}) {
  const whatsapp = profile.whatsapp
    ? normalizeWhatsApp(profile.whatsapp)
    : profile.phone
      ? normalizeWhatsApp(profile.phone)
      : "";

  const services = [
    {
      name: "Coupe Homme",
      description: "Coupe personnalisée & finition professionnelle",
      price: "À partir de 80 DH",
      icon: "✂️",
    },
    {
      name: "Barbe",
      description: "Taille, contours & finition",
      price: "À partir de 50 DH",
      icon: "🧔",
    },
    {
      name: "Coupe + Barbe",
      description: "Le combo complet pour un look propre",
      price: "À partir de 120 DH",
      icon: "🔥",
    },
  ];

  return (
    <main
      className="min-h-screen px-4 py-6 sm:px-6"
      style={{
        background: theme.bg,
        color: theme.text,
      }}
    >
      <div className="mx-auto max-w-md">
        {/* Brand */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className="text-xs font-black tracking-[0.25em]"
            style={{ color: theme.accent }}
          >
            TAVIXO
          </div>

          <div
            className="rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[0.15em]"
            style={{
              borderColor: `${theme.accent}55`,
              color: theme.accent,
            }}
          >
            {theme.label}
          </div>
        </div>

        {/* Hero */}
        <section
          className="relative overflow-hidden rounded-[32px] border p-6"
          style={{
            background: `linear-gradient(145deg, ${theme.soft}, ${theme.bg})`,
            borderColor: `${theme.accent}30`,
          }}
        >
          <div
            className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
            style={{
              background: `${theme.accent}18`,
            }}
          />

          <div className="relative">
            <div className="mb-5 flex items-center gap-4">
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.name}
                  className="h-24 w-24 rounded-3xl object-cover"
                  style={{
                    border: `2px solid ${theme.accent}`,
                  }}
                />
              ) : (
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-black"
                  style={{
                    background: theme.accent,
                    color: "#111111",
                  }}
                >
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p
                  className="mb-1 text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: theme.accent }}
                >
                  {theme.icon} PROFESSIONAL
                </p>

                <h1 className="text-2xl font-black leading-tight">
                  {profile.name}
                </h1>

                {profile.job && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: theme.muted }}
                  >
                    {profile.job}
                  </p>
                )}
              </div>
            </div>

            {profile.bio && (
              <p
                className="mb-5 text-sm leading-6"
                style={{ color: theme.muted }}
              >
                {profile.bio}
              </p>
            )}

            <div className="flex gap-3">
              {profile.phone && (
                <ActionButton
                  href={`tel:${profile.phone}`}
                  primary
                  accent={theme.accent}
                >
                  ☎️ Appeler
                </ActionButton>
              )}

              {whatsapp && (
                <ActionButton
                  href={`https://wa.me/${whatsapp}`}
                  accent={theme.accent}
                >
                  💬 WhatsApp
                </ActionButton>
              )}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mt-6">
          <SectionTitle
            icon="✂️"
            title="Nos Services"
            accent={theme.accent}
          />

          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border p-4"
                style={{
                  background: theme.soft,
                  borderColor: `${theme.accent}20`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{
                        background: `${theme.accent}18`,
                      }}
                    >
                      {service.icon}
                    </div>

                    <div>
                      <h3 className="font-bold">{service.name}</h3>

                      <p
                        className="mt-1 text-xs leading-5"
                        style={{ color: theme.muted }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className="whitespace-nowrap text-xs font-bold"
                    style={{ color: theme.accent }}
                  >
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        {profile.address && (
          <section
            className="mt-6 rounded-2xl border p-4"
            style={{
              background: theme.soft,
              borderColor: `${theme.accent}20`,
            }}
          >
            <SectionTitle
              icon="📍"
              title="Nous trouver"
              accent={theme.accent}
            />

            <p
              className="text-sm leading-6"
              style={{ color: theme.muted }}
            >
              {profile.address}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl px-4 py-3 text-center text-sm font-bold"
              style={{
                background: theme.accent,
                color: "#111111",
              }}
            >
              📍 Ouvrir dans Google Maps
            </a>
          </section>
        )}

        {/* Socials */}
        <SocialSection profile={profile} theme={theme} />

        {/* Save Contact */}
        <SaveContact profile={profile} theme={theme} />

        <Footer theme={theme} />
      </div>
    </main>
  );
}

function GenericTemplate({
  profile,
  theme,
}: {
  profile: Profile;
  theme: (typeof themes)[string];
}) {
  const whatsapp = profile.whatsapp
    ? normalizeWhatsApp(profile.whatsapp)
    : profile.phone
      ? normalizeWhatsApp(profile.phone)
      : "";

  const category = profile.category || "business";

  const content: Record<
    string,
    {
      section: string;
      icon: string;
      title: string;
      description: string;
    }
  > = {
    makeup: {
      section: "Prestations",
      icon: "💄",
      title: "Beauty Studio",
      description:
        "Maquillage, événements, cérémonies et prestations beauté personnalisées.",
    },

    "real-estate": {
      section: "Immobilier",
      icon: "🏠",
      title: "Votre projet immobilier",
      description:
        "Accompagnement pour achat, vente, location et recherche de biens.",
    },

    restaurant: {
      section: "À la carte",
      icon: "🍽️",
      title: "Découvrez notre univers",
      description:
        "Une expérience pensée autour de nos plats, notre service et notre savoir-faire.",
    },

    gym: {
      section: "Prestations",
      icon: "🏋️",
      title: "Fitness & Coaching",
      description:
        "Coaching personnalisé, programmes sportifs et accompagnement vers vos objectifs.",
    },

    photographer: {
      section: "Portfolio",
      icon: "📸",
      title: "Création visuelle",
      description:
        "Photographie, événements, portraits et projets créatifs.",
    },

    shop: {
      section: "Boutique",
      icon: "🛍️",
      title: "Découvrez nos produits",
      description:
        "Une sélection de produits et services choisis avec soin.",
    },

    business: {
      section: "À propos",
      icon: "◆",
      title: "Digital Business Card",
      description:
        "Retrouvez toutes les informations professionnelles et les moyens de contact.",
    },
  };

  const info = content[category] || content.business;

  return (
    <main
      className="min-h-screen px-4 py-6 sm:px-6"
      style={{
        background: theme.bg,
        color: theme.text,
      }}
    >
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div
            className="text-xs font-black tracking-[0.25em]"
            style={{ color: theme.accent }}
          >
            TAVIXO
          </div>

          <div
            className="rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.15em]"
            style={{
              background: `${theme.accent}18`,
              color: theme.accent,
            }}
          >
            {theme.label}
          </div>
        </div>

        {/* Profile */}
        <section
          className="rounded-[32px] border p-6 text-center"
          style={{
            background: theme.soft,
            borderColor: `${theme.accent}25`,
          }}
        >
          {profile.photo_url ? (
            <img
              src={profile.photo_url}
              alt={profile.name}
              className="mx-auto h-28 w-28 rounded-[28px] object-cover"
              style={{
                border: `2px solid ${theme.accent}`,
              }}
            />
          ) : (
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-[28px] text-4xl font-black"
              style={{
                background: theme.accent,
                color: "#111111",
              }}
            >
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}

          <p
            className="mt-5 text-[10px] font-bold tracking-[0.25em]"
            style={{ color: theme.accent }}
          >
            {theme.icon} {theme.label}
          </p>

          <h1 className="mt-2 text-3xl font-black">
            {profile.name}
          </h1>

          {profile.job && (
            <p
              className="mt-2 text-sm"
              style={{ color: theme.muted }}
            >
              {profile.job}
            </p>
          )}

          {profile.bio && (
            <p
              className="mx-auto mt-4 max-w-sm text-sm leading-6"
              style={{ color: theme.muted }}
            >
              {profile.bio}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            {profile.phone && (
              <ActionButton
                href={`tel:${profile.phone}`}
                primary
                accent={theme.accent}
              >
                ☎️ Appeler
              </ActionButton>
            )}

            {whatsapp && (
              <ActionButton
                href={`https://wa.me/${whatsapp}`}
                accent={theme.accent}
              >
                💬 WhatsApp
              </ActionButton>
            )}
          </div>
        </section>

        {/* Profession section */}
        <section className="mt-6">
          <SectionTitle
            icon={info.icon}
            title={info.section}
            accent={theme.accent}
          />

          <div
            className="rounded-2xl border p-5"
            style={{
              background: theme.soft,
              borderColor: `${theme.accent}20`,
            }}
          >
            <h2 className="text-xl font-black">{info.title}</h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: theme.muted }}
            >
              {info.description}
            </p>

            {category === "real-estate" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniCard
                  title="Achat"
                  icon="🏠"
                  theme={theme}
                />
                <MiniCard
                  title="Vente"
                  icon="💰"
                  theme={theme}
                />
                <MiniCard
                  title="Location"
                  icon="🔑"
                  theme={theme}
                />
                <MiniCard
                  title="Conseil"
                  icon="📋"
                  theme={theme}
                />
              </div>
            )}

            {category === "makeup" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniCard
                  title="Makeup"
                  icon="💄"
                  theme={theme}
                />
                <MiniCard
                  title="Bridal"
                  icon="👰"
                  theme={theme}
                />
                <MiniCard
                  title="Events"
                  icon="✨"
                  theme={theme}
                />
                <MiniCard
                  title="Beauty"
                  icon="🌸"
                  theme={theme}
                />
              </div>
            )}

            {category === "restaurant" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniCard
                  title="Entrées"
                  icon="🥗"
                  theme={theme}
                />
                <MiniCard
                  title="Plats"
                  icon="🍽️"
                  theme={theme}
                />
                <MiniCard
                  title="Desserts"
                  icon="🍰"
                  theme={theme}
                />
                <MiniCard
                  title="Boissons"
                  icon="🥤"
                  theme={theme}
                />
              </div>
            )}

            {category === "gym" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniCard
                  title="Coaching"
                  icon="🏋️"
                  theme={theme}
                />
                <MiniCard
                  title="Fitness"
                  icon="🔥"
                  theme={theme}
                />
                <MiniCard
                  title="Programme"
                  icon="📋"
                  theme={theme}
                />
                <MiniCard
                  title="Suivi"
                  icon="📈"
                  theme={theme}
                />
              </div>
            )}

            {category === "photographer" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniCard
                  title="Portrait"
                  icon="📸"
                  theme={theme}
                />
                <MiniCard
                  title="Events"
                  icon="🎉"
                  theme={theme}
                />
                <MiniCard
                  title="Mariage"
                  icon="💍"
                  theme={theme}
                />
                <MiniCard
                  title="Studio"
                  icon="🎞️"
                  theme={theme}
                />
              </div>
            )}

            {category === "shop" && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniCard
                  title="Produits"
                  icon="🛍️"
                  theme={theme}
                />
                <MiniCard
                  title="Nouveautés"
                  icon="✨"
                  theme={theme}
                />
                <MiniCard
                  title="Collection"
                  icon="⭐"
                  theme={theme}
                />
                <MiniCard
                  title="Contact"
                  icon="💬"
                  theme={theme}
                />
              </div>
            )}
          </div>
        </section>

        {/* Location */}
        {profile.address && (
          <section
            className="mt-6 rounded-2xl border p-4"
            style={{
              background: theme.soft,
              borderColor: `${theme.accent}20`,
            }}
          >
            <SectionTitle
              icon="📍"
              title="Localisation"
              accent={theme.accent}
            />

            <p
              className="text-sm leading-6"
              style={{ color: theme.muted }}
            >
              {profile.address}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl px-4 py-3 text-center text-sm font-bold"
              style={{
                background: theme.accent,
                color:
                  category === "gym" ||
                  category === "business" ||
                  category === "real-estate"
                    ? "#FFFFFF"
                    : "#111111",
              }}
            >
              📍 Voir sur Google Maps
            </a>
          </section>
        )}

        <SocialSection profile={profile} theme={theme} />

        <SaveContact profile={profile} theme={theme} />

        <Footer theme={theme} />
      </div>
    </main>
  );
}

function MiniCard({
  title,
  icon,
  theme,
}: {
  title: string;
  icon: string;
  theme: (typeof themes)[string];
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: `${theme.accent}18`,
        background: `${theme.bg}70`,
      }}
    >
      <div className="text-xl">{icon}</div>

      <p
        className="mt-2 text-xs font-bold"
        style={{ color: theme.text }}
      >
        {title}
      </p>
    </div>
  );
}

function SocialSection({
  profile,
  theme,
}: {
  profile: Profile;
  theme: (typeof themes)[string];
}) {
  const socials = getSocialLinks(profile);

  if (socials.length === 0) return null;

  return (
    <section className="mt-6">
      <SectionTitle
        icon="🔗"
        title="Réseaux & Contact"
        accent={theme.accent}
      />

      <div className="grid grid-cols-2 gap-3">
        {socials.map((social) => {
          let href = social.value!;

          if (
            social.name === "Instagram" &&
            !href.startsWith("http")
          ) {
            href = `https://instagram.com/${href.replace("@", "")}`;
          }

          if (
            social.name === "Facebook" &&
            !href.startsWith("http")
          ) {
            href = `https://facebook.com/${href}`;
          }

          if (
            social.name === "LinkedIn" &&
            !href.startsWith("http")
          ) {
            href = `https://linkedin.com/in/${href}`;
          }

          if (
            social.name === "Website" &&
            !href.startsWith("http")
          ) {
            href = `https://${href}`;
          }

          return (
            <a
              key={social.name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border p-4 transition hover:-translate-y-0.5"
              style={{
                background: theme.soft,
                borderColor: `${theme.accent}20`,
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
                style={{
                  background: `${theme.accent}18`,
                  color: theme.accent,
                }}
              >
                {social.icon}
              </span>

              <span className="text-sm font-bold">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function SaveContact({
  profile,
  theme,
}: {
  profile: Profile;
  theme: (typeof themes)[string];
}) {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    profile.job ? `TITLE:${profile.job}` : "",
    profile.phone ? `TEL:${profile.phone}` : "",
    profile.website ? `URL:${profile.website}` : "",
    profile.address ? `ADR:;;${profile.address}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");

  const href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;

  return (
    <section className="mt-6">
      <a
        href={href}
        download={`${profile.slug || "contact"}.vcf`}
        className="block rounded-2xl border p-4 text-center text-sm font-bold transition hover:-translate-y-0.5"
        style={{
          borderColor: `${theme.accent}30`,
          background: `${theme.accent}10`,
          color: theme.accent,
        }}
      >
        📲 Enregistrer le contact
      </a>
    </section>
  );
}

function Footer({
  theme,
}: {
  theme: (typeof themes)[string];
}) {
  return (
    <footer className="py-8 text-center">
      <div
        className="text-[10px] font-black tracking-[0.3em]"
        style={{ color: theme.accent }}
      >
        TAVIXO
      </div>

      <p
        className="mt-2 text-[10px]"
        style={{ color: theme.muted }}
      >
        Digital identity made simple.
      </p>
    </footer>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !profile) {
    notFound();
  }

  const currentProfile = profile as Profile;

  const category = currentProfile.category || "business";

  const theme = themes[category] || themes.business;

  if (category === "barber") {
    return (
      <BarberTemplate
        profile={currentProfile}
        theme={theme}
      />
    );
  }

  return (
    <GenericTemplate
      profile={currentProfile}
      theme={theme}
    />
  );
}