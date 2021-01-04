import React from 'react';
import { Card, Divider, Typography } from 'antd';
import { Review as ReviewData } from '../../../../lib/graphql/queries/Review/__generated__/Review';

const { Paragraph, Title } = Typography;

interface Props {
	type: ReviewData['review']['type'];
}

export const ReviewSideNotes = ({ type }: Props) => {
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
								? 'What Was Ordered'
								: 'Recipe Tips'}
						</Title>
					</Paragraph>
					<Divider />
					<div className='listing-booking__card-date-picker'>
						<Paragraph strong>Blah blah blah</Paragraph>
					</div>
				</div>
			</Card>
		</div>
	);
};
