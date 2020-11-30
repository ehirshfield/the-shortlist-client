export interface Review {
    id: string;
    title: string;
    image: string;
    body: string;
    rating: number;
  }
  
  export interface ReviewsData {
    reviews: Review[];
  };

  export interface DeleteReviewData {
    deleteReview: Review
  }

  export interface DeleteReviewVariables {
    id: string
  }