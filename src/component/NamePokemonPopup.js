import React from 'react';
import {Button, Card, Row, Form} from 'react-bootstrap';


export default class NamePokemonPopup extends React.Component{

    state = {
        nickNameForm: false,
        nickname: ""
    }

    clickYes =  () => {
        this.setState({
            nickNameForm: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.nicknameAssign(e.target.elements.nickname.value)
        this.props.close();

    }

    handleClose = () => {
        this.props.nicknameAssign(this.props.pokemonName)
        this.props.close();
    }

    changeHandle = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render = () =>{
        return (
        (this.state.nickNameForm) ? 
            
            <div className='popup'>
                <Row className="justify-content-md-center">
                <Card className='popup_inner' style={{backgroundColor:'grey'}}>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className='formComponent' controlID="formNickName">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control 
                                name="nickname" 
                                type="nickname" 
                                placeholder="Nickname"
                                value={this.state.nickname}
                                onChange={this.changeHandle}
                                required    
                            />
                    </Form.Group>
                        <Button type='submit' variant='success'>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Row>
            </div>
            :
            <div className='popup'>
                <Row className="justify-content-md-center">
                <Card className='popup_inner' style={{backgroundColor:'grey'}}>
                    <Card.Body><br></br>Nice Catch! Give a Nickname to your new {this.props.pokemonName}?
                    <br></br>
                    <Button variant='success' onClick={this.clickYes}>Yes</Button>
                    {'           '}
                    <Button variant='danger' onClick={this.handleClose}>No</Button>
                    
                    <form>

                    </form>
                    </Card.Body>
                </Card>
                </Row>
            </div>
            
        
    )
    }
}
