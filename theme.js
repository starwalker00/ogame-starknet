import { extendTheme } from '@chakra-ui/react'

const fonts = { mono: `'Menlo', monospace` }

const theme = extendTheme({
    fonts,
    initialColorMode: "dark"
})

export default theme
