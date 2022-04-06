import type { AppPropsWithLayout } from '@custom-types/page'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ChakraProvider resetCSS theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export default App
