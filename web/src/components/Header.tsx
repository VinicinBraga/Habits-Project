import React from 'react'
import logoImage from '../assets/logo.svg'
import { AiOutlinePlus } from 'react-icons/ai'

const Header = () => {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt='habits_ogo' />

      <button className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 text-white"><AiOutlinePlus size={20} className='text-violet-500'  />New Habit  
      </button>
  
    </div>
  )
}

export default Header