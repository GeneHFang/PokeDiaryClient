import React from 'react';
import PokeCard from '../component/PokeCard';
import { Row, Card } from 'react-bootstrap';

const TrainerBox = (props)=>{

    let renderPokemon = () =>{
        return (<Row>{props.pokemon.map(pkmn =>{
            {/* debugger */}
           return <PokeCard 
                    id={pkmn.name} 
                    clickHandle={(e)=>{}}
                    name={pkmn.name}
                    imgURL={pkmn.img}
                    dragData={props.dragData}

                />
        })}
        </Row>)
    }

    return(
        <Card bg="info" text="white" onDragOver={props.dragPrevent} 
        onDrop={props.drop}>
            <Card.Title block>Drag The Pokemon You Catch Here</Card.Title>
                {renderPokemon()}
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </Card>
    )
}

export default TrainerBox;
