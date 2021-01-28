/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ReviewType {
  RECIPE = "RECIPE",
  RESTAURANT = "RESTAURANT",
}

export enum ReviewsFilter {
  NEWEST = "NEWEST",
  RATING_HIGH_TO_LOW = "RATING_HIGH_TO_LOW",
  RATING_LOW_TO_HIGH = "RATING_LOW_TO_HIGH",
}

export enum TypesFilter {
  ALL = "ALL",
  RECIPE = "RECIPE",
  RESTAURANT = "RESTAURANT",
}

export interface LogInInput {
  code: string;
}

export interface addReviewInput {
  title: string;
  subtitle: string;
  body: string;
  image: string;
  type: ReviewType;
  rating: number;
  url?: string | null;
  address?: string | null;
  highlights?: string[] | null;
  video?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
