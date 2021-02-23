import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import EditableForum from './EditableForum'
import ForumForm from './ForumForm'

const Forums = () => {
  const [forums, setForums] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(()=> {
    console.log(forums?.length)
    axios.get('/api/v1/forums')
    .then( res => {
      console.log(res.data)
      setForums(res.data)
      setLoaded(true)
    })
    .catch( error => console.log(error) )
  }, [forums?.length])

  const handleCreateFormSubmit = (forum) => {
    axios.post('/api/v1/forums', {forum})
    .then(response => {
      console.log(response)
      setForums([...forums, response.data])
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleEditFormSubmit = (updatedForum) => {
    axios.put(`/api/v1/forums/${updatedForum.id}`, {forum: updatedForum})
    .then(response => {
      console.log(response)
      const updatedForums = forums.map((forum) => {
        if (forum.id === updatedForum.id) {
          return Object.assign({}, forum, {
            title: updatedForum.title,
            description: updatedForum.description
          })
        } else {
          return forum
        }
      })
      setForums(updatedForums)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleDeleteForum = (forumId) => {
    axios.delete(`/api/v1/forums/${forumId}`)
    .then(() => {
      const updated_forums = forums.filter(
        forum => forum.id != forumId
      )
      setForums(updated_forums)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <h1 className="App-title">Forums App</h1>
      <div className="forums-container">
        <div className="forums">
          {loaded && forums?.map(forum => {
            return (
              <Fragment>
                <EditableForum
                  forum={forum}
                  key={forum.id}
                  handleCreateFormSubmit={handleCreateFormSubmit}
                  handleEditFormSubmit={handleEditFormSubmit}
                  handleDeleteForum={handleDeleteForum}
                />
                <hr/>
              </Fragment>
            )
          })}
        </div>
        <div className="new-forum-form">
          <ForumForm
            onFormSubmit={handleCreateFormSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default Forums