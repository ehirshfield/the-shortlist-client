/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { addReviewInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddReview
// ====================================================

export interface AddReview_addReview {
  __typename: "Review";
  id: string;
}

export interface AddReview {
  addReview: AddReview_addReview;
}

export interface AddReviewVariables {
  input: addReviewInput;
}
