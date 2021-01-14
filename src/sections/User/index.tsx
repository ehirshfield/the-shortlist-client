import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER } from '../../lib/graphql/queries';
import { Col, Layout, Row } from 'antd';
import {
	User as UserData,
	UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';
import { useScrollToTop } from '../../lib/hooks';
import { Viewer } from '../../lib/types';
import { ErrorBanner, PageSkeleton } from '../../lib/components';
import { UserProfile, UserReviews } from './components';

interface Props {
	viewer: Viewer;
}

interface MatchParams {
	id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = ({
	viewer,
	match,
}: Props & RouteComponentProps<MatchParams>) => {
	const [reviewsPage, setReviewsPage] = useState(1);
	const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
		variables: {
			id: match.params.id,
			reviewsPage,
			limit: PAGE_LIMIT,
		},
		fetchPolicy: 'cache-and-network',
	});

	useScrollToTop();

	if (loading) {
		return (
			<Content className='user'>
				<PageSkeleton />
			</Content>
		);
	}

	if (error) {
		return (
			<Content>
				<ErrorBanner description="This user may not exist or we've encountered an error. Please try again later!" />
				<PageSkeleton />
			</Content>
		);
	}

	const user = data ? data.user : null;
	const viewerIsUser = viewer.id === match.params.id;

	const userReviews = user ? user.reviews : null;

	const userProfileElement = user ? (
		<UserProfile user={user} viewerIsUser={viewerIsUser} />
	) : null;

	const userReviewsElement = userReviews ? (
		<UserReviews
			userReviews={userReviews}
			reviewsPage={reviewsPage}
			limit={PAGE_LIMIT}
			setReviewsPage={setReviewsPage}
		/>
	) : null;

	return (
		<Content className='user'>
			<Row gutter={12} justify='space-between'>
				<Col xs={24}>{userProfileElement}</Col>
				<Col xs={24}>{userReviewsElement}</Col>
			</Row>
		</Content>
	);
};
