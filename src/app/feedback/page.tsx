"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

export default function FeedbackFunnel() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const GOOGLE_REVIEW_LINK = "https://g.page/r/CcoRpLRB4zujEBM/review";

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);

    if (selectedRating >= 4) {
      window.location.href = GOOGLE_REVIEW_LINK;
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/internal-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/luxury-tour.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Subtle Gold Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-shimmer" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-6"
      >
        <div className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Agent Photo */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 via-gold/20 to-transparent blur-sm" />
                    <Image
                      src="/images/headshot.jpg"
                      alt="Alejandra"
                      width={88}
                      height={88}
                      className="relative rounded-full object-cover border-2 border-gold/40 w-[88px] h-[88px]"
                      priority
                    />
                  </div>
                </div>

                {/* Editorial Label */}
                <p className="text-center font-heading text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-white/50 mb-3">
                  Your Experience Matters
                </p>

                {/* Heading */}
                <h1 className="text-center font-serif text-2xl sm:text-3xl text-white mb-2">
                  How was your experience
                  <br />
                  <span className="text-gold">with Alejandra?</span>
                </h1>

                {/* Gold Divider */}
                <div className="flex justify-center my-5">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                <p className="text-center text-white/60 text-sm mb-8">
                  Your feedback helps us deliver an exceptional real estate
                  experience across the Central Valley.
                </p>

                {/* Star Rating */}
                <div className="flex justify-center gap-3 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-4xl sm:text-5xl transition-all duration-300 transform hover:scale-110 ${
                        star <= (hover || rating)
                          ? "text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]"
                          : "text-white/20 hover:text-white/40"
                      }`}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {/* Rating Label */}
                {rating > 0 && rating <= 3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gold/70 text-xs tracking-wider uppercase mb-6"
                  >
                    {rating === 1 && "We want to make it right"}
                    {rating === 2 && "We appreciate your honesty"}
                    {rating === 3 && "Help us do better"}
                  </motion.p>
                )}

                {/* Private Feedback Form (1-3 Stars) */}
                <AnimatePresence>
                  {rating > 0 && rating <= 3 && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      onSubmit={handleSubmitFeedback}
                      className="overflow-hidden"
                    >
                      <textarea
                        className="w-full bg-white/5 border border-gold/20 rounded-xl p-4 text-white/90 text-sm placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none mb-4"
                        rows={4}
                        placeholder="Your feedback is private and goes directly to our management team..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                      />

                      {error && (
                        <p className="text-luxury-redLight text-xs mb-3 text-center">
                          {error}
                        </p>
                      )}

                      <GoldButton
                        onClick={
                          loading
                            ? undefined
                            : () => {
                                const form = document.querySelector("form");
                                if (form) form.requestSubmit();
                              }
                        }
                        size="lg"
                        className="w-full"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Private Feedback"
                        )}
                      </GoldButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center py-6"
              >
                {/* Success Checkmark */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <p className="font-heading text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-white/50 mb-3">
                  Feedback Received
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl text-gold mb-4">
                  Thank You
                </h2>

                <div className="flex justify-center mb-5">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                  Your feedback has been sent directly to our management team.
                  We&apos;re committed to delivering an exceptional experience.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Footer */}
        <p className="text-center text-white/30 text-xs mt-6 tracking-wider uppercase">
          Legacy Real Estate Inc
        </p>
      </motion.div>
    </div>
  );
}
