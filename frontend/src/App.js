import React, {Fragment} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import HeaderImg from './components/HeaderImg/HeaderImg';
import BagItems from './containers/BagItems/BagItems';
import SingleProduct from './containers/SingleProduct/SingleProduct';

import UnderConstruction from './components/UnderConstruction/UnderConstruction'

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path='/' exact component={UnderConstruction}/>
        <Route path='/shop' exact render={props =>
          <Fragment>
            <HeaderImg />
            <BagItems />
          </Fragment>
        }/>
        <Route path='/cart' exact component={UnderConstruction}/>
        <Route path={`/bag/:name/:model`} exact component={SingleProduct}/>
        <Route path='/policy' exact component={UnderConstruction}/>
      </Layout>
    </div>
  );
}

export default App;
