import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PromptForm from '../Shared/PromptForm'
import Layout from '../Shared/Layout'

const PromptCreate = props => {
  const [prompt, setPrompt] = useState({ text: '' })
  const [createdPromptId, setCreatedPromptId] = useState(null)

  const handleChange = event => {
    event.persist()

    // const updatedField = { [event.target.name]: event.target.value }
    // const editedMovie = Object.assign(movie, updatedField)
    // setMovie(editedMovie)

    // this is the same as above, but shorter
    setPrompt({ ...prompt, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.persist()
    event.preventDefault()

    axios({
      url: `${apiUrl}/prompts`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { prompt }
    })
      .then(res => setCreatedPromptId(res.data.prompt._id))
      .catch(console.error)
  }

  if (createdPromptId) {
    return <Redirect to={`/prompts/${createdPromptId}`} />
  }

  return (
    <Layout>
      <PromptForm
        prompt={prompt}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}

export default PromptCreate
