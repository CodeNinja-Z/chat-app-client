import React from 'react'
import { Link } from 'react-router-dom'

const Forum = (props) => {
  return (
    <div className="single-forum" key={props.forum.id}>
      <Link to={`/forums/${props.forum.id}`}>
        <h4>{props.forum.title}</h4>
        </Link>
      <p>{props.forum.description}</p>
      <button onClick={() => props.onEditClick()}>Edit Forum</button>
      <button onClick={() => props.onDeleteClick(props.forum.id)}>Delete Forum</button>
    </div>
  )
}

export default Forum