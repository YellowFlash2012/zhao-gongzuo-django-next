import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import { JobProvider } from "@/context/JobContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Jobbee",
    description: "job application portal with next and django",

}
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossorigin=""
            /> */}
            <AuthProvider>
                <JobProvider>
                    <body className={inter.className}>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                        <ToastContainer />

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

                        <script
                            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                            integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                            crossOrigin="anonymous"
                        ></script>
                        <script
                            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
                            integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
                            crossOrigin="anonymous"
                        ></script>
                    </body>
                </JobProvider>
            </AuthProvider>

            {/* <Script
                src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossorigin=""
                strategy="beforeInteractive"
            ></Script> */}
        </html>
    );
}
