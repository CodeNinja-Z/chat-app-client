import React, { useState } from 'react'

const ReplyCommentForm = (props) => {
  const [comment, setComment] = useState({})
  
  const handleChange = (e) => {
    e.preventDefault()
    setComment(Object.assign({}, comment, {[e.target.name]: e.target.value}))
  }

  const onSubmit = e => {
    e.preventDefault()
    props.handleSubmit(comment)
    setComment({description: ''})
  }

  return (
    <div className="comment-form-container">
      <form onSubmit={onSubmit}>
        <h4>Leave Your Comment</h4>
        <div className="form-input">
          <input onChange={handleChange} value={comment.description} type="text" name="description" placeholder="Description..." required />
        </div>
        <button type="submit">Add New Comment</button>
      </form>
    </div>
  )
}

export default ReplyCommentForm