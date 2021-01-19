import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Layout, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

export const About = () => {
	return (
		<Content className='not-found'>
			<Empty
				description={
					<Fragment>
						<Text className='not-found__description-title'>
							About page is still a work in progress...
						</Text>
					</Fragment>
				}
			/>
			<Link
				to='/'
				className='not-found__cta ant-btn ant-btn-primary ant-btn-lg'
			>
				Go to Home
			</Link>
		</Content>
	);
};
