import "./globals.css";
// import { Inter } from "next/font/google";
import Footer from "./Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Phone Extension Book",
  description: "An app to manage company extension number",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
