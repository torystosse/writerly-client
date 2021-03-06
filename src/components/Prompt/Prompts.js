import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const Prompts = props => {
  const [prompts, setPrompts] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState({})

  useEffect(() => {
    axios(`${apiUrl}/prompts`)
      .then(res => setPrompts(res.data.prompts))
      .catch(() => {
        props.alert({
          heading: 'Aw man!',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
  }, [])

  // const newPrompts = prompts.map(prompt => (
  //   <li key={prompt.id}>
  //     <Link to={`/prompts/${prompt.id}`}>{prompt.title}</Link>
  //   </li>
  // ))

  // const newPrompts = currentPrompt.text

  const getNonFictionPrompts = () => {
    const nonFictionPrompts = prompts.filter(
      prompt => (prompt.genre === 'non-fiction')
    )
    props.alert({
      heading: 'Woohoo!',
      message: 'You\'ve received a prompt',
      variant: 'success'
    })
    const newPromptIndex = Math.floor(Math.random() * nonFictionPrompts.length)
    setCurrentPrompt(nonFictionPrompts[newPromptIndex])
  }

  const getFictionPrompts = () => {
    const fictionPrompts = prompts.filter(
      prompt => (prompt.genre === 'fiction')
    )
    props.alert({
      heading: 'Woohoo!',
      message: 'You\'ve received a prompt',
      variant: 'success'
    })
    const newPromptIndex = Math.floor(Math.random() * fictionPrompts.length)
    setCurrentPrompt(fictionPrompts[newPromptIndex])
  }

  let promptsJsx = ''
  if (!currentPrompt) {
    promptsJsx = 'Loading...'
  } else {
    promptsJsx = currentPrompt.text
  }

  return (
    <Layout>
      <button className='btn btn-primary prompt-button' onClick={getFictionPrompts}>Get A Fiction Prompt!</button>
      <button className='btn btn-primary prompt-button' onClick={getNonFictionPrompts}>Get A Non-Fiction Prompt!</button>
      <p>{promptsJsx}</p>
    </Layout>
  )

  // <h4>Prompts</h4>
  // <ul>
  //   {newPrompts}
  // </ul>
}

export default Prompts
