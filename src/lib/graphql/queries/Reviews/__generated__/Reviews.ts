/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewsFilter, TypesFilter, ReviewType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Reviews
// ====================================================

export interface Reviews_reviews_result_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface Reviews_reviews_result {
  __typename: "Review";
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  type: ReviewType;
  author: Reviews_reviews_result_author;
}

export interface Reviews_reviews {
  __typename: "Reviews";
  total: number;
  region: string | null;
  result: Reviews_reviews_result[];
}

export interface Reviews {
  reviews: Reviews_reviews;
}

export interface ReviewsVariables {
  location?: string | null;
  filter: ReviewsFilter;
  typesFilter: TypesFilter;
  limit: number;
  page: number;
}
