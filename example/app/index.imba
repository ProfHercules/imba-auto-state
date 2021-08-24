import { createAutoState } from "imba-auto-state"

const appState = createAutoState({count: 0})

extend tag element
	get #state
		appState

tag app
	<self>
		<p> "Count: {#state.count}"
		<button @click=(#state.count++)> "+"
		<button @click=(#state.count--)> "-"


imba.mount(<app>)