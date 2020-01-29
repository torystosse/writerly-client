import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const MyPrompts = props => {
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/prompts`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setPrompts(res.data.prompts))
      .catch(console.error)
  }, [])

  const filteredPrompts = prompts.filter(prompt => prompt.owner === props.user._id)

  const newPrompts = filteredPrompts.map(prompt => (
    <li key={prompt._id}>
      <Link to={`/prompts/${prompt._id}`}>{prompt.text}</Link>
    </li>
  ))

  return (
    <Layout>
      <h4>My Prompts</h4>
      <ul>
        {newPrompts}
      </ul>
    </Layout>
  )
}

export default MyPrompts
