import React, { Component } from 'react'
import {
  Grid,
  Col,
  Row,
  FormGroup,
  FormControl,
  Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import Store from '../stores/store'
import { observer } from 'mobx-react';

@inject('Store')
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  verifyLogin = (e) => {
    e.preventDefault()
    Store.login(this.state.username, this.state.password,  ()  => {
      this.props.history.push('/')
    })
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
            <h1>Login Page</h1>
            <form onSubmit ={this.verifyLogin}>
              <FormGroup bsSize="large">
                <FormControl type="text" placeholder="Username" name="username" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup bsSize="large">
                <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange} />
              </FormGroup>
              <input type="submit" value="Submit" />
            </form>
            <Link to = { `/register` } >
            dont have account ? register here
            </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Login