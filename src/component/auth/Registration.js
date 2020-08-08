import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
// import axios from 'axios';
import {Redirect} from 'react-router-dom';

//Apollo/GraphQL
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {addTrainerQuery} from '../../graphql_queries/postQueries';

//Apollo setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  })

class Registration extends React.Component{

  
    state = {
        user: "",
        pw: "",
        pwConfirm: "",
        errors: []
    }
    url = 'http://localhost:3000/api/v1/trainers'

    postOptions = (name, password, confirmation) =>{ return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({"trainer":{
            name: name,
            password: password,
            password_confirmation: confirmation
        }})
        }
    }

    handleSubmit =  (e) => {
        console.log('here')
        let name = e.target.elements.user.value;

        this.props.addTrainerQuery({
            variables: {
                name: name
            }
        }).then(res=>{
            //console.log(res.data.addTrainer.id
            let arg = {
                data: {
                    id: res.data.addTrainer.id,
                    attributes: {
                        name:res.data.addTrainer.name
                    }
                }
            };

            this.props.loginFunc(arg);
        });



        // let pw = e.target.elements.pw.value;
        // let pwC= e.target.elements.pwConfirm.value;
        // let options = this.postOptions(name,pw,pwC);
        

        // fetch(this.url,options)
        // .then(resp=> {
        //     if (resp.ok) { console.log(resp.ok); return resp.json();}
        //     else { throw new Error("Error! Either username already exists or your password confirmation does not match!");}
        //     })
        // .then(json => {
        //     console.log(json);
        //     this.props.loginFunc(json);
        // }).catch( error => {
        //     alert(error);
        // })
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
            return (<Redirect to='/'/>)
        }
        else {
        return( 
            <ApolloProvider client={client}>
                <div>
                <Card>
                <h1>Sign up</h1><br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className='formComponent' controlID="formUser">
                        <Form.Label>Trainer Name</Form.Label>
                        <Form.Text className="text-muted">You will use your Trainer name to login</Form.Text>
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
                    <Form.Group className='formComponent' controlID="formPWConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            name="pwConfirm" 
                            type="password" 
                            placeholder="Confirm password" 
                            value={this.state.pwConfirm}
                            onChange={this.changeHandle}
                            required   
                        />
                    </Form.Group>

                    <Button style={{marginBottom:'1%'}} variant="success" type='submit'>Sign Up</Button>
                    

                </Form>
                </Card>

            </div>
        </ApolloProvider>
        )
        }
    }
    


}

export default compose(
    graphql(addTrainerQuery, {name:"addTrainerQuery"})
)(Registration);