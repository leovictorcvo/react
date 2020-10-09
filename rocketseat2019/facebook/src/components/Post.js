import React from 'react';

import Comment from './Comment';

function PostHeader({ author, date }) {
  return (
    <div className='post-header'>
      <img className='avatar' src={author.avatar} />
      <div className='details'>
        <span>{author.name}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}

function PostComments({ comments }) {
  return (
    <div className='post-comments'>
      <div className='divider' />
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
function Post({ post }) {
  return (
    <div className='post'>
      <PostHeader author={post.author} date={post.date} />
      <p className='post-content'>{post.content}</p>
      <PostComments comments={post.comments} />
    </div>
  );
}

export default Post;
