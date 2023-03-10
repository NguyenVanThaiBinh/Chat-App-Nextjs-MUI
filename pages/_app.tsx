import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchOnWindowFocus={false}
      refetchInterval={60 * 60}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
