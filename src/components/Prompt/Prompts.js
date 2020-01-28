import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

const Prompts = props => {
  const [prompts, setPrompts] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState({})

  useEffect(() => {
    axios(`${apiUrl}/prompts`)
      .then(res => setPrompts(res.data.prompts))
      .then(() => {
        this.props.alert({
          heading: 'Woohoo!',
          message: 'You\'ve selected a prompt',
          variant: 'success'
        })
      })
      .catch(console.error)
  }, [])

  // const newPrompts = prompts.map(prompt => (
  //   <li key={prompt.id}>
  //     <Link to={`/prompts/${prompt.id}`}>{prompt.title}</Link>
  //   </li>
  // ))

  const getPrompt = () => {
    let newPromptIndex = prompts.findIndex(prompt => (currentPrompt._id === prompt._id))
    const currentPromptIndex = newPromptIndex
    while (currentPromptIndex === newPromptIndex) {
      newPromptIndex = Math.floor(Math.random() * prompts.length)
    }
    setCurrentPrompt(prompts[newPromptIndex])
  }

  if (!prompts) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={getPrompt}>Get A Prompt!</button>
    </div>
  )

  // <h4>Prompts</h4>
  // <ul>
  //   {newPrompts}
  // </ul>
}

export default Prompts
