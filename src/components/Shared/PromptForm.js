import React from 'react'
// import { Link } from 'react-router-dom'

const PromptForm = ({ prompt, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label className='form-label'>Your Prompt</label>
    <br />
    <input
      placeholder="Your writing prompt goes here!"
      value={prompt.text}
      name="text"
      type="text"
      onChange={handleChange}
    />
    <br />
    <label className='form-label'>Type of Prompt</label>
    <br />
    <input
      placeholder="Fiction?"
      value={prompt.genre}
      name="genre"
      type="text"
      onChange={handleChange}
    />
    <br />
    <button type="submit" className='btn btn-primary submit-button'>Submit</button>
  </form>
)

export default PromptForm
