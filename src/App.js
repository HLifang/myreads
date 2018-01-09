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
    this.state={books:[]};
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books:books
      })
    })
  }

  onUpdate(book){
    const {books}=this.state;
    const newBooks=books.filter((bk)=>bk.id!==book.id);
    newBooks.push(book);
    this.setState({books:newBooks});
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
          <SearchBook books={this.state.books} changeBook={(book)=>this.onUpdate(book)} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
