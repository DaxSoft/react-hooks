# useBoolean

Use this when you need to handle with Boolean values. This will give you a better semantic way to handle with it.

## Paramaters

**initialValue** : _Boolean_ | By default is 'false'

## Example

```js
import { useBoolean } from '@vorlefan/react-hooks'

const Component = ({}) => {
    const toggle = useBoolean(false)
    return (
        <div>
            <button onClick={toggle.toggle}>Toggle It, {toggle.hex}</button>
            {toggle.isOn() && 'Value is ON'}
            {toggle.isOff() && 'Value is OFF'}
            <button onClick={toggle.on}>Turn ON</button>
            <button onClick={toggle.on}>Turn OFF</button>
        </div>
    )
}
```

## Return State

```js
const { state, set, on, off, isOn, isOff, hex, toggle } = useBoolean(false)
```

-   **state** : _Boolean_ : Get the value itself
-   **set** : _Function_ : Set the value directly
-   **on** : _Function_ : Turn it on
-   **off** : _Function_ : Turn it off
-   **isOn** : _Function_ : Check if it is true
-   **isOff** : _Function_ : Check if it is false
-   **hex** : Get the HEX value
-   **toggle** : If it is 'true' turn on 'false'. If it is 'false', turn on 'true'
