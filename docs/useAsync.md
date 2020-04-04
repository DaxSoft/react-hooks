# useAsync

Use this when you need to handle with async functions or at least, need the state of operation of a async function!

## Paramaters

**func** : *Function|Array*  | It can be a single function or a stack of Functions under a *Array*
**config**: *Object* | Configuration of the Hook
- **start** : *Boolean* | Auto execute
- **paramaters** : *Array* | Use it to define the paramaters of each functions called.

## Example

```js
import { useAsync } from '@vorlefan/react-hooks'

async function asyncFN1(booleanValue, numberValue) {}

async function asyncFN2(strValue, booleanValue) {}

const Component = ({}) => {
    const { response, error, pending, handler } = useAsync(
        [asyncFN1, asyncFN2],
        {
            start: true,
            paramaters: [
                [true, 1],
                ['test', false],
            ],
        }
    )
    return <div />
}
```

## Return State
After you have invoked the hook, it will return a *Object* with some variables for you handle with the states of the Hook.

```js
const { response, error, pending, handler } = useAsync()
```
- **response** : *Array* : Get the result of each Function
- **error** : *Array* : Get the error of the Hook
- **pending** : *Object[useBoolean]* : Get the state of the Hook, if it is running up or not
- **handler** : *Function* with this you execute the hooks again, just use it as:
```js
handler()
```


