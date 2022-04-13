import type { AppPropsWithLayout } from 'src/custom-types/page'
import { AppProvider } from 'src/components/Context/AppContext';

import { ChakraProvider } from '@chakra-ui/react'
import theme from 'theme'

import { StarknetProvider } from '@starknet-react/core'

import NextNProgress from "nextjs-progressbar";

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <AppProvider>
      <StarknetProvider>
        <ChakraProvider resetCSS theme={theme}>
          <NextNProgress />
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </StarknetProvider>
    </AppProvider>
  )
}

export default App
