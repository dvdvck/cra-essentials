import React, { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {postUpdated} from './postsSlice'

export const EditPostForm = ({match})=>{
  const {postId} = match.params
  const post = useSelector(state=> state.posts.find(post=> post.id === postId))
  if(!post){
    throw window.Error('No post found beaaatttch')
  }

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [userId, setUserId] = useState(post.userId);

  const onTitleChanged = e=>{
    setTitle(e.target.value)
  }
  const onContentChanged = e=>{
    setContent(e.target.value)
  }
  const handleUserId = e=>setUserId(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()
  const canSave = !!title && !!content && !!userId;

  const users = useSelector(state=> state.users)
  const optionsUsers = users.map(user=>{
    return (
      <option key={user.id} value={user.id}>{user.name}</option>
    )
  })
  const handleClick = e=>{
    dispatch(postUpdated({id: postId, title, content, user: userId}))
    history.push(`/post/${postId}`)
  }

  return (
    <section>
      <form>
        <label htmlFor="title">
          <input id="title" name="title" value={title} onChange={onTitleChanged}/>
        </label>
        <label htmlFor="content">
          <textarea id="content" name="content" value={content} onChange={onContentChanged}></textarea>
        </label>
        <label htmlFor="userId">Select a user: 
        <select id="userId" name="userId" onChange={handleUserId} value={userId}>
          <option value=""></option>
          {optionsUsers}
        </select>
      </label>
        <button className="button raised-button" type="button" disabled={!canSave} onClick={handleClick}>Update</button>
      </form>
    </section>
  )
}