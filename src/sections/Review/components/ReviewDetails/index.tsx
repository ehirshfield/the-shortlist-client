import React from 'react';
import { Avatar, Divider, Tag, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Review as ReviewData } from '../../../../lib/graphql/queries/Review/__generated__/Review';
import { iconColor } from '../../../../lib/utils';
import { Link } from 'react-router-dom';

interface Props {
	review: ReviewData['review'];
}

const { Paragraph, Title } = Typography;

export const ReviewDetails = ({ review }: Props) => {
	const {
		// id,
		title,
		image,
		author,
		type,
		body,
		rating,
		city,
		address,
		// url,
	} = review;

	return (
		<div className='listing-details'>
			<div
				style={{ backgroundImage: `url(${image})` }}
				className='listing-details__image'
			/>

			<div className='listing-details__information'>
				<Paragraph
					type='secondary'
					ellipsis
					className='listing-details__city-address'
				>
					{type === 'RESTAURANT' ? (
						<div>
							<Link to={`/reviews/${city ? city : 'recipes'}`}>
								<EnvironmentOutlined
									style={{ color: iconColor }}
								/>
								{' ' + city}
							</Link>
							<Divider type='vertical' />
							{address}
						</div>
					) : null}
				</Paragraph>
				<Title level={3} className='listing-details__title'>
					{title}
				</Title>
			</div>

			<Divider />

			<div className='listing-details__section'>
				<Link to={`/user/${author.id}`}>
					<Avatar src={author.avatar} size={64} />
					<Title level={3} className='listing-details__host-name'>
						{author.name}
					</Title>
				</Link>
			</div>

			<Divider />

			<div className='listing-details__section'>
				<Title level={4}>About this space</Title>
				<div className='listing-details__about-items'>
					<Tag color='magenta'>{type}</Tag>
					<Tag color='magenta'>{rating} / 10</Tag>
				</div>
				<Paragraph ellipsis={{ rows: 3, expandable: true }}>
					{body}
				</Paragraph>
			</div>
		</div>
	);
};
