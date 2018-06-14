# REST API
- All routes prepended with `/api/`
- Certain routes will require bearer token authentication to access data.
- Data returned in JSON format.

## Authors
### Get a single author's profile
`GET /author/:uid`

*Returns a single Author object*

#### Author object:
```javascript
{
  uid,
  displayName,
  postsURL // URL to fetch this author's posts
}
```
### Get all authors
`GET /authors`

*Returns array of Author objects*

### Create new author (Auth)
`POST /authors`

#### Request Body:

```javascript
{
  email, // required. Used to send OTP key.
  username, // required. Used for signing in.
  displayName // optional. String to be displayed publicly
}
```

*Returns newly created Author object*

### Update a single author's profile (Auth)
`PUT /author/:uid`

Will update profile based on updated fields sent in request body. *Returns updated Author object*

Valid fields to change: *displayName*

### Delete author profile (Auth)
`DELETE /author/:uid`

*Returns Author object of deleted user*

## Category
### Fetch one category
`GET /category/:id`


*Returns a Category object*
#### Category object
```javascript
{
  slug,
  label,
  postsURL // URL to fetch posts for this category
}
```

### Fetch all categories
`GET /categories`

*Returns array of Category objects*

### Create new category (Auth)
`POST /categories`

#### Request Body
```javascript
{
  slug, // required. URL-safe, unique id
  label, // required. Publicly viewed title of category
}
```

*Returns newly created object*

### Update a category (Auth)
`PUT /category/:id`

Will update based on updated fields sent in request body. *Returns updated Category object*

Valid fields to change: *slug, label*

### Delete category (Auth)
`DELETE /category/:id`

*Returns deleted Category object*

## Posts
### Fetch one post
`GET /post/:pid`


*Returns a full Post object*

#### Post object (Full)
```javascript
{
  pid,
  createdDate,
  title,
  content,
  description,
  tags,
  authorURL,
  categoriesURL
}
```

#### Post object (Brief)
```javascript
{
  pid,
  createdDate,
  title,
  description,
  authorURL,
  categoriesURL
}
```

### Fetch all posts
`GET /posts`

#### Filter Queries
- by Author `?author=AUTHOR_UID`
- by Category `?cat=CATEGORY_SLUG`

*Returns array of brief Post objects after applying specific filters*

### Create new post (Auth)
`POST /posts`

#### Request Body
```javascript
{
  title,
  content,
  excerpt,
  author, // Author UID
  categories // array of Category slugs
}
```

*Returns newly created object*

### Edit a post (Auth)
`PUT /post/:pid`

Will update based on updated fields sent in request body. *Returns updated Post object*

Valid fields to change: *title, content, excerpt, categories*

### Delete post (Auth)
`DELETE /post/:pid`

*Returns deleted Post object*
