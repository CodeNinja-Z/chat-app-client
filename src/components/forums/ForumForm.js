import React, { useState } from 'react'

const ForumForm = (props) => {
  const [forum, setForum] = useState(props.forum)

  const handleChange = (e) => {
    e.preventDefault()
    setForum(Object.assign({}, forum, {[e.target.name]: e.target.value}))
    // The line above equals to the line below
    // setForum(Object.assign({...forum, [e.target.name]: e.target.value})
  } 

  const handleSubmit = e => {
    e.preventDefault()
    props.onFormSubmit(forum)
    setForum({title: '', description: ''})
  }

  let formTitle = props.forumId ? 'Update Your Forum' : 'Create Your Forum'
  let formButtonText = props.forumId ? 'Update Forum' : 'Create Forum'

  return (
    <div className="forum-form-container">
      <h4>{formTitle}</h4>
      <div className="form-input">
        <input onChange={handleChange} value={forum?.title} type="text" name="title" placeholder="Title..." required />
      </div>
      <div className="form-input">
        <input onChange={handleChange} value={forum?.description} type="text" name="description" placeholder="Description..." required />
      </div>
      <button onClick={handleSubmit}>{formButtonText}</button>
      <button onClick={props.onFormClose}>  X  </button>
    </div>
  )
}

export default ForumForm