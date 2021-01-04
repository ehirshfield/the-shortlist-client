import { gql } from '@apollo/client';

export const REVIEW = gql`
	query Review($id: ID!) {
		review(id: $id) {
			id
			title
			image
			author {
				id
				name
				avatar
			}
			type
			body
			rating
			city
			address
			url
		}
	}
`;
