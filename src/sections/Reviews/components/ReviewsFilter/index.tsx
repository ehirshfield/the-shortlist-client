import React from 'react';
import { Select } from 'antd';
import {
	ReviewsFilter,
	TypesFilter,
} from '../../../../lib/graphql/globalTypes';

interface Props {
	filter: ReviewsFilter;
	setFilter: (filter: ReviewsFilter) => void;
	typesFilter: TypesFilter;
	setTypesFilter: (typesFilter: TypesFilter) => void;
}

const { Option } = Select;

export const ReviewsFilters = ({
	filter,
	setFilter,
	typesFilter,
	setTypesFilter,
}: Props) => {
	return (
		<div className='listings-filters'>
			<span>Filter By</span>
			<Select
				value={filter}
				onChange={(filter: ReviewsFilter) => setFilter(filter)}
				style={{ minWidth: 170, paddingRight: 3 }}
			>
				<Option value={ReviewsFilter.RATING_HIGH_TO_LOW}>
					Rating: High to Low
				</Option>
				<Option value={ReviewsFilter.RATING_LOW_TO_HIGH}>
					Rating: Low to High
				</Option>
				<Option value={ReviewsFilter.NEWEST}>Most Recent</Option>
			</Select>
			<span> & </span>
			<Select
				value={typesFilter}
				onChange={(filter: TypesFilter) => setTypesFilter(filter)}
				style={{ minWidth: 120 }}
			>
				<Option value={TypesFilter.ALL}>All</Option>
				<Option value={TypesFilter.RECIPE}>Recipes</Option>
				<Option value={TypesFilter.RESTAURANT}>Restaurants</Option>
			</Select>
		</div>
	);
};
