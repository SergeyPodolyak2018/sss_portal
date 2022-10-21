import React from 'react'
import {
	BrowserRouter,
	Route,
} from 'react-router-dom'

export default (
	<BrowserRouter>
		<Route exact path='/en/?index=:id' />
		<Route exact path='/ru/?index=:id' />
		<Route path='/?index=:id' />

		<Route exact path='/:lang' />

		<Route path='/:lang/innovation_progress' />
		<Route path='/innovation_progress' />

		<Route path='/ru/search_discoveries' />
		<Route path='/en/search_discoveries' />
		<Route path='/search_discoveries' />

		<Route path='/ru/direct_speech' />
		<Route path='/en/direct_speech' />
		<Route path='/direct_speech' />

		<Route path='/ru/direct_speech/:article' />
		<Route path='/en/direct_speech/:article' />
		<Route path='/direct_speech/:article' />
	</BrowserRouter>
)
