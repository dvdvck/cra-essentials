import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postAdded} from './postsSlice'

export const AddPostForm = () =>{
  const dispatch = useDispatch()

  const users = useSelector(state=> state.users)

  const [title, setTitle] = useState("Aqui tu titulo");
  const [content, setContent] = useState("un buen contenido");
  const [userId, setUserId] = useState('');

  const handleTitle = e=> setTitle(e.target.value)
  const handleContent = e=>setContent(e.target.value)
  const handleUserId = e=>setUserId(e.target.value)

  const handleSubmit = e=>{
    dispatch(postAdded(title, content, +userId))
    setTitle('')
    setContent('')
    setUserId('')
  }

  let canSave = !!title && !!content && userId
  const optionsUsers = users.map(user=>{
    return (
      <option key={user.id} value={user.id}>{user.name}</option>
    )
  })

  return (
    <section>
      <h2>Add a new post </h2>
    <form>
      <label htmlFor="title">Post title: 
        <input name="title" id="title" value={title} onChange={handleTitle} />
      </label>
      <label htmlFor="content">Content: 
        <textarea id="content" name="content" onChange={handleContent} value={content}></textarea>
      </label>
      <label htmlFor="userId">Select a user: 
        <select id="userId" name="userId" onChange={handleUserId} value={userId}>
          <option value=""></option>
          {optionsUsers}
        </select>
      </label>
      <button type="button" onClick={handleSubmit} disabled={!canSave}>Agregar</button>
    </form>
    </section>
  )
}