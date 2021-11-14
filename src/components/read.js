import React, { Component } from 'react';
import Movies from './movies';
import axios from 'axios';

class Read extends Component
{

    componentDidMount(){
        axios.get('http://localhost:4000/api/movies')
        .then((response)=>{
            this.setState({movie: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    state = {
        movie: []            
    };

    render(){
        return(
            <div>
                <h1>This is my Read component!</h1>
                <Movies films={this.state.movie}></Movies>
            </div>
        );
    }
}
export default Read;