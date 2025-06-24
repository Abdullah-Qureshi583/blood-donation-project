// src/app/congratulations/page.tsx
"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Success() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Confetti effect on page load
  useEffect(() => {
    const createConfetti = () => {
      const confettiCount = 200;
      const container = document.getElementById("confetti-container");
      if (!container) return;
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.className = "absolute w-1.5 h-1.5 ";
        const colors = [
          "bg-normalRed",
          "bg-darkRed",
          "bg-normalBlue",
          "bg-darkBlue",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.classList.add(randomColor);
        const left = Math.random() * 100;
        confetti.style.left = `${left}%`;
        confetti.style.top = "-10px";
        const duration = 2 + Math.random() * 3;
        confetti.style.animation = `fall ${duration}s linear forwards`;
        const delay = Math.random() * 3;
        confetti.style.animationDelay = `${delay}s`;
        container.appendChild(confetti);
        setTimeout(() => {
          if (container.contains(confetti)) {
            container.removeChild(confetti);
          }
        }, (duration + delay) * 1000);
      }
    };
    createConfetti();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-normalRed"></div>
        <span className="ml-4 text-lg text-normalRed">Loading...</span>
      </div>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      router.replace("/authentication/login");
    }
    return null;
  }

  // If logged in, show the celebration and user details
  return (
    <div className="min-h-screen bg-gradient-to-b from-normalRed/10 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti container */}
      <div
        id="confetti-container"
        className="absolute inset-0 pointer-events-none z-10"
      ></div>

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-12 text-center relative z-20">
        <div className="mb-8">
          <div className="w-24 h-24 bg-normalRed/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-normalRed"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-darkRed mb-2">
            Thank You For Registering, {session.user?.name || "Donor"}!
          </h1>
          <div className="w-16 h-1 bg-normalRed mx-auto my-4"></div>
          <p className="text-lg md:text-xl text-darkRed mb-6">
            Your registration as a donor has been successfully completed.
            <br />
            <span className="font-semibold text-normalBlue">
              {session.user?.email}
            </span>
            <br />
            Your generosity will make a real difference in people&apos;s lives.
          </p>
        </div>
        <div className="bg-normalBlue/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-darkBlue mb-4">
            What happens next?
          </h2>
          <ul className="text-left space-y-3 text-darkBlue">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-normalBlue mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                We&apos;ll review your registration details within 24-48 hours
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-normalBlue mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                You&apos;ll receive a confirmation email with your donor ID
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-normalBlue mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Our team will contact you with opportunities to help</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-normalRed hover:bg-darkRed text-white font-medium rounded-lg transition-colors shadow-lg"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-normalBlue hover:bg-darkBlue text-white font-medium rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
      {/* Confetti animation keyframes */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
