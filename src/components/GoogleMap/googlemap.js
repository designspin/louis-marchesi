import React, {Component} from 'react';
import debounce from '../../util/debounce';
import { GoLocation } from 'react-icons/go';
import './googlemap.css';

class GoogleMap extends Component {
    constructor() {
        super();

        this.resize = debounce(this.resize, 250, false).bind(this);
    }
    resize() {

    }

    render() {
        return (
        <div className="google-map">
            <div className="section-title">
                <h2><GoLocation /> We're here</h2>
            </div>
            <form action="http://maps.google.com/maps" method="get" target="_blank">
            <input type="text" name="saddr" placeholder="Where are you coming from?"/>
            <input type="hidden" name="daddr" value="Louis Marchesi, Norwich" />
            <input type="submit" value="directions" />
            </form>
            <div className="google-map-inner">
            <iframe title="where to find us" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.560677019816!2d1.2963652516273942!3d52.6317827355922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e3dd54f3fb31%3A0x8536c4f105e3ec6d!2sLouis+Marchesi!5e0!3m2!1sen!2suk!4v1536843676558" width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </div>
        </div>
        );
    }
}

export default GoogleMap;