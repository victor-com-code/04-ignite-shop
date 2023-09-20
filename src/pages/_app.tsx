import { AppProps } from "next/app"
import { globalStyles } from "../styles/globals"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      

      <Component {...pageProps} />
    </div>
  )
}