import React, {Fragment} from 'react';
import { Redirect } from 'react-router';
import { Form, Row, Card, Button } from 'react-bootstrap';

import GamePopUp from './GamePopUp';

export default class Games extends React.Component{

    state = {
        games: [],
        color: {},
        showGameCard: false,
        showGame: {},
        createGame: false

    }

    getVersion = {
        1: 'Blue/Red/Yellow',
        2: 'Silver/Gold/Crystal',
        3: 'Sapphire/Ruby/Emerald',
        4: 'Pearl/Platinum',
        5: 'Black/White',
        6: 'X/Y',
        7: 'Sun/Moon'
    }


    componentDidMount = () => {
        if (this.props.loggedIn)
        {
            let url = `http://localhost:3000/api/v1/trainers/${this.props.userID}`

            fetch(url)
            .then(resp=>resp.json())
            .then(json=> {
                this.setState({
                    games: json.data.attributes.games
                })
            })
        }
    }

    showGameOptions = (game) => {
        this.setState({
            showGame: game,
            showGameCard: true
        })
    }

    hoverChange = (e) => {
        // debugger
        if (e.target.className === 'card bg-primary text-white'){
            e.target.className = 'card bg-secondary text-white';
        }
    }

    leaveChange = (e) => {
        if (e.target.className === 'card bg-secondary text-white'){
            e.target.className = 'card bg-primary text-white';
        }
    }

    closeHandle = () =>{
        this.setState({
            showGame: null,
            showGameCard: false
        })
    }

    //create game
    submitHandle = (e) => {
        e.preventDefault();
        let version = e.target.elements.version.value;
        let nuzlocke = e.target.elements.nuzlockCheck.checked;
        
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'type_of_game': (nuzlocke  ? 'nuzlocke' : null ),
                version: version,
                'trainer_id': this.props.userID
            })
        };
        let url = 'http://localhost:3000/api/v1/games';

        fetch(url, options)
        .then(resp=>resp.json())
        .then(json=>{
            console.log(json);
            let games = [...this.state.games];
            let obj = { 
                version: json.data.attributes.version,
                'type_of_game': json.data.attributes['type_of_game'],
                id: json.data.id,
                'created_at': json.data.attributes['created_at'],
                'updated_at': json.data.attributes['updated_at']
            }
            games.push(obj);
            this.setState({
                createGame: false,
                games: games
            })
        })


    }

   

    handleNuzlocke = (game, type) => {
        let options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                '_method': 'PATCH'
            },
            body: JSON.stringify({
                'type_of_game': (type == 'nuzlocke' ? null : 'nuzlocke' )
            })
        };
        let url = `http://localhost:3000/api/v1/games/${game.id}`;
        fetch(url,options)
        .then(resp=>resp.json())
        .then(json=>{
            console.log(json);
            let newArr = [...this.state.games];
            let index = newArr.indexOf(game);
            newArr[index] = {...this.state.games[index]};
            newArr[index]['type_of_game'] = json.data.attributes['type_of_game'];

            this.setState({
                games: newArr,
                showGame: null,
                showGameCard: false
            })

        });
    }

    handleDelete = (game) => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                '_method': 'DELETE'
            }
        };
        let url = `http://localhost:3000/api/v1/games/${game.id}`;
        fetch(url,options)
        .then(resp=>resp.json())
        .then(json=>{
            console.log(json);
            let newArr = [...this.state.games];
            let index = newArr.indexOf(game);
            newArr.splice(index, 1);
            this.setState({
                games: newArr,
                showGame: null,
                showGameCard: false
            })
        })
    }

    games = () => {
        return this.state.games.map( game => {
         return (
            <Card bg='primary' text='white' onMouseOver={this.hoverChange} onMouseLeave={this.leaveChange} onClick={() => this.showGameOptions(game)}>
                <Card.Title>Game {game.id}</Card.Title>
                <Card.Text>Ver: {this.getVersion[parseInt(game.version)]}</Card.Text>
            </Card>
         );   
        })
    }

    render = () => { 
        return (
            this.props.loggedIn 
            ? 
                this.state.createGame 
                ? 
                    <Form onSubmit={this.submitHandle}>
                        <h1>Create A New Game</h1>
                        <Form.Group className='formComponent' controlID="selectVersion">
                            <Form.Label>Choose a Generation</Form.Label>
                            <Form.Control  as='select'
                                name="version" 
                                type="version"  
                            >
                                <option value='1'>Gen I</option>
                                <option value='2'>Gen II</option>
                                <option value='3'>Gen III</option>
                                <option value='4'>Gen IV</option>
                                <option value='5'>Gen V</option>
                                <option value='6'>Gen VI</option>
                                <option value='7'>Gen VII</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Check name='nuzlockCheck' type='checkbox' label='Enable Nuzlocke?' />
                        <Button type='submit'>Create</Button>
                    </Form>
                :
                <Fragment >
                {this.props.user}'s Games<br/>
                <Row >
                    {this.games()}
                </Row>
                <Button onClick={()=>{this.setState({createGame:true})}} variant='success'>Create New Game</Button>
                {this.state.showGameCard 
                    ? <GamePopUp 
                        game={this.state.showGame} 
                        user={this.props.user} 
                        nuzlocke={this.handleNuzlocke} 
                        delete={this.handleDelete}
                        versionNum={this.state.showGame.version}
                        version={this.getVersion[parseInt(this.state.showGame.version)]} 
                        close={this.closeHandle}
                        navigateMyBox={this.props.navigateMyBox}
                        boxID={this.props.boxID}
                        />
                    : null
                }
                </Fragment>
            :
            <Redirect to='/login' /> 

        )
    }

}