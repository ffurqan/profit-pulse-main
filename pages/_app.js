// pages/_app.js
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import nprogress styles
import "../styles/globals.css"; // Import your global styles

// Configure nprogress options if needed
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Handle route change events
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
