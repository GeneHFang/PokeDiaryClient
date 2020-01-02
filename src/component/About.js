import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const About = (props) => {
    let e = '\xE9';
    return (
        <div  className='about-section'>
        <br/><br/><br/><br/>
            <Card>
                Welcome {props.name ? props.name : 'trainer'}, to the Pok{e}Log! <br/>
                The Pok{e}Log lets you track your Pok{e}dex progress while you play Pok{e}mon! <br/>
                Easily accessible on any browser/mobile device, you can think about Pok{e}mon even while at work or school!   
            </Card>
            <br/>
            <Link to={props.loggedIn ? '/mybox' : '/signup'}><Button on variant='success'>Let's go!</Button></Link>
        </div>
    )
}

export default About;