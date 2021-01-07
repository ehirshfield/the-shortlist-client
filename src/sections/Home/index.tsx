import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Layout, Typography, Row, Col } from 'antd';
import { HomeHero, HomeReviews, HomeReviewsSkeleton } from './components';
import { useQuery } from '@apollo/client';
import { REVIEWS } from '../../lib/graphql/queries';
import {
	Reviews as ReviewsData,
	ReviewsVariables,
} from '../../lib/graphql/queries/Reviews/__generated__/Reviews';
import { ReviewsFilter } from '../../lib/graphql/globalTypes';
import { displayErrorMessage } from '../../lib/utils';

import mapBackground from './assets/map-background.jpg';
import recipeImage from './assets/recipes-text.jpg';
import restaurantImage from './assets/restaurants-text2.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home = ({ history }: RouteComponentProps) => {
	const { loading, data } = useQuery<ReviewsData, ReviewsVariables>(REVIEWS, {
		variables: {
			filter: ReviewsFilter.RATING_HIGH_TO_LOW,
			limit: PAGE_LIMIT,
			page: PAGE_NUMBER,
		},
	});

	const onSearch = (value: string) => {
		const trimmedValue = value.trim();

		if (trimmedValue) {
			history.push(`/reviews/${trimmedValue}`);
		} else {
			displayErrorMessage('Please enter a valid search!');
		}
	};

	const renderReviewsSection = () => {
		if (loading) {
			return <HomeReviewsSkeleton />;
		}

		if (data) {
			return (
				<HomeReviews
					title='The Shortlist'
					reviews={data.reviews.result}
				/>
			);
		}

		return null;
	};

	return (
		<Content
			className='home'
			style={{ backgroundImage: `url(${mapBackground})` }}
		>
			<HomeHero onSearch={onSearch} />

			<div className='home__cta-section'>
				<Title level={2} className='home__cta-section-title'>
					Your guide to all things food
				</Title>
				<Paragraph>
					Helping you make the best decisions in dining.
				</Paragraph>
				<Link
					to='/listings/united%20states'
					className='ant-btn ant-btn-primary ant-btn-lg home__cta-section-button'
				>
					Most popular Shortlist
				</Link>
			</div>

			{renderReviewsSection()}

			<div className='home__listings'>
				<Title level={4} className='home__listings-title'>
					Types of reviews
				</Title>
				<Row gutter={12}>
					<Col xs={24} sm={12}>
						<Link to='/listings/recipes'>
							<div className='home__listings-img-cover'>
								<img
									src={recipeImage}
									alt='Recipes'
									className='home__listings-img'
								/>
							</div>
						</Link>
					</Col>
					<Col xs={24} sm={12}>
						<Link to='/listings/restaurants'>
							<div className='home__listings-img-cover'>
								<img
									src={restaurantImage}
									alt='Restaurants'
									className='home__listings-img'
								/>
							</div>
						</Link>
					</Col>
				</Row>
			</div>
		</Content>
	);
};
