/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewType } from './../../../globalTypes';

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_reviews_result_author {
	__typename: 'User';
	id: string;
}

export interface User_user_reviews_result {
	__typename: 'Review';
	id: string;
	title: string;
	subtitle: string;
	author: User_user_reviews_result_author;
	image: string;
	rating: number;
	type: ReviewType;
}

export interface User_user_reviews {
	__typename: 'Reviews';
	total: number;
	result: User_user_reviews_result[];
}

export interface User_user {
	__typename: 'User';
	id: string;
	name: string;
	avatar: string;
	contact: string;
	reviews: User_user_reviews;
}

export interface User {
	user: User_user;
}

export interface UserVariables {
	id: string;
	reviewsPage: number;
	limit: number;
}
