import React from 'react';


const FormContainer = (props) => {
    const pokeUrl = "http://localhost:3000/api/v1/pokemons"

    let submitHandle = (e) => {
        e.preventDefault();
        debugger
        
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: e.target.name.value,
                species: e.target.species.value,
                game_id: 1
            })
        }
        
        
        fetch(pokeUrl, options)
            .then(resp => {
                return resp.json()
            })
            .then(data => { 
                console.log(data)
                })
            .catch(error => alert(error))
    
    }
    
    
    return (
        <div>
            Test Post to BackEnd
            <form onSubmit={submitHandle}>
                Name<input type="text" name="name"/><br></br>
                Species<input type="text" name="species"/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )



}

export default FormContainer;