import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobbee",
  description: "job application portal with next and django",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className={inter.className}>
              <Script
                  strategy="beforeInteractive"
                  src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
              ></Script>
              <Script
                  src="https://kit.fontawesome.com/9edb65c86a.js"
                  crossOrigin="anonymous"
              ></Script>

              <Script
                  strategy="beforeInteractive"
                  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
              ></Script>
              <Script
                  strategy="beforeInteractive"
                  src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
              ></Script>
              <Header />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
          </body>
      </html>
  );
}
