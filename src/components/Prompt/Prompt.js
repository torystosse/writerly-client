// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const Prompt = props => {
  const [prompt, setPrompt] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/prompts/${props.match.params.id}`)
      .then(res => setPrompt(res.data.prompt))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/prompts/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!prompt) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Prompt succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>Prompt</h4>
      <p>{prompt.text}</p>
      <button onClick={destroy}>Delete Prompt</button>
      <Link to={`/prompts/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/my-prompts">Back to my prompts</Link>
    </Layout>
  )
}

export default Prompt
