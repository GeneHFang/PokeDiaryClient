//Libraries
import React, { Fragment } from 'react';
import './App.css';
import {Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//GraphQL depedencies
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//Local dependencies
import PokeContainer from './container/PokeContainer';
import TrainerBox from './container/TrainerBox';
import NamePokemonPopup from './component/NamePokemonPo~pup';
import LeftSideMenu from './component/LeftSideMenu';
import About from './component/About';
import Registration from './component/auth/Registration';
import Login from './component/auth/Login';
import Games from './component/Games';

//Apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

//drag functionality needs to be put in here. 
export default class App extends React.Component{
  

  //STATE (and setState functions)
  //==============================================
    state = {
      //container for front end pokemon display
      trainerBox: [], 

      //flag for showing nickname menu
      showNickNameIface: false, 

      //toggled by logging in and out
      loggedIn: false, 

      //logged in trainer' name
      currentUser: null, 

      //logged in trainer's user ID to associate with backend
      currentUserID: null, 

      //toggle for showing trainer box menu 
      showMyBox: false,

      //trainer's current game's pokemon box 
      boxID: null,

      //Pokemon game generation/version number. Default 1st gen.
      versionNum: 1
    }

    //sets current trainer state from json data received from fetch
    logIn = (jsonData) => {
      this.setState({
        loggedIn: true,
        currentUser: jsonData.data.attributes.name,
        currentUserID: jsonData.data.id
      });
    }

    //clears current trainer data to defaults
    logOut = () => {
      this.setState({
        loggedIn: false,
        currentUser: null,
        currentUserID: null,
        trainerBox: [],
        boxID: null,
        versionNum: 1
      });
    }

    //Sets current box to passed args, and updates version/generation number
    navigateMyBox = (gameID, versionNum) => {
      this.setState({
        boxID: gameID,
        versionNum: parseInt(versionNum),
        trainerBox: []
      })
    }

    //Creates a new pokemon object from args and adds it to currently displayed box 
    populateBox = (pokemon) => {
      let obj = {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.img
      };
      let arr = [...this.state.trainerBox, obj];
      this.setState({
        trainerBox: arr
      })
    }
    
    //Closes the nickname menu by setting the flag to false
    closeNickNameIFace = () => {
      this.setState({
        showNickNameIface: false
      })
    }

    //Sets newly caught pokemon's nickname to trainer input arg
    setNickName = (name) => {
      let newObj = {
        img: this.state.tempObj.img,
        pokemonName: this.state.tempObj.name,
        name: name
      }
      this.setState({
        tempObj: newObj
      }, this.dragToTrainerBoxFinish)
    }
  //===================================================

  //EVENT HANDLERS
  //===================================================

    //Drag event handler:
    //Associates pokemon information from dragged card to drag event
    dragData = (e, pkmnID = null) => {
      e.dataTransfer.setData("name", e.target.innerText.split(/\n/)[0]);
      e.dataTransfer.setData("img", e.target.innerHTML.split('src=\"')[1].split('\">')[0]);
      if (pkmnID) {
        e.dataTransfer.setData('id', pkmnID)
      }
    }

    //Drag event handler:
    //Prevent duplicative handling of a single drag event
    dragPrevent = (e) =>{
      e.stopPropagation();
      e.preventDefault();
    }

    //Drop event handler:
    //Sends a delete request to backend with dragged pokemon card's information. 
    //upon success, removes the card from the trainer box
    //alerts user if delete request unsuccessful
    dropToDelete = (e) => {
      if (e.dataTransfer.getData('id')){
      let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            '_method': 'DELETE'
        }
      };
      let url = `http://localhost:3000/api/v1/pokemons/${e.dataTransfer.getData('id')}`;
      let index = this.state.trainerBox.findIndex(pkmn => pkmn.name === e.dataTransfer.getData('name'))
        
      fetch(url, options)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        let newArr = [...this.state.trainerBox];
        newArr.splice(index,1);

        this.setState({
          trainerBox: newArr
        })
      }).catch((e)=>{
        alert(`Error! ${e}. Please ensure your connection is working`)
      })
      }
    }

    //Drop event handler:
    //Part 1 of 2 for adding pokemon to trainer box
    //Sets a temporary object to state with dropped Pokemon information and opens nickname menu
    dropToTrainerBoxStart = (e) => {
      if (e.dataTransfer.getData('id')){}
      else{
      let obj = {
        name: e.dataTransfer.getData('name'),
        img: e.dataTransfer.getData('img')
      }
      this.setState({
        tempName: obj.name,
        showNickNameIface:true,
        tempObj: obj
      })
    }
    }
    //Part 2 of 2 for adding pokemon to trainer box
    //Sends post request to backend with trainer and pokemon information
    //Updates current trainer box upon success. Alerts user on failure
    dragToTrainerBoxFinish = () => {
      let pokeUrl = "http://localhost:3000/api/v1/pokemons";
      let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: this.state.tempObj.name,
            species: this.state.tempObj.pokemonName,
            img: this.state.tempObj.img,
            game_id: this.state.boxID
        })
      }
      fetch(pokeUrl, options)
      .then(resp=>resp.json())
      .then(json=> {
        console.log(json);
        let newObj = {...this.state.tempObj, id:json.data.id}
        let tBox = [...this.state.trainerBox, newObj];
        this.setState({
          trainerBox: tBox
        })
      })
      .catch(e=>{
        alert(`Error! ${e}. Please check your connection`)
      })
    }
  //===================================================

  //RENDER
  //===================================================
    render(){
      return(
      <ApolloClient client={client}>
        <div className="App" >
          <Router>
            <Row>
              <Route path='/'> 
                <Col>
                  <LeftSideMenu loggedIn={this.state.loggedIn} logOut={this.logOut} myBox={this.state.boxID}/>
                </Col>
              </Route>
              <Col xs={14} md={10} >
                <Switch>
                  <Route path="/about" component={() => <About loggedIn={this.state.loggedIn}/>} />
                  <Route path="/signup" component={() => <Registration loginFunc={this.logIn}  loggedIn={this.state.loggedIn}/>} />
                  <Route path="/login" component={() => <Login loginFunc={this.logIn} loggedIn={this.state.loggedIn}/>} />
                  <Route path="/mygames" component={() => 
                    <Games 
                      loggedIn={this.state.loggedIn} 
                      userID={this.state.currentUserID} 
                      user={this.state.currentUser}
                      navigateMyBox={this.navigateMyBox}
                      boxID={this.state.boxID}  
                      />
                    } />
                  <Route path="/mybox" >
                    {this.state.loggedIn 
                      ?  
                        <Fragment>
                          <PokeContainer 
                            dragData={this.dragData} 
                            dragPrevent={this.dragPrevent} 
                            drop={this.dropToDelete}
                            regionID={this.state.versionNum}
                            />
                          <TrainerBox 
                            click={this.showPokemonPop}
                            dragPrevent={this.dragPrevent} 
                            drop={this.dropToTrainerBoxStart} 
                            pokemon={this.state.trainerBox}
                            dragData={this.dragData}
                            boxID={this.state.boxID} 
                            populateBox={this.populateBox} 
                            />
                        </Fragment>
                      : 
                        <Redirect to='/login'/> 
                    }
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Router>
            {this.state.showNickNameIface 
              ? 
                <NamePokemonPopup pokemonName={this.state.tempName} close={this.closeNickNameIFace} nicknameAssign={this.setNickName} />
              : 
                null
            } 
        </div>
      </ApolloClient>
      );
    }
}