import React from 'react'
import { useQuery, useMutation } from '../../lib/api'
import { ReviewsData, DeleteReviewData, DeleteReviewVariables } from './types'

const REVIEWS = `
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

const DELETE_REVIEW = `
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
    const { data, loading, error, refetch } = useQuery<ReviewsData>(REVIEWS)

    const [
        deleteReview,
        {
            loading: deleteReviewLoading,
            error: deleteReviewError
        }
    ] = useMutation<DeleteReviewData, DeleteReviewVariables>(DELETE_REVIEW)

    const handleDeleteReview = async (id: string) => {
        await deleteReview({ id })

        refetch()
    }

    const reviews = data ? data.reviews : null

    const reviewList = reviews ?
        <ul>
            {reviews.map((review) => {
                return <li key={review.id}>
                    {review.title}
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                    </li>
            })}
        </ul> : null;

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Uh oh! Something went wrong - please try again later :(</h2>
    }

    const deleteReviewLoadingMessage = deleteReviewLoading
        ? <h4>Deletion in progress...</h4>
        : null

    const deleteReviewErrorMessage = deleteReviewError
        ? <h4>Uh oh! Something went wrong - please try again later :(</h4>
        : null

    return (
        <div>
            <h2>{title}</h2>
            {reviewList}
            {deleteReviewLoadingMessage}
            {deleteReviewErrorMessage}
        </div>
    
    )
}