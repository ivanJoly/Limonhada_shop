import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import HeaderImg from './components/HeaderImg/HeaderImg';
import BagItems from './containers/BagItems/BagItems';

function App() {
  return (
    <div className="App">
      <Layout>
        <HeaderImg />
        <BagItems />
      </Layout>
    </div>
  );
}

export default App;
