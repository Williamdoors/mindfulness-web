'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

type Message = {
  id: string
  text: string
  sender: 'user' | 'coach'
  timestamp: Date
}

export default function LifeCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello, I am your spiritual guide and life coach. How can I assist you on your journey today?',
      sender: 'coach',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages([...messages, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse = generateCoachResponse(inputValue)
      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'coach',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, coachMessage])
      setIsTyping(false)
      
      // Scroll to bottom again after response
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }, 1500)
  }
  
  const generateCoachResponse = (userMessage: string): string => {
    // Simple pattern matching for demo purposes
    // In a real app, this would connect to an AI API
    const lowerCaseMessage = userMessage.toLowerCase()
    
    if (lowerCaseMessage.includes('stress') || lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('anxiety')) {
      return "I understand that stress and anxiety can be challenging. First, let's acknowledge that these feelings are normal and valid. Try to identify the source of your stress. Is it work, relationships, or something else? Once identified, we can work on practical strategies. For immediate relief, try this breathing exercise: inhale deeply for 4 counts, hold for 2, and exhale for 6. Repeat this several times, focusing on the sensation of your breath. Remember, stress is often our body's way of telling us something needs attention."
    }
    
    if (lowerCaseMessage.includes('purpose') || lowerCaseMessage.includes('meaning') || lowerCaseMessage.includes('direction')) {
      return "Seeking purpose and meaning is a profound journey. Consider what activities make you lose track of time, what values you hold dear, and what change you wish to see in the world. Meaning often emerges from connecting these elements. Try journaling about moments when you felt most alive or fulfilled. What patterns do you notice? Remember that purpose isn't always a grand mission—it can be found in how we connect with others, express creativity, or contribute to our communities in small ways."
    }
    
    if (lowerCaseMessage.includes('meditate') || lowerCaseMessage.includes('meditation') || lowerCaseMessage.includes('mindful')) {
      return "Meditation is a wonderful practice for cultivating presence and awareness. To start simply, find a comfortable position and focus on your breath for just 5 minutes. Notice the sensation of breathing without trying to change it. When your mind wanders—which is natural and expected—gently bring your attention back to your breath. Consistency matters more than duration, so aim to practice regularly, even if briefly. As you grow more comfortable, you might explore different techniques like body scanning or loving-kindness meditation."
    }
    
    if (lowerCaseMessage.includes('relationship') || lowerCaseMessage.includes('partner') || lowerCaseMessage.includes('friend')) {
      return "Relationships are both our greatest teachers and sources of joy. Healthy relationships are built on clear communication, mutual respect, and understanding. When challenges arise, try to listen deeply without immediately formulating a response. Express your needs using 'I' statements rather than accusations. Remember that all relationships go through phases, and periods of struggle often precede deeper connection. What specific aspect of your relationships would you like to explore further?"
    }
    
    // Default response
    return "Thank you for sharing. I'm here to support your journey of growth and self-discovery. The path to wisdom often begins with questions rather than answers. What specifically are you hoping to learn or transform in your life right now? Perhaps we can explore this together, combining ancient wisdom with practical steps for your unique situation."
  }
  
  const suggestionQuestions = [
    "How can I find more purpose in my daily life?",
    "I'm feeling anxious about the future. Any guidance?",
    "How can I be more mindful throughout my day?",
    "I struggle with difficult relationships. Any advice?"
  ]
  
  const handleSuggestionClick = (question: string) => {
    setInputValue(question)
  }
  
  return (
    <div className="card max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Spiritual Guidance & Life Coaching</h3>
      
      <div className="bg-gray-50 rounded-xl h-96 overflow-y-auto p-4 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Suggested questions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Suggested questions:</h4>
        <div className="flex flex-wrap gap-2">
          {suggestionQuestions.map((question, index) => (
            <button
              key={index}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-3 py-1 transition-colors"
              onClick={() => handleSuggestionClick(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask your spiritual guide..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 transition-colors"
          disabled={!inputValue.trim()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
} 