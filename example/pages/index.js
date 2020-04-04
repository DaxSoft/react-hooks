// ------------------------------------------------------------------
// | [Import]
// ------------------------------------------------------------------

import React from 'react'
import Head from 'next/head'
import loadable from '@loadable/component'
import { useScreenSize } from '@vorlefan/react-hooks'

const IndexDesktop = loadable(() =>
    import('../client/components/index/desktop')
)
const IndexMobile = loadable(() => import('../client/components/index/mobile'))

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

const Desktop = ({}) => {
    return (
        <div>
            <IndexDesktop />
        </div>
    )
}

const Mobile = ({}) => {
    return (
        <div>
            <IndexMobile />
        </div>
    )
}

// ------------------------------------------------------------------
// | [Page]
// ------------------------------------------------------------------

const Page = ({}) => {
    const screenSize = useScreenSize(
        {
            innerWidth: 640,
            innerHeight: 1360,
            orientation: 'portrait',
        },
        [0.95, 1.5]
    )

    return (
        <>
            <Head>
                <title>@vorlefan/react-hooks</title>
            </Head>

            {screenSize.orientation === 'landscape' ? <Desktop /> : <Mobile />}
        </>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Page
