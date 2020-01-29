import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PromptForm from '../Shared/PromptForm'
import Layout from '../Shared/Layout'

const PromptEdit = props => {
  const [prompt, setPrompt] = useState({ text: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/prompts/${props.match.params.id}`)
      .then(res => setPrompt(res.data.prompt))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()

    setPrompt({ ...prompt, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.persist()
    event.preventDefault()

    axios({
      url: `${apiUrl}/prompts/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { prompt }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/prompts/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <PromptForm
        prompt={prompt}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/prompts/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default PromptEdit
