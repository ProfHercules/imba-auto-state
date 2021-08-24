# imba-auto-state

`imba-auto-state` is a super easy-to-use state management solution for [imba](https://github.com/imba/imba)

We simply wrap a given object in a Proxy and call `imba.commit` whenever the `set` trap is called. [More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

The most simple case is as follows:

```
# import the function
import { createAutoState } from "imba-auto-state"

# create state by passing an object to the function
const appState = createAutoState({ count: 0 })

# extend the base `element` tag of imba
extend tag element
    get #state
        appState

# Now, any custom component anywhere in your project has access to the `#state` getter.

tag App
    def render
        <self>
            <p> "Count: {#state.count}"
                <div>
                    <button @click=(#state.count++)> "+"
                    <button @click=(#state.count--)> "-"

imba.mount(<App>)
```

## Example 2

You can use any JavaScript object (i.e. a class) as state.
For example, below is an example of a `state.imba` file

```imba
# import the function
import { createAutoState } from "imba-auto-state"

# define your state as a class (if you want)
class AppState
    count\number = 0

    def reset
        count = 0

const appState = createAutoState(new AppState())

extend tag element
    get #state
        appState
```

Now we can import this file anywhere in our project and instantly have access to the state on any component. In vscode we'll even have some helpful type hints.

## Example 3: Firebase

```
import { onSnapshot, collection } from "firebase/firestore"
import type { DocumentData, Unsubscribe } from "firebase/firestore"

import { auth, firestore } from "./lib/firebase"
import { Record } from "./lib/types"

tag FirebaseApp
    def listenToFirestore(path\string)
        const collRef = collection(firestore, path)
        onSnapshot(collRef, do(qs)
            #state.records = qs.docs.map(do(doc)
                new Record(doc.data(), doc.id)
            )
        )

    def mount()
        auth.onAuthStateChanged(do(u)
            #state.user = u

            if (u)
                listenToFirestore("users/{u.uid}/records")
                if router.path === '/'
                    router.go('/summary')
                else
                    router.go('/')
        )

export tag App < FirebaseApp
    def render
        <self>
            if (#state.user === undefined)
                <main>
                    <h1 [c:gray7]> "Loading..."
            elif (#state.user === null)
                <Home route='/'>
            else
                <Navbar>
                    <Summary route='/summary'>
                    <Records route='/records'>
```
