import { useState, useEffect, useMemo, useCallback } from 'react'

interface Parameter_Screensize {
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    ratio: number
    orientation: string | 'landscape' | 'portrait'
    difference: number
}

function getSize(
    screenSize: Parameter_Screensize,
    config: Parameter_Screensize,
    margin = [1, 1]
) {
    if (typeof window === 'undefined') {
        return config
    }

    let { innerWidth, innerHeight, outerWidth, outerHeight } = window

    const aspect: Array<number> = [margin[0] || 1, margin[1] || 1]

    innerWidth *= aspect[0] || 1
    innerHeight *= aspect[1] || 1

    const orientation = innerWidth > innerHeight ? 'landscape' : 'portrait'
    const percentualRatio: Number = innerHeight / innerWidth
    const ratio = +parseFloat(percentualRatio.toString()).toFixed(2)

    let difference = 0

    if (screenSize && screenSize.ratio) {
        difference = (screenSize.ratio - ratio) * 100
        if (difference < 0.0) difference *= -1
    }

    return {
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        ratio,
        difference,
        orientation,
        previous: screenSize,
        aspect,
    }
}

/**
 * @description get the window size
 */

interface HooksScreenSize {
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    ratio: number
    orientation: string | 'landscape' | 'portrait'
    difference: number
    fullHD: Function
    hd: Function
}

export default function useScreenSize(
    config: Parameter_Screensize = {
        innerWidth: 1360,
        innerHeight: 640,
        outerWidth: 1360,
        outerHeight: 640,
        ratio: 0.47,
        orientation: 'landscape',
        difference: 1,
    },
    margin: Array<number> = [1, 1]
) {
    const [screenSize, setScreenSize] = useState(
        getSize({ ...config }, config, margin)
    )

    const handleResize = useCallback(
        () => setScreenSize(getSize(screenSize, config, margin)),
        []
    )

    useEffect(() => {
        window.addEventListener('resize', () => {
            handleResize()
        })

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return useMemo(
        (): HooksScreenSize => ({
            innerHeight: screenSize.innerHeight,
            innerWidth: screenSize.innerWidth,
            orientation: screenSize.orientation,
            ratio: screenSize.ratio,
            difference: screenSize.difference,
            outerHeight: screenSize.outerHeight,
            outerWidth: screenSize.outerWidth,
            fullHD: () =>
                screenSize.innerWidth >= 1920 && screenSize.innerHeight >= 1080,
            hd: () =>
                screenSize.innerWidth >= 1360 && screenSize.innerHeight >= 724,
        }),
        [screenSize]
    )
}
