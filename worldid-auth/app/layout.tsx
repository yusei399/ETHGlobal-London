import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav } from './nav'
import { ConnectKitProvider } from '@/components/connectkit-provider'
import { ThemeProvider } from "@/components/theme-provider"
import { ContextProvider } from './context-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'World ID Auth',
  description: 'Example of World ID device authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ height: 'calc(100vh - 60px)' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConnectKitProvider>
            <ContextProvider>
              <Nav />
              {children}
            </ContextProvider>
          </ConnectKitProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
