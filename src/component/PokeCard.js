import React from 'react';
import {Card} from 'react-bootstrap';


const PokeCard = (props) => {

    return(
        <Card bg="dark" text="white" draggable
            onDragStart={props.dragData} 
            className="draggable" 
            id={props.apiID ? props.apiID : 'availablePokemonCard'} 
            onClick={props.clickHandle}
            >
            <Card.Title block>{props.name.toUpperCase()}</Card.Title>
            <Card.Img draggable={false} src={props.imgURL}/>
        </Card>
    )

}


export default PokeCard;