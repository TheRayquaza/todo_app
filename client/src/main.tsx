import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react"
import App from './App.tsx'
import { extendTheme } from '@chakra-ui/react';

const config = { initialColorMode: 'dark', useSystemColorMode: false };
const theme = extendTheme({ config });



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <CSSReset />
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <App/>
        </ChakraProvider>
    </React.StrictMode>
)