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
                SMART BUSINESS CARDS
              </p>
            </div>

          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">

            <a
              href="#products"
              className="transition hover:text-[#00A9CC]"
            >
              Produits
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

          </nav>

          <a
            href="#products"
            className="rounded-full bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00D4FF] hover:text-[#0B1F3A]"
          >
            Commander
          </a>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0B1F3A]">

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/15 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#00D4FF]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 md:grid-cols-2 md:px-6 md:py-28">

          {/* HERO TEXT */}
          <div>

            <div className="inline-flex rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 text-xs font-black tracking-[0.2em] text-[#00D4FF]">
              NFC • DIGITAL • SMART
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[1.02] text-white md:text-7xl">
              Votre carte.
              <br />

              <span className="text-[#00D4FF]">
                Votre identité.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              Une carte de visite NFC moderne qui permet de partager
              instantanément vos informations professionnelles.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#products"
                className="rounded-full bg-[#00D4FF] px-7 py-4 font-black text-[#0B1F3A] shadow-xl transition hover:-translate-y-1 hover:bg-[#45DEFF]"
              >
                Découvrir les cartes
              </a>

              <a
                href="#how"
                className="rounded-full border border-white/15 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Comment ça marche ?
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/40">

              <span>✓ Sans application</span>

              <span>✓ NFC instantané</span>

              <span>✓ Profil digital</span>

            </div>

          </div>

          {/* CARD PREVIEW */}
          <div className="flex justify-center">

            <div className="relative w-full max-w-md">

              <div className="absolute inset-0 rounded-[40px] bg-[#00D4FF]/20 blur-3xl" />

              <div className="relative aspect-[1.6] rotate-[-4deg] overflow-hidden rounded-[30px] border border-white/10 bg-[#151A21] p-7 shadow-2xl transition duration-500 hover:rotate-0">

                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00D4FF]/10 blur-2xl" />

                <div className="relative flex items-start justify-between">

                  <div>

                    <p className="text-[10px] font-bold tracking-[0.35em] text-white/30">
                      SMART BUSINESS CARD
                    </p>

                    <p className="mt-3 text-3xl font-black text-white">
                      TAVIXO
                    </p>

                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00D4FF] font-black text-[#0B1F3A] shadow-lg">
                    NFC
                  </div>

                </div>

                <div className="absolute bottom-7 left-7 right-7">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-xs text-white/30">
                        TAP TO CONNECT
                      </p>

                      <div className="mt-2 h-1 w-20 rounded-full bg-[#00D4FF]" />

                    </div>

                    <p className="text-sm font-bold text-[#00D4FF]">
                      TAVIXO
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TRUST BAR */}
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
                Compatible avec votre téléphone
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

      {/* PRODUCTS */}
      <section
        id="products"
        className="bg-[#F7FAFC] px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              NOS CARTES
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Choisissez votre carte
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Trois niveaux. Une même technologie. Choisissez la carte
              qui correspond le mieux à votre image professionnelle.
            </p>

          </div>

          {/* PRODUCTS */}
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

                  {/* IMAGE */}
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
                            SMART BUSINESS CARD
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

                  {/* INFO */}
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

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="bg-white px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              COMMENT ÇA MARCHE
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Partagez vos informations en quelques secondes
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Une expérience simple pour vous et pour la personne en face.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Approchez votre téléphone",
                text: "Le client approche son smartphone de votre carte Tavixo.",
              },
              {
                number: "02",
                title: "Votre profil s'ouvre",
                text: "Votre profil professionnel digital apparaît instantanément.",
              },
              {
                number: "03",
                title: "Connectez-vous",
                text: "Le client peut enregistrer vos coordonnées et accéder à vos liens.",
              },
            ].map((step) => (

              <div
                key={step.number}
                className="relative rounded-[30px] border border-[#0B1F3A]/10 bg-[#F7FAFC] p-8 transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1F3A] font-black text-[#00D4FF]">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-black text-[#0B1F3A]">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-[#151A21]/50">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* WHY TAVIXO */}
      <section
        id="about"
        className="bg-[#F7FAFC] px-5 py-24 md:px-6"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black tracking-[0.3em] text-[#00A9CC]">
              POURQUOI TAVIXO
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#0B1F3A] md:text-5xl">
              Une carte pensée pour aujourd'hui
            </h2>

            <p className="mt-5 leading-7 text-[#151A21]/50">
              Une expérience simple, élégante et pensée pour les
              professionnels modernes.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "NFC instantané",
                text: "Un simple Tap suffit pour partager votre profil digital.",
              },
              {
                number: "02",
                title: "Profil professionnel",
                text: "Toutes vos informations importantes réunies au même endroit.",
              },
              {
                number: "03",
                title: "Simple & moderne",
                text: "Une expérience rapide, élégante et pensée pour le quotidien.",
              },
            ].map((feature) => (

              <div
                key={feature.number}
                className="rounded-[28px] border border-[#0B1F3A]/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <span className="text-sm font-black text-[#00A9CC]">
                  {feature.number}
                </span>

                <h3 className="mt-5 text-xl font-black text-[#0B1F3A]">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-[#151A21]/50">
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#151A21] px-5 py-20 md:px-6">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[35px] bg-[#0B1F3A] p-10 text-center shadow-2xl md:p-16">

          <p className="text-xs font-black tracking-[0.3em] text-[#00D4FF]">
            TAVIXO
          </p>

          <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
            Prêt à moderniser votre carte de visite ?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/50">
            Choisissez votre carte et commencez à partager votre identité
            professionnelle autrement.
          </p>

          <a
            href="#products"
            className="mt-8 inline-block rounded-full bg-[#00D4FF] px-8 py-4 font-black text-[#0B1F3A] shadow-xl transition hover:-translate-y-1 hover:bg-[#45DEFF]"
          >
            Choisir ma carte
          </a>

        </div>

      </section>

      {/* FOOTER */}
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
              Smart NFC Business Cards
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