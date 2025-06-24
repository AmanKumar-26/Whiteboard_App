import "./globals.css";
import { Itim } from "next/font/google";
import { Toaster } from "react-hot-toast";

const itim = Itim({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "whiteboard ",
  description: "A collaborative whiteboard for everyone.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={itim.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
