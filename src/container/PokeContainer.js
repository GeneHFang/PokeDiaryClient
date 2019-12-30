import React from 'react';
import PokeCard from '../component/PokeCard';
import { Row } from 'react-bootstrap';



export default class PokeContainer extends React.Component{

    //Should change to URL that uses location ID
    PokeURL = `https://pokeapi.co/api/v2/pokedex/${this.props.regionID}`

    //Returns json opbject, relevantpoke info is in key 'pokemon_encounters'
    rt1Test = 'https://pokeapi.co/api/v2/location-area/295'

    state ={
        pokemon: [],
        pokemonImg: {}
    }
    
    componentDidMount = () => {
        fetch(this.rt1Test)
        .then(resp=>resp.json())
        .then(jsonData=>{
            let temp = [];
            jsonData['pokemon_encounters'].forEach(element => {
                if (parseInt(element.pokemon.url.split('pokemon/')[1]) < 151){
                    temp.push(element);
                    this.fetchIMG(element.pokemon.url);
                }
            });
            this.setState({
                pokemon: temp
            })
        })
    }

    fetchIMG = (url) => {
        fetch(url)
        .then(resp => resp.json())
        .then(jsonData => {
            let obj = {...this.state.pokemonImg};
            if (!obj[jsonData.species.name]) {
                obj[jsonData.species.name] = jsonData.sprites['front_default']
            }
            this.setState({
                pokemonImg: obj
            })
            
        })
    }

    componentDidUpdate = () => {
        console.log(this.state.pokemon)
    }

    clickHandlerForPokeCard = () =>{
        console.log('clicked');
    }

    render= () => {
        return(
            <Row style={{backgroundColor:'red'}} >
            {this.state.pokemon.map( pokemon => {
                return <PokeCard 
                    id={pokemon.pokemon.name} 
                    clickHandle={this.clickHandlerForPokeCard}
                    name={pokemon.pokemon.name}
                    imgURL={this.state.pokemonImg[pokemon.pokemon.name]}
                    dragData={this.props.dragData}

                />
            })}
            </Row>
        )
    }

}