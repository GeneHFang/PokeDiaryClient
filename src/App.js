import React from 'react';
import Dragger from './component/ClickDragExample';
import logo from './logo.svg';
import './App.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import FormContainer from './container/FormContainer';
import PokeContainer from './container/PokeContainer';
import TrainerBox from './container/TrainerBox';
import NamePokemonPopup from './component/NamePokemonPopup';
import LeftSideMenu from './component/LeftSideMenu';
import About from './component/About';
import Registration from './component/auth/Registration';


//drag functionality needs to be put in here. 
export default class App extends React.Component{
  
  state = {
    trainerBox: [],
    showNickNameIface: false
  }

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
    let func = () => {this.dragToTrainerBoxFinish(obj)}
    console.log('dragged to box')
    this.setState({
      showNickNameIface: true,
      tempName: obj.name
    }, func);

    
  }

  dragToTrainerBoxFinish = (obj) => {
    let tBox = [...this.state.trainerBox, obj];
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
        
        <LeftSideMenu/>
      </Col>
      </Route>
      <Col xs={14} md={10} >
        <Switch>
        <Route path="/about" component={About} />
        <Route path="/signup" component={Registration} />
        <Route path="/test">
        <FormContainer />
        <PokeContainer dragData={this.dragData} dragPrevent={this.dragPrevent} drop={this.dropToDelete}/>
        <TrainerBox 
          dragPrevent={this.dragPrevent} 
          drop={this.dropToTrainerBoxStart} 
          pokemon={this.state.trainerBox}
          dragData={this.dragData}  
          />

        </Route>
        </Switch>
        
      </Col>
      </Row>
      </Router>
      {this.state.showNickNameIface 
        ? <NamePokemonPopup pokemonName={this.state.tempName} />
        : null}
    </div>
  );
  }
}