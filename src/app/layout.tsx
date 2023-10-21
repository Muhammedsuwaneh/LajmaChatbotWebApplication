import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext/AuthContext'
import { ThemeContextProvider } from '@/context/ThemeContext/ThemeContext'
import { UserContextProvider } from '@/context/UserContext/UserContext';

export const metadata = {
  title: 'Lajma Chatbot',
  description: 'Lajma openai inspired application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
            <UserContextProvider>
              <ThemeContextProvider>
                {children}
              </ThemeContextProvider>
            </UserContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
