import '../styles/tailwind.css'
import { Inter } from 'next/font/google'
import { DiaryProvider } from '~/hooks/Diary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'GDSC Space',
    description: 'welcome to space',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <body className={`${inter.className} h-screen max-h-screen min-h-screen`}>
                <DiaryProvider>{children}</DiaryProvider>
            </body>
        </html>
    )
}
