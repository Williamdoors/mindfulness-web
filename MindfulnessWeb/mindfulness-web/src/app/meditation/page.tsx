'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import VoiceMeditationAssistant from '@/components/VoiceMeditationAssistant'
import MeditationPlayer from '@/components/MeditationPlayer'
import LifeCoach from '@/components/LifeCoach'

export default function MeditationPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'voice' | 'meditation' | 'coach'>('voice')
  
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'voice' || tab === 'meditation' || tab === 'coach') {
      setActiveTab(tab)
    }
  }, [searchParams])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">MindfulnessWeb</span>
            </Link>
            
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
              <Link href="/meditation" className="text-primary-600 font-medium">Meditation</Link>
              <Link href="#" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Personal Meditation Space</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our AI-powered meditation tools designed to bring peace, mindfulness, and guidance to your daily practice.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'voice'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('voice')}
            >
              AI Voice Assistant
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'meditation'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('meditation')}
            >
              Meditation Tracks
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'coach'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('coach')}
            >
              Spiritual Guide
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'voice' && <VoiceMeditationAssistant />}
            {activeTab === 'meditation' && <MeditationPlayer />}
            {activeTab === 'coach' && <LifeCoach />}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mindfulness Journey Awaits</h2>
              <p className="text-gray-700">
                Create an account to save your favorite meditations, track your progress, and unlock more personalized guidance from our AI.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">MindfulnessWeb</span>
              <p className="text-gray-400 text-sm">Find your inner peace, guided by AI</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MindfulnessWeb. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
} 