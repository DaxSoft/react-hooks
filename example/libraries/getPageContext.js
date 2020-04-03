import { SheetsRegistry } from 'jss'
import {
    createMuiTheme,
    createGenerateClassName,
} from '@material-ui/core/styles'
import { PALLETE_COLORS } from '../styles/default'

/* Create your app color theme here */
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
    },

    palette: PALLETE_COLORS,
})

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),

        //add this to fix broken css in prod
        generateClassName: createGenerateClassName({
            productionPrefix: 'prod',
        }),
    }
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext()
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext()
    }

    return global.__INIT_MATERIAL_UI__
}
