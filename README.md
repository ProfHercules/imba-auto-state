# imba-auto-state

`imba-auto-state` is a super easy-to-use state management solution for [imba](https://github.com/imba/imba)

## Install

Run this in your project root

```
npm install imba-auto-state
```

## Quick Start: StatefulTag

1. Import `StatefulTag`

```imba
import { StatefulTag } from "imba-auto-state"
```

2. Simply create a tag that inherits from StatefulTag with a variable `state` attached, it must be an object.

```imba
import { StatefulTag } from "imba-auto-state"

tag App < StatefulTag
    state = { count: 0 }

    def render
        <self>
            <div>
				<p> "Count: {state.count}"
			<div>
				<button @click=(state.count++)> "+"
				<button @click=(state.count--)> "-"
```

Changing any nested property of the state object, anywhere else in your codebase will ensure this component renders itself again.

## Quick Start: Global State

1. Import `createAutoState` in a `state.imba` file

   ```imba
   import { createAutoState } from "imba-auto-state"

   ### we need to provide 2 things
   a `state` object, and a callback function
   to call whenever `state` changes
   ###

   const appState = createAutoState({counter: 0}, do imba.commit!)

   # now we can simply extend the global base element
   extend tag element
        get #state
            appState
   ```

2. Now just import `state.imba` somewhere, anywhere, in your project.

Changing any nested property of the state object, anywhere else in your codebase will call the provided callback. In this case, imba will schedule a re-render for the next frame.
