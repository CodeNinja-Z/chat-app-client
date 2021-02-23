import React, { useState } from 'react'
import ForumForm from './ForumForm'
import Forum from './Forum'

const EditableForum = props => {
  const [editFormOpen, setEditFormOpen] = useState(false)

  const handleEditClick = () => {
    openForm()
  }
  
  const handleFormClose = () => {
    closeForm()
  }

  const handleSubmit = (forum) => {
    props.handleEditFormSubmit(forum);
    setEditFormOpen(false);
  }

  const openForm = () => {
    setEditFormOpen(true)
  }

  const closeForm = () => {
    setEditFormOpen(false)
  }

  if (editFormOpen) {
    return (
      <ForumForm
        id={props.id}
        forumId={props.forum.id}
        forum={props.forum}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
      />
    )
  } else {
    return (
      <Forum
        forum={props.forum}
        onEditClick={handleEditClick}
        onDeleteClick={props.handleDeleteForum}
      />
    )
  }
}

export default EditableForum