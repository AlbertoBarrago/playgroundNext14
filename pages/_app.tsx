import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "../components/theme-provider";
import {AppProvider} from "../context/Context";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AppProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <Component {...pageProps} />
            </ThemeProvider>
        </AppProvider>
    )
}
