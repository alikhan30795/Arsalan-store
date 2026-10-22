"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
};

type CartItem = Product & {
  qty: number;
};

export default function ArsalanStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const products: Product[] = [
    {
      id: 1,
      name: "Cozy Winter Knit Ensemble",
      price: 120,
      category: "Apparel",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Minimalist Smartwatch X",
      price: 250,
      category: "Gadgets",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Crimson Air Sneakers",
      price: 180,
      category: "Footwear",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "Classic Stealth Sunglasses",
      price: 90,
      category: "Gadgets",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      name: "Limited Anime Figurine",
      price: 210,
      category: "Collectibles",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      name: "Luxury Halo Diamond Ring",
      price: 750,
      category: "Jewelry",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const categories = [
    "All",
    "Apparel",
    "Gadgets",
    "Footwear",
    "Collectibles",
    "Jewelry",
  ];

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) => product.category === activeTab);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setIsCartOpen(true);
  };

  // Increase quantity
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove product
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total quantity
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-white selection:bg-cyan-500 selection:text-black">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-6 py-4 backdrop-blur-xl md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-xl font-black tracking-wider text-transparent md:text-2xl"
        >
          ⚡ ARSALAN STORE
        </motion.div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 shadow-lg shadow-cyan-500/10 transition hover:border-cyan-400"
        >
          <span>🛒 Cart</span>

          {totalItems > 0 && (
            <span className="rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-black text-black">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative px-6 pb-16 pt-36 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl space-y-4"
        >
          <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
            Next-Gen E-Commerce Experience
          </span>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Premium Gear,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Ready To Wear
            </span>
          </h1>

          <p className="text-sm text-slate-400 md:text-base">
            Handcrafted UI with fluid Framer Motion transitions.
            Zero backend, 100% pure frontend speed.
          </p>
        </motion.div>

        {/* ================= CATEGORY FILTERS ================= */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                  : "border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.05,
                }}
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-2xl transition duration-300 hover:border-cyan-500/50"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
                      ⭐ {product.rating}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      {product.category}
                    </span>

                    <h3 className="text-lg font-bold transition group-hover:text-cyan-300">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Price + Add Button */}
                <div className="flex items-center justify-between p-6 pt-0">
                  <span className="text-2xl font-black">
                    ${product.price}
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => addToCart(product)}
                    className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
                  >
                    Add to Cart ⚡
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= CART DRAWER ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-900 p-6 shadow-2xl"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-black">Your Cart</h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {totalItems} item{totalItems !== 1 ? "s" : ""}
                  </p>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-sm font-bold text-slate-400 transition hover:text-white"
                >
                  Close ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="mt-4 flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 text-5xl">🛒</div>

                    <p className="font-bold text-slate-400">
                      Your cart is empty.
                    </p>

                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 rounded-xl bg-cyan-500 px-5 py-2 text-sm font-bold text-black transition hover:bg-cyan-400"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 py-5"
                      >
                        {/* Small Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        {/* Product Details */}
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-bold">
                            {item.name}
                          </h4>

                          <p className="mt-1 text-xs text-slate-400">
                            ${item.price} each
                          </p>

                          {/* Quantity Controls */}
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="h-7 w-7 rounded-lg border border-slate-700 bg-slate-800 text-sm font-bold transition hover:border-cyan-400"
                            >
                              −
                            </button>

                            <span className="w-6 text-center text-sm font-bold">
                              {item.qty}
                            </span>

                            <button
                              onClick={() => increaseQty(item.id)}
                              className="h-7 w-7 rounded-lg border border-slate-700 bg-slate-800 text-sm font-bold transition hover:border-cyan-400"
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-xs font-semibold text-red-400 transition hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="font-black text-cyan-400">
                            ${item.price * item.qty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="space-y-4 border-t border-slate-800 pt-6">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Amount:</span>

                    <span className="text-2xl font-black text-cyan-400">
                      ${totalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert(
                        `Checkout total: $${totalPrice}`
                      );
                    }}
                    className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
                  >
                    Checkout ⚡
                  </button>

                  <button
                    onClick={() => setCart([])}
                    className="w-full rounded-xl border border-slate-700 py-3 text-sm font-bold text-slate-400 transition hover:border-red-500 hover:text-red-400"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
