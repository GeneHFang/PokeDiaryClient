import React from 'react';


export default class FormContainer extends React.Component{
    pokeUrl = "http://localhost:3000/api/v1/pokemons"




    state = {
        tempImg: "",
        tempName: ""
    }

    submitHandle = (e) => {
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
                img: 'logo192.png',
                game_id: 1
            })
        }
        
        
        fetch(this.pokeUrl, options)
            .then(resp => {
                return resp.json()
            })
            .then(data => { 
                console.log(data);
                this.setState({
                    tempName: data.data.attributes.name,
                    tempImg: data.data.attributes.img
                })
                })
            .catch(error => alert(error))
    
    }

    clickHandle = (e) => {
        fetch(this.pokeUrl)
        .then(resp => resp.json())
        .then(jsonObj => {
            console.log(jsonObj.data[0])
        })
    }
    


    
    render = () => {
        return(
        <div>

            <h1>{this.state.tempName}</h1>
            <img src={this.state.tempImg}/>
        
            <button onClick={this.clickHandle}>Retrieve First</button>

            Test Post to BackEnd

            <form onSubmit={this.submitHandle}>
                Name<input type="text" name="name"/><br></br>
                Species<input type="text" name="species"/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
        )
    }



}

// export default FormContainer;