"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  created_at: string;
};

type ProfileTab = "contact" | "social" | "business";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [profileTab, setProfileTab] = useState<ProfileTab>("contact");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoadingProducts(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SUPABASE PRODUCTS ERROR:", error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoadingProducts(false);
  }

  return (
    <main className="min-h-screen bg-[#F7FAFC] text-[#151A21]">

      {/* ========================================================= */}
      {/* HEADER                                                    */}
      {/* ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-[#0B1F3A]/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">

          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg font-black text-[#00D4FF] shadow-lg">
              T
            </div>

            <div>
              <p className="text-xl font-black tracking-[0.18em] text-[#0B1F3A]">
                TAVIXO
              </p>

              <p className="text-[9px] font-bold tracking-[0.25em] text-[#151A21]/40">
                DIGITAL IDENTITY
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a
              href="#products"
              className="transition hover:text-[#00A9CC]"
            >
              Cartes
            </a>

            <a
              href="#how"
              className="transition hover:text-[#00A9CC]"
            >
              Comment ça marche
            </a>

            <a
              href="#profile"
              className="transition hover:text-[#00A9CC]"
            >
              Profil digital
            </a>

            <a
              href="#faq"
              className="transition hover:text-[#00A9CC]"
            >
              FAQ
            </a>
          </nav>

          <a
            href="#products"
            className="rounded-full bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00D4FF] hover:text-[#0B1F3A]"
          >
            Choisir ma carte
          </a>
        </div>
      </header>


      {/* ========================================================= */}
      {/* HERO                                                      */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-[#0B1F3A]">

        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D4FF]/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 md:grid-cols-2 md:px-6 md:py-28">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/10 px-4 py-2 text-[11px] font-black tracking-[0.18em] text-[#00D4FF]">

              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />

              PROFESSIONAL DIGITAL IDENTITY

            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">

              Votre identité
              <br />

              <span className="text-[#00D4FF]">
                professionnelle.
              </span>

              <br />

              En un simple Tap.

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60 md:text-xl">
              Partagez votre contact, WhatsApp, Instagram, LinkedIn et plus —
              instantanément, sans application.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/60">

              <span className="flex items-center gap-2">
                <span className="text-[#00D4FF]">✓</span>
                Network faster
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#00D4FF]">✓</span>
                Look professional
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#00D4FF]">✓</span>
                Never lose a contact
              </span>

            </div>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#products"
                className="rounded-full bg-[#00D4FF] px-7 py-4 font-black text-[#0B1F3A] shadow-xl shadow-[#00D4FF]/10 transition duration-300 hover:-translate-y-1 hover:bg-[#45DEFF]"
              >
                Découvrir les cartes →
              </a>

              <a
                href="#how"
                className="rounded-full border border-white/15 px-7 py-4 font-bold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Voir comment ça marche
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-wider text-white/55">
                NFC
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-wider text-white/55">
                SANS APPLICATION
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-wider text-white/55">
                PROFIL DIGITAL
              </span>

            </div>

          </div>


          {/* HERO PRODUCT */}

          <div className="flex justify-center">

            <div className="relative w-full max-w-lg">

              <div className="absolute inset-0 rounded-[50px] bg-[#00D4FF]/15 blur-3xl" />

              <div className="relative aspect-[1.6] rotate-[-5deg] overflow-hidden rounded-[32px] border border-white/10 bg-[#151A21] p-8 shadow-2xl transition duration-700 hover:rotate-0">

                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#00D4FF]/10 bg-[#00D4FF]/5 blur-xl" />

                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#00D4FF]/5 blur-3xl" />

                <div className="relative flex items-start justify-between">

                  <div>
                    <p className="text-[9px] font-bold tracking-[0.35em] text-white/30">
                      PROFESSIONAL IDENTITY
                    </p>

                    <p className="mt-4 text-3xl font-black tracking-[0.08em] text-white">
                      TAVIXO
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00D4FF] text-xs font-black text-[#0B1F3A] shadow-lg shadow-[#00D4FF]/20">
                    NFC
                  </div>

                </div>

                <div className="absolute left-8 top-1/2 -translate-y-1/2">

                  <p className="text-xs font-bold tracking-[0.25em] text-white/30">
                    SHARE YOUR IDENTITY
                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <div className="h-1 w-16 rounded-full bg-[#00D4FF]" />

                    <span className="text-[10px] font-bold text-[#00D4FF]">
                      INSTANT
                    </span>

                  </div>

                </div>

                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">

                  <div>
                    <p className="text-[9px] tracking-[0.2em] text-white/25">
                      YOUR NETWORK
                    </p>

                    <p className="mt-1 text-sm font-bold text-white/70">
                      ONE TAP AWAY
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00D4FF]/30 text-xs text-[#00D4FF]">
                    ↗
                  </div>

                </div>

              </div>

              <div className="absolute -bottom-6 -right-2 rounded-2xl border border-white/10 bg-[#151A21]/90 px-5 py-4 shadow-xl backdrop-blur-xl md:-right-8">

                <p className="text-[9px] font-black tracking-[0.2em] text-white/35">
                  YOUR DIGITAL IDENTITY
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  Everything in one place.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* TRUST BAR                                                 */}
      {/* ========================================================= */}

      <section className="border-b border-[#0B1F3A]/10 bg-white">

        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {[
            ["✓", "Paiement sécurisé", "Commandez en toute confiance"],
            ["🚚", "Livraison au Maroc", "Partout au Maroc"],
            ["✦", "Personnalisation incluse", "Votre identité, votre profil"],
            ["◎", "Profil digital inclus", "Prêt à partager"],
            ["?", "Support client", "Nous sommes à votre écoute"],
          ].map(([icon, title, text]) => (

            <div
              key={title}
              className="group flex items-center gap-3 rounded-2xl border border-[#0B1F3A]/5 bg-[#F7FAFC] p-4 transition hover:-translate-y-1 hover:border-[#00A9CC]/20 hover:shadow-lg"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg text-[#00D4FF]">
                {icon}
              </div>

              <div>
                <p className="text-sm font-black text-[#0B1F3A]">
                  {title}
                </p>

                <p className="mt-0.5 text-[11px] text-[#151A21]/40">
                  {text}
                </p>
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ========================================================= */}
      {/* PRODUCTS                                                  */}
      {/* ========================================================= */}

      <section
        id="products"
        className="bg-[#F7FAFC] px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              TAVIXO CARDS
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#0B1F3A] md:text-5xl">
              Plus qu'une carte.
              <br />
              <span className="text-[#00A9CC]">
                Votre réseau professionnel.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#151A21]/50">
              Une carte Tavixo vous permet de transformer chaque rencontre
              en connexion. Présentez-vous professionnellement, partagez vos
              informations et gardez votre réseau accessible à tout moment.
            </p>

          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">

            {loadingProducts ? (

              <div className="md:col-span-3 rounded-[30px] border border-[#0B1F3A]/10 bg-white py-20 text-center shadow-sm">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0B1F3A]/10 border-t-[#00D4FF]" />

                <p className="mt-5 font-bold text-[#151A21]/40">
                  Chargement des cartes...
                </p>

              </div>

            ) : products.length === 0 ? (

              <div className="md:col-span-3 rounded-[30px] border border-[#0B1F3A]/10 bg-white py-20 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F3A] font-black text-[#00D4FF]">
                  T
                </div>

                <p className="mt-6 text-xl font-black text-[#0B1F3A]">
                  Aucun produit disponible
                </p>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#151A21]/40">
                  Les produits ajoutés depuis votre espace administrateur
                  apparaîtront automatiquement ici.
                </p>

              </div>

            ) : (

              products.map((product) => (

                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[30px] border border-[#0B1F3A]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#0B1F3A]">

                    <div className="absolute h-52 w-52 rounded-full bg-[#00D4FF]/20 blur-3xl" />

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="relative w-64 rotate-[-6deg] rounded-2xl border border-white/10 bg-[#151A21] p-6 shadow-2xl transition duration-500 group-hover:rotate-0">

                        <div className="flex items-center justify-between">

                          <span className="text-xs font-black tracking-[0.25em] text-white/40">
                            TAVIXO
                          </span>

                          <span className="rounded-full bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-black text-[#00D4FF]">
                            NFC
                          </span>

                        </div>

                        <div className="mt-20">

                          <p className="text-xs text-white/30">
                            PROFESSIONAL IDENTITY
                          </p>

                          <p className="mt-2 text-lg font-black text-white">
                            {product.name}
                          </p>

                        </div>

                      </div>

                    )}

                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-black tracking-wider text-white backdrop-blur">
                      SMART IDENTITY
                    </div>

                  </div>

                  <div className="p-7">

                    <div className="flex items-start justify-between gap-4">

                      <h3 className="text-2xl font-black text-[#0B1F3A]">
                        {product.name}
                      </h3>

                      <span className="shrink-0 rounded-full bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-black text-[#00A9CC]">
                        NFC
                      </span>

                    </div>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#151A21]/50">
                      {product.description ||
                        "Une carte Tavixo pensée pour partager votre identité professionnelle et développer votre réseau."}
                    </p>

                    <div className="mt-5 space-y-2">

                      <p className="flex items-center gap-2 text-xs font-bold text-[#151A21]/60">
                        <span className="text-[#00A9CC]">✓</span>
                        Profil digital inclus
                      </p>

                      <p className="flex items-center gap-2 text-xs font-bold text-[#151A21]/60">
                        <span className="text-[#00A9CC]">✓</span>
                        Partage instantané
                      </p>

                      <p className="flex items-center gap-2 text-xs font-bold text-[#151A21]/60">
                        <span className="text-[#00A9CC]">✓</span>
                        Sans application
                      </p>

                    </div>

                    <div className="my-6 h-px bg-[#0B1F3A]/10" />

                    <div className="flex items-end justify-between gap-4">

                      <div>

                        <p className="text-[10px] font-black tracking-wider text-[#151A21]/30">
                          À PARTIR DE
                        </p>

                        <p className="mt-1 text-2xl font-black text-[#0B1F3A]">
                          {product.price} DH
                        </p>

                      </div>

                      <a
                        href={`/order?product=${product.id}`}
                        className="rounded-full bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#00D4FF] hover:text-[#0B1F3A]"
                      >
                        Commander →
                      </a>

                    </div>

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* HOW IT WORKS                                              */}
      {/* ========================================================= */}

      <section
        id="how"
        className="bg-white px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              COMMENT ÇA MARCHE ?
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Une rencontre.
              <br />
              Une connexion.
              <br />
              <span className="text-[#00A9CC]">
                Un simple Tap.
              </span>
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Tavixo transforme une simple carte de visite en une expérience
              de networking digitale.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                label: "TAP",
                title: "Partagez votre identité",
                text: "Approchez votre carte Tavixo du smartphone de votre contact pour partager votre profil.",
              },
              {
                number: "02",
                label: "PROFILE",
                title: "Votre profil s'ouvre",
                text: "Votre page professionnelle apparaît directement dans le navigateur, sans application.",
              },
              {
                number: "03",
                label: "CONNECT",
                title: "Gardez le contact",
                text: "Votre contact peut appeler, vous écrire sur WhatsApp, visiter vos réseaux ou enregistrer vos coordonnées.",
              },
            ].map((step) => (

              <div
                key={step.number}
                className="group relative overflow-hidden rounded-[30px] border border-[#0B1F3A]/10 bg-[#F7FAFC] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#00D4FF]/10 blur-3xl transition group-hover:bg-[#00D4FF]/20" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F3A] font-black text-[#00D4FF] shadow-lg">
                      {step.number}
                    </div>

                    <span className="rounded-full border border-[#00A9CC]/20 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-[#00A9CC]">
                      {step.label}
                    </span>

                  </div>

                  <h3 className="mt-7 text-2xl font-black text-[#0B1F3A]">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#151A21]/50">
                    {step.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* DIGITAL PROFILE — INTERACTIVE PRODUCT EXPERIENCE          */}
      {/* ========================================================= */}

      <section
        id="profile"
        className="relative overflow-hidden bg-[#0B1F3A] px-5 py-24 text-white md:px-6"
      >

        {/* Background */}

        <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          {/* ===================================================== */}
          {/* INTRO                                                 */}
          {/* ===================================================== */}

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/10 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-[#00D4FF]">

              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />

              YOUR TAVIXO PROFILE

            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">

              Your profile.
              <br />

              <span className="text-[#00D4FF]">
                Your professional identity.
              </span>

            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
              Votre carte Tavixo donne accès à un profil digital professionnel
              où vos coordonnées, réseaux sociaux et informations importantes
              sont réunis au même endroit.
            </p>

          </div>


          {/* ===================================================== */}
          {/* INTERACTIVE PROFILE EXPERIENCE                       */}
          {/* ===================================================== */}

          <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_430px]">


            {/* =================================================== */}
            {/* LEFT — PRODUCT BENEFITS                             */}
            {/* =================================================== */}

            <div>

              <p className="text-xs font-black tracking-[0.25em] text-white/35">
                EVERYTHING YOUR CONTACT NEEDS
              </p>

              <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight md:text-4xl">
                One profile.
                <br />
                Every connection.
              </h3>

              <p className="mt-5 max-w-xl leading-7 text-white/45">
                Au lieu d'échanger plusieurs informations une par une,
                votre contact découvre tout votre univers professionnel
                depuis une seule page.
              </p>


              {/* Interactive tabs */}

              <div className="mt-9 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() => setProfileTab("contact")}
                  className={`rounded-full px-5 py-3 text-sm font-black transition ${
                    profileTab === "contact"
                      ? "bg-[#00D4FF] text-[#0B1F3A] shadow-lg shadow-[#00D4FF]/10"
                      : "border border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Contact
                </button>

                <button
                  type="button"
                  onClick={() => setProfileTab("social")}
                  className={`rounded-full px-5 py-3 text-sm font-black transition ${
                    profileTab === "social"
                      ? "bg-[#00D4FF] text-[#0B1F3A] shadow-lg shadow-[#00D4FF]/10"
                      : "border border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Social
                </button>

                <button
                  type="button"
                  onClick={() => setProfileTab("business")}
                  className={`rounded-full px-5 py-3 text-sm font-black transition ${
                    profileTab === "business"
                      ? "bg-[#00D4FF] text-[#0B1F3A] shadow-lg shadow-[#00D4FF]/10"
                      : "border border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Business
                </button>

              </div>


              {/* Dynamic benefit cards */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {profileTab === "contact" && (
                  <>
                    <ProfileFeature
                      icon="📇"
                      title="Your contact"
                      text="Vos coordonnées professionnelles toujours accessibles."
                    />

                    <ProfileFeature
                      icon="💬"
                      title="WhatsApp"
                      text="Votre contact peut vous écrire directement."
                    />

                    <ProfileFeature
                      icon="✓"
                      title="Save Contact"
                      text="Enregistrez vos coordonnées en quelques secondes."
                    />

                    <ProfileFeature
                      icon="📞"
                      title="Call"
                      text="Un simple clic pour vous appeler."
                    />
                  </>
                )}

                {profileTab === "social" && (
                  <>
                    <ProfileFeature
                      icon="📸"
                      title="Instagram"
                      text="Montrez votre présence et votre univers."
                    />

                    <ProfileFeature
                      icon="💼"
                      title="LinkedIn"
                      text="Développez votre réseau professionnel."
                    />

                    <ProfileFeature
                      icon="🌐"
                      title="Website"
                      text="Votre site accessible depuis votre profil."
                    />

                    <ProfileFeature
                      icon="↗"
                      title="Social links"
                      text="Centralisez vos différents réseaux."
                    />
                  </>
                )}

                {profileTab === "business" && (
                  <>
                    <ProfileFeature
                      icon="🏢"
                      title="Business"
                      text="Présentez clairement votre activité."
                    />

                    <ProfileFeature
                      icon="✦"
                      title="Professional"
                      text="Une identité moderne et crédible."
                    />

                    <ProfileFeature
                      icon="🌐"
                      title="Website"
                      text="Dirigez vos contacts vers votre activité."
                    />

                    <ProfileFeature
                      icon="📇"
                      title="Contact"
                      text="Toutes vos informations au même endroit."
                    />
                  </>
                )}

              </div>


              {/* Main value proposition */}

              <div className="mt-8 rounded-[24px] border border-[#00D4FF]/20 bg-[#00D4FF]/5 p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#00D4FF] text-xl font-black text-[#0B1F3A]">
                    T
                  </div>

                  <div>

                    <p className="font-black text-[#00D4FF]">
                      Your professional identity, in one place.
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      Tavixo ne vend pas seulement une carte NFC.
                      Tavixo vous donne une façon plus simple de vous
                      présenter, partager vos informations et développer
                      votre réseau.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================== */}
            {/* RIGHT — LIVE PROFILE PREVIEW                        */}
            {/* =================================================== */}

            <div className="flex justify-center lg:justify-end">

              <div className="w-full max-w-[390px]">

                {/* Browser label */}

                <div className="mb-4 flex items-center justify-between px-3">

                  <p className="text-[10px] font-black tracking-[0.2em] text-white/30">
                    LIVE PROFILE PREVIEW
                  </p>

                  <span className="flex items-center gap-2 text-[10px] font-bold text-white/30">

                    <span className="h-2 w-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />

                    ONLINE

                  </span>

                </div>


                {/* Phone */}

                <div className="rounded-[42px] border border-white/10 bg-[#151A21] p-3 shadow-2xl shadow-black/30">

                  <div className="overflow-hidden rounded-[32px] bg-white text-[#0B1F3A]">


                    {/* Profile top */}

                    <div className="relative overflow-hidden bg-[#0B1F3A] px-6 pb-7 pt-8 text-center text-white">

                      <div className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 rounded-full bg-[#00D4FF]/20 blur-3xl" />

                      <div className="absolute right-[-50px] top-[-50px] h-32 w-32 rounded-full border border-[#00D4FF]/10" />

                      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#00D4FF]/30 bg-[#151A21] text-3xl font-black text-[#00D4FF] shadow-xl">
                        M
                      </div>

                      <p className="relative mt-4 text-2xl font-black">
                        Mohamed
                      </p>

                      <p className="relative mt-1 text-sm text-white/50">
                        Entrepreneur • Business
                      </p>

                      <div className="relative mx-auto mt-4 inline-flex rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/10 px-4 py-1.5 text-[9px] font-black tracking-wider text-[#00D4FF]">
                        TAVIXO DIGITAL PROFILE
                      </div>

                    </div>


                    {/* Profile body */}

                    <div className="p-5">

                      <div className="rounded-2xl bg-[#F7FAFC] p-4 text-center">

                        <p className="text-xs font-black uppercase tracking-[0.15em] text-[#151A21]/30">
                          Professional identity
                        </p>

                        <p className="mt-2 text-sm font-bold text-[#0B1F3A]">
                          Bonjour, je suis Mohamed.
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#151A21]/40">
                          Retrouvez toutes mes coordonnées professionnelles
                          au même endroit.
                        </p>

                      </div>


                      {/* Dynamic profile items */}

                      <div className="mt-4 space-y-3">


                        {/* CONTACT TAB */}

                        {profileTab === "contact" && (
                          <>
                            <ProfileLink
                              icon="📞"
                              title="Phone"
                              subtitle="+212 6 XX XX XX XX"
                              href="tel:+212600000000"
                            />

                            <ProfileLink
                              icon="💬"
                              title="WhatsApp"
                              subtitle="Envoyer un message"
                              href="https://wa.me/212600000000"
                              external
                            />

                            <ProfileLink
                              icon="✓"
                              title="Save Contact"
                              subtitle="Enregistrer mes coordonnées"
                              href="#save"
                            />
                          </>
                        )}


                        {/* SOCIAL TAB */}

                        {profileTab === "social" && (
                          <>
                            <ProfileLink
                              icon="📸"
                              title="Instagram"
                              subtitle="@mohamed"
                              href="https://instagram.com/"
                              external
                            />

                            <ProfileLink
                              icon="💼"
                              title="LinkedIn"
                              subtitle="Voir mon profil"
                              href="#linkedin"
                            />

                            <ProfileLink
                              icon="🌐"
                              title="Website"
                              subtitle="Visiter mon site"
                              href="#website"
                            />
                          </>
                        )}


                        {/* BUSINESS TAB */}

                        {profileTab === "business" && (
                          <>
                            <ProfileLink
                              icon="🏢"
                              title="Business"
                              subtitle="Entrepreneur"
                              href="#business"
                            />

                            <ProfileLink
                              icon="🌐"
                              title="Website"
                              subtitle="Visiter mon entreprise"
                              href="#website"
                            />

                            <ProfileLink
                              icon="💼"
                              title="LinkedIn"
                              subtitle="Profil professionnel"
                              href="#linkedin"
                            />

                            <ProfileLink
                              icon="📞"
                              title="Contact"
                              subtitle="Parler avec moi"
                              href="tel:+212600000000"
                            />
                          </>
                        )}

                      </div>


                      {/* Save contact CTA */}

                      <button
                        type="button"
                        onClick={() => {
                          alert(
                            "Le téléchargement du contact sera disponible sur votre profil Tavixo."
                          );
                        }}
                        className="mt-4 w-full rounded-2xl bg-[#00D4FF] px-5 py-4 text-sm font-black text-[#0B1F3A] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#45DEFF]"
                      >
                        + Enregistrer le contact
                      </button>


                      {/* Profile footer */}

                      <div className="mt-5 flex items-center justify-center gap-2">

                        <div className="h-1 w-1 rounded-full bg-[#00A9CC]" />

                        <p className="text-[9px] font-black tracking-[0.15em] text-[#151A21]/25">
                          POWERED BY TAVIXO
                        </p>

                        <div className="h-1 w-1 rounded-full bg-[#00A9CC]" />

                      </div>

                    </div>

                  </div>

                </div>


                {/* Bottom explanation */}

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">

                  <p className="text-xs font-black text-white">
                    This is your Tavixo Profile.
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/35">
                    Chaque personne qui scanne votre carte peut accéder
                    à cette expérience.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* WHY TAVIXO                                                */}
      {/* ========================================================= */}

      <section
        id="about"
        className="bg-[#F7FAFC] px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              POURQUOI TAVIXO ?
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Une identité pensée pour le digital
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Une expérience simple et professionnelle pour transformer
              chaque rencontre en opportunité.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Network faster",
                text: "Partagez votre identité professionnelle en quelques secondes au lieu d'échanger plusieurs informations manuellement.",
              },
              {
                number: "02",
                title: "Look professional",
                text: "Présentez une identité digitale moderne qui rassemble vos coordonnées et vos réseaux au même endroit.",
              },
              {
                number: "03",
                title: "Never lose a contact",
                text: "Votre contact peut enregistrer vos coordonnées et retrouver facilement votre profil après votre rencontre.",
              },
            ].map((feature) => (

              <div
                key={feature.number}
                className="rounded-[28px] border border-[#0B1F3A]/10 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex items-center justify-between">

                  <span className="text-sm font-black text-[#00A9CC]">
                    {feature.number}
                  </span>

                  <div className="h-2 w-2 rounded-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF]" />

                </div>

                <h3 className="mt-6 text-2xl font-black text-[#0B1F3A]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-[#151A21]/50">
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-8 rounded-[28px] border border-[#00A9CC]/15 bg-[#00D4FF]/5 p-7 text-center">

            <p className="text-sm font-bold text-[#0B1F3A]">
              💡 NFC = Technology. Your professional identity = The product.
            </p>

            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-[#151A21]/50">
              Tavixo ne se limite pas à une carte NFC. C'est une nouvelle
              façon de présenter, partager et développer votre réseau
              professionnel.
            </p>

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* FAQ                                                       */}
      {/* ========================================================= */}

      <section
        id="faq"
        className="bg-white px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Les questions fréquentes
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#151A21]/50">
              Tout ce qu'il faut savoir avant de choisir votre carte Tavixo.
            </p>

          </div>

          <div className="mt-12 space-y-4">

            {[
              {
                question: "Est-ce qu'il faut installer une application ?",
                answer:
                  "Non. Votre profil digital s'ouvre directement dans le navigateur du téléphone.",
              },
              {
                question: "Est-ce que Tavixo fonctionne avec iPhone ?",
                answer:
                  "Oui. Les iPhone compatibles NFC peuvent utiliser la carte Tavixo pour ouvrir votre profil digital.",
              },
              {
                question: "Est-ce que Tavixo fonctionne avec Android ?",
                answer:
                  "Oui. Les smartphones Android équipés du NFC peuvent également utiliser Tavixo.",
              },
              {
                question: "Que se passe-t-il si le NFC est désactivé ?",
                answer:
                  "Vous pouvez toujours partager votre profil digital avec son lien. Votre identité reste donc accessible.",
              },
              {
                question: "Qu'est-ce que je peux mettre dans mon profil ?",
                answer:
                  "Téléphone, WhatsApp, Instagram, LinkedIn, email, site web et autres informations professionnelles.",
              },
              {
                question: "Le profil digital est-il inclus avec la carte ?",
                answer:
                  "Oui. Le profil digital fait partie de l'expérience Tavixo et permet de centraliser vos informations professionnelles.",
              },
              {
                question: "Comment commander une carte Tavixo ?",
                answer:
                  "Choisissez votre carte dans la section Produits, cliquez sur Commander et remplissez vos informations.",
              },
            ].map((item) => (

              <details
                key={item.question}
                className="group rounded-[24px] border border-[#0B1F3A]/10 bg-[#F7FAFC] p-6 transition hover:border-[#00A9CC]/30"
              >

                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black text-[#0B1F3A]">

                  <span>
                    {item.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-[#00D4FF] transition group-open:rotate-45">
                    +
                  </span>

                </summary>

                <p className="mt-4 max-w-3xl leading-7 text-[#151A21]/50">
                  {item.answer}
                </p>

              </details>

            ))}

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* FINAL CTA                                                 */}
      {/* ========================================================= */}

      <section className="bg-[#151A21] px-5 py-20 md:px-6">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[35px] bg-[#0B1F3A] p-10 text-center shadow-2xl md:p-16">

          <p className="text-xs font-black tracking-[0.3em] text-[#00D4FF]">
            TAVIXO
          </p>

          <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
            Network faster.
            <br />
            Look professional.
            <br />
            Never lose a contact.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/50">
            Transformez votre carte de visite en une identité professionnelle
            digitale et partagez tout ce qui compte en un simple Tap.
          </p>

          <a
            href="#products"
            className="mt-8 inline-block rounded-full bg-[#00D4FF] px-8 py-4 font-black text-[#0B1F3A] shadow-xl transition hover:-translate-y-1 hover:bg-[#45DEFF]"
          >
            Choisir ma carte →
          </a>

        </div>

      </section>


      {/* ========================================================= */}
      {/* FOOTER                                                    */}
      {/* ========================================================= */}

      <footer
        id="contact"
        className="bg-[#0B1F3A] px-5 py-10 text-white md:px-6"
      >

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">

          <div>

            <p className="text-xl font-black tracking-[0.2em]">
              TAVIXO
            </p>

            <p className="mt-2 text-sm text-white/30">
              Digital Professional Identity
            </p>

          </div>

          <div className="text-center md:text-right">

            <p className="text-sm text-white/40">
              Commandes via WhatsApp
            </p>

            <p className="mt-1 text-sm font-bold text-[#00D4FF]">
              +212 708 149 111
            </p>

          </div>

          <p className="text-xs text-white/25">
            © 2026 Tavixo. Tous droits réservés.
          </p>

        </div>

      </footer>

    </main>
  );
}


/* =============================================================== */
/* PROFILE FEATURE COMPONENT                                       */
/* =============================================================== */

function ProfileFeature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#00D4FF]/30 hover:bg-white/10">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-lg transition group-hover:bg-[#00D4FF]/20">
          {icon}
        </div>

        <div>

          <p className="font-black text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-white/40">
            {text}
          </p>

        </div>

      </div>

    </div>
  );
}


/* =============================================================== */
/* PROFILE LINK COMPONENT                                          */
/* =============================================================== */

function ProfileLink({
  icon,
  title,
  subtitle,
  href,
  external = false,
}: {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl bg-[#F7FAFC] px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[#EAFBFF] hover:shadow-sm"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg transition group-hover:scale-105">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-black">
          {title}
        </p>

        <p className="truncate text-xs text-[#151A21]/40">
          {subtitle}
        </p>

      </div>

      <span className="text-[#00A9CC] transition group-hover:translate-x-1">
        →
      </span>

    </a>
  );
}