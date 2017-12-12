import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Title extends Component{
    constructor(props){
        super(props);
        this.state={
            title:props.title
        }
    }
    render(){
        return (
            <h2 className="bookshelf-title">{this.state.title}</h2>
        )
    }
}

Title.propTypes={
    title:PropTypes.string.isRequired
}

export default Title