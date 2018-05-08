import React, { Component } from 'react'
import {
  Grid,
  Col,
  Row,
  FormGroup,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import owasp from 'owasp-password-strength-test'
import { inject } from 'mobx-react'
import Store from '../stores/store'

@inject('Store')
class Form extends Component {
  constructor() {
    super ()
    this.state = {
      site: '',
      username: '',
      password: '',
      strength: 'strong password is recommended',
      strengthToolTip: 'strong password is recommended'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.validatePasswordStrength()
    })
  }

  validatePasswordStrength = () => {
    let result = owasp.test(this.state.password)
    if (!result.strong) {
      this.setState({
        strengthToolTip: result.errors,
        strength: 'weak'
      })
    } else {
      this.setState({
        strengthToolTip: 'Strong password',
        strength: 'strong'
      })
    }
  }

  addAppPass = (e) => {
    e.preventDefault()
    let site = this.state.site
    let username = this.state.username
    let password = this.state.password

    if (site === '' || username === '' || password === '') {
      alert('all fields must not be empty')
    } else if (this.state.strength === 'weak') {
      let answer = window.confirm('this password is not strong, continue to submit ?')
      if (answer) {
        Store.addAppPass(site, username, password)
        this.props.history.push('/')
      }
    } else {
      Store.addAppPass(site, username, password)
      this.props.history.push('/')
    }
  }

  render () {
    const tooltip = (
      <Tooltip id="tooltip">
        { this.state.strengthToolTip}
      </Tooltip>
    )

    if (this.props.match.params.action === 'add') {
      return (
        <div>
          <Grid>
            <Row className="show-grid">
              <Col xs={4} mdOffset={4}>
              <h1>add new app-pass</h1>
              <form onSubmit={this.addAppPass}>
                <FormGroup bsSize="large">
                  <FormControl type="text" placeholder="Site Name" name="site" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup bsSize="large">
                  <FormControl type="text" placeholder="Username" name="username" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup bsSize="large">
                  <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                  <OverlayTrigger placement="bottom" overlay={tooltip}>
                    <Button style={{margin: '10px'}} bsStyle={(this.state.strength === 'weak') ? 'danger' : 'success'}>{this.state.strength}</Button>
                  </OverlayTrigger>
                </FormGroup>
                <input type ="submit" value="Submit" style={{margin: '10px'}} />
                <Link to="/">
                  <button style={{margin: '10px'}}>cancel</button>
                </Link>
              </form>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>edit here</div>
      )
      
    }

  }
}

export default Form