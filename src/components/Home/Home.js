import React from 'react'
import Layout from '../Shared/Layout'

const Home = (props, { user }) => (
  <Layout user={props.user}>
    <p>Writerly - the application designed to keep you writing!</p>
  </Layout>
)

export default Home
