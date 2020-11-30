import React from 'react'
import { server, useQuery } from '../../lib/api'
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

    const deleteReview = async (id: string) => {
        await server.fetch<DeleteReviewData, DeleteReviewVariables>({
            query: DELETE_REVIEW,
            variables: {
                id
            }
        })

        refetch()
    }

    const reviews = data ? data.reviews : null

    const reviewList = reviews ?
        <ul>
            {reviews.map((review) => {
                return <li key={review.id}>
                    {review.title}
                    <button onClick={() => deleteReview(review.id)}>Delete</button>
                    </li>
            })}
        </ul> : null;

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Uh oh! Something went wrong - please try again later :(</h2>
    }

    return (
        <div>
            <h2>{title}</h2>
            {reviewList}
        </div>
    
    )
}