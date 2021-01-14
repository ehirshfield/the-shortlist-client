import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { iconColor } from '../../utils';

interface Props {
	review: {
		id: string;
		title: string;
		subtitle: string;
		image: string;
		author: {
			id: string;
		};
		rating: number;
		type: string;
	};
}

const { Text, Title } = Typography;

export const ReviewCard = ({ review }: Props) => {
	const { id, title, image, rating, type, subtitle } = review;

	return (
		<Link to={`/review/${id}`}>
			<Card
				hoverable
				cover={
					<div
						className='listing-card__cover-img'
						style={{
							backgroundImage: `url(${image})`,
							height: 195,
						}}
					/>
				}
				style={{ width: 292 }}
			>
				<div className='listing-card__details'>
					<div className='listing-card__description'>
						<Title level={4} className='listing-card__price'>
							{rating}
							<span>/10</span>
						</Title>
						<Text strong ellipsis className='listing-card__title'>
							{title}
						</Text>
						<Text ellipsis className='listing-card__address'>
							{subtitle}
						</Text>
					</div>
					<div className='listing-card__dimensions listing-card__dimensions--guests'>
						<UserOutlined style={{ color: iconColor }} />
						<Text> {type} Review</Text>
					</div>
				</div>
			</Card>
		</Link>
	);
};
