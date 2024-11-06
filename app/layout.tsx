import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SNUxplore",
  description: "Your gateway to our unique features! We get it, life is hard. Navigating through campus shouldn't be. Unlock everything SNU has to offer. All just a search away",
  authors: [
    // Everyone else please add on ur profiles 😛😛😛
    { name: 'Lalit Maurya', url: 'https://github.com/lalitm1004' }
  ]
};

// Font setup
const montserratBlack = localFont({
  src: "../public/fonts/montserrat/Montserrat-Black.ttf",
  variable: "--font-montserrat-black"
})

const montserratBlackItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-BlackItalic.ttf",
  variable: "--font-montserrat-black-italic"
})

const montserratBold = localFont({
  src: "../public/fonts/montserrat/Montserrat-Bold.ttf",
  variable: "--font-montserrat-bold"
})

const montserratBoldItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-BoldItalic.ttf",
  variable: "--font-montserrat-bold-italic"
})

const montserratExtraBold = localFont({
  src: "../public/fonts/montserrat/Montserrat-ExtraBold.ttf",
  variable: "--font-montserrat-extrabold"
})

const montserratExtraBoldItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-ExtraBoldItalic.ttf",
  variable: "--font-montserrat-extrabold-italic"
})

const montserratExtraLight = localFont({
  src: "../public/fonts/montserrat/Montserrat-ExtraLight.ttf",
  variable: "--font-montserrat-extralight"
})

const montserratExtraLightItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-ExtraLightItalic.ttf",
  variable: "--font-montserrat-extralight-italic"
})

const montserratItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-Italic.ttf",
  variable: "--font-montserrat-italic"
})

const montserratLight = localFont({
  src: "../public/fonts/montserrat/Montserrat-Light.ttf",
  variable: "--font-montserrat-light"
})

const montserratLightItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-LightItalic.ttf",
  variable: "--font-montserrat-light-italic"
})

const montserratMedium = localFont({
  src: "../public/fonts/montserrat/Montserrat-Medium.ttf",
  variable: "--font-montserrat-medium"
})

const montserratMediumItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-MediumItalic.ttf",
  variable: "--font-montserrat-medium-italic"
})

const montserratRegular = localFont({
  src: "../public/fonts/montserrat/Montserrat-Regular.ttf",
  variable: "--font-montserrat-regular"
})

const montserratSemiBold = localFont({
  src: "../public/fonts/montserrat/Montserrat-SemiBold.ttf",
  variable: "--font-montserrat-semibold"
})

const montserratSemiBoldItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-SemiBoldItalic.ttf",
  variable: "--font-montserrat-semibold-italic"
})

const montserratThin = localFont({
  src: "../public/fonts/montserrat/Montserrat-Thin.ttf",
  variable: "--font-montserrat-thin"
})

const montserratThinItalic = localFont({
  src: "../public/fonts/montserrat/Montserrat-ThinItalic.ttf",
  variable: "--font-montserrat-thin-italic"
})

const nohemiBlack = localFont({
  src: "../public/fonts/nohemi/Nohemi-Black.woff",
  variable: "--font-nohemi-black"
})

const nohemiBold = localFont({
  src: "../public/fonts/nohemi/Nohemi-Bold.woff",
  variable: "--font-nohemi-bold"
})

const nohemiExtraBold = localFont({
  src: "../public/fonts/nohemi/Nohemi-ExtraBold.woff",
  variable: "--font-nohemi-extrabold"
})

const nohemiExtraLight = localFont({
  src: "../public/fonts/nohemi/Nohemi-ExtraLight.woff",
  variable: "--font-nohemi-extralight"
})

const nohemiLight = localFont({
  src: "../public/fonts/nohemi/Nohemi-Light.woff",
  variable: "--font-nohemi-light"
})

const nohemiMedium = localFont({
  src: "../public/fonts/nohemi/Nohemi-Medium.woff",
  variable: "--font-nohemi-medium"
})

const nohemiRegular = localFont({
  src: "../public/fonts/nohemi/Nohemi-Regular.woff",
  variable: "--font-nohemi-regular"
})

const nohemiSemiBold = localFont({
  src: "../public/fonts/nohemi/Nohemi-SemiBold.woff",
  variable: "--font-nohemi-semibold"
})

const nohemiThin = localFont({
  src: "../public/fonts/nohemi/Nohemi-Thin.woff",
  variable: "--font-nohemi-thin"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      // Font setup (ik, blame next.js)
      className={`
        ${montserratBlack.variable} ${montserratBlackItalic.variable} ${montserratBold.variable} 
        ${montserratBoldItalic.variable} ${montserratExtraBold.variable} ${montserratExtraBoldItalic.variable} 
        ${montserratExtraLight.variable} ${montserratExtraLightItalic.variable} ${montserratItalic.variable} 
        ${montserratLight.variable} ${montserratLightItalic.variable} ${montserratMedium.variable} 
        ${montserratMediumItalic.variable} ${montserratRegular.variable} ${montserratSemiBold.variable} 
        ${montserratSemiBoldItalic.variable} ${montserratThin.variable} ${montserratThinItalic.variable} 
        ${nohemiBlack.variable} ${nohemiBold.variable} ${nohemiExtraBold.variable} ${nohemiExtraLight.variable} 
        ${nohemiLight.variable} ${nohemiMedium.variable} ${nohemiRegular.variable} ${nohemiSemiBold.variable} 
        ${nohemiThin.variable}`}
    >
<head>

</head>
      <body className={`${montserratRegular.className}`}>
        {children}
        <div className={`w-full h-fit grid place-items-center`}>
          <Navbar />
        </div>
        <div >
          <Footer />
        </div>
      </body>
    </html>
  );
}
