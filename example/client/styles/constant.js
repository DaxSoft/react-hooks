
const SPACING = {
    BIG: 3.141,         // Math.PI,
    SMALL: 1.359,       // Math.E / 2
    DEFAULT: 1.687      // Math.SQRT2 * 1.2
}


const ANIMATION_SPEED = {
    FAST: '.4s',
    DEFAULT: '.95s',
    SLOW: '1.359s'
}

const ANIMATION_TRANSITION = { //https://animista.net/
    easeInQuint: `cubic-bezier(0.755, 0.050, 0.855, 0.060) both`,
    easeInExpo: `cubic-bezier(0.950, 0.050, 0.795, 0.035) both`,
    easeInBack: `cubic-bezier(0.600, -0.280, 0.735, 0.045) both`
}

// ------------------------------------------------------------------
// | export
// ------------------------------------------------------------------

export default {
    SPACING,
    ANIMATION_SPEED,
    ANIMATION_TRANSITION
}