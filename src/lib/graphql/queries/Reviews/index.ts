import { gql } from '@apollo/client';

export const REVIEWS = gql`
	query Reviews($filter: ReviewsFilter!, $limit: Int!, $page: Int!) {
		reviews(filter: $filter, limit: $limit, page: $page) {
			result {
				id
				title
				image
				rating
				type
				author {
					id
				}
			}
		}
	}
`;
