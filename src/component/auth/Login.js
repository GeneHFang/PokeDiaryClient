import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
// import axios from 'axios';
import {Redirect} from 'react-router-dom';


export default class Login extends React.Component{

  
    state = {
        user: "",
        pw: "",
        errors: []
    }
    url = 'http://localhost:3000/sessions'

    postOptions = (name, password) =>{ return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000'
        },
        body: JSON.stringify({"trainer":{
            name: name,
            password: password
        }})}
    }

    handleSubmit =  (e) => {
        console.log('here')
        let name = e.target.elements.user.value;
        let pw = e.target.elements.pw.value;
        let options = this.postOptions(name,pw);
        

        fetch(this.url,options)
        .then(resp=>  resp.json())
        .then(json => {
            
            let jsonData = {
                data: {
                    id: json.trainer.id,
                    attributes: {
                        name: json.trainer.name
                    }
                }
            }
            console.log(jsonData);
            this.props.loginFunc(jsonData);
        }).catch( () => {
            alert("Invalid trainer name or password");
        })
        // debugger

        e.preventDefault();
    }

    changeHandle = (e) => {
        // console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render = () => {
        if (this.props.loggedIn) {
            return (<Redirect to='/mygames'/>)
        }
        else {
        return( <div>
            <Card>
            <h1>Log In</h1><br/>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className='formComponent' controlID="formUser">
                    <Form.Label>Trainer Name</Form.Label>
                    {/* <Form.Text className="text-muted">You will use your Trainer name to login</Form.Text> */}
                    <Form.Control 
                        name="user" 
                        type="user" 
                        placeholder="Enter a Trainer Name"
                        value={this.state.user}
                        onChange={this.changeHandle}
                        required    
                    />
                </Form.Group>
                
                <Form.Group className='formComponent' controlID="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="pw" 
                        type="password" 
                        placeholder="Enter password"
                        value={this.state.pw}
                        onChange={this.changeHandle} 
                        required   
                    />
                </Form.Group>
                {/*<Form.Group className='formComponent' controlID="formPWConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        name="pwConfirm" 
                        type="password" 
                        placeholder="Confirm password" 
                        value={this.state.pwConfirm}
                        onChange={this.changeHandle}
                        required   
                    />
                </Form.Group> */}

                <Button style={{marginBottom:'1%'}} variant="success" type='submit'>Log In</Button>
                

            </Form>
            </Card>

        </div>)
        }
    }
    


}