import React, {useState} from 'react';
import { Form, Button, Card } from 'react-bootstrap';
// import axios from 'axios';
import {Redirect} from 'react-router-dom';


//Apollo/GraphQL
// import ApolloClient from 'apollo-boost';
// import {ApolloProvider} from 'react-apollo';
import {ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery} from '@apollo/client';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getTrainerLoginQuery} from '../../graphql_queries/getQueries';

//Apollo setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })

const Login = (props) => {

    const [user, setUser] = useState("");
    const [pw, setPW] = useState("");
    const [errors, setErrors] = useState([]);
    
    // url = 'http://localhost:3000/sessions'

    // postOptions = (name, password) =>{ return {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         'Access-Control-Allow-Origin':'http://localhost:3000'
    //     },
    //     body: JSON.stringify({"trainer":{
    //         name: name,
    //         password: password
    //     }})}
    // }
    const [getTrainer, {loading, data}] = useLazyQuery(getTrainerLoginQuery, {
        onCompleted: data => {
            console.log(data)
            let jsonData = {
                data: {
                    id: data.trainer_by_name[0].id,
                    attributes: {
                        name: data.trainer_by_name[0].name
                    }
                }
            };
            props.loginFunc(jsonData);
        }
    });
    

    const handleSubmit = async (e) => {
        getTrainer({variables: {name: user}});
        //console.log(props)
        // debugger
        //let name = user;

       

        // let pw = e.target.elements.pw.value;
        // let options = this.postOptions(name,pw);
        

        // fetch(this.url,options)
        // .then(resp=>  resp.json())
        // .then(json => {
            
        //     let jsonData = {
        //         data: {
        //             id: json.trainer.id,
        //             attributes: {
        //                 name: json.trainer.name
        //             }
        //         }
        //     }
        //     console.log(jsonData);
        //     this.props.loginFunc(jsonData);
        // }).catch( () => {
        //     alert("Invalid trainer name or password");
        // })
        // // debugger

        e.preventDefault();
    }

    const changeHandle = (e) => {
        // console.log(e.target.value)
        setUser(e.target.value);
    }
    
    if (props.loggedIn) {
        return (<ApolloProvider client={client}><Redirect to='/mygames'/></ApolloProvider>)
    }
    else {
    return( 
        <ApolloProvider client={client}>
            <Card>
            <h1>Log In</h1><br/>
            <Form onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                <Form.Group className='formComponent' controlID="formUser">
                    <Form.Label>Trainer Name</Form.Label>
                    {/* <Form.Text className="text-muted">You will use your Trainer name to login</Form.Text> */}
                    <Form.Control 
                        name="user" 
                        type="user" 
                        placeholder="Enter a Trainer Name"
                        value={user}
                        onChange={changeHandle}
                        required    
                    />
                </Form.Group>
                
                {/* <Form.Group className='formComponent' controlID="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="pw" 
                        type="password" 
                        placeholder="Enter password"
                        value={this.state.pw}
                        onChange={this.changeHandle} 
                        required   
                    />
                </Form.Group> */}
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
        </ApolloProvider>
        )
    }


}

export default graphql(getTrainerLoginQuery, {name: 'trainer_by_name', options: ()=> ({variables:{ name: ""}})} )(Login);