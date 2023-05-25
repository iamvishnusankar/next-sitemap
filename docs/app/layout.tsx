import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next-Sitemap",
  description: "Sitemap generator for Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
