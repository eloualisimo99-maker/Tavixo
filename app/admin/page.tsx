"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  images: string[] | null;
  video_url: string | null;
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

  // =========================================================
  // PRODUCTS
  // =========================================================

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] =
    useState("");

  // Main image URL - optional
  const [productImage, setProductImage] = useState("");

  // Selected local images
  const [selectedImages, setSelectedImages] =
    useState<File[]>([]);

  // Image previews
  const [imagePreviews, setImagePreviews] =
    useState<string[]>([]);

  // Existing images when editing
  const [existingImages, setExistingImages] =
    useState<string[]>([]);

  // Video
  const [videoFile, setVideoFile] =
    useState<File | null>(null);

  const [videoPreview, setVideoPreview] =
    useState("");

  // Existing video when editing
  const [existingVideoUrl, setExistingVideoUrl] =
    useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [uploadingVideo, setUploadingVideo] =
    useState(false);

  const [productError, setProductError] =
    useState("");

  // =========================================================
  // ORDERS
  // =========================================================

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] =
    useState(true);

  const [ordersError, setOrdersError] =
    useState("");

  const [filter, setFilter] =
    useState("Toutes");

  // =========================================================
  // CHECK AUTH
  // =========================================================

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

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

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

  // =========================================================
  // LOAD ORDERS
  // =========================================================

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

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  function handleImagesChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setProductError("");

    // Maximum 3 images
    if (files.length > 3) {
      setProductError(
        "Tu peux choisir maximum 3 images."
      );
      return;
    }

    // Check each image
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setProductError(
          "Tous les fichiers doivent être des images."
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setProductError(
          "Chaque image ne doit pas dépasser 5 MB."
        );
        return;
      }
    }

    // Clean old previews
    imagePreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setSelectedImages(files);
    setImagePreviews(previews);

    // If new images are selected, first one becomes main image
    setProductImage("");
  }

  // =========================================================
  // REMOVE SELECTED IMAGE
  // =========================================================

  function removeSelectedImage(index: number) {
    const newFiles = selectedImages.filter(
      (_, i) => i !== index
    );

    const oldPreview = imagePreviews[index];

    if (oldPreview) {
      URL.revokeObjectURL(oldPreview);
    }

    const newPreviews = imagePreviews.filter(
      (_, i) => i !== index
    );

    setSelectedImages(newFiles);
    setImagePreviews(newPreviews);
  }

  // =========================================================
  // REMOVE EXISTING IMAGE
  // =========================================================

  function removeExistingImage(index: number) {
    const newImages = existingImages.filter(
      (_, i) => i !== index
    );

    setExistingImages(newImages);
  }

  // =========================================================
  // VIDEO CHANGE
  // =========================================================

  function handleVideoChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setProductError("");

    if (!file.type.startsWith("video/")) {
      setProductError(
        "Veuillez choisir une vidéo valide."
      );
      return;
    }

    // Maximum 50 MB
    if (file.size > 50 * 1024 * 1024) {
      setProductError(
        "La vidéo ne doit pas dépasser 50 MB."
      );
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    const previewUrl =
      URL.createObjectURL(file);

    setVideoFile(file);
    setVideoPreview(previewUrl);
    setExistingVideoUrl("");
  }

  // =========================================================
  // REMOVE VIDEO
  // =========================================================

  function removeVideo() {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(null);
    setVideoPreview("");
    setExistingVideoUrl("");
  }

  // =========================================================
  // UPLOAD IMAGE
  // =========================================================

  async function uploadImage(file: File) {
    const fileExt =
      file.name.split(".").pop() || "jpg";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath =
      `products/${fileName}`;

    const {
      error: uploadError,
    } = await supabase.storage
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

      throw new Error(
        `Erreur upload image: ${uploadError.message}`
      );
    }

    const { data } =
      supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

    return data.publicUrl;
  }

  // =========================================================
  // UPLOAD VIDEO
  // =========================================================

  async function uploadVideo(file: File) {
    const fileExt =
      file.name.split(".").pop() || "mp4";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath =
      `products/videos/${fileName}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error(
        "SUPABASE VIDEO UPLOAD ERROR:",
        uploadError
      );

      throw new Error(
        `Erreur upload vidéo: ${uploadError.message}`
      );
    }

    const { data } =
      supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

    return data.publicUrl;
  }

  // =========================================================
  // SAVE PRODUCT
  // =========================================================

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

    if (selectedImages.length > 3) {
      setProductError(
        "Maximum 3 images."
      );
      return;
    }

    setSaving(true);

    try {
      // =====================================================
      // UPLOAD IMAGES
      // =====================================================

      let uploadedImages: string[] = [];

      if (selectedImages.length > 0) {
        setUploadingImage(true);

        for (const file of selectedImages) {
          const url =
            await uploadImage(file);

          uploadedImages.push(url);
        }

        setUploadingImage(false);
      }

      // =====================================================
      // BUILD FINAL IMAGES ARRAY
      // =====================================================

      let finalImages: string[] = [];

      // When editing:
      // keep existing images + add new images
      if (editingId) {
        finalImages = [
          ...existingImages,
          ...uploadedImages,
        ];
      } else {
        finalImages = [
          ...uploadedImages,
        ];
      }

      // Maximum 3 images
      finalImages =
        finalImages.slice(0, 3);

      // If URL was entered manually and there are no uploaded images
      if (
        productImage.trim() &&
        finalImages.length === 0
      ) {
        finalImages = [
          productImage.trim(),
        ];
      }

      // Main image = first image
      const mainImage =
        finalImages.length > 0
          ? finalImages[0]
          : productImage.trim() || null;

      // =====================================================
      // UPLOAD VIDEO
      // =====================================================

      let finalVideoUrl =
        existingVideoUrl || null;

      if (videoFile) {
        setUploadingVideo(true);

        finalVideoUrl =
          await uploadVideo(videoFile);

        setUploadingVideo(false);
      }

      // =====================================================
      // PRODUCT DATA
      // =====================================================

      const productData = {
        name: productName.trim(),

        price: Number(
          productPrice
        ),

        description:
          productDescription.trim() ||
          null,

        // Backward compatibility
        image: mainImage,

        // New gallery
        images: finalImages,

        // Video
        video_url:
          finalVideoUrl,
      };

      // =====================================================
      // UPDATE
      // =====================================================

      if (editingId) {
        const { error } =
          await supabase
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

      // =====================================================
      // INSERT
      // =====================================================

      else {
        const { error } =
          await supabase
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

      setUploadingImage(false);
      setUploadingVideo(false);

      if (error instanceof Error) {
        setProductError(
          error.message
        );
      } else {
        setProductError(
          "Une erreur inattendue est survenue."
        );
      }
    }

    setSaving(false);
  }

  // =========================================================
  // EDIT PRODUCT
  // =========================================================

  function startEdit(product: Product) {
    setEditingId(product.id);

    setProductName(
      product.name
    );

    setProductPrice(
      String(product.price)
    );

    setProductDescription(
      product.description || ""
    );

    // Get existing gallery
    let gallery =
      Array.isArray(product.images)
        ? product.images
        : [];

    // Compatibility with old products
    if (
      gallery.length === 0 &&
      product.image
    ) {
      gallery = [
        product.image,
      ];
    }

    setExistingImages(
      gallery.slice(0, 3)
    );

    setProductImage(
      product.image || ""
    );

    setSelectedImages([]);

    imagePreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    setImagePreviews([]);

    // Existing video
    setExistingVideoUrl(
      product.video_url || ""
    );

    setVideoFile(null);

    if (videoPreview) {
      URL.revokeObjectURL(
        videoPreview
      );
    }

    setVideoPreview("");

    setProductError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  async function deleteProduct(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer ce produit ?"
      );

    if (!confirmed) return;

    setProductError("");

    const { error } =
      await supabase
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

  // =========================================================
  // RESET FORM
  // =========================================================

  function resetProductForm() {
    setEditingId(null);

    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage("");

    setSelectedImages([]);

    imagePreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    setImagePreviews([]);

    setExistingImages([]);

    setVideoFile(null);

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoPreview("");

    setExistingVideoUrl("");

    setProductError("");
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace(
      "/admin/login"
    );
  }

  // =========================================================
  // ORDER FILTER
  // =========================================================

  const filteredOrders =
    filter === "Toutes"
      ? orders
      : orders.filter(
          (order) =>
            order.status === filter
        );

  // =========================================================
  // ORDER STATS
  // =========================================================

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.total || 0
        ),
      0
    );

  const newOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Nouvelle"
    ).length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen bg-[#07111F] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

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
              onClick={
                handleLogout
              }
              className="rounded-full border border-red-500/20 px-5 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
            >
              Déconnexion
            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* ===================================================
            TITLE
        =================================================== */}

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

        {/* ===================================================
            PRODUCTS
        =================================================== */}

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

          {/* =================================================
              PRODUCT FORM
          ================================================= */}

          <div className="rounded-[28px] border border-white/10 bg-[#0D1826] p-6 md:p-8">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h3 className="text-xl font-black">

                  {editingId
                    ? "Modifier le produit"
                    : "Ajouter un produit"}

                </h3>

                <p className="mt-1 text-sm text-white/30">
                  Jusqu'à 3 images + 1 vidéo.
                </p>

              </div>

              {editingId && (

                <button
                  type="button"
                  onClick={
                    resetProductForm
                  }
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/50 hover:text-white"
                >
                  Annuler
                </button>

              )}

            </div>

            <form
              onSubmit={
                handleSaveProduct
              }
              className="mt-7 grid gap-5 md:grid-cols-2"
            >

              {/* =================================================
                  NAME
              ================================================= */}

              <div>

                <label className="text-sm font-bold text-white/60">
                  Nom du produit
                </label>

                <input
                  type="text"
                  value={
                    productName
                  }
                  onChange={(e) =>
                    setProductName(
                      e.target.value
                    )
                  }
                  placeholder="Carte NFC Simple Noire"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

              </div>

              {/* =================================================
                  PRICE
              ================================================= */}

              <div>

                <label className="text-sm font-bold text-white/60">
                  Prix (DH)
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    productPrice
                  }
                  onChange={(e) =>
                    setProductPrice(
                      e.target.value
                    )
                  }
                  placeholder="149"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="md:col-span-2">

                <label className="text-sm font-bold text-white/60">
                  Description
                </label>

                <textarea
                  value={
                    productDescription
                  }
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

              {/* =================================================
                  EXISTING IMAGES
              ================================================= */}

              {editingId &&
                existingImages.length >
                  0 && (

                  <div className="md:col-span-2">

                    <label className="text-sm font-bold text-white/60">
                      Images actuelles
                    </label>

                    <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3">

                      {existingImages.map(
                        (
                          image,
                          index
                        ) => (

                          <div
                            key={`${image}-${index}`}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111F]"
                          >

                            <img
                              src={
                                image
                              }
                              alt={`Image ${index + 1}`}
                              className="h-40 w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeExistingImage(
                                  index
                                )
                              }
                              className="absolute right-2 top-2 rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white"
                            >
                              Supprimer
                            </button>

                            {index ===
                              0 && (

                              <span className="absolute bottom-2 left-2 rounded-full bg-[#00D9FF] px-3 py-1 text-xs font-black text-[#07111F]">
                                Principale
                              </span>

                            )}

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}

              {/* =================================================
                  IMAGE URL
              ================================================= */}

              <div className="md:col-span-2">

                <label className="text-sm font-bold text-white/60">
                  Image principale par URL
                </label>

                <input
                  type="text"
                  value={
                    productImage
                  }
                  onChange={(e) => {

                    setProductImage(
                      e.target.value
                    );

                  }}
                  placeholder="https://..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#07111F] px-4 py-3 text-white outline-none focus:border-[#00D9FF]"
                />

                <p className="mt-2 text-xs text-white/25">
                  Optionnel. Si tu upload des images, elles seront utilisées en priorité.
                </p>

              </div>

              {/* =================================================
                  UPLOAD IMAGES
              ================================================= */}

              <div className="md:col-span-2">

                <label className="text-sm font-bold text-white/60">
                  Galerie du produit
                </label>

                <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#07111F] px-6 py-8 text-center transition hover:border-[#00D9FF] hover:bg-[#00D9FF]/5">

                  <span className="text-4xl">
                    🖼️
                  </span>

                  <span className="mt-3 font-black">
                    Choisir jusqu'à 3 images
                  </span>

                  <span className="mt-1 text-xs text-white/30">
                    PNG, JPG, WEBP — maximum 5 MB par image
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={
                      handleImagesChange
                    }
                    className="hidden"
                  />

                </label>

                {/* NEW IMAGE PREVIEWS */}

                {imagePreviews.length >
                  0 && (

                  <div className="mt-5">

                    <p className="mb-3 text-xs font-bold text-white/30">
                      Nouvelles images
                    </p>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

                      {imagePreviews.map(
                        (
                          preview,
                          index
                        ) => (

                          <div
                            key={preview}
                            className="relative overflow-hidden rounded-2xl border border-[#00D9FF]/20 bg-[#07111F]"
                          >

                            <img
                              src={
                                preview
                              }
                              alt={`Preview ${index + 1}`}
                              className="h-40 w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeSelectedImage(
                                  index
                                )
                              }
                              className="absolute right-2 top-2 rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white"
                            >
                              Supprimer
                            </button>

                            {index ===
                              0 && (

                              <span className="absolute bottom-2 left-2 rounded-full bg-[#00D9FF] px-3 py-1 text-xs font-black text-[#07111F]">
                                Principale
                              </span>

                            )}

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}

              </div>

              {/* =================================================
                  VIDEO
              ================================================= */}

              <div className="md:col-span-2">

                <label className="text-sm font-bold text-white/60">
                  Vidéo du produit
                </label>

                {/* Existing video */}

                {existingVideoUrl &&
                  !videoPreview && (

                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#07111F]">

                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

                      <span className="text-sm font-bold text-white/50">
                        Vidéo actuelle
                      </span>

                      <button
                        type="button"
                        onClick={
                          removeVideo
                        }
                        className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400"
                      >
                        Supprimer
                      </button>

                    </div>

                    <video
                      src={
                        existingVideoUrl
                      }
                      controls
                      className="max-h-[400px] w-full"
                    />

                  </div>

                )}

                <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#07111F] px-6 py-8 text-center transition hover:border-[#00D9FF] hover:bg-[#00D9FF]/5">

                  <span className="text-4xl">
                    🎥
                  </span>

                  <span className="mt-3 font-black">
                    Choisir une vidéo
                  </span>

                  <span className="mt-1 text-xs text-white/30">
                    MP4, WEBM, MOV — maximum 50 MB
                  </span>

                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={
                      handleVideoChange
                    }
                    className="hidden"
                  />

                </label>

                {/* New video preview */}

                {videoPreview && (

                  <div className="relative mt-5 overflow-hidden rounded-2xl border border-[#00D9FF]/20 bg-[#07111F]">

                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

                      <span className="text-sm font-bold text-white/50">
                        Aperçu vidéo
                      </span>

                      <button
                        type="button"
                        onClick={
                          removeVideo
                        }
                        className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400"
                      >
                        Supprimer
                      </button>

                    </div>

                    <video
                      src={
                        videoPreview
                      }
                      controls
                      className="max-h-[400px] w-full"
                    />

                  </div>

                )}

              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {productError && (

                <div className="md:col-span-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400">
                  {productError}
                </div>

              )}

              {/* =================================================
                  BUTTON
              ================================================= */}

              <div className="md:col-span-2">

                <button
                  type="submit"
                  disabled={
                    saving ||
                    uploadingImage ||
                    uploadingVideo
                  }
                  className="rounded-full bg-[#00D9FF] px-7 py-3 font-black text-[#07111F] transition hover:bg-[#45DEFF] disabled:opacity-50"
                >

                  {uploadingImage
                    ? "Upload des images..."
                    : uploadingVideo
                    ? "Upload de la vidéo..."
                    : saving
                    ? "Enregistrement..."
                    : editingId
                    ? "Enregistrer les modifications"
                    : "Ajouter le produit"}

                </button>

              </div>

            </form>

          </div>

          {/* ===================================================
              PRODUCTS LIST
          =================================================== */}

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

            ) : products.length ===
              0 ? (

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
                  (product) => {

                    const gallery =
                      Array.isArray(
                        product.images
                      ) &&
                      product.images.length >
                        0
                        ? product.images
                        : product.image
                        ? [
                            product.image,
                          ]
                        : [];

                    return (

                      <div
                        key={
                          product.id
                        }
                        className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
                      >

                        <div className="flex items-center gap-5">

                          {/* Product image */}

                          {gallery.length >
                          0 ? (

                            <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-[#07111F]">

                              <img
                                src={
                                  gallery[0]
                                }
                                alt={
                                  product.name
                                }
                                className="h-full w-full object-cover"
                              />

                              {gallery.length >
                                1 && (

                                <span className="absolute bottom-1 right-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-black text-white">
                                  +{gallery.length - 1}
                                </span>

                              )}

                            </div>

                          ) : (

                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#07111F] text-xs font-black text-[#00D9FF]">
                              NFC
                            </div>

                          )}

                          <div>

                            <h4 className="text-lg font-black">
                              {
                                product.name
                              }
                            </h4>

                            <p className="mt-1 text-sm text-white/35">
                              {
                                product.description ||
                                "Aucune description"
                              }
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-3">

                              <p className="font-black text-[#00D9FF]">
                                {
                                  product.price
                                }{" "}
                                DH
                              </p>

                              {gallery.length >
                                0 && (

                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-white/40">
                                  📷{" "}
                                  {
                                    gallery.length
                                  }{" "}
                                  image
                                  {gallery.length >
                                  1
                                    ? "s"
                                    : ""}
                                </span>

                              )}

                              {product.video_url && (

                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-white/40">
                                  🎥 Vidéo
                                </span>

                              )}

                            </div>

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

                    );
                  }
                )}

              </div>

            )}

          </div>

        </section>

        {/* =====================================================
            ORDERS
        ===================================================== */}

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

          {/* ===================================================
              STATS
          =================================================== */}

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-[25px] border border-white/10 bg-[#0D1826] p-6">

              <p className="text-sm text-white/30">
                Total commandes
              </p>

              <p className="mt-3 text-4xl font-black">
                {
                  orders.length
                }
              </p>

            </div>

            <div className="rounded-[25px] border border-white/10 bg-[#0D1826] p-6">

              <p className="text-sm text-white/30">
                Nouvelles commandes
              </p>

              <p className="mt-3 text-4xl font-black text-[#00D9FF]">
                {
                  newOrders
                }
              </p>

            </div>

            <div className="rounded-[25px] border border-white/10 bg-[#0D1826] p-6">

              <p className="text-sm text-white/30">
                Chiffre d'affaires
              </p>

              <p className="mt-3 text-4xl font-black text-[#00D9FF]">
                {
                  totalRevenue
                }{" "}
                DH
              </p>

            </div>

          </div>

          {/* ===================================================
              FILTERS
          =================================================== */}

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
                    key={
                      status
                    }
                    type="button"
                    onClick={() =>
                      setFilter(
                        status
                      )
                    }
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      filter ===
                      status
                        ? "bg-[#00D9FF] text-[#07111F]"
                        : "border border-white/10 bg-[#0D1826] text-white/50 hover:text-white"
                    }`}
                  >
                    {
                      status
                    }
                  </button>

                )
              )}

            </div>

          </div>

          {/* ===================================================
              ORDERS ERROR
          =================================================== */}

          {ordersError && (

            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-400">
              {
                ordersError
              }
            </div>

          )}

          {/* ===================================================
              ORDERS TABLE
          =================================================== */}

          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#0D1826]">

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

              <h2 className="font-black">
                Liste des commandes
              </h2>

              <button
                type="button"
                onClick={
                  loadOrders
                }
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

                    {filteredOrders.length >
                    0 ? (

                      filteredOrders.map(
                        (order) => (

                          <tr
                            key={
                              order.id
                            }
                            className="border-b border-white/5 transition hover:bg-white/[0.02]"
                          >

                            <td className="px-6 py-6">

                              <p className="font-black">
                                #
                                {
                                  order.id.slice(
                                    0,
                                    8
                                  )
                                }
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
                                {
                                  order.client_name
                                }
                              </p>

                              <p className="mt-1 text-xs text-white/30">
                                {
                                  order.phone
                                }
                              </p>

                            </td>

                            <td className="px-6 py-6">

                              <p className="font-bold">
                                {
                                  order.product_name
                                }
                              </p>

                              <p className="mt-1 text-xs text-white/30">
                                Quantité :{" "}
                                {
                                  order.quantity
                                }
                              </p>

                            </td>

                            <td className="px-6 py-6 text-white/50">
                              {
                                order.city
                              }
                            </td>

                            <td className="max-w-[220px] px-6 py-6 text-sm text-white/40">
                              {
                                order.address ||
                                "—"
                              }
                            </td>

                            <td className="px-6 py-6 font-black text-[#00D9FF]">
                              {
                                Number(
                                  order.total
                                )
                              }{" "}
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
                                {
                                  order.status
                                }
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan={
                            7
                          }
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