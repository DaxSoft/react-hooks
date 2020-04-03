import { fade } from '@material-ui/core/styles'

// ------------------------------------------------------------------
// | Neutral Colors
// | Commonly used for backgrounds, strokes,
// | and interactive states within controls.
// ------------------------------------------------------------------

export const NEUTRAL_COLOR = {
    neutralBlack: '#141414',
    neutralDark: '#212121',
    neutralPrimary: '#333333',
    neutralSecondary: '#666666',

    neutralTransition: '#c8c8c8',
    neutralTransitionPrimary: '#a6a6a6',
    neutralTransitionSecondary: '#dadada',

    neutralLight: '#eaeaea',
    neutralLighter: '#f4f4f4',
    neutralWhite: '#f5f5f5',
}

// ------------------------------------------------------------------
// | System Colors
// | Commonly used for system informations as error, warning, alert
// | and so on
// ------------------------------------------------------------------

export const SYSTEM_COLOR = {
    error: {
        main: '#D74B27',
    },

    warning: {
        main: '#DEB955',
    },

    success: {
        main: '#85A051',
    },

    information: {
        main: '#467E77',
    },

    disabled: {
        main: '#596F66',
    },

    active: {
        main: '#A3D1B2',
    },

    compare: {
        equal: '#D2BB8E',
        less: '#E86358',
        more: '#79A734',
    },
}

// ------------------------------------------------------------------
// | Theme Colors
// | Commonly used for the overall system as primary and secondary
// | interaction. Such a 'login' button, if it needs highlight
// ------------------------------------------------------------------

export const THEME_COLOR = {
    primary: {
        main: '#99D492', //'#4EAF95', 22d457
        bridge: '#39A96B',
        strong: '#178473',
    },

    secondary: {
        main: '#197C99',
        bridge: '#3198B6',
    },

    default: {
        main: '#7DB2A0',
    },

    segment: {
        n1: '#CA7B5B',
        nm: '#79A734',
        n2: '#EBB423',
    },

    background: '#E3E6EF'
}

// ------------------------------------------------------------------
// | Gradient Colors
// ------------------------------------------------------------------

/**
 *
 * @param {String} deg  it can be '45deg' or 'to left', 'circle farthest-corner at 10% 20%'
 * @param {*} gradients The model of each array is:
 * [[color, percent], [color, percent]] as: [[#eee, 50]]
 */

export function linerGradient(deg, gradients) {
    const values = gradients
        .map(element => `${element[0]} ${element[1]}%`)
        .join(', ')
    return `linear-gradient(${deg}, ${values})`
}

export const GRADIENT_COLOR = {
    primary: {
        main: `linear-gradient(45deg, ${THEME_COLOR.primary.main} 30%, ${THEME_COLOR.primary.strong} 90%)`,
        bridge: `linear-gradient(60deg, ${THEME_COLOR.primary.bridge} 10%, ${THEME_COLOR.primary.main} 30%)`,
    },

    secondary: {
        main: `linear-gradient(60deg, ${THEME_COLOR.secondary.main} 0%, ${THEME_COLOR.secondary.bridge} 79%, ${THEME_COLOR.secondary.main} 100%)`,
    },

    special: `linear-gradient(to left, #e0ab5b, #717b62)`,

    neutral: `radial-gradient(circle, ${NEUTRAL_COLOR.neutralPrimary} 14%, ${NEUTRAL_COLOR.neutralDark} 82%)`,
    neutralLinear: `linear-gradient(45deg, ${NEUTRAL_COLOR.neutralPrimary} 30%, ${NEUTRAL_COLOR.neutralDark} 90%)`,
    neutralRadial: `radial-gradient( circle farthest-corner at 10% 20%,  ${NEUTRAL_COLOR.neutralPrimary} 0%,  81.3% )`,
    neutralCenter: `linear-gradient(45deg, ${NEUTRAL_COLOR.neutralBlack} 9%, ${NEUTRAL_COLOR.neutralDark} 83%)`,

    roseWater: 'linear-gradient(to right, #e55d87, #5fc3e4)',
    horizon: 'linear-gradient(to right, #003973, #e5e5be)',
    emeraldWater: 'linear-gradient(to right, #348f50, #56b4d3)',
    greenBeach: 'linear-gradient(to right, #02aab0, #00cdac)',
    sel: 'linear-gradient(to right, #00467f, #a5cc82)',
    skyBlue:
        'linear-gradient( 109.6deg,  rgba(204,228,247,1) 11.2%, rgba(237,246,250,1) 100.2% )',
    deepBlue: 'linear-gradient(to top, #09203f 0%, #537895 100%)',

    error: 'linear-gradient(19deg, #ec3e3e 0%, #ee7494 100%)',

    lightGreen: 'linear-gradient(62deg, #92D4B6 11%, #39a96b 100%)',
}

// ------------------------------------------------------------------
// | Box Shadow Colors
// ------------------------------------------------------------------

export function boxShadow({
    horizontal = 0,
    vertical = 0,
    blur = 0,
    spread = 0,
    color = 'rgba(0,0,0,.5)',
    inset = false,
}) {
    return `${horizontal}px ${vertical}px ${blur}px ${spread}px ${color} ${
        !!inset ? 'inset' : ''
    }`
}

export const BOX_SHADOW = {
    depth: `1px 4px 12px 2px ${NEUTRAL_COLOR.neutralPrimary}`,
    el12: `0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)`,

    float(strength = 16, color = NEUTRAL_COLOR.neutralBlack, opacity = 0.3) {
        return boxShadow({
            horizontal: 0,
            blur: strength / 0.4,
            vertical: strength,
            spread: -(strength * 0.757),
            color: fade(color, opacity),
        })
    },

    faded(strength = 4, color = NEUTRAL_COLOR.neutralBlack, opacity = 0.2) {
        return [
            boxShadow({
                horizontal: 0,
                vertical: strength / 2,
                blur: strength,
                spread: -(strength / 2),
                color: fade(color, opacity * 1.117),
            }),
            boxShadow({
                horizontal: 0,
                vertical: strength,
                blur: strength ** 2,
                spread: -(strength / 2),
                color: fade(color, opacity),
            }),
        ].join(', ')
    },

    light(strength = 8, color = NEUTRAL_COLOR.neutralBlack, opacity = 0.3) {
        return boxShadow({
            horizontal: 0,
            vertical: strength,
            blur: strength * 5,
            spread: -(strength / 0.663),
            color: fade(color, opacity),
        })
    },

    over(strength = 14, color = NEUTRAL_COLOR.neutralBlack, opacity = 0.3) {
        return boxShadow({
            horizontal: 0,
            vertical: strength,
            blur: strength / 0.175,
            spread: 0,
            color: fade(color, opacity),
        })
    },

    soft(strength = 0, color = NEUTRAL_COLOR.neutralBlack, opacity = 0.3) {
      return boxShadow({
          horizontal: 0,
          vertical: strength,
          blur: 20,
          spread: 0,
          color: fade(color, opacity),
      })
  },

}

// ------------------------------------------------------------------
// | Pallete Colors
// | Export for material-ui/styles pallete
// ------------------------------------------------------------------

export const PALLETE_COLORS = {
    background: {
        default: '#E3E6EF', // '#e0e4e6',
        paper: NEUTRAL_COLOR.neutralSecondary,
    },

    primary: {
        main: THEME_COLOR.primary.main,
    },

    secondary: {
        main: THEME_COLOR.secondary.main,
    },

    error: {
        main: SYSTEM_COLOR.error.main,
    },

    text: {
        primary: NEUTRAL_COLOR.neutralDark,
        secondary: NEUTRAL_COLOR.neutralPrimary,
        disabled: NEUTRAL_COLOR.neutralTransitionPrimary,
        hint: NEUTRAL_COLOR.neutralSecondary,
    },

    action: {
        disabled: NEUTRAL_COLOR.neutralSecondary,
        active: SYSTEM_COLOR.active.main,
    },
}
