import React,{ Component } from 'react';

class ListBooks extends Component{
    constructor(props){
        super(props);
        this.state={
            books:props.books
        }
    }
    render(){
        const books=this.props.books;

        let booksShelves=[
        {
            currentlyReading: books.filter((book) => book.shelf === 'currentlyReading')
        },{
            wantToRead: books.filter((book) => book.shelf === 'wantToRead')
        },{
            read: books.filter((book) => book.shelf === 'read')
        }];

        let shelves = [{
            name: 'currentlyReading',
            title: 'Currently Reading'
        }, {
            name: 'wantToRead',
            title: 'Want To Read'
        }, {
            name: 'read',
            title: 'Read'
        }];

        return (
            <div>
                {shelves.map((shelf,index)=>(
                    <div key={shelf.name} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.title}</h2>
                        <div className="bookshelf-books">
                            {books.length!==0 && (
                                <ol className="books-grid">
                                    {booksShelves[index][shelf.name].map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            )}
                            
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListBooks;