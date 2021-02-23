import React, { useState, Fragment } from 'react'

const EditCommentForm = (props) => {
  const [comment, setComment] = useState(props.comment)

  const handleChange = e => {
    e.preventDefault()
    setComment({...comment, [e.target.name]: e.target.value})
    // Destructuring/Spread Operator 可以 Overwrite Array 也可以 Overwrite Map
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(comment)
    props.onEditComment(comment)
  }

  const handleCloseForm = e => {
    // set setEditingCommentId to null, setEditingCommentId mean isOpen or not
    e.preventDefault()
    props.onCloseEditForm()
  }

  return(
    <Fragment>
      <input  name="description"
              type="text"
              placeholder="Description..."
              value={comment.description}
              onChange={handleChange} />
      <button onClick={handleSubmit}>Update Comment</button>
      <button onClick={handleCloseForm}>  X  </button>
    </Fragment>  
  )
}

export default EditCommentForm