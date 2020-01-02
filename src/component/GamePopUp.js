import React from 'react';
import {Row, Card, Button, Col} from 'react-bootstrap'; 

const GamePopUp = (props) =>{
    console.log(props)

    return(
        <div className='popup'>
                <Row className="justify-content-md-center">
                <Card className='popup_inner' bg="primary" text="white">
                    <Col style={{paddingLeft:'80%'}} md={{offset:'80%'}}><Button  variant='danger' onClick={props.close}>x</Button></Col>
                    <Card.Body><br></br>{props.user}'s {props.version} Game
                    <br></br>
                    Created on: {props.game['created_at'].split('T')[0]} <br/>
                    Last updated: {props.game['updated_at'].split('T')[0]} <br/> 
                    <Button variant='success' onClick={() => props.nuzlocke(props.game, props.game['type_of_game'])}>{props.game['type_of_game']=='nuzlocke' ? 'Disable' : 'Enable'}NuzLocke</Button>
                    {'           '}
                    <Button variant='danger' onClick={() => props.delete(props.game)}>Delete</Button>
                    {console.log(props.boxID, "hello", props.game.id)}
                    {props.boxID === props.game.id 
                        ?<Button block variant='secondary' disabled>This Is Your Active Box!</Button> 
                        :<Button block variant='info' onClick={()=>props.navigateMyBox(props.game.id, props.versionNum)}>Make My Active Box</Button>
                    }
                    </Card.Body>
                </Card>
                </Row>
            </div>
    )

}

export default GamePopUp;