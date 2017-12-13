import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Title from './Title';


class ListBooks extends Component{
    static propTypes={
        books:PropTypes.array.isRequired
    }

    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
       
        this.state={
            books:props.books,
            shelves:[{
                name: 'currentlyReading',
                title: 'Currently Reading'
            },{
                name: 'wantToRead',
                title: 'Want To Read'
            },{
                name: 'read',
                title: 'Read'
            }]
        };
    }

    componentDidMount(){
        this.setState({
            books:this.props.books
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        return (nextProps.books!==this.state.books);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            books:nextProps.books
        })
    }
    handleChange(book,e){
        const newBooks=this.state.books.filter((bk,item,array)=>{
            if(bk.title===book.title) bk.shelf=e.target.value;
            return array;
        }); 
        this.setState({
            books:newBooks
        });
    }
    render(){
        const {books,shelves}=this.state;
        console.log(books);

        const categories={
            currentlyReading:books.filter((book) => book.shelf === 'currentlyReading'),
            wantToRead:books.filter((book) => book.shelf === 'wantToRead'),
            read:books.filter((book) => book.shelf === 'read')
        }; 

        return (
            <div>
                {books.length!==0 && (
                    <div>
                        {shelves.map((shelf)=>(
                        <div key={shelf.name} className="bookshelf">
                            <Title title={shelf.title}/>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {categories[shelf.name].map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select defaultValue={book.shelf} onChange={(e)=>this.handleChange(book,e)}>
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
                                    ))}
                                </ol>
                            </div>
                        </div>
                        ))}
                    </div>
                )}
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;