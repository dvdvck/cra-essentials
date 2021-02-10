import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addNewPost, postAdded} from './postsSlice'
import {useHistory} from 'react-router-dom'
import { selectAllUsers } from '../users/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export const AddPostForm = () =>{
  const dispatch = useDispatch()
  const history = useHistory()
  //bug
  //carga primero el componente antes de que se obtenga los usuarios
  const users = useSelector(selectAllUsers);
  /* 
  useEffect(()=>{
    if(users.length>0)
    users = useSelector(selectAllUsers)
  })
  */
  const [title, setTitle] = useState("Aqui tu titulo");
  const [content, setContent] = useState("un buen contenido");
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const handleTitle = e=> setTitle(e.target.value)
  const handleContent = e=>setContent(e.target.value)
  const handleUserId = e=>setUserId(e.target.value)

  const handleSubmit = e=>{
    dispatch(postAdded(title, content, userId))
    history.push('/')
  }
  const onSavePostClicked = async ()=>{
    if(canSave){
      try{
        setAddRequestStatus('pending')
        const resultAction = await dispatch(addNewPost({title, content, user: userId}))
        unwrapResult(resultAction)
        setTitle('')
        setContent('')
        setUserId('')
      }catch(err){
        console.error("failed to save post", err)
      }finally{
        setAddRequestStatus('idle')
      }
    }
  }

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
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
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Agregar</button>
    </form>
    </section>
  )
}