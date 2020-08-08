import {gql} from 'apollo-boost';

export const addPokemonQuery = gql`
    mutation{
        addPokemon(name:"", img:"", species:"", gameId:""){
            name
            id
        }
    }
`;


export const addTrainerQuery = gql`
    mutation($name: String!){
        addTrainer(name: $name){
            name
            id
        }
    }
`;


export const addGameQuery = gql`
mutation($type_of_game: String!, $version: String!, $trainerID: String!){
    addGame(type_of_game: $type_of_game, version: $version, trainerID:$trainerID ){
        id
    }
}
`;