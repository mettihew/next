import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import TopProgressBar from "@/components/TopProgressBar";
import GlobalRouterSpinner from '@/components/GlobalRouterSpinner';


export const metadata = {
  title: "eesy.ir",
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        {/* Youtube red line */}
        <TopProgressBar />
        {/* smooth pagination */}
         <PageTransition>
          {/* showing loading... on every button or a tag click GlobalRouterSpinner */}
        <GlobalRouterSpinner />
    {children}
  </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
