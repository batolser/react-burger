import React from 'react';

import AppHeader from "../header/header";
import appStyles from './app.module.css';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

const data = require('../../utils/data');

class App extends React.Component{
  state = { ingredients: data }

  render() {
  return (
    <div className="App">
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={this.state.ingredients}/>
        <BurgerConstructor ingredients={this.state.ingredients}/>
      </main>
    </div>
  );
  }
}

export default App;
