"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  created_at: string;
};

type Order = {
  id: string;
  client_name: string;
  phone: string;
  product_name: string;
  quantity: number;
  total: number;
  city: string;
  address: string | null;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [productError, setProductError] = useState("");

  // =========================
  // ORDERS
  // =========================

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  const [filter, setFilter] = useState("Toutes");

  // =========================
  // CHECK AUTH
  // =========================

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      await loadProducts();
      await loadOrders();
    }

    checkUser();
  }, [router]);

  // =========================
  // LOAD PRODUCTS
  // =========================

  async function loadProducts() {
    setLoadingProducts(true);
    setProductError("");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "SUPABASE LOAD PRODUCTS ERROR:",
        error
      );

      setProductError(
        `Erreur Supabase: ${error.message}`
      );

      setLoadingProducts(false);
      return;
    }

    setProducts(data || []);
    setLoadingProducts(false);
  }

  // =========================
  // LOAD ORDERS
  // =========================

  async function loadOrders() {
    setLoadingOrders(true);
    setOrdersError("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "SUPABASE LOAD ORDERS ERROR:",
        error
      );

      setOrdersError(
        `Erreur commandes: ${error.message}`
      );

      setOrders([]);
      setLoadingOrders(false);
      return;
    }

    setOrders(data || []);
    setLoadingOrders(false);
  }

  // =========================
  // IMAGE CHANGE
  // =========================

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setProductError(
        "Veuillez choisir une image valide."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProductError(
        "L'image ne doit pas dépasser 5 MB."
      );
      return;
    }

    setProductError("");
    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    setProductImage("");
  }

  // =========================
  // UPLOAD IMAGE
  // =========================

  async function uploadImage(file: File) {
    setUploadingImage(true);
    setProductError("");

    const fileExt =
      file.name.split(".").pop() || "jpg";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `products/${fileName}`;

    const { error: uploadError } =
      await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

    if (uploadError) {
      console.error(
        "SUPABASE IMAGE UPLOAD ERROR:",
        uploadError
      );

      setProductError(
        `Erreur upload image: ${uploadError.message}`
      );

      setUploadingImage(false);

      return null;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    setUploadingImage(false);

    return data.publicUrl;
  }

  // =========================
  // SAVE PRODUCT
  // =========================

  async function handleSaveProduct(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setProductError("");

    if (!productName.trim()) {
      setProductError(
        "Le nom du produit est obligatoire."
      );
      return;
    }

    if (
      !productPrice ||
      Number(productPrice) < 0
    ) {
      setProductError(
        "Veuillez entrer un prix valide."
      );
      return;
    }

    setSaving(true);

    try {
      let finalImageUrl =
        productImage.trim() || null;

      // Upload image locale
      if (selectedImage) {
        const uploadedUrl =
          await uploadImage(selectedImage);

        if (!uploadedUrl) {
          setSaving(false);
          return;
        }

        finalImageUrl = uploadedUrl;
      }

      const productData = {
        name: productName.trim(),
        price: Number(productPrice),
        description:
          productDescription.trim() || null,
        image: finalImageUrl,
      };

      // UPDATE
      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId);

        if (error) {
          console.error(
            "SUPABASE UPDATE ERROR:",
            error
          );

          setProductError(
            `Erreur Supabase: ${error.message}`
          );

          setSaving(false);
          return;
        }
      }

      // INSERT
      else {
        const { error } = await supabase
          .from("products")
          .insert(productData);

        if (error) {
          console.error(
            "SUPABASE INSERT ERROR:",
            error
          );

          setProductError(
            `Erreur Supabase: ${error.message}`
          );

          setSaving(false);
          return;
        }
      }

      resetProductForm();
      await loadProducts();
    } catch (error) {
      console.error(error);

      setProductError(
        "Une erreur inattendue est survenue."
      );
    }

    setSaving(false);
  }

  // =========================
  // EDIT PRODUCT
  // =========================

  function startEdit(product: Product) {
    setEditingId(product.id);

    setProductName(product.name);
    setProductPrice(String(product.price));

    setProductDescription(
      product.description || ""
    );

    setProductImage(product.image || "");

    setSelectedImage(null);
    setImagePreview(product.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================
  // DELETE PRODUCT
  // =========================

  async function deleteProduct(id: string) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    );

    if (!confirmed) return;

    setProductError("");

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "SUPABASE DELETE ERROR:",
        error
      );

      setProductError(
        `Erreur Supabase: ${error.message}`
      );

      return;
    }

    await loadProducts();
  }

  // =========================
  // RESET FORM
  // =========================

  function resetProductForm() {
    setEditingId(null);

    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage("");

    setSelectedImage(null);
    setImagePreview("");

    setProductError("");
  }

  // =========================
  // LOGOUT
  // =========================

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/admin/login");
  }

  // =========================
  // ORDER FILTER
  // =========================

  const filteredOrders =
    filter === "Toutes"
      ? orders
      : orders.filter(
          (order) =>
            order.status === filter
        );

  // =========================
  // ORDER STATS
  // =========================

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + Number(order.total || 0),
    0
  );

  const newOrders = orders.filter(
    (order) =>
      order.status === "Nouvelle"
  ).length;

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen bg-[#07111F] text-white">

      {/* HEADER */}

      <header className="border-b border-white/10 bg-[#0B1522]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D9FF] font-black text-[#07111F]">
              T
            </div>

            <div>

              <p className="font-black tracking-[0.2em]">
                TAVIXO
              </p>

              <p className="text-xs text-white/30">
                Admin Dashboard
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <a
              href="/"
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-bold text-white/60 transition hover:border-[#00D9FF] hover:text-[#00D9FF]"
            >
              Voir le site →
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-red-500/20 px-5 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
            >
              Déconnexion
            </button>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* TITLE */}

        <div>

          <p className="text-xs font-black tracking-[0.3em] text-[#00D9FF]">
            DASHBOARD
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Administration Tavixo
          </h1>

          <p className="mt-3 text-white/35">
            Gérez vos produits et vos commandes facilement.
          </p>

        </div>

        {/* ========================= */}
        {/* PRODUCTS */}
        {/* ========================= */}

        <section className="mt-12">

          <div className="mb-6">

            <p className="text-xs font-black tracking-[0.3em] text-[#00D9FF]">
              PRODUCTS
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Gestion des produits
            </h2>

            <p className="mt-2 text-white/35">
              Ajoutez, modifiez ou supprimez vos produits sans toucher au code.
            </p>

          </div>

          {/* PRODUCT FORM */}

          <div className="rounded-[28px] border border-white/10 bg-[#0D1826] p-6 md:p-8">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h3 className="text-xl font-black">
                  {editingId
                    ? "Modifier le produit"
                    : "Ajouter un produit"}
                </h3>

                <p className="mt-1 text-sm text-white/30">
                  Les informations seront enregistrées dans Supabase.
                </p>

              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/50 hover:text-white"
                >
                  Annuler
                </button>
              )}

            </div>

            <form
              onSubmit={handleSaveProduct}
              className="mt-7 grid gap-5 md:grid-cols-2"
            >

              {/* NAME */}

              <div>

                <label className="text-sm font-bold text-white/60">
                  Nom du produit
                </label>

                <input
                  type="text"
                  value={productName}
                  onChange={(e) =>
                    setProductName(
                      e.target.value
                    )
                  }
                  placeholder="Carte NFC Simple Noire"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

              </div>

              {/* PRICE */}

              <div>

                <label className="text-sm font-bold text-white/60">
                  Prix (DH)
                </label>

                <input
                  type="number"
                  min="0"
                  value={productPrice}
                  onChange={(e) =>
                    setProductPrice(
                      e.target.value
                    )
                  }
                  placeholder="149"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="text-sm font-bold text-white/60">
                  Description
                </label>

                <textarea
                  value={productDescription}
                  onChange={(e) =>
                    setProductDescription(
                      e.target.value
                    )
                  }
                  placeholder="Description du produit..."
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

              </div>

              {/* IMAGE */}

              <div className="md:col-span-2">

                <label className="text-sm font-bold text-white/60">
                  Image du produit
                </label>

                <input
                  type="text"
                  value={productImage}
                  onChange={(e) => {
                    setProductImage(
                      e.target.value
                    );

                    setSelectedImage(null);

                    setImagePreview(
                      e.target.value
                    );
                  }}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

                <p className="my-3 text-center text-xs font-bold text-white/25">
                  OU
                </p>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#07111F] px-6 py-8 text-center transition hover:border-[#00D9FF] hover:bg-[#00D9FF]/5">

                  <span className="text-3xl">
                    📷
                  </span>

                  <span className="mt-3 font-black">
                    Choisir une image
                  </span>

                  <span className="mt-1 text-xs text-white/30">
                    PNG, JPG, WEBP — maximum 5 MB
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />

                </label>

                {imagePreview && (
                  <div className="mt-5">

                    <p className="mb-2 text-xs font-bold text-white/30">
                      Aperçu
                    </p>

                    <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#07111F]">

                      <img
                        src={imagePreview}
                        alt="Aperçu du produit"
                        className="h-full w-full object-contain"
                      />

                    </div>

                  </div>
                )}

                <p className="mt-2 text-xs text-white/25">
                  Tu peux soit coller un lien, soit choisir directement une image depuis ton appareil.
                </p>

              </div>

              {/* ERROR */}

              {productError && (
                <div className="md:col-span-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400">
                  {productError}
                </div>
              )}

              {/* BUTTON */}

              <div className="md:col-span-2">

                <button
                  type="submit"
                  disabled={
                    saving ||
                    uploadingImage
                  }
                  className="rounded-full bg-[#00D9FF] px-7 py-3 font-black text-[#07111F] transition hover:bg-[#45DEFF] disabled:opacity-50"
                >
                  {uploadingImage
                    ? "Upload de l'image..."
                    : saving
                    ? "Enregistrement..."
                    : editingId
                    ? "Enregistrer les modifications"
                    : "Ajouter le produit"}
                </button>

              </div>

            </form>

          </div>

          {/* PRODUCTS LIST */}

          <div className="mt-7 overflow-hidden rounded-[28px] border border-white/10 bg-[#0D1826]">

            <div className="border-b border-white/10 px-6 py-5">

              <h3 className="font-black">
                Vos produits
              </h3>

            </div>

            {loadingProducts ? (

              <div className="px-6 py-16 text-center text-white/30">
                Chargement des produits...
              </div>

            ) : products.length === 0 ? (

              <div className="px-6 py-16 text-center">

                <p className="text-lg font-black">
                  Aucun produit
                </p>

                <p className="mt-2 text-sm text-white/30">
                  Ajoutez votre premier produit avec le formulaire ci-dessus.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-white/5">

                {products.map(
                  (product) => (

                    <div
                      key={product.id}
                      className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
                    >

                      <div className="flex items-center gap-5">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-20 w-20 rounded-2xl object-cover"
                          />

                        ) : (

                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#07111F] text-xs font-black text-[#00D9FF]">
                            NFC
                          </div>

                        )}

                        <div>

                          <h4 className="text-lg font-black">
                            {product.name}
                          </h4>

                          <p className="mt-1 text-sm text-white/35">
                            {product.description ||
                              "Aucune description"}
                          </p>

                          <p className="mt-2 font-black text-[#00D9FF]">
                            {product.price} DH
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            startEdit(
                              product
                            )
                          }
                          className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-white/60 transition hover:border-[#00D9FF] hover:text-[#00D9FF]"
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteProduct(
                              product.id
                            )
                          }
                          className="rounded-full border border-red-500/20 px-5 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                        >
                          Supprimer
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </section>

        {/* ========================= */}
        {/* ORDERS */}
        {/* ========================= */}

        <section className="mt-20">

          <div>

            <p className="text-xs font-black tracking-[0.3em] text-[#00D9FF]">
              COMMANDES
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Vos commandes
            </h2>

            <p className="mt-2 text-white/35">
              Les commandes enregistrées dans Supabase.
            </p>

          </div>

          {/* STATS */}

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-[25px] border border-white/10 bg-[#0D1826] p-6">

              <p className="text-sm text-white/30">
                Total commandes
              </p>

              <p className="mt-3 text-4xl font-black">
                {orders.length}
              </p>

            </div>

            <div className="rounded-[25px] border border-white/10 bg-[#0D1826] p-6">

              <p className="text-sm text-white/30">
                Nouvelles commandes
              </p>

              <p className="mt-3 text-4xl font-black text-[#00D9FF]">
                {newOrders}
              </p>

            </div>

            <div className="rounded-[25px] border border-white/10 bg-[#0D1826] p-6">

              <p className="text-sm text-white/30">
                Chiffre d'affaires
              </p>

              <p className="mt-3 text-4xl font-black text-[#00D9FF]">
                {totalRevenue} DH
              </p>

            </div>

          </div>

          {/* FILTERS */}

          <div className="mt-10">

            <p className="mb-4 text-xs font-black tracking-[0.2em] text-white/30">
              FILTRER LES COMMANDES
            </p>

            <div className="flex flex-wrap gap-3">

              {[
                "Toutes",
                "Nouvelle",
                "Confirmée",
                "Annulée",
              ].map(
                (status) => (

                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setFilter(status)
                    }
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      filter === status
                        ? "bg-[#00D9FF] text-[#07111F]"
                        : "border border-white/10 bg-[#0D1826] text-white/50 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>

                )
              )}

            </div>

          </div>

          {/* ERROR ORDERS */}

          {ordersError && (

            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
              {ordersError}
            </div>

          )}

          {/* ORDERS TABLE */}

          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#0D1826]">

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

              <h2 className="font-black">
                Liste des commandes
              </h2>

              <button
                type="button"
                onClick={loadOrders}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-white/50 transition hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                Actualiser
              </button>

            </div>

            {loadingOrders ? (

              <div className="px-6 py-16 text-center text-white/30">
                Chargement des commandes...
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead className="border-b border-white/10 bg-white/[0.02]">

                    <tr className="text-left text-xs uppercase tracking-wider text-white/25">

                      <th className="px-6 py-5">
                        Commande
                      </th>

                      <th className="px-6 py-5">
                        Client
                      </th>

                      <th className="px-6 py-5">
                        Produit
                      </th>

                      <th className="px-6 py-5">
                        Ville
                      </th>

                      <th className="px-6 py-5">
                        Adresse
                      </th>

                      <th className="px-6 py-5">
                        Total
                      </th>

                      <th className="px-6 py-5">
                        Statut
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredOrders.length > 0 ? (

                      filteredOrders.map(
                        (order) => (

                          <tr
                            key={order.id}
                            className="border-b border-white/5 transition hover:bg-white/[0.02]"
                          >

                            <td className="px-6 py-6">

                              <p className="font-black">
                                #{order.id.slice(
                                  0,
                                  8
                                )}
                              </p>

                              <p className="mt-1 text-xs text-white/25">
                                {order.created_at
                                  ? new Date(
                                      order.created_at
                                    ).toLocaleDateString(
                                      "fr-FR"
                                    )
                                  : ""}
                              </p>

                            </td>

                            <td className="px-6 py-6">

                              <p className="font-bold">
                                {order.client_name}
                              </p>

                              <p className="mt-1 text-xs text-white/30">
                                {order.phone}
                              </p>

                            </td>

                            <td className="px-6 py-6">

                              <p className="font-bold">
                                {order.product_name}
                              </p>

                              <p className="mt-1 text-xs text-white/30">
                                Quantité :{" "}
                                {order.quantity}
                              </p>

                            </td>

                            <td className="px-6 py-6 text-white/50">
                              {order.city}
                            </td>

                            <td className="max-w-[220px] px-6 py-6 text-sm text-white/40">
                              {order.address ||
                                "—"}
                            </td>

                            <td className="px-6 py-6 font-black text-[#00D9FF]">
                              {Number(
                                order.total
                              )}{" "}
                              DH
                            </td>

                            <td className="px-6 py-6">

                              <span
                                className={`rounded-full px-3 py-1.5 text-xs font-black ${
                                  order.status ===
                                  "Nouvelle"
                                    ? "bg-[#00D9FF]/10 text-[#00D9FF]"
                                    : order.status ===
                                      "Annulée"
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-green-500/10 text-green-400"
                                }`}
                              >
                                {order.status}
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan={7}
                          className="px-6 py-16 text-center text-white/30"
                        >
                          Aucune commande trouvée.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}