import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import PromptForm from '../Shared/PromptForm'
import Layout from '../Shared/Layout'

const PromptEdit = props => {
  const [prompt, setPrompt] = useState({ text: '', genre: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/prompts/${props.match.params.id}`)
      .then(res => setPrompt(res.data.prompt))
      .catch(() => {
        props.alert({
          heading: 'Aw man!',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
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
      .then(() => {
        props.alert({
          message: 'Prompt successfully updated',
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
