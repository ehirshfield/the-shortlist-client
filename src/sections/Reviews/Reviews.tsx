import React from 'react'
import { server } from '../../lib/api'
import { ReviewsData } from './types'

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

interface Props {
    title: string
}

export const Reviews = ({title}: Props) => {
    const fetchReviews = async () => {
        const { data } = await server.fetch<ReviewsData>({ query: REVIEWS})
        console.log('reviews :>> ', data);
    }

    return (
        <div>
            <h2>{title}</h2>
            <button onClick={fetchReviews}>Query Reviews</button>
        </div>
    
    )
}