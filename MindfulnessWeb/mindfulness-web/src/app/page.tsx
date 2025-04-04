'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Use dynamic import with SSR disabled for the CloudyBackground component
// since it uses browser-only APIs (THREE.js)
const CloudyBackground = dynamic(
  () => import('../components/CloudyBackground'),
  { ssr: false }
)

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Replace the Parallax Mountains with CloudyBackground */}
      <CloudyBackground />
      
      {/* Content with improved text visibility over 3D background */}
      <div className="relative z-10 container-main pb-32">
        <header className="flex justify-between items-center py-6 border-b border-white border-opacity-20">
          <div className="text-3xl font-bold text-white drop-shadow-lg">MindfulnessWeb</div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-white hover:text-primary-200 transition-colors drop-shadow-md">Features</Link>
            <Link href="#meditation" className="text-white hover:text-primary-200 transition-colors drop-shadow-md">Meditation</Link>
            <Link href="#coaching" className="text-white hover:text-primary-200 transition-colors drop-shadow-md">Coaching</Link>
            <Link href="#about" className="text-white hover:text-primary-200 transition-colors drop-shadow-md">About</Link>
          </nav>
          <Link href="/meditation" className="btn-primary shadow-lg">Get Started</Link>
        </header>
        
        <section className="py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black bg-opacity-30 backdrop-blur-sm p-8 rounded-xl"
          >
            <h1 className="heading-1 text-white drop-shadow-lg">
              Find Peace with<br />
              <span className="text-primary-100">AI-Powered Meditation</span>
            </h1>
            <p className="paragraph text-white text-opacity-90 text-xl max-w-2xl mx-auto mb-10">
              A more minimalist, personalized approach to mindfulness that goes beyond traditional meditation apps. Discover your inner peace with a one-on-one voice coach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/meditation" className="btn-primary text-lg py-3 px-8 shadow-lg">
                Start Your Journey
              </Link>
              <button className="btn-secondary text-lg py-3 px-8 shadow-lg">
                Listen to a Sample
              </button>
            </div>
          </motion.div>
        </section>
      </div>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 bg-white py-20">
        <div className="container-main">
          <h2 className="heading-2 text-center mb-16">
            A New Way to <span className="text-primary-600">Meditate</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-primary-600 text-5xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold mb-3">AI Voice Meditation Coach</h3>
              <p className="paragraph">Hold down to talk with your personal meditation guide. Receive one-on-one voice guidance tailored to your needs.</p>
            </div>
            
            <div className="card">
              <div className="text-primary-600 text-5xl mb-4">🧘</div>
              <h3 className="text-xl font-bold mb-3">Personalized Soundscapes</h3>
              <p className="paragraph">Custom meditation sounds and music that adapt to your mood, goals, and preferences.</p>
            </div>
            
            <div className="card">
              <div className="text-primary-600 text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-3">Spiritual Life Coach</h3>
              <p className="paragraph">Face life's challenges with guidance from an AI guru offering spiritual and practical wisdom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meditation Section */}
      <section id="meditation" className="relative z-10 bg-gray-50 py-20">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="heading-2">Experience Meditation Now</h2>
              <p className="paragraph mb-6">Try our AI-guided meditation instantly. Simply press play and follow the voice guidance for a moment of peace.</p>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="relative w-full h-16 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-gray-500">5-minute Mindfulness Meditation</div>
                  <button className="absolute right-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    ▶
                  </button>
                </div>
                
                <div className="relative w-full h-16 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-gray-500">Stress Relief Breathing</div>
                  <button className="absolute right-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    ▶
                  </button>
                </div>
                
                <div className="relative w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Sleep Well Guided Meditation</div>
                  <button className="absolute right-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    ▶
                  </button>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 rounded-full bg-white bg-opacity-30 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">AI Voice Coach Demo</h3>
                    <p className="text-sm opacity-80">Experience a sample session with our AI meditation teacher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section id="coaching" className="relative z-10 bg-white py-20">
        <div className="container-main">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <h2 className="heading-2">Spiritual Guidance & Life Coaching</h2>
              <p className="paragraph mb-6">When life presents challenges, our AI spiritual guide offers wisdom, perspective, and practical advice to help you navigate with mindfulness.</p>
              
              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-gray-500">👤</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-3 text-gray-600">
                    I've been feeling overwhelmed with work lately. How can I find balance?
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-secondary-600">🧠</span>
                  </div>
                  <div className="bg-secondary-50 rounded-xl p-3 text-gray-800">
                    Begin by taking a moment to breathe deeply. Your work is important, but your wellbeing is essential. Try setting clear boundaries between work and rest, and schedule short mindfulness breaks throughout your day...
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors">
                  <Link href="/meditation?tab=coach" className="block w-full">Ask Your Question</Link>
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-secondary-50 to-primary-50 p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Personal Guide to:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Managing stress and anxiety</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Building meaningful relationships</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Finding purpose and direction</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Personal growth and self-discovery</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">✓</span>
                    <span className="text-gray-700">Cultivating mindfulness in daily life</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-primary-600 to-secondary-700 py-16 text-white">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Mindfulness Journey Today</h2>
          <p className="text-lg text-white text-opacity-90 max-w-3xl mx-auto mb-8">
            Experience the power of AI-guided meditation and personal coaching tailored specifically to your needs.
          </p>
          <Link href="/meditation" className="bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors">
            Start Free Trial
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MindfulnessWeb</h3>
              <p className="text-gray-400">A more minimalist, personalized approach to meditation and mindfulness.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Voice Coach</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Personalized Meditation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Spiritual Guidance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sound Library</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MindfulnessWeb. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
} 