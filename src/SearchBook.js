import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBook extends Component{
  constructor(props){
    super(props);

    this.state={
      books:[],
      query:''
    }
  }

  searchBook=(query)=>{
    this.setState({
      query:query.trim()
    });

    BooksAPI.search(query).then((books)=>{
      console.log('search books number',books.length);
      if(books && books.length>0){
        this.setState({
          books:books
        })
      }
      
    });
  }

  updateBook(book,e){
    console.log('books',this.state.books);
    const newBooks=[...this.state.books];

    newBooks.forEach((bk)=>{
      if(bk.title===book.title){
        bk.shelf=e.target.value;
      }
    });
    this.setState({
      books:newBooks
    });
    BooksAPI.update(book.id,newBooks);
  }

  render(){
    const {books,query}=this.state;
    console.log(books);

    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" 
              value={query} onChange={(e)=>this.searchBook(e.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
            {books.length !==0 &&(
              <ol className="books-grid">
                {books.map((book)=>(
                  <Book key={book.id} book={book} onChangeBook={this.updateBook}/>
                ))}
              </ol>
            )}
        </div>
      </div>
    );
  }
}

export default SearchBook;