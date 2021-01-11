import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
	mutation AddReview($input: addReviewInput!) {
		addReview(input: $input) {
			id
		}
	}
`;
