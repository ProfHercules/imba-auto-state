import { StatefulTag } from "imba-auto-state"


tag App < StatefulTag
	state = { count: 0, nestedState: { halfCount: 0 } }

	counterId = null
	
	def startCount
		counterId = setInterval(&, 1000) do
			state.count++
			if state.count % 2 == 0
				state.nestedState.halfCount++
			
	def stopCount
		if (counterId)
			clearInterval(counterId)
		
	def render
		<self>
			<div> 
				<p> "Count: {state.count}"
				<p> "Nested Count: {state.nestedState.halfCount}"
			<div>
				<button @click=startCount> "Start counting"
				<button @click=stopCount> "Stop counting"
			<div>
				<button @click=(state.count++)> "Manually +"
				<button @click=(state.count--)> "Manually -"


imba.mount(<App>)