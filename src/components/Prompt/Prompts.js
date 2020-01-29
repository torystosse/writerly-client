import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

const Prompts = props => {
  const [prompts, setPrompts] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState({})

  // useEffect(() => {
  //   axios(`${apiUrl}/prompts`)
  //     .then(res => setPrompts(res.data.prompts))
  //     .then(() => {
  //       props.alert({
  //         heading: 'Woohoo!',
  //         message: 'You\'ve selected a prompt',
  //         variant: 'success'
  //       })
  //     })
  //     .catch(() => {
  //       props.alert({
  //         heading: 'Aw man!',
  //         message: 'Something went wrong',
  //         variant: 'failure'
  //       })
  //     })
  // }, [])

  // const newPrompts = prompts.map(prompt => (
  //   <li key={prompt.id}>
  //     <Link to={`/prompts/${prompt.id}`}>{prompt.title}</Link>
  //   </li>
  // ))

  // const newPrompts = currentPrompt.text

  const getPrompt = () => {
    axios(`${apiUrl}/prompts`)
      .then(res => setPrompts(res.data.prompts))
      .then(() => {
        props.alert({
          heading: 'Woohoo!',
          message: 'You\'ve selected a prompt',
          variant: 'success'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Aw man!',
          message: 'Something went wrong',
          variant: 'failure'
        })
      })

    let newPromptIndex = prompts.findIndex(prompt => (currentPrompt._id === prompts._id))
    console.log('newPromptIndex is ' + newPromptIndex)
    const currentPromptIndex = newPromptIndex
    while (currentPromptIndex === newPromptIndex) {
      newPromptIndex = Math.floor(Math.random() * prompts.length)
    }
    setCurrentPrompt(prompts[newPromptIndex])
    console.log(newPromptIndex)
  }

  let promptsJsx = ''
  if (!currentPrompt) {
    promptsJsx = 'Loading...'
  } else {
    promptsJsx = currentPrompt.text
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={getPrompt}>Get A Prompt!</button>
      <p>{promptsJsx}</p>
    </div>
  )

  // <h4>Prompts</h4>
  // <ul>
  //   {newPrompts}
  // </ul>
}

export default Prompts