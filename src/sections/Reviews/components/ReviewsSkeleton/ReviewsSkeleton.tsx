import React from 'react'
import { Alert, Skeleton, Divider } from 'antd'
import './styles/ReviewsSkeleton.css'

interface Props {
    title: string;
    error?: boolean
}

export const ReviewsSkeleton = ({ title, error = false }: Props) => {
    const errorAlert = error ? (
            <Alert
                type="error"
                message="Uh oh! Something went wrong - please try again later :("
                className="reviews-skeleton__alert"
            />
        ) : null

    return (
        <div className="reviews-skeleton">
            {errorAlert}
            <h2>{title}</h2>
            <Skeleton active paragraph={{ rows: 1 }}/>
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }}/>
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }}/>
        </div>
    )
}