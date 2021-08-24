import { createAutoState } from "./createAutoState"


export tag StatefulTag
	def setup
		const props = Object.getOwnPropertyNames(self)
		if ("state" in props) and (state isa Object)
			console.log("Detected StatefulTag")
			self.state = registerState(self.state)

	def registerState(state\object)
		createAutoState(state, do(target, key, value)
			console.log("{target.constructor.name}[{key.toString!}] changedTo -> {value}")
			self.render!
		)

	def render
		<self>