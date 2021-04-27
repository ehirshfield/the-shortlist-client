import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Layout, List, Typography, Affix } from 'antd';
import { ReviewCard, ErrorBanner } from '../../lib/components';
import { REVIEWS } from '../../lib/graphql/queries';
import {
	Reviews as ReviewsData,
	ReviewsVariables,
} from '../../lib/graphql/queries/Reviews/__generated__/Reviews';
import { ReviewsFilter, TypesFilter } from '../../lib/graphql/globalTypes';
import {
	ReviewsFilters,
	ReviewsPagination,
	ReviewsSkeleton,
} from './components';
import { useScrollToTop } from '../../lib/hooks';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const PAGE_LIMIT = 8;

interface MatchParams {
	location: string;
}

interface stateType {
	filter: ReviewsFilter;
	typesFilter: TypesFilter;
}

export const Reviews = ({ match }: RouteComponentProps<MatchParams>) => {
	const locationRef = useRef(match.params.location);
	const { state } = useLocation<stateType>();
	const [filter, setFilter] = useState(
		state && state.filter ? state.filter : ReviewsFilter.NEWEST
	);
	const [typesFilter, setTypesFilter] = useState(
		state && state.typesFilter ? state.typesFilter : TypesFilter.ALL
	);
	const [page, setPage] = useState(1);
	const { loading, data, error } = useQuery<ReviewsData, ReviewsVariables>(
		REVIEWS,
		{
			skip: locationRef.current !== match.params.location && page !== 1,
			variables: {
				location: match.params.location,
				filter,
				typesFilter,
				limit: PAGE_LIMIT,
				page,
			},
		}
	);

	useScrollToTop();

	useEffect(() => {
		setPage(1);
		locationRef.current = match.params.location;
	}, [match.params.location]);

	if (loading) {
		return (
			<Content className='listings'>
				<ReviewsSkeleton />
			</Content>
		);
	}

	if (error) {
		return (
			<Content className='listings'>
				<ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords" />
				<ReviewsSkeleton />
			</Content>
		);
	}

	const reviews = data ? data.reviews : null;
	const reviewsRegion = reviews ? reviews.region : null;

	const reviewsSectionElement =
		reviews && reviews.result.length ? (
			<div>
				<Affix offsetTop={64}>
					<ReviewsPagination
						total={reviews.total}
						page={page}
						limit={PAGE_LIMIT}
						setPage={setPage}
					/>
					<ReviewsFilters
						filter={filter}
						setFilter={setFilter}
						typesFilter={typesFilter}
						setTypesFilter={setTypesFilter}
					/>
				</Affix>

				<List
					grid={{
						gutter: 8,
						xs: 1,
						sm: 2,
						md: 2,
						lg: 4,
						xl: 4,
						xxl: 4,
					}}
					dataSource={reviews.result}
					renderItem={(review) => (
						<List.Item>
							<ReviewCard review={review} />
						</List.Item>
					)}
				/>
			</div>
		) : (
			<div>
				<Paragraph>
					It appears there are no reviews yet for{' '}
					<Text mark>"{reviewsRegion}"</Text>
				</Paragraph>
				<Paragraph>
					Be the first person to create a{' '}
					<Link to='/author'>review in this area!</Link>
				</Paragraph>
			</div>
		);

	const reviewsRegionElement = reviewsRegion ? (
		<Title level={3} className='listings__title'>
			Results for "{reviewsRegion}"
		</Title>
	) : null;

	return (
		<Content className='listings'>
			{reviewsRegionElement}
			{reviewsSectionElement}
		</Content>
	);
};
