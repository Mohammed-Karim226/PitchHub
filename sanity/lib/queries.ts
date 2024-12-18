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

export const QUERY_USER_AUTH = defineQuery(`
*[_type == 'author' && _id == $id][0] {
_id,
id,
username,
email,
image,
bio
}
`);
