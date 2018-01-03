import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Header from './Header'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books:books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <Header title='MyReads'/>
            <div className="list-books-content">
              <div>
                <ListBooks books={this.state.books}/>
              </div>
            </div>
          </div>
        )}/>
        <Route path="/search" render={({history})=>(
          <SearchBook onSearch={(book)=>{
            history.push('/');
          }}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
