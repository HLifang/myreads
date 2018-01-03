import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component{

    render(){
        const {book,onChangeBook}=this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(e)=>onChangeBook(book,e)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {book.authors.map((author)=>(
                            <p key={author}>{author}</p>
                        ))}
                    </div>
                </div>
            </li>
        )
    }
}

Book.propTypes={
    book:PropTypes.object.isRequired,
    onChangeBook:PropTypes.func.isRequired
}

export default Book;