'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VoiceMeditationAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [voiceInput, setVoiceInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handlePressStart = () => {
    setIsListening(true)
    setVoiceInput('')
    setResponse('')
    // In a real app, this would activate the device microphone
    console.log('Started listening...')
  }

  const handlePressEnd = () => {
    setIsListening(false)
    setIsLoading(true)
    
    // Simulate receiving voice input (in a real app, this would come from speech recognition)
    setTimeout(() => {
      const simulatedInput = "I'm feeling stressed today and need to relax."
      setVoiceInput(simulatedInput)
      
      // Simulate AI processing and response
      setTimeout(() => {
        setIsLoading(false)
        setResponse("I understand you're feeling stressed. Let's begin with a simple breathing exercise. Find a comfortable position and gently close your eyes. Take a deep breath in through your nose for 4 counts... hold for 2... and exhale slowly through your mouth for 6 counts. Feel the tension leaving your body with each exhale. Let's continue this pattern for a few moments.")
        
        // Play the audio response (in a real implementation)
        const utterance = new SpeechSynthesisUtterance(
          "I understand you're feeling stressed. Let's begin with a simple breathing exercise. Find a comfortable position and gently close your eyes. Take a deep breath in through your nose for 4 counts... hold for 2... and exhale slowly through your mouth for 6 counts. Feel the tension leaving your body with each exhale. Let's continue this pattern for a few moments."
        )
        speechSynthesis.speak(utterance)
      }, 2000)
    }, 1500)
  }

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="card max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">AI Voice Meditation Assistant</h3>
      
      <div className="mb-6">
        <div className="mb-4 h-32 bg-gray-50 rounded-lg p-4 overflow-y-auto">
          {voiceInput && (
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-gray-500">👤</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 text-gray-700">
                {voiceInput}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse delay-150"></div>
                <div className="w-3 h-3 rounded-full bg-primary-600 animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          
          {response && (
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary-600">🧘</span>
              </div>
              <div className="bg-primary-50 rounded-lg p-3 text-gray-800">
                {response}
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <AnimatePresence>
            {isListening && (
              <motion.div 
                className="absolute left-1/2 bottom-24 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="rounded-full bg-primary-50 p-3 mb-4 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-6 bg-primary-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-8 bg-primary-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1.5 h-4 bg-primary-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-1.5 h-10 bg-primary-500 rounded-full animate-pulse delay-300"></div>
                    <div className="w-1.5 h-5 bg-primary-500 rounded-full animate-pulse delay-225"></div>
                  </div>
                </div>
                <p className="text-sm text-primary-600 font-medium">Listening...</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            ref={buttonRef}
            className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center mx-auto relative ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-600 hover:bg-primary-700'
            } transition-colors duration-200`}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onMouseLeave={() => isListening && handlePressEnd()}
          >
            <div className="relative flex items-center justify-center">
              {isListening ? (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </div>
          </button>
          
          <p className="mt-4 text-sm text-gray-600">
            {isListening ? 'Release to send' : 'Press and hold to speak'}
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <h4 className="font-medium text-gray-800 mb-3">Suggested requests:</h4>
        <div className="flex flex-wrap gap-2">
          <button className="py-1 px-3 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Guide me through a meditation
          </button>
          <button className="py-1 px-3 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
            I need help with anxiety
          </button>
          <button className="py-1 px-3 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Help me fall asleep
          </button>
          <button className="py-1 px-3 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">
            5-minute mindfulness practice
          </button>
        </div>
      </div>
    </div>
  )
} 