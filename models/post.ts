export interface PostModel {
  id?: string;
  date: number;
  comment?: string;
  restaurant: string;
  image: string;
  rating: string;
  creator: string;
  likes: string[];
}
