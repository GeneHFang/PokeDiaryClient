import {gql} from '@apollo/client';

export const getPokemonsQuery = gql`
    {
        pokemons{
            name
        }
    }    
`;

export const getGamesQuery = gql`
    query ($trainerId: ID!){
        game_by_trainer_id(id: $trainerId){
            id
            version
            type_of_game
            pokemons{
                id
            }
        }
    }
`

export const getTrainerLoginQuery = gql`
    query ($name: String!){
        trainer_by_name(name: $name){
            name
            id
        }
    }

`;

