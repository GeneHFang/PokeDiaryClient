import React from 'react';
import PokeCard from '../component/PokeCard';
import { Row } from 'react-bootstrap';

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
        <div onDragOver={props.dragPrevent} 
        onDrop={props.drop}
        style={{borderColor: 'red', borderWidth:5}}>
            Place to put pokemon <br/>
                {renderPokemon()}
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default TrainerBox;
