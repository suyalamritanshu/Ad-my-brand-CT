import './globals.css'
import { Inter } from 'next/font/google'
import logo from '../app/favicon.ico'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'User Details page | AD My Brand',
  description: 'User details page'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
