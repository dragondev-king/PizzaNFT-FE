// import './App.css';
// import '_assets/styles/App.less'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './config/routes'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'

function App() {
  return (

    <>
      <NavBar />
      <BrowserRouter>
        <Switch>
          {routes.map(
            (route, index) => (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.layout(route.component)} />
            )
          )}
          <Redirect from="/home" to="/" />
        </Switch>
      </BrowserRouter>
      <Footer />
    </>


  );
}

export default App;
