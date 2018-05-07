import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import List from './List'
import fire from '../fire'

class HomeTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      query: ''
    }
  }

  componentDidMount () {
    fire.database().ref('AppPasses').on('value', snap => {
      let temp = []
      snap.forEach(element => {

        if(element.val().key === localStorage.getItem('key')) {
          temp.push({
            id: element.key,
            site: element.val().site,
            username: element.val().username,
            password: element.val().password
          })
        }
      })
      this.setState({
        list: [...temp]
      })
    })
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
      tempData = this.state.list.filter(data => 
        exp.test(data.site)
      )
    } else {
      tempData = [...this.state.list]
    }

    let bodyList = tempData.map((value, index) => 
      <List data={value} key={index} />
    )
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

export default HomeTable