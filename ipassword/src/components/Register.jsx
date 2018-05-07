import React, { Component } from 'react'
import {
  Grid,
  Col,
  Row,
  FormGroup,
  FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import Store from '../stores/store'

@inject('Store')
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  clear = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  register = (e) => {
    e.preventDefault()
    Store.register(this.state.username, this.state.password)
    this.clear()
    alert('registered !')
    Store.login(this.state.username, this.state.password)
    this.props.history.push('/')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={4} mdOffset={4}>
            <h1>Register Page</h1>
            <form onSubmit ={this.register}>
              <FormGroup bsSize="large">
                <FormControl type="text" placeholder="Username" name="username" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup bsSize="large">
                <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange} />
              </FormGroup>
              <input type="submit" value="Submit" />
            </form>
            <Link to = { `/login` } >
            iPassword registered user ? login here
            </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Register