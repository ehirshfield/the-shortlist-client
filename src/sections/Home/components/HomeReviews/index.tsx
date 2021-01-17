import React from 'react';
import { List, Typography } from 'antd';
import { ReviewCard } from '../../../../lib/components';
import { Reviews } from '../../../../lib/graphql/queries/Reviews/__generated__/Reviews';

interface Props {
	title: string;
	reviews: Reviews['reviews']['result'];
}

const { Title } = Typography;

export const HomeReviews = ({ title, reviews }: Props) => {
	return (
		<div className='home-listings'>
			<Title className='home-listings__title'>{title}</Title>
			<List
				grid={{
					gutter: 8,
					xs: 1,
					sm: 2,
					lg: 4,
				}}
				dataSource={reviews}
				renderItem={(review) => (
					<List.Item>
						<ReviewCard review={review} />
					</List.Item>
				)}
			/>
		</div>
	);
};
