import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/context/cartContext";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  title: "Croc Show - Pastelaria e lanches para toda Curitiba",
  description: "Pastéis e lanches servidos com muita qualidade e crocancia para toda Curitiba.",
  icons: {
      icon: [
        '/assets/favicon.ico',
      ],
      apple: [
        '/assets/apple-touch-icon.png'
      ],
      shortcut: [
        '/assets/apple-touch-icon.png'
      ]
    },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
        <CartProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
