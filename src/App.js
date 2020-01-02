import React, { Fragment } from 'react';
import Dragger from './component/ClickDragExample';
import logo from './logo.svg';
import './App.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import FormContainer from './container/FormContainer';
import PokeContainer from './container/PokeContainer';
import TrainerBox from './container/TrainerBox';
import NamePokemonPopup from './component/NamePokemonPopup';
import LeftSideMenu from './component/LeftSideMenu';
import About from './component/About';
import Registration from './component/auth/Registration';
import Login from './component/auth/Login';
import Games from './component/Games';


//drag functionality needs to be put in here. 
export default class App extends React.Component{
  
  state = {
    trainerBox: [],
    showNickNameIface: false,
    loggedIn: false,
    currentUser: null,
    currentUserID: null,
    showMyBox: false,
    boxID: null,
    versionNum: 1
  }

  logIn = (jsonData) => {
    // debugger
    this.setState({
      loggedIn: true,
      currentUser: jsonData.data.attributes.name,
      currentUserID: jsonData.data.id
    });
  }

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

  navigateMyBox = (gameID, versionNum) => {
    this.setState({
      boxID: gameID,
      versionNum: parseInt(versionNum),
      trainerBox: []
    })
    
  }

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

  // checkLoginStatus = () => {
  //   let url = 'http://localhost:3000/logged_in';


  //   fetch(url)
  //   .then( resp => resp.json())
  //   .then( json =>{
  //     console.log(json);
  //   })
  //   .catch(error =>
  //     console.log(error)
  //   );

  // }

  // componentDidMount = () => { 
  //   this.checkLoginStatus();
  // }

  dragData = (e, pkmnID = null) => {
    // debugger
    e.dataTransfer.setData("name", e.target.innerText.split(/\n/)[0]);
    e.dataTransfer.setData("img", e.target.innerHTML.split('src=\"')[1].split('\">')[0]);
    
    if (pkmnID) {
      e.dataTransfer.setData('id', pkmnID)
    }
  }

  dragPrevent = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    }

  dropToDelete = (e) => {
    // debugger;
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
    })
  }


    
  }

  dropToTrainerBoxStart = (e) => {
    // debugger;
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
 
  

  closeNickNameIFace = () => {
    this.setState({
      showNickNameIface: false
    })
  }

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

  dragToTrainerBoxFinish = () => {
    // debugger;

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

    let pokeUrl = "http://localhost:3000/api/v1/pokemons";

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
    
  }

  componentDidUpdate = () => {
    console.log('Dragged')
  }
  
  render(){
    return(
    <div className="App" >
      <Router>
      <Row>
      <Route path='/'> 
      <Col onDragOver={console.log('dragged')}>
        
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
        {this.state.loggedIn ?  
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
          : <Redirect to='/login'/> 
        }
        </Route>
        </Switch>
        {/* {this.state.showMyBox
          ? <Redirect to={{
              path:'/mybox',
              state: {
                id: this.state.boxID
              }
              }}/>
          :
          null
        
        } */}
      </Col>
      </Row>
      </Router>
      {this.state.showNickNameIface 
        ? <NamePokemonPopup pokemonName={this.state.tempName} close={this.closeNickNameIFace} nicknameAssign={this.setNickName} />
        : null}
      
      
    </div>
  );
  }
}