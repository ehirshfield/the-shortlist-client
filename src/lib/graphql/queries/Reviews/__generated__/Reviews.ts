/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewsFilter, ReviewType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Reviews
// ====================================================

export interface Reviews_reviews_result_author {
  __typename: "User";
  id: string;
}

export interface Reviews_reviews_result {
  __typename: "Review";
  id: string;
  title: string;
  image: string;
  rating: number;
  type: ReviewType;
  author: Reviews_reviews_result_author;
}

export interface Reviews_reviews {
  __typename: "Reviews";
  result: Reviews_reviews_result[];
}

export interface Reviews {
  reviews: Reviews_reviews;
}

export interface ReviewsVariables {
  filter: ReviewsFilter;
  limit: number;
  page: number;
}
