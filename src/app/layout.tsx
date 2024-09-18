import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/context/cartContext";

export const metadata: Metadata = {
  title: "Croc Show - Pastelaria e Salgados para toda Curitiba",
  description: "Pastéis e lanches servidos com muita qualidade e crocancia para toda Curitiba.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
