'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type MeditationTrack = {
  id: string
  title: string
  duration: string
  audioSrc: string
  description: string
  category: 'focus' | 'relax' | 'sleep' | 'mindfulness'
}

// Sample meditation tracks (in a real app, these would come from a database)
const SAMPLE_TRACKS: MeditationTrack[] = [
  {
    id: '1',
    title: 'Mindful Breathing',
    duration: '5:00',
    audioSrc: '/audio/mindful-breathing.mp3', // This would be a real audio file
    description: 'A guided meditation focusing on your breath to cultivate mindfulness and presence.',
    category: 'mindfulness'
  },
  {
    id: '2',
    title: 'Stress Relief',
    duration: '10:00',
    audioSrc: '/audio/stress-relief.mp3',
    description: 'Relieve stress and tension with this calming meditation practice.',
    category: 'relax'
  },
  {
    id: '3',
    title: 'Deep Sleep',
    duration: '15:00',
    audioSrc: '/audio/deep-sleep.mp3',
    description: 'A gentle meditation to help you fall into a peaceful, restful sleep.',
    category: 'sleep'
  }
]

export default function MeditationPlayer() {
  const [selectedTrack, setSelectedTrack] = useState<MeditationTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const handleTrackSelect = (track: MeditationTrack) => {
    if (selectedTrack?.id === track.id) {
      // Toggle play/pause if the same track is selected
      if (isPlaying) {
        audioRef.current?.pause()
      } else {
        audioRef.current?.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      // Load new track
      setSelectedTrack(track)
      setIsPlaying(true)
      
      // In a real app, this would load the actual audio file
      // For now, simulate a meditation session with audio feedback
      if (audioRef.current) {
        audioRef.current.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
        audioRef.current.play()
        speakMeditationIntro(track.title)
      }
    }
  }

  const speakMeditationIntro = (title: string) => {
    // Use speech synthesis to simulate the meditation audio
    const utterance = new SpeechSynthesisUtterance()
    utterance.text = `Welcome to the ${title} meditation. Find a comfortable position and gently close your eyes. We'll begin with taking a few deep breaths. Breathe in... and out. Notice how your body feels as you breathe.`
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  const handlePlayPause = () => {
    if (!selectedTrack) return
    
    if (isPlaying) {
      audioRef.current?.pause()
      speechSynthesis.pause()
    } else {
      audioRef.current?.play()
      speechSynthesis.resume()
    }
    
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return
    
    const progressRect = progressBarRef.current.getBoundingClientRect()
    const percent = (e.clientX - progressRect.left) / progressRect.width
    const newTime = percent * duration
    
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Clean up speech synthesis and audio when component unmounts
  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <div className="card max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Meditation Tracks</h3>
      
      <div className="space-y-4 mb-6">
        {SAMPLE_TRACKS.map((track) => (
          <div 
            key={track.id}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedTrack?.id === track.id
                ? 'bg-primary-50 border border-primary-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => handleTrackSelect(track)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">{track.title}</h4>
                <p className="text-sm text-gray-500">{track.duration} • {track.category}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                {selectedTrack?.id === track.id && isPlaying ? (
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedTrack && (
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
            <span className="text-sm text-gray-500">{selectedTrack.duration}</span>
          </div>
          
          <div 
            ref={progressBarRef} 
            className="h-2 bg-gray-100 rounded-full cursor-pointer mb-4"
            onClick={handleProgressBarClick}
          >
            <div 
              className="h-full bg-primary-500 rounded-full"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            ></div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
            
            <button 
              className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 transition-colors flex items-center justify-center shadow-lg"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
              </svg>
            </button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-1">{selectedTrack.title}</h4>
            <p className="text-sm text-gray-600">{selectedTrack.description}</p>
          </div>
          
          <audio 
            ref={audioRef} 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
} 