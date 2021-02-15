import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	useMutation,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Affix, Spin } from 'antd';
import {
	AppHeader,
	Home,
	Author,
	Review,
	Reviews,
	NotFound,
	User,
	Login,
	About,
} from './sections';
import { LOG_IN } from './lib/graphql/mutations';
import {
	LogIn as LogInData,
	LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { Viewer } from './lib/types';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';

const httpLink = createHttpLink({
	uri: '/api',
});

const authLink = setContext((_, { headers }) => {
	const token = sessionStorage.getItem('token');
	return {
		headers: {
			...headers,
			'X-CSRF-TOKEN': token || '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
	id: null,
	token: null,
	avatar: null,
	didRequest: false,
	authorized: false,
};

const App = () => {
	const [viewer, setViewer] = useState<Viewer>(initialViewer);
	const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
		onCompleted: (data) => {
			if (data && data.logIn) {
				setViewer(data.logIn);
				if (data.logIn.token) {
					sessionStorage.setItem('token', data.logIn.token);
				} else {
					sessionStorage.removeItem('token');
				}
			}
		},
	});

	const logInRef = useRef(logIn);

	useEffect(() => {
		logInRef.current();
	}, []);

	if (!viewer.didRequest && !error) {
		return (
			<Layout className='app-skeleton'>
				<AppHeaderSkeleton />
				<div className='app-skeleton__spin-section'>
					<Spin size='large' tip='Lauching The Shortlist' />
				</div>
			</Layout>
		);
	}

	const logInErrorBannerElement = error ? (
		<ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
	) : null;

	return (
		<Router>
			<Layout id='app'>
				{logInErrorBannerElement}
				<Affix offsetTop={0} className='app__affix-header'>
					<AppHeader viewer={viewer} setViewer={setViewer} />
				</Affix>

				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route
						exact
						path='/author'
						render={(props) => (
							<Author {...props} viewer={viewer} />
						)}
					/>
					<Route exact path='/review/:id' component={Review} />
					<Route
						exact
						path='/reviews/:location?'
						component={Reviews}
					/>
					<Route
						exact
						path='/user/:id'
						render={(props) => <User {...props} viewer={viewer} />}
					/>
					<Route
						exact
						path='/login'
						render={(props) => (
							<Login {...props} setViewer={setViewer} />
						)}
					/>
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	);
};

render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
