import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insta-Transcribe',
  description: 'Get captions for your Instagram & Youtube videos',
  icons:{
    
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Toaster />
          <NextTopLoader 
            color="red"
          />
          {children}
      </body>
    </html>
  )
}
