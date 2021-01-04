/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewType } from './../../../globalTypes';

// ====================================================
// GraphQL query operation: Review
// ====================================================

export interface Review_review_author {
	__typename: 'User';
	id: string;
	name: string;
	avatar: string;
}

export interface Review_review {
	__typename: 'Review';
	id: string;
	title: string;
	image: string;
	author: Review_review_author;
	type: ReviewType;
	body: string;
	rating: number;
	city?: string;
	address?: string;
	url: string;
}

export interface Review {
	review: Review_review;
}

export interface ReviewVariables {
	id: string;
	reviewsPage?: number;
	limit?: number;
}
