import React from 'react';
import {Button, Card, Row} from 'react-bootstrap';


const NamePokemonPopup = (props) =>{

    return (
        <div className='popup'>
            <Row className="justify-content-md-center">
            <Card className='popup_inner' style={{backgroundColor:'maroon'}}>
                <Card.Body><br></br>Nice Catch! Give a Nickname to your new {props.pokemonName}?
                <br></br>
                <Button variant='success'>Yes</Button>
                {'           '}
                <Button variant='danger'>No</Button>
                
                <form>

                </form>
                </Card.Body>
            </Card>
            </Row>
        </div>
    )

}

export default NamePokemonPopup;