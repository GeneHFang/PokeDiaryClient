import {gql} from '@apollo/client';

export const getPokemonsQuery = gql`
    {
        pokemons{
            name
        }
    }    
`;

export const getTrainerLoginQuery = gql`
    query ($name: String!){
        trainer_by_name(name: $name){
            name
            id
        }
    }

`;

