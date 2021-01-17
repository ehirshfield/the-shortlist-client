import { gql } from '@apollo/client';

export const USER = gql`
	query User($id: ID!, $reviewsPage: Int!, $limit: Int!) {
		user(id: $id) {
			id
			name
			avatar
			contact
			reviews(limit: $limit, page: $reviewsPage) {
				total
				result {
					id
					title
					subtitle
					author {
						id
					}
					image
					rating
					type
				}
			}
		}
	}
`;
