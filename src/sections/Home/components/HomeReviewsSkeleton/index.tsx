import React from 'react';
import { List, Card, Skeleton } from 'antd';

import reviewLoadingCover from '../../assets/listing-loading-card-cover.jpg';

export const HomeReviewsSkeleton = () => {
	const emptyData = [{}, {}, {}, {}];
	return (
		<div className='home-listings-skeleton'>
			<Skeleton paragraph={{ rows: 0 }} />
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
							style={{ width: 292, height: 195 }}
							cover={
								<div
									style={{
										backgroundImage: `url(${reviewLoadingCover})`,
									}}
									className='home-listings-skeleton__card-cover-img'
								></div>
							}
							loading
						/>
					</List.Item>
				)}
			/>
		</div>
	);
};
