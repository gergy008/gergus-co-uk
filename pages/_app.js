import '../styles/globals.css'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <NextThemeProvider
      defaultTheme="system"
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange>
      <Component {...pageProps} />
    </NextThemeProvider>
  )
}

export default MyApp
