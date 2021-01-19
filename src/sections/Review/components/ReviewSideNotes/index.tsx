import React, { Fragment } from 'react';
import { Card, Divider, Typography, List } from 'antd';
import { Review as ReviewData } from '../../../../lib/graphql/queries/Review/__generated__/Review';

const { Paragraph, Title } = Typography;

interface Props {
	type: ReviewData['review']['type'];
	url: ReviewData['review']['url'];
	highlights: ReviewData['review']['highlights'];
}

export const ReviewSideNotes = ({ type, url, highlights }: Props) => {
	const recipeLinkElement = (
		<Fragment>
			<Divider />
			<div>
				<Paragraph strong>Link to the recipe site</Paragraph>
				<a
					className='not-found__cta ant-btn ant-btn-primary ant-btn-lg'
					href={url || ''}
				>
					Original Recipe
				</a>
			</div>
		</Fragment>
	);

	return (
		<div className='listing-booking'>
			<Card className='listing-booking__card'>
				<div>
					<Paragraph>
						<Title
							level={2}
							className='listing-booking__card-title'
						>
							{type === 'RESTAURANT'
								? 'Highlights'
								: 'Recipe Highlights'}
						</Title>
					</Paragraph>
					<Divider />
					<List
						size='large'
						dataSource={highlights!}
						renderItem={(item) => <List.Item>{item}</List.Item>}
						itemLayout='vertical'
					/>
					{type === 'RECIPE' ? recipeLinkElement : null}
				</div>
			</Card>
		</div>
	);
};
