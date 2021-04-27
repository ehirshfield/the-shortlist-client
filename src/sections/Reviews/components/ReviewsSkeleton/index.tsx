import React from 'react';
import { List, Card, Skeleton } from 'antd';

import reviewLoadingCover from '../../assets/listing-loading-card-cover.jpg';

export const ReviewsSkeleton = () => {
	const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}];
	return (
		<div className='home-listings-skeleton'>
			<Skeleton paragraph={{ rows: 1 }} />
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
				dataSource={emptyData}
				renderItem={(review) => (
					<List.Item>
						<Card
							style={{ width: 292 }}
							cover={
								<div
									style={{
										backgroundImage: `url(${reviewLoadingCover})`,
									}}
									className='listings-skeleton__card-cover-img'
								></div>
							}
							loading
							className='listings-skeleton__card'
						/>
					</List.Item>
				)}
			/>
		</div>
	);
};
