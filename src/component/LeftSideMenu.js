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
                    {this.props.loggedIn 
                    ? 
                    <div className='LoggedInButtons'>
                    {this.props.myBox 
                        ? <Link to='/mybox'><Button variant='outline-primary' block>My Box</Button></Link>
                        : <Button variant='outline-secondary' block disabled>My Box</Button>
                    }
                    <Link to='/mygames'><Button variant='outline-primary' block>Games</Button></Link>
                    <Link to='/login'><Button variant='outline-danger' block onClick={this.props.logOut}>Log Out</Button></Link>
                    </div>
                    :
                    <div className='LoggedOutButtons'>
                    <Link to='/login'><Button variant='outline-primary' block>Log In</Button></Link>
                    <Link to='/signup'><Button variant='outline-primary' block>Sign Up</Button></Link>
                    </div>
                    }
                    </Card>
    
            </div>
        )
    }

}