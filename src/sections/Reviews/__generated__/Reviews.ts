/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Reviews
// ====================================================

export interface Reviews_reviews {
  __typename: "Review";
  id: string;
  title: string;
  image: string;
  body: string;
  rating: number;
}

export interface Reviews {
  reviews: Reviews_reviews[];
}
