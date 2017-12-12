import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            title:props.title
        }
    }
    render(){
        return (
            <div className="list-books-title">
                <h1>{this.state.title}</h1>
            </div>
        )
    }
}

Header.propTypes={
    title:PropTypes.string.isRequired
}

export default Header
