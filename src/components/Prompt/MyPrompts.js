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
      .then(() => {
        props.alert({
          message: 'You\'ve got some great prompts there!',
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

  const filteredPrompts = prompts.filter(prompt => prompt.owner === props.user._id)
  let newPrompts = ''
  if (filteredPrompts.length === 0) {
    newPrompts = 'Looks like you don\'t have any prompts yet, why not create one?'
  } else {
    newPrompts = filteredPrompts.map(prompt => (
      <li className='list-group-item' key={prompt._id}>
        <Link to={`/prompts/${prompt._id}`} className='my-prompts'>{prompt.text}</Link>
      </li>
    ))
  }

  return (
    <Layout>
      <h4>My Prompts</h4>
      <ul className='list-group'>
        {newPrompts}
      </ul>
    </Layout>
  )
}

export default MyPrompts
