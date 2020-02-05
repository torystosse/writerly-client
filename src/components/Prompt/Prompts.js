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
    axios(`${apiUrl}/prompts`)
      .then(res => {
        const nonFictionPrompts = res.data.prompts.filter(prompt => (prompt.genre === 'non-fiction'))
        setPrompts(nonFictionPrompts)
      })
      .then(() => {
        props.alert({
          heading: 'Woohoo!',
          message: 'You\'ve received a prompt',
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

    // const nonFictionPrompts = prompts.filter(prompt => (prompt.isFiction === false))
    const newPromptIndex = Math.floor(Math.random() * prompts.length)
    // console.log(fictionPrompts[newPromptIndex], newPromptIndex)
    setCurrentPrompt(prompts[newPromptIndex])
    console.log('prompts[newPromptIndex] ', prompts[newPromptIndex])
    console.log(newPromptIndex, ' newPromptIndex')
    console.log(currentPrompt, ' currentPrompt')
  }

  const getFictionPrompts = () => {
    axios(`${apiUrl}/prompts`)
      .then(res => {
        const fictionPrompts = res.data.prompts.filter(prompt => (prompt.genre === 'fiction'))
        setPrompts(fictionPrompts)
      })
      .then(() => {
        props.alert({
          heading: 'Woohoo!',
          message: 'You\'ve received a prompt',
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

    // const fictionPrompts = prompts.filter(prompt => (prompt.isFiction === true))
    const newPromptIndex = Math.floor(Math.random() * prompts.length)
    // console.log(fictionPrompts[newPromptIndex], newPromptIndex)
    setCurrentPrompt(prompts[newPromptIndex])
    // console.log('fiction prompts' + fictionPrompts)
    // console.log('newPromptIndex ' + newPromptIndex)
    console.log('prompts[newPromptIndex] ', prompts[newPromptIndex])
    console.log(newPromptIndex, ' newPromptIndex')
    console.log(currentPrompt, ' currentPrompt')
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
