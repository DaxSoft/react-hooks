import { useMemo, useState, useEffect, useCallback } from 'react';

/* eslint-disable */
/**
 * @description This is a complete hook to handle with Boolean values.
 */
var useBoolean = function (initialValue) {
    var _a = useState(initialValue), state = _a[0], setState = _a[1];
    return useMemo(function () { return ({
        state: state,
        set: setState,
        on: function () { return setState(true); },
        off: function () { return setState(false); },
        isOn: function () { return state === true; },
        isOff: function () { return state === false; },
        toggle: function () { return setState(!state); },
        hex: function () { return +state; },
    }); }, [state]);
};

/* eslint-disable */
/**
 * @description A better way to handle with Objects
 * @param data object data
 * @param assign assign object data to 'data' paramater
 */
var useObject = function (data, assign) {
    var _a = useState(typeof assign === 'object' ? Object.assign(data, assign) : data), state = _a[0], setState = _a[1];
    return useMemo(function () { return ({
        state: state,
        setState: setState,
        set: function (key, value) {
            var uValue = Object.assign({}, state);
            uValue[key] = value;
            setState(uValue);
            return value;
        },
        handle: function (key, callback) {
            var uValue = Object.assign({}, state);
            uValue[key] = callback(uValue[key], state);
            setState(uValue);
        },
        stateAssign: function (object) {
            return setState(Object.assign(state, object));
        },
        objectAssign: function (object) {
            return setState(Object.assign(object, state));
        },
        isValid: function () {
            return state !== null &&
                typeof state === 'object' &&
                Object.keys(state).length > 0;
        },
        empty: function () { return setState({}); },
        has: function (key) { return state.hasOwnProperty(key); },
        typeof: function (keyword, type) {
            return typeof state[keyword] === type;
        },
        keys: function () { return Object.keys(state); },
        length: function () { return Object.keys(state).length; },
        each: function (callback) {
            return Object.keys(state).map(function (key, index, array) {
                return callback({
                    key: key,
                    index: index,
                    array: array,
                    value: state[key],
                });
            });
        },
        remove: function (key) {
            return state.hasOwnProperty(key) && delete state[key];
        },
    }); }, [state]);
};

/**
 * @type {function}
 * @description check if the dom element is available
 */
var hasDOM = function () {
    return typeof window !== 'undefined' &&
        !!window.document &&
        !!window.document.createElement;
};
/**
 * @description Check out if he website is on 'server-side' or 'client-side'
 * @param {Function} onChange[Boolean]
 * @example
 * const { inClient, inServer } = useClient();
 * // or
 * useClient((inClient) => console.log(!!inClient ? "client-side" : "server-side"))
 */
function useClient(onChange) {
    var inClient = useBoolean(hasDOM());
    useEffect(function () {
        inClient.set(hasDOM());
        if (!!onChange && typeof onChange === 'function')
            onChange(inClient.state);
        return function () { return inClient.off(); };
    }, []);
    var memoChecker = useMemo(function () { return ({
        inClient: inClient.isOn(),
        inServer: inClient.isOff(),
    }); }, [inClient.state]);
    return useMemo(function () { return ({
        inClient: memoChecker.inClient,
        inServer: memoChecker.inServer,
    }); }, [inClient.state]);
}

/**
 * @function useIndex
 * @description Useful for 'index' function such as page1, page2 and so on
 * @example
 * const indexor = useIndex({
 *  at: 0,
 *  min: 0,
 *  max: 9,
 *  step: .5,
 *  format: (step) => ~~step
 * })
 */
function useIndex(_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 9 : _d, _e = _a.reverse, reverse = _e === void 0 ? true : _e, _f = _a.step, step = _f === void 0 ? 1 : _f, _g = _a.format, format = _g === void 0 ? null : _g;
    var setup = useObject({
        value: value,
        min: min,
        max: max,
        reverse: reverse,
        step: step,
        format: format,
    });
    var handleFormat = useCallback(function (value) {
        return typeof setup.state.format === 'function'
            ? setup.state.format(value)
            : value;
    }, [setup.state.format]);
    return useMemo(function () { return ({
        // index
        setup: setup,
        current: setup.state.value,
        next: function () {
            return setup.set('value', handleFormat(setup.state.value) >= setup.state.max
                ? setup.state.reverse
                    ? setup.state.min
                    : setup.state.max
                : setup.state.value + setup.state.step);
        },
        pred: function () {
            return setup.set('value', handleFormat(setup.state.value) <= setup.state.min
                ? setup.state.reverse
                    ? setup.state.max
                    : setup.state.min
                : setup.state.value - setup.state.step);
        },
        set: function (state) { return setup.set('value', state); },
        is: function (index) { return handleFormat(setup.state.value) === index; },
        not: function (index) { return handleFormat(setup.state.value) !== index; },
        between: function (a, b) {
            var value = handleFormat(setup.state.value);
            return value >= a && value <= b;
        },
        among: function (values) {
            return Array.isArray(values) &&
                values.indexOf(handleFormat(setup.state.value)) !== -1;
        },
        start: function () { return setup.set('value', setup.state.min); },
        end: function () { return setup.set('value', setup.state.max); },
        list: function (value) {
            return new Array(value || setup.state.max).fill(1);
        },
    }); }, [setup.state]);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * @description create a toggle object handler
 * @param {Object} toggles Set a list of objects with 'Boolean' values,
 * in which will be set towards the 'useBoolean'.
 * @example
 * const listToggle = useToggle({ a: false, b: true });
 *
 * // check the value using the methods from 'useBoolean'
 * listToggle.state.a.isOn() && <h1>A toggle is ON</h1>
 *
 * // or you can access by using '$'
 * listToggle.$a.on() // turns toggle into true
 *
 * // highlight the value of a element to true while set all others
 * // to false
 * listToggle.highlight('a')
 *
 * // shadow the value of a element to false while set all
 * // others to true
 * listToggle.shadow('a')
 *
 * // reset all values to 'x' boolean value
 * listToggle.reset(false)
 */
function useToggle(data) {
    var state = {};
    var dollarSign = {};
    Object.keys(data).map(function (dataKey) {
        state[dataKey] = useBoolean(!!data[dataKey]);
        dollarSign["$" + dataKey] = state[dataKey];
    });
    return useMemo(function () { return (__assign({ state: state, toggle: function (key) {
            return state.hasOwnProperty(key) && state[key].toggle();
        }, set: function (key, value) {
            if (state.hasOwnProperty(key)) {
                state[key].set(value);
            }
            else {
                state[key] = useBoolean(value);
            }
        }, check: function (key) { return !!state[key].state; }, highlight: function (key) {
            for (var option in state) {
                state[option].set(key === option);
            }
        }, shadow: function (key) {
            for (var option in state) {
                state[option].set(key !== option);
            }
        }, reset: function (value) {
            for (var option in state) {
                state[option].set(!!value);
            }
        }, enabled: function () {
            return Object.keys(state).filter(function (key) { return state[key].isOn(); });
        }, disabled: function () {
            return Object.keys(state).filter(function (key) { return state[key].isOff(); });
        }, keys: function () { return Object.keys(state); }, each: function (callback) {
            return Object.keys(state).map(function (key, index) {
                return callback({ key: key, index: index, value: state[key] });
            });
        }, isAll: function (value, except) {
            var checker = true;
            for (var option in state) {
                var stateValue = state[option].state;
                var hasException = Array.isArray(except)
                    ? except.indexOf(option) !== -1
                    : false;
                //console.log(option, stateValue, 'except', hasException);
                if (!hasException && stateValue !== value) {
                    checker = false;
                    break;
                }
            }
            return checker;
        } }, dollarSign)); }, [state]);
}

function getSize(screenSize, config, margin) {
    if (margin === void 0) { margin = [1, 1]; }
    if (typeof window === 'undefined') {
        return config;
    }
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight, outerWidth = window.outerWidth, outerHeight = window.outerHeight;
    var aspect = [margin[0] || 1, margin[1] || 1];
    innerWidth *= aspect[0] || 1;
    innerHeight *= aspect[1] || 1;
    var orientation = innerWidth > innerHeight ? 'landscape' : 'portrait';
    var percentualRatio = innerHeight / innerWidth;
    var ratio = +parseFloat(percentualRatio.toString()).toFixed(2);
    var difference = 0;
    if (screenSize && screenSize.ratio) {
        difference = (screenSize.ratio - ratio) * 100;
        if (difference < 0.0)
            difference *= -1;
    }
    return {
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        outerWidth: outerWidth,
        outerHeight: outerHeight,
        ratio: ratio,
        difference: difference,
        orientation: orientation,
        previous: screenSize,
        aspect: aspect,
    };
}
function useScreenSize(config, margin) {
    if (config === void 0) { config = {
        innerWidth: 1360,
        innerHeight: 640,
        outerWidth: 1360,
        outerHeight: 640,
        ratio: 0.47,
        orientation: 'landscape',
        difference: 1,
    }; }
    if (margin === void 0) { margin = [1, 1]; }
    var _a = useState(getSize(__assign({}, config), config, margin)), screenSize = _a[0], setScreenSize = _a[1];
    var handleResize = useCallback(function () { return setScreenSize(getSize(screenSize, config, margin)); }, []);
    useEffect(function () {
        window.addEventListener('resize', function () {
            handleResize();
        });
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return useMemo(function () { return ({
        innerHeight: screenSize.innerHeight,
        innerWidth: screenSize.innerWidth,
        orientation: screenSize.orientation,
        ratio: screenSize.ratio,
        difference: screenSize.difference,
        outerHeight: screenSize.outerHeight,
        outerWidth: screenSize.outerWidth,
        fullHD: function () {
            return screenSize.innerWidth >= 1920 && screenSize.innerHeight >= 1080;
        },
        hd: function () {
            return screenSize.innerWidth >= 1360 && screenSize.innerHeight >= 724;
        },
    }); }, [screenSize]);
}

/**
 * @description provides a way to check the state of the
 * document scroll paramaters.
 * @example
 * const scroll = useScroll();
 * { scroll.isRight && <ScrollToRight /> }
 */
function useScroll() {
    var inClient = useClient().inClient;
    var scroll = useObject({
        x: 0,
        y: 0,
        isRight: false,
        isLeft: true,
        isTop: false,
        isBottom: true,
        bottom: 0,
        right: 0,
        offsetX: 0,
        offsetY: 0,
    });
    var listener = useCallback(function () {
        var _a = document.body.getBoundingClientRect(), left = _a.left, top = _a.top, bottom = _a.bottom, right = _a.right;
        scroll.setState({
            x: left,
            y: top,
            isRight: scroll.state.x > left,
            isLeft: scroll.state.x > -left,
            isBottom: scroll.state.y > top,
            isTop: scroll.state.y > -bottom,
            bottom: bottom,
            right: right,
            offsetY: scroll.state.y - top,
            offsetX: scroll.state.x - left,
        });
    }, []);
    useEffect(function () {
        if (!!inClient) {
            window.addEventListener('scroll', listener);
            return function () { return window.removeEventListener('scroll', listener); };
        }
    }, []);
    var toTop = useCallback(function () {
        if (!!inClient) {
            window.scrollTo(0, 0);
        }
    }, []);
    return useMemo(function () { return ({
        toTop: toTop,
        x: scroll.state.x,
        y: scroll.state.y,
        isRight: scroll.state.isRight,
        isLeft: scroll.state.isLeft,
        isTop: scroll.state.isTop,
        isBottom: scroll.state.isBottom,
        bottom: scroll.state.bottom,
        right: scroll.state.right,
        offsetX: scroll.state.offsetX,
        offsetY: scroll.state.offsetY,
    }); }, [scroll]);
}

function useKeyboard(key, callback) {
    var inClient = useClient().inClient;
    if (!inClient)
        return null;
    var _a = useState(false), pressed = _a[0], setPressed = _a[1];
    var isMatching = useCallback(function (event) {
        return event && event.key && key.toLowerCase() === event.key.toLowerCase();
    }, [key]);
    var onDown = useCallback(function (event) {
        if (isMatching(event)) {
            setPressed(true);
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, [callback]);
    var onUp = useCallback(function (event) { return isMatching(event) && setPressed(false); }, [key]);
    useEffect(function () {
        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        return function () {
            window.removeEventListener('keydown', function () { });
            window.removeEventListener('keyup', function () { });
        };
    }, [key]);
    return pressed;
}

/**
 * @description save up things upon local storage
 */
function useLocalStorage(key, value) {
    var inServer = useClient().inServer;
    if (inServer)
        return { get: function () { return null; }, set: function () { return false; }, state: null };
    var getItem = localStorage.getItem(key);
    var _a = useState(!!getItem ? JSON.parse(getItem) : JSON.stringify(value)), state = _a[0], setState = _a[1];
    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);
    return useMemo(function () { return ({
        get: function () { return JSON.parse(state); },
        set: function (value) { return setState(JSON.stringify(value)); },
        state: state,
    }); }, [state]);
}

/**
 * @function useMiddleMouse
 * @description check if the wheel of the mouse goes down or up
 * @example
 * const middleMouse = useMiddleMouse(20)
 * useEffect(() => {
 *       if (middleMouse.direction === 1) setIndex((index + 1) % 3);
 *       if (middleMouse.direction === -1) setIndex( index <= 0 ? 3 : index - 1 );
 *       return () => middleMouse.setDirection(0)
 *   }, [middleMouse.direction])
 */
function useMiddleMouse(threshould) {
    var inServer = useClient().inServer;
    if (!!inServer)
        return;
    var target = window;
    var _a = useState(0), direction = _a[0], setDirection = _a[1];
    var handleDirection = useCallback(function (_a) {
        var event = _a.event, threshould = _a.threshould, setDirection = _a.setDirection;
        if (event.deltaY < -threshould) {
            setDirection(-1);
        }
        else if (event.deltaY > threshould) {
            setDirection(1);
        }
    }, []);
    useEffect(function () {
        target.addEventListener('wheel', function (event) {
            return handleDirection({
                event: event,
                setDirection: setDirection,
                threshould: threshould,
            });
        });
        return function () {
            target.removeEventListener('wheel', function (event) {
                return handleDirection({
                    event: event,
                    setDirection: setDirection,
                    threshould: threshould,
                });
            });
        };
    }, []);
    return useMemo(function () { return ({
        direction: direction,
        setDirection: setDirection,
    }); }, [direction]);
}

/**
 * @function useMouseIn
 * @description Check if the user clicked inside of a element with the Mouse.
 * @param {React.useRef} ref
 * @param {Function} callback
 * @returns {useBoolean};
 * @example
 * const clickRef = React.useRef();
 * useMouseIn(clickRef, callback);
 *
 * <div ref={clickRef} />
 */
function useMouseIn(ref, callback) {
    var inServer = useClient().inServer;
    if (inServer)
        return;
    var handleClick = useCallback(function (event) { return callback(ref.current && ref.current.contains(event.target)); }, [ref]);
    useEffect(function () {
        window.addEventListener('click', handleClick);
        return function () { return window.removeEventListener('click', handleClick); };
    });
}

/**
 * @description delays invoking a function until after wait milliseconds have elapsed since the last time
 */
function useDebounce(callback, timeout) {
    var _a = useState(callback), state = _a[0], setState = _a[1];
    useEffect(function () {
        var handler = setTimeout(function () { return setState(callback); }, timeout);
        return function () { return clearTimeout(handler); };
    }, [callback, timeout]);
    return state;
}

export { useBoolean, useClient, useDebounce, useIndex, useKeyboard, useLocalStorage, useMiddleMouse, useMouseIn, useObject, useScreenSize, useScroll, useToggle };
//# sourceMappingURL=index.es.js.map
