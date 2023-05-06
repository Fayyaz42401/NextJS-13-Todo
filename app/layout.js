import Header from "./header";
import { ContextProvider } from ".././components/Client";
import "../styles/global.scss";

export const metadata = {
  title: "Todo App",
  description: "Next.js 13 Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
