import { gql } from '@apollo/client';

export const REVIEWS = gql`
	query Reviews(
		$location: String
		$filter: ReviewsFilter!
		$limit: Int!
		$page: Int!
	) {
		reviews(
			location: $location
			filter: $filter
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
