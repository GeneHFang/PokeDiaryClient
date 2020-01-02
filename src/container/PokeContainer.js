import React, { Fragment } from 'react';
import PokeCard from '../component/PokeCard';
import { Row, Card, Form, Button } from 'react-bootstrap';


//To do, pass in region number and somehow get the location areas of all
// post selected pokemon into API
export default class PokeContainer extends React.Component{
    state = {
        locations: [],

    }

    //Should change to URL that uses location ID
    PokeURL = `https://pokeapi.co/api/v2/region/${this.props.regionID}`

    //Returns json opbject, relevantpoke info is in key 'pokemon_encounters'
    rt1Test = 'https://pokeapi.co/api/v2/location-area/295'

    state ={
        pokemon: [],
        pokemonImg: {},
        currentLocationID: 295, //Route 1
        locationName: 'KANTO-ROUTE-1',
        locationAreas: []
    }
    componentDidMount = () =>{
        this.clickButton();
        this.getLocationsDashArea();
    }

    getLocationsDashArea = () => {
        console.log(this.PokeURL)
        console.log(this.props.regionID)
        fetch(this.PokeURL)
        .then(resp=>resp.json())
        .then(json=>{
            this.setState({
                locations: json.locations
            })
        })
    }

    getLocation = ( e={target: {value: this.state.locations[0].url.split('location/')[1].split('/')[0]}}) => {
        let url = `https://pokeapi.co/api/v2/location/${e.target.value}`;

        fetch(url)
        .then(resp=>resp.json())
        .then(json=>{
            this.setState({
                locationAreas: json.areas
            })
        })
    }

    renderAreaOptions = () => {
       return this.state.locations.map(location => {
           let bool = location.name.toUpperCase() === 'KANTO-ROUTE-1';
        if (bool){
           return (
            <option selected value={location.url.split('location/')[1].split('/')[0]} label={location.name.toUpperCase()}/>
           )
       }
        else{ return (
            <option value={location.url.split('location/')[1].split('/')[0]} label={location.name.toUpperCase()}/>
            )    
        }
        
       })
    }

    renderSubAreas = () => {
        // debugger
        return this.state.locationAreas.map(subArea => {
            return (
                <option value={subArea.url.split('location-area/')[1].split('/')[0]} label={subArea.name.toUpperCase()}/>
            )
        })
    }

    min = {
        1: 0,
        2: 151,
        3: 251,
        4: 386,
        5: 493,
        6: 493,
        7: 493
    }
    max = {
        1: 152,
        2: 252,
        3: 387,
        4: 494,
        5: 650,
        6: 850,
        7: 850
    }

    getVersionRange(maxOrMin){
        if (maxOrMin === 'max')
        {
            return this.max[this.props.regionID]
        }
        else
        {
            return this.min[this.props.regionID]
        }
    }

    
    clickButton = () => {
        fetch(this.rt1Test)
        .then(resp=>resp.json())
        .then(jsonData=>{
            let temp = [];
            jsonData['pokemon_encounters'].forEach(element => {
                let x = parseInt(element.pokemon.url.split('pokemon/')[1]); 
                if (x < this.getVersionRange('max') && x > this.getVersionRange('min')){
                    temp.push(element);
                    this.fetchIMG(element.pokemon.url);
                }
            });
            this.setState({
                pokemon: temp,
                locationName: jsonData.location.name
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
        // debugger;
        this.rt1Test = `https://pokeapi.co/api/v2/location-area/${this.state.currentLocationID}`
        this.PokeURL = `https://pokeapi.co/api/v2/region/${this.props.regionID}`
        //this.clickButton();
    }

    clickHandlerForPokeCard = () =>{
        console.log('clicked');
    }
    
    // changeImgID = () => {
    //     this.setState((prevState) => {
    //         return {currentLocationID:parseInt(prevState.currentLocationID)+1}
    //     },this.clickButton);
    // }

    submitHandle = (e) => {
        e.preventDefault();
        // debugger;
        this.setState({
            currentLocationID: e.target.elements.subArea.value
        }, this.clickButton)
    }

    render= () => {
        return(
            <div onDrop={this.props.drop} onDragOver={this.props.dragPrevent}>
            <Form onSubmit={this.submitHandle}>
            <Form.Group controlId="exampleForm.ControlSelect1" >
                <Form.Label>Select Area</Form.Label>
                <Form.Control name='area' as="select" onChange={(e)=>this.getLocation(e)}>
                    {this.state.locations ? this.renderAreaOptions() : null}
                </Form.Control>
                {this.state.locationAreas[0] ? 
                    <Fragment>
                    <Form.Label>Select Sub-Area</Form.Label>
                    <Form.Control name='subArea' as='select'>
                        {this.renderSubAreas()}
                    </Form.Control>
                    <Button type='submit' variant='success'>Move to Area</Button>
                    </Fragment>
                    :
                    null
                }
            </Form.Group>
            </Form>
            
            <Card text='white' style={{backgroundColor:'grey'}}>
            
            <Card.Title block>Pokemon Available In {this.state.locationName.toUpperCase()} </Card.Title>
            
            <Row>
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
            </Card>
            </div>
        )
    }

}