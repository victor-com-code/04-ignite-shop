import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import Header from '../components/header'
import { ShoppingCartProvider } from '../contexts/ShoppingCart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </ShoppingCartProvider>
  )
}
