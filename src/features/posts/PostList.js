import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { PostAuthor } from './PostAuthor';
import {fetchPosts, selectPostById, selectPostIds} from './postsSlice';

let PostExcerpt = ({postId})=>{
  const post = useSelector(state=> selectPostById(state, postId))
  return (
    <article className="posts-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0,100)}</p>
      <PostAuthor userId={post.user} />
      <Link to={`/post/${post.id}`} className="button muted-button">View Post</Link>
    </article>
  )
}

export const PostList = () =>{
  const dispatch = useDispatch();
  const posts = useSelector(selectPostIds);
  //obtener el status
  const postStatus = useSelector(state=> state.posts.status)
  const error =  useSelector(state=> state.posts.error)

  useEffect(()=>{
    if(postStatus === 'idle'){
      dispatch(fetchPosts())
    }
  });

  let content
  if(postStatus === 'loading'){
    content = <div className="loader">loading...</div>
  }else if (postStatus === 'succeded'){
    content = posts.map(postId =>(
      <PostExcerpt key={postId} postId={postId} />
    ));
  }else if(postStatus === 'error'){
    content = <div>{error}</div>
  }

  return (
    <>
      <section className="posts-list">
        <h2>Posts</h2>
        {content}
      </section>
    </>
  )
} 