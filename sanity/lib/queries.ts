import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc){
    _id,
      title,
       slug, _createdAt,
       author ->{
        _id, name, image, bio
      },
       views,
       description,
       category,
       image
  }
  
`);

export const ALL_POSTS_QUERY = defineQuery(`
*[_type == "startup"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  content,
  category,
  image
}
`);

// Query to fetch startups created on the current day
export const LATEST_STARTUPS_QUERY = defineQuery(`
*[_type == "startup" && date(_createdAt) == date(now())] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image
}
`);

export const QUERY_BY_ID = defineQuery(
  `
  *[_type == "startup" && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
  } 
  `
);

export const QUERY_STARTUP_VIEWS = defineQuery(
  `*[_type == "startup" && _id == $id][0] {
    _id,
    views
  }`
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);
export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);


export const COMMENTS_BY_ID_QUERY = 
defineQuery(`
*[_type == "comment" && id == $id] {
  _id,
  _createdAt,
  type,
  comment,
  name
}
`)

// query to get the top view post by its id 
export const TOP_VIEW_POST_BY_ID_QUERY = defineQuery(`
*[_type == "startup"] | order(views desc)[0] {
  views,
}
`);