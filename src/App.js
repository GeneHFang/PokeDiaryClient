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
      currentUserID: null
    });
  }

  navigateMyBox = (gameID, versionNum) => {
    this.setState({
      boxID: gameID,
      version: parseInt(versionNum)
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

  dragData = (e) => {
    // debugger
    e.dataTransfer.setData("name", e.target.innerText.split(/\n/)[0])
    e.dataTransfer.setData("img", e.target.innerHTML.split('src=\"')[1].split('\">')[0])
  }

  dragPrevent = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    }

  dropToDelete = (e) => {
    let index = this.state.trainerBox.findIndex(pkmn => pkmn.name === e.dataTransfer.getData('name'))
    let newArr = [...this.state.trainerBox];
    newArr.splice(index,1);

    this.setState({
      trainerBox: newArr
    })
  }

  dropToTrainerBoxStart = (e) => {
    // debugger;
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
 

  closeNickNameIFace = () => {
    this.setState({
      showNickNameIface: false
    })
  }

  setNickName = (name) => {
    let newObj = {
      img: this.state.tempObj.img,
      name: name
    }
    this.setState({
      tempObj: newObj
    }, this.dragToTrainerBoxFinish)
  }

  dragToTrainerBoxFinish = () => {
    let tBox = [...this.state.trainerBox, this.state.tempObj];
    this.setState({
      trainerBox: tBox
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
        <FormContainer />
        <PokeContainer 
          dragData={this.dragData} 
          dragPrevent={this.dragPrevent} 
          drop={this.dropToDelete}
          version={this.state.versionNum}
          />
        <TrainerBox 
          dragPrevent={this.dragPrevent} 
          drop={this.dropToTrainerBoxStart} 
          pokemon={this.state.trainerBox}
          dragData={this.dragData}
          boxID={this.state.boxID}  
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