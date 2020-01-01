import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class LeftSideMenu extends React.Component {
    
    render = () => { 
        return (
            <div className='menuLeft'>
                
                    <Card>
                    <br/>
                    <Card.Title>Pok&eacute;Log</Card.Title>
                    <br/>
                    <Link to='/about'><Button variant='outline-primary' block>About</Button></Link>
                    <Link to='/login'><Button variant='outline-primary' block>Log In</Button></Link>
                    <Link to='/signup'><Button variant='outline-primary' block>Sign Up</Button></Link>
                    <Link to=''><Button variant='outline-primary' block>Settings</Button></Link>
                    </Card>
    
            </div>
        )
    }

}