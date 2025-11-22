import "@/app/globals.css";
import { Heebo, Podkova, Poppins, Nosifer } from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextAuthProvider from '@/hooks/NextAuthProvider'
import { getServerSession } from "next-auth/next"
import authOptions from "@/lib/authOptions"



const heebo = Heebo({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-heebo',
  display: 'swap',
});

const podkova = Podkova({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-podkova',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
  display: 'swap',
});

const nosifer = Nosifer({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-nosifer',
  display: 'swap',
});

export const metadata = {
  title: "The Illuminated Trader",
  description: "Money management tool for binary options trading",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions)


  return (
    <html lang="en" >
      <body
        className={`${heebo.variable} ${podkova.variable} ${poppins.variable} ${nosifer.variable} antialiased min-h-screen flex flex-col`}
      >
        {/*<body> */}
        {/* <h1 className="title">💰 <Image src="/logo2.jpeg" fill alt="The ILLUMINATED TRADER" /> The ILLUMINATED TRADER</h1> */}
        <NextAuthProvider session={session}>
          <Header />
          <main className="flex-1">
            {children}        {/* grows to fill remaining height */}
          </main>
          {/* <br /><br /> */}
          <Footer />

        </NextAuthProvider>


      </body>
    </html >
  );
}
