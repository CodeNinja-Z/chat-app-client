import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import ReplyCommentForm from './ReplyCommentForm'
import NewCommentForm from './NewCommentForm'
import EditCommentForm from './EditCommentForm';
import Comment from './Comment'

const Forum = (props) => {
  const [forum, setForum] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)

  useEffect(() => {
    const id = props.match.params.id // props.match reads the :id from the frond-end path
    const url = `/api/v1/forums/${id}`

    axios.get(url)
    .then(res => {
      console.log(res)
      setForum(res.data)
      setLoaded(true)
    })
    .catch( error => console.log(error) )
  }, []) // equivalent to componentDidMount()

  const handleSubmit = (comment, parentCommentId) => {
    console.log(forum)
    console.log(comment)
    const forum_id = forum.id
    const description = comment.description
    const parent_comment_id = parentCommentId
    console.log(`parent_comment_id: ${parent_comment_id}`)
    axios.post(`/api/v1/forums/${forum_id}/comments`, {comment: {description, forum_id, parent_comment_id}})
    .then(res => {
      const formatted_comments = [...forum.formatted_comments, res.data]
      setForum({...forum, formatted_comments})
    })
    .catch(error => { console.log(error) })
  }

  const removeComment = (commentId) => {
    axios.delete(`/api/v1/forums/${forum.id}/comments/${commentId}`)
    .then(() => {
      const formatted_comments = forum.formatted_comments.filter(
        comment => comment.id != commentId
      )
      setForum({...forum, formatted_comments})
    })
    .catch(error => console.log(error))
  }

  const editingComment = id => {
    setEditingCommentId(id)
  }

  const editComment = comment => {
    console.log(comment)
    const description = comment.description
    axios.put(`/api/v1/forums/${forum.id}/comments/${comment.id}`, {comment: {description}})
    .then(res => {
      console.log(forum.formatted_comments)
      console.log(res)
      const updated_comment = res.data
      const formatted_comments = forum.formatted_comments
      const index = formatted_comments.findIndex(c => c.id === updated_comment.id)
      formatted_comments[index] = updated_comment
      setForum({...forum, formatted_comments})
      setEditingCommentId({editingCommentId: null})
    })
    .catch(error => console.log(error));
  }

  const closeEditForm = () => {
    setEditingCommentId(null)
  }

  let comments
  if (loaded && forum.formatted_comments) {
    comments = forum.formatted_comments.map(item => {
      if (editingCommentId === item.id) {
        return (
          <Fragment>
            <EditCommentForm
              key={item.id}
              comment={item}
              onRemoveComment={removeComment}
              onEditComment={editComment}
              onCloseEditForm={closeEditForm}
            />
            <ReplyCommentForm
              key={`item${item.id}`}
              parentComment={item}
              parentCommentId={item.id}
              handleSubmit={handleSubmit}
            />
            <hr/>
          </Fragment>    
        )
      } else {
        return (
          <Fragment>
            <Comment
              key={item.id}
              comment={item}
              onRemoveComment={removeComment}
              onEditingComment={editingComment}
            />
            <ReplyCommentForm
              key={`item${item.id}`}
              parentComment={item}
              parentCommentId={item.id}
              handleSubmit={handleSubmit}
            />
            <hr/>
          </Fragment>    
        )        
      }
    })
  }

  return (
    <div className="comments-container">
      { 
        loaded &&
        <Fragment>
          {comments}
          <h4>New Comment</h4>
          <NewCommentForm
            handleSubmit={handleSubmit}
          />
        </Fragment>
      }
    </div>
  )
}

export default Forum