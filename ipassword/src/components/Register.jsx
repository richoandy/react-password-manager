import React, { Component } from 'react'
import {
  Grid,
  Col,
  Row,
  FormGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { inject, observer} from 'mobx-react'
import Store from '../stores/store'
import owasp from 'owasp-password-strength-test'

@inject('Store')
@observer
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      strength: 'strong password is recommended',
      strengthToolTip: 'strong password is recommended'
    }
  }

  clear = () => {
    this.setState({
      username: '',
      password: '',
      strength: 'weak',
      strengthToolTip: 'weak'
    })
  }

  componentDidMount () {
    Store.userFetch()
  }

  register = (e) => {
    e.preventDefault()
    if (this.state.strength === 'weak') {
      alert('password is not strong')
    } else if (this.state.username === '' ||this.state.password === '') {
      alert('fill all the fields')
    } else if (Store.userList.indexOf(this.state.username) !== -1) {
      alert('username is already taken !')
    } else {
      Store.register(this.state.username, this.state.password)
      this.clear()
      alert('registered !')
      Store.login(this.state.username, this.state.password, () => {
        this.props.history.push('/')
      })

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

  render () {
    const tooltip = (
      <Tooltip id="tooltip">
        { this.state.strengthToolTip}
      </Tooltip>
    )
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
                <OverlayTrigger placement="bottom" overlay={tooltip}>
                    <Button style={{margin: '10px'}} bsStyle={(this.state.strength === 'weak') ? 'danger' : 'success'
            }>{this.state.strength}</Button>
                  </OverlayTrigger>
              </FormGroup>
              {
                (this.state.strength === 'strong') ?
                <input type="submit" value="Submit" /> :
                <div> </div>
              }
              
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