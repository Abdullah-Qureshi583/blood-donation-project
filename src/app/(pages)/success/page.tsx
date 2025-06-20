// src/app/congratulations/page.tsx
'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Success() {
  const router = useRouter()

  // Confetti effect on page load
  useEffect(() => {
    const createConfetti = () => {
      const confettiCount = 200
      const container = document.getElementById('confetti-container')
      
      if (!container) return
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div')
        confetti.className = 'absolute w-1.5 h-1.5 '
        
        // Random colors for confetti
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.classList.add(randomColor)
        
        // Random starting position
        const left = Math.random() * 100
        confetti.style.left = `${left}%`
        confetti.style.top = '-10px'
        
        // Random animation duration
        const duration = 2 + Math.random() * 3
        confetti.style.animation = `fall ${duration}s linear forwards`
        
        // Random delay
        const delay = Math.random() * 3
        confetti.style.animationDelay = `${delay}s`
        
        container.appendChild(confetti)
        
        // Remove after animation completes
        setTimeout(() => {
          if (container.contains(confetti)) {
            container.removeChild(confetti)
          }
        }, (duration + delay) * 1000)
      }
    }
    
    createConfetti()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti container */}
      <div id="confetti-container" className="absolute inset-0 pointer-events-none z-10"></div>
      
      {/* Content */}
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-12 text-center relative z-20">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Thank You For Registering!
          </h1>
          
          <div className="w-16 h-1 bg-red-500 mx-auto my-4"></div>
          
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Your registration as a donor has been successfully completed. Your generosity will make a real difference in people's lives.
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>We&apos;ll review your registration details within 24-48 hours</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You&apos;ll receive a confirmation email with your donor ID</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Our team will contact you with opportunities to help</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/dashboard" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg">
            Go to Dashboard
          </Link>
          <Link href="/" className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
            Return Home
          </Link>
        </div>
      </div>
      
      {/* Add animation keyframes for confetti */}
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
  )
}