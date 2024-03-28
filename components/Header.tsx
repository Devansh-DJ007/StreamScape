import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'
import SeachInput from './SeachInput'
import GenreDropdown from './GenreDropdown'

function Header() {
  return (
    <header className='fixed w-full z-20 top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900'>
        <Link href="/" className='mr-10'>
            <Image
                src="/images/logo.png" 
                alt='StreamScape Logo'
                width={180}
                height={150}
                className='cursor-pointer invert-0 dark:invert'
            >
            </Image>
        </Link>
        <div className='flex space-x-2'>
            <GenreDropdown />
            <SeachInput />
            <ThemeToggler />
        </div>
    </header>
  )
}

export default Header