"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  created_at: string;
};

function OrderContent() {
  const searchParams = useSearchParams();

  const productFromUrl = searchParams.get("product");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("SUPABASE PRODUCTS ERROR:", error);
        setError("تعذر تحميل المنتجات.");
        setLoading(false);
        return;
      }

      const loadedProducts = data || [];

      setProducts(loadedProducts);

      const productFromLink = loadedProducts.find(
        (product) => product.id === productFromUrl
      );

      if (productFromLink) {
        setSelectedId(productFromLink.id);
      } else if (loadedProducts.length > 0) {
        setSelectedId(loadedProducts[0].id);
      }

      setLoading(false);
    }

    loadProducts();
  }, [productFromUrl]);

  const selectedProduct =
    products.find((product) => product.id === selectedId) ||
    products[0];

  const total = selectedProduct
    ? selectedProduct.price * quantity
    : 0;

  async function sendToWhatsApp(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedProduct) {
      setError("المرجو اختيار منتج.");
      return;
    }

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const city = String(form.get("city") || "").trim();
    const address = String(form.get("address") || "").trim();

    if (!name || !phone || !city || !address) {
      setError("المرجو تعمير جميع المعلومات.");
      return;
    }

    setSending(true);

    try {
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          product_id: selectedProduct.id,
          product_name: selectedProduct.name,
          price: selectedProduct.price,
          quantity,
          total,
          client_name: name,
          phone,
          city,
          address,
          status: "Nouvelle",
        });

      if (orderError) {
        console.error("SUPABASE ORDER ERROR:", orderError);

        setError(
          `تعذر تسجيل الطلب: ${orderError.message}`
        );

        setSending(false);
        return;
      }

      const message = `
NOUVELLE COMMANDE TAVIXO

Produit : ${selectedProduct.name}
Prix unitaire : ${selectedProduct.price} DH
Quantité : ${quantity}
Total : ${total} DH

INFORMATIONS CLIENT

Nom : ${name}
Téléphone : ${phone}
Ville : ${city}
Adresse : ${address}

Merci de confirmer cette commande avec le client.
`;

      const whatsappNumber = "212708149111";

      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`;

      setSuccess(
        "تم تسجيل الطلب، غادي نوجهوك دابا لواتساب."
      );

      window.location.href = whatsappUrl;
    } catch (err) {
      console.error("ORDER ERROR:", err);

      setError("وقع مشكل أثناء إرسال الطلب.");
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111F] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <a
            href="/"
            className="text-sm font-semibold text-white/40 transition hover:text-[#00D9FF]"
          >
            ← Retour
          </a>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00D9FF] font-black text-[#07111F]">
              T
            </div>

            <span className="font-black tracking-[0.2em]">
              TAVIXO
            </span>

          </div>

        </div>

        {/* TITLE */}

        <div className="mx-auto mt-16 max-w-2xl text-center">

          <p className="text-xs font-black tracking-[0.35em] text-[#00D9FF]">
            COMMANDER
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Choisissez votre
            <span className="text-[#00D9FF]">
              {" "}
              Tavixo.
            </span>
          </h1>

          <p className="mt-5 text-white/40">
            Sélectionnez la carte que vous souhaitez commander.
          </p>

        </div>

        {/* PRODUCTS */}

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {loading ? (

            <div className="md:col-span-3 rounded-[30px] border border-white/10 bg-[#0D1826] p-10 text-center text-white/40">
              Chargement des produits...
            </div>

          ) : error && products.length === 0 ? (

            <div className="md:col-span-3 rounded-[30px] border border-red-500/20 bg-red-500/10 p-10 text-center text-red-400">
              {error}
            </div>

          ) : products.length === 0 ? (

            <div className="md:col-span-3 rounded-[30px] border border-white/10 bg-[#0D1826] p-10 text-center">

              <p className="text-lg font-black">
                Aucun produit disponible
              </p>

              <p className="mt-2 text-sm text-white/30">
                Ajoutez un produit depuis l'administration.
              </p>

            </div>

          ) : (

            products.map((product) => {

              const selected = selectedId === product.id;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(product.id);
                    setQuantity(1);
                    setError("");
                    setSuccess("");
                  }}
                  className={`rounded-[30px] border p-7 text-left transition ${
                    selected
                      ? "border-[#00D9FF] bg-[#111A27]"
                      : "border-white/10 bg-[#0D1826] hover:border-white/20"
                  }`}
                >

                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.name}
                      className="mb-6 h-48 w-full rounded-2xl object-cover"
                    />

                  ) : (

                    <div className="mb-6 flex h-48 w-full items-center justify-center rounded-2xl bg-[#07111F] text-sm font-black text-[#00D9FF]">
                      TAVIXO
                    </div>

                  )}

                  {selected ? (

                    <div className="mb-5 text-xs font-black text-[#00D9FF]">
                      SELECTED
                    </div>

                  ) : (

                    <div className="mb-5 text-xs font-black text-white/20">
                      TAVIXO
                    </div>

                  )}

                  <h2 className="text-2xl font-black">
                    {product.name}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/35">
                    {product.description ||
                      "Aucune description disponible."}
                  </p>

                  <p className="mt-7 text-2xl font-black text-[#00D9FF]">
                    {product.price} DH
                  </p>

                </button>
              );
            })
          )}

        </div>

        {/* ORDER BOX */}

        {selectedProduct && (

          <div className="mx-auto mt-12 max-w-3xl rounded-[32px] border border-white/10 bg-[#111A27] p-7 md:p-9">

            {/* ORDER SUMMARY */}

            <div className="flex items-center justify-between border-b border-white/5 pb-7">

              <div>

                <p className="text-xs text-white/30">
                  VOTRE COMMANDE
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {selectedProduct.name}
                </h2>

              </div>

              <div className="text-right">

                <p className="text-xs text-white/30">
                  TOTAL
                </p>

                <p className="mt-1 text-3xl font-black text-[#00D9FF]">
                  {total} DH
                </p>

              </div>

            </div>

            {/* QUANTITY */}

            <div className="mt-7">

              <label className="text-sm font-bold">
                Quantité
              </label>

              <div className="mt-3 flex w-fit items-center rounded-2xl border border-white/10 bg-[#07111F]">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="h-12 w-12 text-xl text-white/60 transition hover:text-[#00D9FF]"
                >
                  -
                </button>

                <span className="w-12 text-center font-black">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="h-12 w-12 text-xl text-white/60 transition hover:text-[#00D9FF]"
                >
                  +
                </button>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={sendToWhatsApp}
              className="mt-8 space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="text-sm font-semibold">
                  Nom complet
                </label>

                <input
                  required
                  name="name"
                  placeholder="Votre nom"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07111F] p-4 outline-none placeholder:text-white/20 transition focus:border-[#00D9FF]"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="text-sm font-semibold">
                  Téléphone
                </label>

                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="06 XX XX XX XX"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07111F] p-4 outline-none placeholder:text-white/20 transition focus:border-[#00D9FF]"
                />

              </div>

              {/* CITY */}

              <div>

                <label className="text-sm font-semibold">
                  Ville
                </label>

                <input
                  required
                  name="city"
                  placeholder="Fès"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07111F] p-4 outline-none placeholder:text-white/20 transition focus:border-[#00D9FF]"
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label className="text-sm font-semibold">
                  Adresse
                </label>

                <textarea
                  required
                  name="address"
                  placeholder="Votre adresse"
                  rows={3}
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-[#07111F] p-4 outline-none placeholder:text-white/20 transition focus:border-[#00D9FF]"
                />

              </div>

              {/* ERROR */}

              {error && (

                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-400">
                  {error}
                </div>

              )}

              {/* SUCCESS */}

              {success && (

                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm font-bold text-green-400">
                  {success}
                </div>

              )}

              {/* SUMMARY */}

              <div className="rounded-2xl border border-[#00D9FF]/10 bg-[#00D9FF]/5 p-5">

                <div className="flex justify-between text-sm">

                  <span className="text-white/40">
                    {selectedProduct.name} × {quantity}
                  </span>

                  <span className="font-bold">
                    {total} DH
                  </span>

                </div>

              </div>

              {/* WHATSAPP BUTTON */}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[#25D366] py-5 font-black text-[#07111F] transition hover:bg-[#3BE477] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending
                  ? "جاري تسجيل الطلب..."
                  : "Envoyer la commande sur WhatsApp →"}
              </button>

              <p className="text-center text-xs text-white/25">
                Votre commande sera enregistrée puis envoyée directement sur WhatsApp.
              </p>

            </form>

          </div>

        )}

      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#07111F] px-5 py-10 text-white">
          <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
            <p className="text-white/40">
              Chargement...
            </p>
          </div>
        </main>
      }
    >
      <OrderContent />
    </Suspense>
  );
}