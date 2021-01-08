import React, { useState, useEffect } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Input } from 'antd';
import { Viewer } from '../../lib/types';
import { MenuItems } from './components';
import logo from './assets/shortlist-logo.png';
import { displayErrorMessage } from '../../lib/utils';

interface Props {
	viewer: Viewer;
	setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;
const { Search } = Input;

export const AppHeader = withRouter(
	({ viewer, setViewer, history, location }: Props & RouteComponentProps) => {
		const [search, setSearch] = useState('');

		useEffect(() => {
			const { pathname } = location;
			const pathnameSubStrings = pathname.split('/');

			if (!pathname.includes('/reviews')) {
				setSearch('');
				return;
			}

			if (
				pathname.includes('/reviews') &&
				pathnameSubStrings.length === 3
			) {
				setSearch(pathnameSubStrings[2]);
				return;
			}
		}, [location]);

		const onSearch = (value: string) => {
			const trimmedValue = value.trim();

			if (trimmedValue) {
				history.push(`/reviews/${trimmedValue}`);
			} else {
				displayErrorMessage('Please enter a valid search!');
			}
		};

		return (
			<Header className='app-header'>
				<div className='app-header__logo-search-section'>
					<div className='app-header__logo'>
						<Link to='/'>
							<img src={logo} alt='App Logo' />
						</Link>
					</div>
					<div className='app-header__search-input'>
						<Search
							placeholder='Search San Francisco'
							enterButton
							value={search}
							onSearch={onSearch}
							onChange={(evt) => setSearch(evt.target.value)}
						/>
					</div>
				</div>
				<div className='app-header__menu-section'>
					<MenuItems viewer={viewer} setViewer={setViewer} />
				</div>
			</Header>
		);
	}
);
