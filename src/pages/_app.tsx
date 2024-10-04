import Head from "next/head";
import "@/styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "@/styles/custom.scss";
import "@/styles/custom-swiper.scss";
import "@/styles/responsive.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../../client";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = (`http://localhost:3000` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];
  return (
    <>
      <Head>
        <title>MIT</title>
        <link rel="canonical" href={canonicalUrl} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="MIT description" />
      </Head>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
