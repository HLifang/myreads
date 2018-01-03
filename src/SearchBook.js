import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBook extends Component{
  constructor(props){
    super(props);

    this.updateBook=this.updateBook.bind(this);

    this.state={
      books:[],
      query:''
    }
  }

  updateQuery=(query)=>{
    this.setState({
      query:query.trim()
    });
  }

  searchBook=(keycode)=>{
    const {query}=this.state;

    if(keycode===13){
      BooksAPI.search(query).then((books)=>{
        if(books && books.length>0){
          this.setState({
            books:books
          })
        }else{
          this.setState({
            books:[]
          });
        }
      });
    }
  }

  updateBook(book,e){
    if(!book.shelf){
      Object.defineProperty(book,'shelf',{
        writable:true,
        value:e.target.value
      });
    }else{
      book.shelf=e.target.value;
    }
    
    const newBooks=[...this.state.books];

    newBooks.forEach((bk)=>{
      if(bk.title===book.title){
        bk=book;
      }
    });
    this.setState({
      books:newBooks
    });
    BooksAPI.update(book.id,e.target.value);
  }

  render(){
    const {books,query}=this.state;

    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" 
              value={query} onChange={(e)=>this.updateQuery(e.target.value)} onKeyUp={(e)=>this.searchBook(e.keyCode)}/>
          </div>
        </div>

        <div className="search-books-results">
            {books && books.length !==0 &&(
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