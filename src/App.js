import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Header from './Header'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {

  constructor(props){
    super(props);
    //this.updateResut=this.updateResut.bind(this);
    this.state={books:[]};
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
          // <SearchBook books={this.state.books} onSearch={()=>{
          //   history.push('/');
          // }}/>
          <SearchBook books={this.state.books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
