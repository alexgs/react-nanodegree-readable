# Readable

## Store Structure

The store is an ImmutableJS with the following top-level fields:

+ **categories** is a list of objects (each with "name" and "path" fields), each of which contains data for a specific category
+ **postsData** is a map of post IDs to post data
+ **posts-by-category** is a map of cateogry paths to a list of post IDs in that category

## Server API Notes

### Comments

A `GET` request to `/posts/:id/comments` return the following list:

```js
[
    {
        "id": "894tuq4ut84ut8v4t8wun89g",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1468166872634,
        "body": "Hi there! I am a COMMENT.",
        "author": "thingtwo",
        "voteScore": 6,
        "deleted": false,
        "parentDeleted": false
    },
    {
        "id": "8tu4bsun805n8un48ve89",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1469479767190,
        "body": "Comments. Are. Cool.",
        "author": "thingone",
        "voteScore": -5,
        "deleted": false,
        "parentDeleted": false
    }
]
```

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
