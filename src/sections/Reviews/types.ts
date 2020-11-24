interface Review {
    id: string;
    title: string;
    image: string;
    body: string;
    rating: number;
  }
  
  export type ReviewsData = {
    reviews: Review[];
  };