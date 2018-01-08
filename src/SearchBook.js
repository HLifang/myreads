import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBook extends Component{
  static propTypes={
    books:PropTypes.array.isRequired
  }

  constructor(props){
    super(props);

    this.updateBook=this.updateBook.bind(this);

    this.state={
      books:[],
      shelfBooks:props.books,
      query:''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      shelfBooks:nextProps.books
    })
  }

  updateQuery=(query)=>{
    this.setState({
      query:query.trim()
    });
  }

  searchBook=(keycode)=>{
    const {query,shelfBooks}=this.state;

    if(keycode===13){
      BooksAPI.search(query).then((books)=>{
        console.log('shelfBooks',shelfBooks);
        books.forEach((book)=>{
          shelfBooks.forEach((shelfBook)=>{
            if(book.id===shelfBook.id){
              book.shelf=shelfBook.shelf;
            }
          });
        });

        this.setState({
          books:(books && books.length>0) ? books:[]
        });
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
    BooksAPI.update(book,e.target.value);
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