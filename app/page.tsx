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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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

      {/* HEADER */}
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
              href="#about"
              className="transition hover:text-[#00A9CC]"
            >
              Pourquoi Tavixo
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
      {/* HERO — BRAND POSITIONING                                  */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-[#0B1F3A]">

        {/* Background glow */}
        <div className="absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 md:grid-cols-2 md:px-6 md:py-28">

          {/* LEFT — MESSAGE */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/10 px-4 py-2 text-[11px] font-black tracking-[0.18em] text-[#00D4FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              DIGITAL IDENTITY • NFC
            </div>

            {/* Main headline */}
            <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.03em] text-white md:text-7xl">

              Votre identité
              <br />

              <span className="text-[#00D4FF]">
                professionnelle.
              </span>

              <br />

              <span className="text-white">
                En un simple tap.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60 md:text-xl">
              Partagez vos coordonnées, réseaux sociaux et informations
              professionnelles instantanément avec une carte Tavixo.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#products"
                className="rounded-full bg-[#00D4FF] px-7 py-4 font-black text-[#0B1F3A] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#45DEFF]"
              >
                Découvrir les cartes →
              </a>

              <a
                href="#how"
                className="rounded-full border border-white/15 px-7 py-4 font-bold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Comment ça marche
              </a>

            </div>

            {/* Benefits */}
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/45">

              <span className="flex items-center gap-2">
                <span className="text-[#00D4FF]">✓</span>
                Sans application
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#00D4FF]">✓</span>
                Partage instantané
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#00D4FF]">✓</span>
                Profil digital
              </span>

            </div>

          </div>


          {/* RIGHT — PRODUCT VISUAL */}
          <div className="flex justify-center">

            <div className="relative w-full max-w-lg">

              {/* Glow */}
              <div className="absolute inset-0 rounded-[50px] bg-[#00D4FF]/15 blur-3xl" />

              {/* Card */}
              <div className="relative aspect-[1.6] rotate-[-5deg] overflow-hidden rounded-[32px] border border-white/10 bg-[#151A21] p-8 shadow-2xl transition duration-700 hover:rotate-0">

                {/* Decorative circle */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#00D4FF]/10 bg-[#00D4FF]/5 blur-xl" />

                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#00D4FF]/5 blur-3xl" />

                {/* Top */}
                <div className="relative flex items-start justify-between">

                  <div>

                    <p className="text-[9px] font-bold tracking-[0.35em] text-white/30">
                      DIGITAL PROFESSIONAL IDENTITY
                    </p>

                    <p className="mt-4 text-3xl font-black tracking-[0.08em] text-white">
                      TAVIXO
                    </p>

                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00D4FF] text-xs font-black text-[#0B1F3A] shadow-lg shadow-[#00D4FF]/20">
                    NFC
                  </div>

                </div>

                {/* Center */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2">

                  <p className="text-xs font-bold tracking-[0.25em] text-white/30">
                    TAP TO CONNECT
                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <div className="h-1 w-16 rounded-full bg-[#00D4FF]" />

                    <span className="text-[10px] font-bold text-[#00D4FF]">
                      INSTANT
                    </span>

                  </div>

                </div>

                {/* Bottom */}
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">

                  <div>
                    <p className="text-[9px] tracking-[0.2em] text-white/25">
                      YOUR IDENTITY
                    </p>

                    <p className="mt-1 text-sm font-bold text-white/70">
                      ONE TAP AWAY
                    </p>
                  </div>

                  <div className="h-8 w-8 rounded-full border border-[#00D4FF]/30" />

                </div>

              </div>

              {/* Floating label */}
              <div className="absolute -bottom-5 -right-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-xl md:-right-8">

                <p className="text-[9px] font-black tracking-[0.2em] text-white/40">
                  TAVIXO
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  Connect smarter.
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

        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-7 md:grid-cols-3">

          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-xl text-[#00A9CC]">✓</span>

            <div>
              <p className="font-black text-[#0B1F3A]">
                Simple à utiliser
              </p>

              <p className="text-xs text-[#151A21]/40">
                Un simple Tap suffit
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-xl text-[#00A9CC]">✓</span>

            <div>
              <p className="font-black text-[#0B1F3A]">
                Sans application
              </p>

              <p className="text-xs text-[#151A21]/40">
                Directement depuis votre smartphone
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-xl text-[#00A9CC]">✓</span>

            <div>
              <p className="font-black text-[#0B1F3A]">
                Profil professionnel
              </p>

              <p className="text-xs text-[#151A21]/40">
                Toutes vos informations au même endroit
              </p>
            </div>
          </div>

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

          <div className="max-w-2xl">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              TAVIXO CARDS
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Choisissez votre identité
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Une carte pensée pour représenter votre identité professionnelle
              et partager votre profil digital en un instant.
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
                            DIGITAL IDENTITY
                          </p>

                          <p className="mt-2 text-lg font-black text-white">
                            {product.name}
                          </p>

                        </div>

                      </div>

                    )}

                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-black tracking-wider text-white backdrop-blur">
                      NFC • SMART
                    </div>

                  </div>

                  <div className="p-7">

                    <h3 className="text-2xl font-black text-[#0B1F3A]">
                      {product.name}
                    </h3>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#151A21]/50">
                      {product.description ||
                        "Carte NFC professionnelle Tavixo."}
                    </p>

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
              Un simple Tap. Trois étapes.
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Votre identité professionnelle accessible en quelques secondes.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                label: "TAP",
                title: "Approchez votre téléphone",
                text: "Le client approche son smartphone de votre carte Tavixo.",
              },
              {
                number: "02",
                label: "PROFILE",
                title: "Votre profil s'ouvre",
                text: "Votre identité professionnelle s'ouvre directement dans le navigateur.",
              },
              {
                number: "03",
                label: "CONNECT",
                title: "Partagez votre identité",
                text: "Le client peut enregistrer vos coordonnées et accéder à vos liens.",
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
      {/* DIGITAL PROFILE                                           */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-[#0B1F3A] px-5 py-24 text-white md:px-6">

        <div className="absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">

          <div>

            <p className="text-xs font-black tracking-[0.3em] text-[#00D4FF]">
              DIGITAL PROFILE
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">

              Votre identité
              <br />

              <span className="text-[#00D4FF]">
                toujours avec vous.
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
              Centralisez vos coordonnées, réseaux sociaux et informations
              professionnelles dans un seul profil digital accessible
              instantanément.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: "📞",
                  title: "Téléphone",
                  text: "Appelez-moi directement",
                },
                {
                  icon: "💬",
                  title: "WhatsApp",
                  text: "Contactez-moi rapidement",
                },
                {
                  icon: "📧",
                  title: "Email",
                  text: "Envoyez-moi un email",
                },
                {
                  icon: "📸",
                  title: "Instagram",
                  text: "Découvrez mon profil",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-[#00D4FF]/30 hover:bg-white/10"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-lg">
                      {item.icon}
                    </div>

                    <div>

                      <p className="font-black text-white">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-xs text-white/40">
                        {item.text}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* PROFILE CARD */}
          <div className="flex justify-center">

            <div className="w-full max-w-sm rounded-[35px] border border-white/10 bg-[#151A21] p-4 shadow-2xl">

              <div className="overflow-hidden rounded-[30px] bg-white text-[#0B1F3A]">

                <div className="relative bg-[#0B1F3A] px-6 pb-8 pt-8 text-center text-white">

                  <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-[#00D4FF]/20 blur-3xl" />

                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#00D4FF]/30 bg-[#151A21] text-3xl font-black text-[#00D4FF] shadow-xl">
                    M
                  </div>

                  <p className="relative mt-5 text-2xl font-black">
                    Mohamed
                  </p>

                  <p className="relative mt-1 text-sm text-white/50">
                    Entrepreneur • Business
                  </p>

                  <div className="relative mx-auto mt-4 inline-flex rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/10 px-4 py-1.5 text-[10px] font-black tracking-wider text-[#00D4FF]">
                    TAVIXO DIGITAL PROFILE
                  </div>

                </div>

                <div className="p-5">

                  <p className="text-center text-sm leading-6 text-[#151A21]/50">
                    Bonjour, je suis Mohamed.
                    <br />
                    Retrouvez ici toutes mes coordonnées professionnelles.
                  </p>

                  <div className="mt-6 space-y-3">

                    <a
                      href="tel:+212600000000"
                      className="flex items-center gap-4 rounded-2xl bg-[#F7FAFC] px-4 py-4 transition hover:bg-[#EAFBFF]"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg">
                        📞
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-black">
                          Appeler
                        </p>

                        <p className="text-xs text-[#151A21]/40">
                          +212 6 XX XX XX XX
                        </p>

                      </div>

                      <span className="text-[#00A9CC]">→</span>

                    </a>


                    <a
                      href="https://wa.me/212600000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-[#F7FAFC] px-4 py-4 transition hover:bg-[#EAFBFF]"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg">
                        💬
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-black">
                          WhatsApp
                        </p>

                        <p className="text-xs text-[#151A21]/40">
                          Envoyer un message
                        </p>

                      </div>

                      <span className="text-[#00A9CC]">→</span>

                    </a>


                    <a
                      href="mailto:mohamed@example.com"
                      className="flex items-center gap-4 rounded-2xl bg-[#F7FAFC] px-4 py-4 transition hover:bg-[#EAFBFF]"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg">
                        📧
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-black">
                          Email
                        </p>

                        <p className="text-xs text-[#151A21]/40">
                          mohamed@example.com
                        </p>

                      </div>

                      <span className="text-[#00A9CC]">→</span>

                    </a>


                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-[#F7FAFC] px-4 py-4 transition hover:bg-[#EAFBFF]"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg">
                        📸
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-black">
                          Instagram
                        </p>

                        <p className="text-xs text-[#151A21]/40">
                          @mohamed
                        </p>

                      </div>

                      <span className="text-[#00A9CC]">→</span>

                    </a>

                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-2xl bg-[#00D4FF] px-5 py-4 text-sm font-black text-[#0B1F3A] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#45DEFF]"
                  >
                    + Enregistrer le contact
                  </button>

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
              Une expérience simple et professionnelle, compatible avec
              les smartphones modernes.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "iPhone",
                text: "Les iPhone compatibles NFC peuvent lire la carte Tavixo et ouvrir votre profil digital.",
              },
              {
                number: "02",
                title: "Android",
                text: "Les smartphones Android équipés du NFC peuvent également utiliser Tavixo.",
              },
              {
                number: "03",
                title: "Sans application",
                text: "Aucune application à installer. Votre profil s'ouvre directement dans le navigateur.",
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
              💡 Toujours accessible
            </p>

            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-[#151A21]/50">
              Même sans NFC, votre profil digital peut être partagé avec
              son lien. Votre identité reste donc accessible.
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
                  "Oui. Les smartphones Android équipés du NFC peuvent également utiliser la carte Tavixo.",
              },
              {
                question: "Que se passe-t-il si le NFC est désactivé ?",
                answer:
                  "Vous pouvez toujours partager votre profil digital avec son lien.",
              },
              {
                question: "Qu'est-ce que je peux mettre dans mon profil ?",
                answer:
                  "Téléphone, WhatsApp, Instagram, LinkedIn, email, site web et autres informations professionnelles.",
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

                  <span>{item.question}</span>

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
            Votre réseau commence par une connexion.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/50">
            Modernisez votre carte de visite et partagez votre identité
            professionnelle en un simple tap.
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