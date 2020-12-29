import React from 'react';
import { Typography, List } from 'antd';
import { ReviewCard } from '../../../../lib/components/ReviewCard';
import { User } from '../../../../lib/graphql/queries/User/__generated__/User';

interface Props {
	userReviews: User['user']['reviews'];
	reviewsPage: number;
	limit: number;
	setReviewsPage: (page: number) => void;
}

const { Paragraph, Title } = Typography;

export const UserReviews = ({
	userReviews,
	reviewsPage,
	limit,
	setReviewsPage,
}: Props) => {
	const { total, result } = userReviews;

	const userReviewsList = (
		<List
			grid={{
				gutter: 8,
				xs: 1,
				sm: 2,
				lg: 4,
			}}
			dataSource={result}
			locale={{ emptyText: "User doesn't have any reviews yet" }}
			pagination={{
				position: 'top',
				current: reviewsPage,
				total,
				defaultPageSize: limit,
				hideOnSinglePage: true,
				showLessItems: true,
				onChange: (page: number) => setReviewsPage(page),
			}}
			renderItem={(userReview) => (
				<List.Item>
					<ReviewCard review={userReview} />
				</List.Item>
			)}
		/>
	);

	return (
		<div className='user-listings'>
			<Title level={4} className='user-listings__title'>
				Reviews
			</Title>
			<Paragraph className='user-listings__description'>
				This section highlights the reviews written by this user
			</Paragraph>
			{userReviewsList}
		</div>
	);
};
