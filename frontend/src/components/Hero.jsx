import { assets } from '../assets/assets'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [mobileAnimation, setMobileAnimation] = useState(false)

  useEffect(() => {
    // Desktop animation - side switching
    const desktopInterval = setInterval(() => {
      setIsFlipped(prev => !prev)
    }, 5000) // Switch every 5 seconds

    // Mobile animation - bounce effect
    const mobileInterval = setInterval(() => {
      setMobileAnimation(true)
      setTimeout(() => setMobileAnimation(false), 1000) // Animation lasts 1 second
    }, 5000) // Trigger every 5 seconds

    return () => {
      clearInterval(desktopInterval)
      clearInterval(mobileInterval)
    }
  }, [])

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 overflow-hidden relative z-0'>
      {/* Text Content */}
      <div className={`w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 transform transition-transform duration-1000 ease-in-out ${
        isFlipped ? 'sm:translate-x-full' : 'sm:translate-x-0'
      } ${
        mobileAnimation ? 'animate-bounce scale-102 sm:animate-none sm:scale-100' : ''
      }`}>
        <div className={`text-[#414141] transition-all duration-500 ${
          mobileAnimation ? 'transform scale-105 sm:scale-100' : ''
        }`}>
            <div className='flex items-center gap-2'>
                <p className={`w-8 md:w-11 h-[2px] bg-[#414141] transition-all duration-500 ${
                  mobileAnimation ? 'bg-blue-600 sm:bg-[#414141]' : ''
                }`}></p>
                <p className={`font-medium text-sm md:text-base transition-all duration-500 ${
                  mobileAnimation ? 'text-blue-600 font-bold sm:text-[#414141] sm:font-medium' : ''
                }`}>OUR BEST SELLERS</p>
            </div>
            <h1 className={`text-3xl sm:py-3 lg:text-5xl leading-relaxed text-blue-600 transition-all duration-500 ${
              mobileAnimation ? 'text-4xl font-extrabold animate-pulse sm:text-3xl sm:lg:text-5xl sm:font-normal sm:animate-none' : ''
            }`}>LATEST ARRIVALS</h1>
            <div className='flex items-center gap-2'>
                <p className={`font-semibold text-sm md:text-base transition-all duration-500 ${
                  mobileAnimation ? 'text-blue-600 font-bold animate-pulse sm:text-[#414141] sm:font-semibold sm:animate-none' : ''
                }`}>SHOP NOW</p>
                <p className={`w-8 md:w-11 h-[1px] bg-[#414141] transition-all duration-500 ${
                  mobileAnimation ? 'bg-blue-600 w-16 sm:bg-[#414141] sm:w-8 sm:md:w-11' : ''
                }`}></p>
            </div>
        </div>
      </div>
      
      {/* Image Content */}
      <img 
        className={`w-full sm:w-1/2 transform transition-transform duration-1000 ease-in-out z-0 ${
          isFlipped ? 'sm:-translate-x-full' : 'sm:translate-x-0'
        } ${
          mobileAnimation ? 'animate-bounce transform scale-102 sm:animate-none sm:scale-100' : ''
        }`} 
        src={assets.hero_img} 
        alt="Hero" 
      />
    </div>
  )
}

export default Hero
