# useClient

Use this when you are creating a app Server-side.

## Paramaters

**onChange** : _Function_ | The first paramater returns if it is on Client side or not.

## Example

```js
import { useClient } from '@vorlefan/react-hooks'

const Component = ({}) => {
    const [cover, setCover] = useState(null)

    useClient((inClient) => {
        if (!!inClient) {
            const origin = document.location.origin
            setCover(`${origin}/${userData.cover}`)
        }
    })
    return (
        <div>
            <img src={cover} />
        </div>
    )
}
```

## Return State

```js
const { inServer, inClient } = useClient()
```

-   **inServer** : _Boolean_ : Check if it is on Server-Side
-   **inClient** : _Boolean_ : Check if it is on Client-Side
