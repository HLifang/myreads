import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Title from './Title';
import Book from './Book';


class ListBooks extends Component{
    static propTypes={
        books:PropTypes.array.isRequired
    }

    constructor(props){
        super(props);

        this.state={
            books:props.books,
            shelves:['currentlyReading','wantToRead','read']
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
    updateBook=(book,e)=>{
        const newBooks=[...this.state.books];
        newBooks.forEach((bk)=>{
            if(bk.title===book.title){
                bk.shelf=e.target.value;
            }
        });
        this.setState({
            books:newBooks
        });
        BooksAPI.update(book.id,e.target.value);
    }

    splitTitle=(str)=>{
        return str.replace(/([A-Z][a-z])/g, ' $1').replace(/\b\w/g,(s)=>s.toUpperCase());
    }

    render(){
        const {books,shelves}=this.state;

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
                        <div key={shelf} className="bookshelf">
                            <Title title={this.splitTitle(shelf)}/>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {categories[shelf].map((book) => (
                                        <Book key={book.id} book={book} onChangeBook={this.updateBook}/>
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