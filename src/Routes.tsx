import * as React from 'react'
import { render } from 'react-dom'
import { Switch } from 'react-router'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { LeftPanel } from './'
import { Contents } from './'
import { Container } from 'semantic-ui-react'

const routes = <BrowserRouter>
	<div id='wrapper'>
		<LeftPanel />
		<main style={{ margin: '1rem 0 1rem 16rem' }}>
			<Container>
				<Switch>
					<Route
					isExact={true}
					path='/channels/:channelName'
					component={Contents}
					/>
					<Route
					isExact={true}
					path='/'
					render={() => <h1>Sample Application</h1>} />
				</Switch>
			</Container>
		</main>
	</div>
</BrowserRouter>

render(routes, document.getElementById('app'))