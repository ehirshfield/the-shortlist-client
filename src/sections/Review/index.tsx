import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { REVIEW } from '../../lib/graphql/queries';
import {
	Review as ReviewData,
	ReviewVariables,
} from '../../lib/graphql/queries/Review/__generated__/Review';
import { ErrorBanner, PageSkeleton } from '../../lib/components';
import { Layout, Row, Col } from 'antd';
import { ReviewDetails, ReviewSideNotes } from './components';
import { ReviewType } from '../../lib/graphql/globalTypes';
import { useScrollToTop } from '../../lib/hooks';

interface MatchParams {
	id: string;
}

const { Content } = Layout;

export const Review = ({ match }: RouteComponentProps<MatchParams>) => {
	const { loading, data, error } = useQuery<ReviewData, ReviewVariables>(
		REVIEW,
		{
			variables: {
				id: match.params.id,
			},
		}
	);

	useScrollToTop();

	if (loading) {
		return (
			<Content className='listings'>
				<PageSkeleton />
			</Content>
		);
	}

	if (error) {
		return (
			<Content className='listings'>
				<ErrorBanner description="This review may not exist or we've encountered an error. Please try again!" />
				<PageSkeleton />
			</Content>
		);
	}

	const review = data ? data.review : null;

	const reviewDetailsElement = review ? (
		<ReviewDetails review={review} />
	) : null;

	const reviewSideNotesElement = (
		<ReviewSideNotes
			type={review?.type!}
			url={review?.type === ReviewType.RECIPE ? review.url! : ''}
			highlights={review?.highlights!}
			lowlights={review?.lowlights!}
		/>
	);

	return (
		<Content className='listings'>
			<Row gutter={24} justify='space-between'>
				<Col xs={24} lg={14}>
					{reviewDetailsElement}
				</Col>
				<Col xs={24} lg={10}>
					{reviewSideNotesElement}
				</Col>
			</Row>
		</Content>
	);
};
