# Readable

## Store Structure

The store is an ImmutableJS with the following top-level fields:

+ **categories** is a list of objects (each with "name" and "path" fields), each of which contains data for a specific category
+ **postsData** is a map of post IDs to post data
+ **posts-by-category** is a map of cateogry paths to a list of post IDs in that category

## Server API Notes

### Lists of Posts and Post Details

`GET` requests to the `/posts` and `/:category/posts` endpoints return a list of objects with the following shape:

```js
{
    "id": "8xf0y6ziyjabvozdd253nd",
    "timestamp": 1467166872634,
    "title": "Udacity is the best place to learn React",
    "body": "Everyone says so after all.",
    "author": "thingtwo",
    "category": "react",
    "voteScore": 6,
    "deleted": false
}
```

`GET` requests to the `/posts/:id` endpoint return an object with the following shape:

```js
{
    "id": "8xf0y6ziyjabvozdd253nd",
    "timestamp": 1467166872634,
    "title": "Udacity is the best place to learn React",
    "body": "Everyone says so after all.",
    "author": "thingtwo",
    "category": "react",
    "voteScore": 6,
    "deleted": false
}
```

**There is no difference in the data returned from these endpoints.**
