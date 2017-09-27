# Readable

## Store Structure

There are three top-level fields:

+ **categories**, which is a list of objects (each with "name" and "path" fields), each of which contains data for a specific category
+ **posts-data**, which is a map of post IDs to post data
+ **posts-by-category**, which is a map of cateogry path's to a list of post IDs in that category
