import React from 'react'
// import { Link } from 'react-router-dom'

const PromptForm = ({ prompt, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label className='form-label'>Your Prompt</label>
    <br />
    <textarea
      required
      placeholder="Your writing prompt goes here!"
      value={prompt.text}
      name="text"
      type="text"
      onChange={handleChange}
      className='textarea'
    />
    <br />
    <label className='form-label'>Genre</label>
    <br />
    <select name="genre" onChange={handleChange} required>
      <option
        value=''
        default
      >Select a Genre</option>
      <option
        value='fiction'
      >Fiction</option>
      <option
        value='non-fiction'
      >Non-Fiction</option>
    </select>
    <br />
    <button type="submit" className='btn btn-primary submit-button'>Submit</button>
  </form>
)

export default PromptForm
