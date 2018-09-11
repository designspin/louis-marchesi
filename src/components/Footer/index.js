import React from 'react';
import './index.css';

const Footer = ({opening, ...props}) => 
    <footer className="site-footer">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h4>Opening Hours</h4>
                    <ul className="opening-hours">
                        {Object.keys(opening).map((key) => 
                            <li key={key}>
                                <span className="opening-hours-day">{`${key}`}</span>
                                <span className="opening-hours-time">{opening[key]}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </footer>

export default Footer;