import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import TopProgressBar from "@/components/TopProgressBar";


export const metadata = {
  title: "Dev News App",
  icons: {
    icon: "/favi.ico"
    // icon: "/favicon-react.ico"
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
    {children}
  </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
