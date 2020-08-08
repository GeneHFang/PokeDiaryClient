import {gql} from 'apollo-boost';

export const getPokemonsQuery = gql`
    {
        pokemons{
            name
        }
    }    
`;

