import type { AppProps } from "next/app";

import "./globals.css";
import "../styles/components/progress-player-bar.css";
import "../styles/core/button.css";
import "../styles/core/card.css";
import "../styles/core/input.css";
import "../styles/pages/home.css";
import "../styles/pages/jogo-rapido.css";
import "../styles/pages/torneios.css";
import "../styles/pages/detalhe.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
