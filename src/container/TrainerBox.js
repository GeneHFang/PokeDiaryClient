import React from 'react';
import PokeCard from '../component/PokeCard';
import { Row, Card } from 'react-bootstrap';
//needs to fetch from api current trainer's pokemon for this game
export default class TrainerBox extends React.Component{


    gameID = this.props.boxID;
    url = `http://localhost:3000/api/v1/games/${this.gameID}`
    componentDidMount = () => {
        fetch(this.url)
        .then(resp=>resp.json())
        .then(json => {
            console.log('after game fetch',json)
            json.data.attributes.pokemons.forEach(pkmn => {
                this.props.populateBox(pkmn);
            })
            // debugger;
        })
    }


    renderPokemon = () =>{
        return (<Row>{this.props.pokemon.map(pkmn =>{
            {/* debugger */}
           return <PokeCard
                    key={pkmn.id+pkmn.name}
                    apiID={pkmn.id} 
                    id={pkmn.name}
                    name={pkmn.name}
                    imgURL={pkmn.img}
                    dragData={(e) => this.props.dragData(e, pkmn.id)}

                />
        })}
        </Row>)
    }

    render = () => {
        return(
            <Card style={{padding:50}} bg="info" text="white" onDragOver={this.props.dragPrevent} 
            onDrop={this.props.drop}>
                <Card.Title block>Drag The Pokemon You Catch Here</Card.Title>
                <Card.Text block>Drag The Pokemon Back To Release</Card.Text>
                    {this.renderPokemon()}
                <br/><br/><br/><br/><br/><br/><br/><br/>
            </Card>
            )
        }
}

