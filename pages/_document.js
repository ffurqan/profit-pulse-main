import { Html, Head, Main, NextScript } from "next/document";
import Header from "@/Components/Header";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <title>ProfitPuls - Online Earning Platform</title>
        <Main />

        <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/lib/wow/wow.min.js" strategy="lazyOnload" />
        <Script src="/lib/easing/easing.min.js" strategy="lazyOnload" />
        <Script src="/lib/waypoints/waypoints.min.js" strategy="lazyOnload" />
        <Script
          src="/lib/owlcarousel/owl.carousel.min.js"
          strategy="lazyOnload"
        />
        <Script src="/js/main.js" strategy="lazyOnload" />
        <NextScript />
      </body>
    </Html>
  );
}
