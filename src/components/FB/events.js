import React, { Component } from 'react';
import debounce from '../../util/debounce';
import { IoIosMusicalNote } from 'react-icons/io';

import './events.css';
class FacebookEvents extends Component {
    constructor() {
        super();
        this.state = {
            width: 0,
            ready: false
        }
        this.eventContainer = React.createRef();
        this.resize = debounce(this.resize, 250, false).bind(this);
    }

    loadFB() {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId:'',
                xfbml: false,
                version: 'v3.1'
            })
            this.setState({
                width: this.eventContainer.current.offsetWidth,
                ready: true
            });
        }

        (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if(d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.1";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    setWidth(callback) {
        const { offsetWidth } = this.eventContainer.current;

        if(offsetWidth) this.setState({ 
            ready: false,
            width: offsetWidth
        }, callback );
    }

    resize() {
        const { ready } = this.state;
        if(ready) this.setWidth(() => {
            this.setState({ ready: true }, window.FB.XFBML.parse )
        });
        
    }

    componentDidMount() {
        this.loadFB();
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        let fbScript = document.getElementById('facebook-jssdk');
        if(fbScript) fbScript.parentNode.removeChild(fbScript);
        let fbRoot = document.getElementById('fb-root');
        if(fbRoot) fbRoot.parentNode.removeChild(fbRoot);
        delete window.FB;

        window.removeEventListener('resize', this.resize);
    }

    render() {

        const { ready } = this.state;

        return ( 
            <div ref={this.eventContainer} className="facebook-event">
                <div className="section-title">
                    <h2><IoIosMusicalNote /> Events</h2>
                </div>
                <p>We have live music frequently at the Louis Marchesi. It's all on Facebook.</p>
                <div className="facebook-event-inner">
                { (ready) ?
                    <div 
                        className="fb-page"
                        data-width={this.state.width} 
                        data-height="500"
                        data-href="https://www.facebook.com/17tombland/" 
                        data-tabs="events" 
                        data-small-header="true" 
                        data-adapt-container-width="true" 
                        data-hide-cover="true" 
                        data-show-facepile="false">
                        <blockquote cite="https://www.facebook.com/17tombland/" className="fb-xfbml-parse-ignore">
                            <a href="https://www.facebook.com/17tombland/">Louis Marchesi</a>
                        </blockquote>
                    </div> 
                : null }
                </div>
            </div>
        );
    }
}

export default FacebookEvents;