import React, { Component } from 'react'
import HomeTable from './HomeTable'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import Store from '../stores/store'

@inject('Store')

class Home extends Component {

  logout = (e) => {
    localStorage.clear()
    Store.logout()
    this.props.props.history.push('/login')
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className="container">
      <h1>hi, {localStorage.getItem('user')}</h1>
      <Link to="/form/add">
        <Button style={{margin: '10px'}}>Add new password</Button>
      </Link>
      <Button onClick={ this.logout } style={{margin: '10px'}}>Logout</Button>
        <HomeTable />
      </div>
    )
  }
}

export default Home