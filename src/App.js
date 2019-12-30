import React from 'react';
import Dragger from './component/ClickDragExample';
import logo from './logo.svg';
import './App.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

import FormContainer from './container/FormContainer';
import PokeContainer from './container/PokeContainer';
import TrainerBox from './container/TrainerBox';


//drag functionality needs to be put in here. 
export default class App extends React.Component{
  
  state = {
    trainerBox: [],
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

  drop = (e) => {
    // debugger;
    let obj = {
      name: e.dataTransfer.getData('name'),
      img: e.dataTransfer.getData('img')
    }
    let tBox = [...this.state.trainerBox, obj];
    this.setState({
      trainerBox: tBox
    })
  }

  componentDidUpdate = () => {
    console.log('Dragged')
  }
  
  render(){return(
    <div className="App">
      <Row><Col onDragOver={console.log('dragged')}>
        
          Menu Stuff Probably
        {/* <Dragger /> */}
      </Col>
      <Col xs={14} md={10} >
        <FormContainer />
        <PokeContainer dragData={this.dragData}/>
        <TrainerBox 
          dragPrevent={this.dragPrevent} 
          drop={this.drop} 
          pokemon={this.state.trainerBox}
          dragData={this.dragData}  
          />
      </Col>
      </Row>
    </div>
  );
  }
}