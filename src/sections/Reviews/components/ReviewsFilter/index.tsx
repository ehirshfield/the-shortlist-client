import React from 'react';
import { Select } from 'antd';
import { ReviewsFilter } from '../../../../lib/graphql/globalTypes';

interface Props {
	filter: ReviewsFilter;
	setFilter: (filter: ReviewsFilter) => void;
}

const { Option } = Select;

export const ReviewsFilters = ({ filter, setFilter }: Props) => {
	return (
		<div className='listings-filters'>
			<span>Filter By</span>
			<Select
				value={filter}
				onChange={(filter: ReviewsFilter) => setFilter(filter)}
			>
				<Option value={ReviewsFilter.RATING_HIGH_TO_LOW}>
					Rating: High to Low
				</Option>
				<Option value={ReviewsFilter.RATING_LOW_TO_HIGH}>
					Rating: Low to High
				</Option>
				<Option value={ReviewsFilter.NEWEST}>Most Recent</Option>
			</Select>
		</div>
	);
};
