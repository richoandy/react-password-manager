import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import List from './List'
import fire from '../fire'
import Cryptr from 'cryptr'
import './loader.css'
import { inject, observer } from 'mobx-react'
import Store from '../stores/store'

const cryptr = new Cryptr(process.env.REACT_APP_KEY)

@inject('Store')
@observer
class HomeTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  componentDidMount () {
    Store.fetch()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    let tempData = []
    if(this.state.query !== '') {
      let exp = new RegExp(`${this.state.query}`, 'i')
      tempData = Store.AppPasses.filter(data => 
        exp.test(data.site)
      )
    } else {
      tempData = [...Store.AppPasses]
    }

    let bodyList = tempData.map((value, index) => 
      <List data={value} key={index} />
    )

    if (Store.AppPasses === 'empty') {
      return (
        <div className="loader"></div> 
      )
    } else {
      return (
        <div>
          <input type ="text" name="query" onChange={this.handleChange} placeholder="search here" style={{margin: '10px'}} />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>password Strength</th>
                <th>Show Me</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { bodyList }
            </tbody>
          </Table>
        </div> 
      )
    }
    
  }
}

export default HomeTable