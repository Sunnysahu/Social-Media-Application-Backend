### TODOLIST

# Setup Comment Controller

## Create Routes in userroutes.js

# TIPS

## Use this to verify Mongoose Object ID

```
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(
    new apiError(400, "Invalid Post ID", "Please provide a valid Post ID")
    );
}
```

## Use this to Get the Updated Value

```
const updatedPost = await Post.findByIdAndUpdate(
    id,
    { postText: postText, postType: postType, media: media },
    { new: true } // return updated doc & validate
);
```

## Something to Note

```
const post = await Post.create({
    userId: _id,
    postText: postText,
    postType: postType,
    media: [],
    likes: [], // Can leave blank as its already an array as per the schema
    likeCount: 0, // Already Initialled with 0
    comments: [],
    commentCount: 0,
    shares: [],
    sharesCount: 0,
});
```
