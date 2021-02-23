import React from 'react'

const Comment = (props) => {
  return (
    <div className="single-comment" key={props.comment.id}>
      <p>{props.comment.description}</p>
      <button onClick={() => props.onEditingComment(props.comment.id)}>Edit Comment</button>
      <button onClick={() => props.onRemoveComment(props.comment.id)}>Delete Comment</button>
    </div>
  )
}

export default Comment