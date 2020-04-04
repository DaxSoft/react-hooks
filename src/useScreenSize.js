import { useState, useEffect, useMemo, useCallback } from 'react'

function getSize(screenSize, config, aspect) {
    if (typeof window === 'undefined') {
        return config
    }

    let { innerWidth, innerHeight, outerWidth, outerHeight } = window

    innerWidth *= aspect[0] || 1
    innerHeight *= aspect[1] || 1

    const orientation = innerWidth > innerHeight ? 'landscape' : 'portrait'
    const ratio = +parseFloat(innerHeight / innerWidth).toFixed(2)

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

export default function useScreenSize(
    config = {
        innerWidth: 1360,
        innerHeight: 640,
        outerWidth: 1360,
        outerHeight: 640,
        ratio: 0.47,
        orientation: 'landscape',
        difference: 1,
    },
    margin = [1, 1]
) {
    const [screenSize, setScreenSize] = useState(getSize(null, config, margin))

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
        () => ({
            ...screenSize,
            fullHD:
                screenSize.innerWidth >= 1920 && screenSize.innerHeight >= 1080,
            hd: screenSize.innerWidth >= 1360 && screenSize.innerHeight >= 724,
        }),
        [screenSize]
    )
}
