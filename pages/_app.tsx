import type { AppPropsWithLayout } from '@custom-types/page'
import { AppProvider } from '@components/Context/AppContext';

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

import { StarknetProvider } from '@starknet-react/core'

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <AppProvider>
      <StarknetProvider>
        <ChakraProvider resetCSS theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </StarknetProvider>
    </AppProvider>
  )
}

export default App
