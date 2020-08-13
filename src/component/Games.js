import React, {Fragment, useState, useEffect} from 'react';
import { Redirect } from 'react-router';
import { Form, Row, Card, Button } from 'react-bootstrap';

import GamePopUp from './GamePopUp';


//Apollo/GraphQL
// import ApolloClient from 'apollo-boost';
// import {ApolloProvider} from 'react-apollo';
import {ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery} from '@apollo/client';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getGamesQuery } from '../graphql_queries/getQueries';


const Games = (props) => {
    
    const [gameList, setGameList] = useState([]);
    const [color, setColor] = useState({});
    const [showGameCard, toggleGameCard] = useState(false);
    const [showGame, setShowGame] = useState({});
    const [createGame, toggleCreateGame] = useState(false);

    // state = {
    //     games: [],
    //     color: {},
    //     showGameCard: false,
    //     showGame: {},
    //     createGame: false

    // }

    let getVersion = {
        1: 'Blue/Red/Yellow',
        2: 'Silver/Gold/Crystal',
        3: 'Sapphire/Ruby/Emerald',
        4: 'Pearl/Platinum',
        5: 'Black/White',
        6: 'X/Y',
        7: 'Sun/Moon'
    }

    const [getGames, {loading, data}] = useLazyQuery(getGamesQuery, {
        onCompleted: data => {
            console.log("here",data);
            setGameList([...gameList, ...data.game_by_trainer_id])
        }
    })

    useEffect(()=>{
        if (props.loggedIn)
        {
            // console.log(props.getGamesQuery)
            getGames({
                variables: {
                    trainerId: props.userID
                }
            })
            // let url = `http://localhost:3000/api/v1/trainers/${props.userID}`

            // fetch(url)
            // .then(resp=>resp.json())
            // .then(json=> {
            //     setState({
            //         games: json.data.attributes.games
            //     })
            // })
        }
    }, []);

    // componentDidMount = () => {
        
    // }

    const showGameOptions = (game) => {
        setShowGame(game);
        toggleGameCard(true);
        // setState({
        //     showGame: game,
        //     showGameCard: true
        // })
    }

    const hoverChange = (e) => {
        // debugger
        if (e.target.className === 'card bg-primary text-white'){
            e.target.className = 'card bg-secondary text-white';
        }
    }

    const leaveChange = (e) => {
        if (e.target.className === 'card bg-secondary text-white'){
            e.target.className = 'card bg-primary text-white';
        }
    }

    const closeHandle = () =>{
        setShowGame(null);
        toggleGameCard(false);
        // setState({
        //     showGame: null,
        //     showGameCard: false
        // })
    }

    //create game
    const submitHandle = (e) => {
        e.preventDefault();
        let version = e.target.elements.version.value;
        let nuzlocke = e.target.elements.nuzlockCheck.checked;
        
        // let options = {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json'
        //     },
        //     body: JSON.stringify({
        //         'type_of_game': (nuzlocke  ? 'nuzlocke' : null ),
        //         version: version,
        //         'trainer_id': props.userID
        //     })
        // };
        // let url = 'http://localhost:3000/api/v1/games';

        // fetch(url, options)
        // .then(resp=>resp.json())
        // .then(json=>{
        //     console.log(json);
        //     let games = [...state.games];
        //     let obj = { 
        //         version: json.data.attributes.version,
        //         'type_of_game': json.data.attributes['type_of_game'],
        //         id: json.data.id,
        //         'created_at': json.data.attributes['created_at'],
        //         'updated_at': json.data.attributes['updated_at']
        //     }
        //     games.push(obj);
        //     setState({
        //         createGame: false,
        //         games: games
        //     })
        // })


    }

   

    const handleNuzlocke = (game, type) => {
        // let options = {
        //     method: "PATCH",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //         '_method': 'PATCH'
        //     },
        //     body: JSON.stringify({
        //         'type_of_game': (type == 'nuzlocke' ? null : 'nuzlocke' )
        //     })
        // };
        // let url = `http://localhost:3000/api/v1/games/${game.id}`;
        // fetch(url,options)
        // .then(resp=>resp.json())
        // .then(json=>{
        //     console.log(json);
        //     let newArr = [...state.games];
        //     let index = newArr.indexOf(game);
        //     newArr[index] = {...state.games[index]};
        //     newArr[index]['type_of_game'] = json.data.attributes['type_of_game'];

        //     setState({
        //         games: newArr,
        //         showGame: null,
        //         showGameCard: false
        //     })

        // });
    }

    const handleDelete = (game) => {
        // let options = {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //         '_method': 'DELETE'
        //     }
        // };
        // let url = `http://localhost:3000/api/v1/games/${game.id}`;
        // fetch(url,options)
        // .then(resp=>resp.json())
        // .then(json=>{
        //     console.log(json);
        //     let newArr = [...state.games];
        //     let index = newArr.indexOf(game);
        //     newArr.splice(index, 1);
        //     setState({
        //         games: newArr,
        //         showGame: null,
        //         showGameCard: false
        //     })
        // })
    }

    const games = () => {
        return gameList.map( game => {
         return (
            <Card bg='primary' text='white' onMouseOver={hoverChange} onMouseLeave={leaveChange} onClick={() => showGameOptions(game)}>
                <Card.Title>Game {game.id}</Card.Title>
                <Card.Text>Ver: {getVersion[parseInt(game.version)]}</Card.Text>
            </Card>
         );   
        })
    }

        return (
            props.loggedIn 
            ? 
                createGame 
                ? 
                    <Form onSubmit={submitHandle}>
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
                {props.user}'s Games<br/>
                <Row >
                    {games()}
                </Row>
                <Button onClick={()=>{toggleCreateGame(true)}} variant='success'>Create New Game</Button>
                {showGameCard 
                    ? <GamePopUp 
                        game={showGame} 
                        user={props.user} 
                        nuzlocke={handleNuzlocke} 
                        delete={handleDelete}
                        versionNum={showGame.version}
                        version={getVersion[parseInt(showGame.version)]} 
                        close={closeHandle}
                        navigateMyBox={props.navigateMyBox}
                        boxID={props.boxID}
                        />
                    : null
                }
                </Fragment>
            :
            <Redirect to='/login' /> 

        )
    

}

export default compose(
    graphql(getGamesQuery, {name: "getGamesQuery", options: ()=> ({variables: {id: ""}})}),
    // graphql(addGameQuery, {name: "addGameQuery"}),
    // graphql(updateGameQuery, {name: "updateGameQuery"}),
    // graphql(deleteGameQuery, {name: "deleteGameQuery"}),
)(Games);