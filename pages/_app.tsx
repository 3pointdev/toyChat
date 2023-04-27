import type { AppProps } from "next/app";
import GlobalStyle from "src/constants/global-style";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
