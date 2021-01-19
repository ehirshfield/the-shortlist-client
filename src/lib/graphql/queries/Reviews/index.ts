import { gql } from '@apollo/client';

export const REVIEWS = gql`
	query Reviews(
		$location: String
		$filter: ReviewsFilter!
		$typesFilter: TypesFilter!
		$limit: Int!
		$page: Int!
	) {
		reviews(
			location: $location
			filter: $filter
			typesFilter: $typesFilter
			limit: $limit
			page: $page
		) {
			total
			region
			result {
				id
				title
				subtitle
				image
				rating
				type
				author {
					id
					name
				}
			}
		}
	}
`;
