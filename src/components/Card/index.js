import React, { Component } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './index.css';

class Card extends Component {
    constructor() {
        super();

        this.state = {
            hovered: false
        }

        this.cardOn = this.cardOn.bind(this);
        this.cardOff = this.cardOff.bind(this);

    }

    cardOn() {
        this.setState({
            hovered: true
        });
    }

    cardOff() {
        this.setState({
            hovered: false
        });
    }

    render() {
        const { imageFull, title, slug, excerpt } = this.props;
        const { hovered } = this.state;

        return (
            <div className={`card ${(hovered) ? 'card--hover' : ''}`}>
                <Link 
                    onMouseOver={this.cardOn} 
                    onMouseOut={this.cardOff} 
                    to={slug}>
                    <Img className="card-image" sizes={ imageFull } alt={ title } />
                </Link>
                <div className="card-content">
                <Link 
                    onMouseOver={this.cardOn} 
                    onMouseOut={this.cardOff} 
                    className="card-title" 
                    to={slug}>
                    <h3>{title}</h3>
                </Link>
                <p className="card-excerpt">{ excerpt }</p>
                <Link 
                    onMouseOver={this.cardOn} 
                    onMouseOut={this.cardOff} 
                    className="card-btn" 
                    to={slug}>Find Out More</Link>
                </div>
            </div>
        )
    }
}

export default Card;