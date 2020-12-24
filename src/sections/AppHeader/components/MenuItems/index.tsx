import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Menu, Avatar } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import {
	displaySuccessNotification,
	displayErrorMessage,
} from '../../../../lib/utils';
import { Viewer } from '../../../../lib/types';

interface Props {
	viewer: Viewer;
	setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
	const [logout] = useMutation<LogOutData>(LOG_OUT, {
		onCompleted: (data) => {
			if (data && data.logOut) {
				setViewer(data.logOut);
				displaySuccessNotification("You've successfully logged out!");
			}
		},
		onError: (data) => {
			displayErrorMessage("Sorry! We weren't able to sign you out!");
		},
	});

	const handleLogOut = () => {
		logout();
	};

	const subMenuLogin =
		viewer.id && viewer.avatar ? (
			<SubMenu title={<Avatar src={viewer.avatar} />}>
				<Item key='/user'>
					<Link to={`/user/${viewer.id}`}>
						<UserOutlined />
						Profile
					</Link>
				</Item>
				<Item key='/logout'>
					<div onClick={handleLogOut}>
						<LogoutOutlined />
						Log Out
					</div>
				</Item>
			</SubMenu>
		) : (
			<Item>
				<Link to='/login'>
					<Button type='primary'>Sign In</Button>
				</Link>
			</Item>
		);

	return (
		<Menu mode='horizontal' selectable={false} className='menu'>
			<Item key='/about'>
				<Link to='/about'>
					<HomeOutlined />
					About
				</Link>
			</Item>
			{subMenuLogin}
		</Menu>
	);
};
