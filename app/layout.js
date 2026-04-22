import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import I18nProvider from "@/components/I18nProvider";

export const metadata = {
  title: "Anandwan Fundraiser",
  description: "Support Anandwan - Forest of Happiness. A project by Maharogi Sewa Samiti, Warora.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body>
        <I18nProvider>
          <div className="app">
            <Navbar />
            <main className="content">
              {children}
            </main>
            <Footer />
            <Chatbot />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
