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
      .then(() => {
        props.alert({
          message: 'You\'ve selected a prompt',
          variant: 'success'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Aw man!',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/prompts/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => {
        props.alert({
          message: 'Prompt successfully deleted.',
          variant: 'success'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Aw man!',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
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
