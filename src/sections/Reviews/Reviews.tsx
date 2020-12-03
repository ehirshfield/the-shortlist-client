import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Alert, List, Avatar, Button, Spin } from 'antd'
import { gql } from '@apollo/client';
import { Reviews as ReviewsData } from './__generated__/Reviews'
import { DeleteReview as DeleteReviewData, DeleteReviewVariables } from './__generated__/DeleteReview'
import { ReviewsSkeleton } from './components'
import './styles/Reviews.css'

const REVIEWS = gql`
    query Reviews {
        reviews {
            id
            title
            image
            body
            rating
        }
    }
`

const DELETE_REVIEW = gql`
    mutation DeleteReview($id: ID!) {
        deleteReview(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const Reviews = ({title}: Props) => {
    const { loading, error, data, refetch } = useQuery<ReviewsData>(REVIEWS)

    const [
        deleteReview,
        {
            loading: deleteReviewLoading,
            error: deleteReviewError
        }
    ] = useMutation<DeleteReviewData, DeleteReviewVariables>(DELETE_REVIEW)

    const handleDeleteReview = async (id: string) => {
        await deleteReview({ variables: { id } })

        refetch()
    }

    const reviews = data ? data.reviews : null

    const reviewList = reviews ? (
        <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(review) => (
                <List.Item actions={[<Button type="primary" onClick={() => handleDeleteReview(review.id)}>Delete</Button>]}>
                    <List.Item.Meta
                        title={review.title}
                        description={review.body}
                        avatar={<Avatar src={review.image} shape="square" size={48}/>}
                    />
                </List.Item>
            )}
            />
    ) : null

    if (loading) {
        return (
            <div className="reviews">
                <ReviewsSkeleton title={title} />
            </div>
        )
    }

    if (error) {
        return (
            <div className="reviews">
                <ReviewsSkeleton title={title} error />
            </div>
        ) 
    }

    const deleteReviewErrorAlert = deleteReviewError ? (
        <Alert
            type="error"
            message="Uh oh! Something went wrong - please try again later :("
            className="reviews__alert"
        />
     ) : null

    return (
        <div className="reviews">
            <Spin spinning={deleteReviewLoading}>
                {deleteReviewErrorAlert}
                <h2>{title}</h2>
                {reviewList}
            </Spin>
        </div>
    
    )
}