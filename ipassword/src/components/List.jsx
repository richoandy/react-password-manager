import owasp from 'owasp-password-strength-test'
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Store from '../stores/store'
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap'

@inject('Store')
class List extends Component {
  constructor (props) {
    super (props)
    this.state = {
      passVisibility: 'password',
      buttonText: 'show',
      isEditing: false,
      newUsername: this.props.data.username,
      newPassword: this.props.data.password,
      password: '',
      showPasswordInput: false,
      strength: '',
      strengthToolTip: ''
    }
  }

  componentDidMount () {
    this.validatePassStrength(this.props.data.password)
  }

  validatePassStrength = (pass) => {
    let result = owasp.test(pass);
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

  showPassword = (e) => {
    e.preventDefault()
    if (this.state.buttonText === 'show') {
      if (this.state.password === localStorage.getItem('pass')) {
        this.setState({
          passVisibility: 'text',
          buttonText: 'hide',
          showPasswordInput: false,
          password: ''
        })
      } else {
        alert('wrong password !')
        this.setState({
          password: ''
        })
      }
      
    }
  }

  verifyPassword = () => {
    if (this.state.passVisibility === 'password') {
      this.setState({
        showPasswordInput: true
      })
    } else {
      this.setState({
        passVisibility: 'password',
        buttonText: 'show'
      })
    }
    
  }

  cancelVerifyPassword = () => {
    this.setState({
      showPasswordInput: false
    })
  }

  editNow = () => {
    this.setState({
      isEditing: true
    })
  }

  cancelIt = () => {
    this.setState({
      isEditing: false
    })
  }

  updateIt = () => {
    this.setState({
      isEditing: false
    })
    let id = this.props.data.id
    Store.updateAppPass(id, this.state.newUsername, this.state.newPassword)
    this.validatePassStrength(this.state.newPassword)
  }

  deleteIt = () => {
    Store.deleteAppPass(this.props.data.id)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render () {
    const tooltip = (
      <Tooltip id="tooltip">
        { this.state.strengthToolTip}
      </Tooltip>
    )

    if ( this.state.isEditing === false ) {
      return (
        <tr>
          <td>
          {this.props.data.site}
          </td>
          <td>
          {this.props.data.username}
          </td>
          <td>
            <input type={this.state.passVisibility} value={this.props.data.password} disabled/>
          </td>
          <td>
            { this.state.strength }
            <OverlayTrigger placement="bottom" overlay={tooltip}>
              <Button bsStyle="default">info</Button>
            </OverlayTrigger>
          </td>
          <td>
            <button onClick={ () => this.verifyPassword() }>{this.state.buttonText}</button>
          </td>
          {
            this.state.showPasswordInput ? 
            <td>
              <form onSubmit={this.showPassword}>
                <input type="password" onChange={this.handleChange} placeholder="input iPassword pass" name="password" value={this.state.password}/>
              </form>
              <button onClick={this.cancelVerifyPassword}>cancel</button>
            </td>
            :
            <td>
            <a onClick={this.editNow}>edit</a> | <a onClick={ () => this.deleteIt() }>delete</a>
          </td>
          }
        </tr>
      )
    } else {
      return (
      <tr>
        <td>
          <input type="text" value={this.props.data.site} disabled />
        </td>
        <td>
        <input type="text" value={this.state.newUsername} name="newUsername" onChange={this.handleChange}  />
        </td>
        <td>
        <input type={this.state.passVisibility} value={this.state.newPassword} name="newPassword" onChange={this.handleChange} />
        </td>
        <td>
        { this.state.strength }
        </td>
        <td>
          
        </td>
        <td>
          <button onClick={this.updateIt}>save</button>
          
          <button onClick={this.cancelIt}>cancel</button>
        </td>
      </tr>
      )
    }

  }
}

export default List