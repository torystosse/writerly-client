import React from 'react'
// import { Link } from 'react-router-dom'

const PromptForm = ({ prompt, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Prompt Text</label>
    <input
      placeholder="Your writing prompt goes here!"
      value={prompt.text}
      name="text"
      type="text"
      onChange={handleChange}
    />

    <button type="submit" className='btn btn-primary'>Submit</button>
  </form>
)

export default PromptForm
