export interface IAuthor {
  _id: number;
  name: string;
}

export interface IPost {
  _createdAt: string;
  views: number;
  author: IAuthor;
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
}
