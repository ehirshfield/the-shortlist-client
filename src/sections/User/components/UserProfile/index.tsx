import React, { Fragment } from 'react';
import { Avatar, Card, Divider, Typography } from 'antd';
import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User';

interface Props {
	user: UserData['user'];
	viewerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({ user, viewerIsUser }: Props) => {
	const additionalDetailsSection = viewerIsUser ? (
		<Fragment>
			<Divider />
			<div className='user-profile__details'>
				<Title level={4}>About the Author</Title>
				<Paragraph>Put a bio here at some point!</Paragraph>
			</div>
		</Fragment>
	) : null;

	return (
		<div className='user-profile'>
			<Card className='user-profile__card'>
				<div className='user-profile__avatar'>
					<Avatar size={100} src={user.avatar} />
				</div>
				<Divider />
				<div className='user-profile__details'>
					<Title level={4}>Details</Title>
					<Paragraph>
						Name: <Text strong>{user.name}</Text>
					</Paragraph>
					<Paragraph>
						Contact: <Text strong>{user.contact}</Text>
					</Paragraph>
				</div>
				{additionalDetailsSection}
			</Card>
		</div>
	);
};
