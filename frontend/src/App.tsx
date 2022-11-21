import { useRoutes } from 'react-router-dom';
import './App.scss';
import ErrorPage from './component/errorpage/ErrorPage';
import PrivateRoutes from './component/private-routes/private-routes';
import Signin from './component/signin/Signin';
import Signup from './component/signup/Signup';
import Dashboard from './pages/dashboard';

function App() {
  let routes = [
    // protected
    {
      element: <PrivateRoutes/ >,
      children: [
        {path: '', element: <Dashboard/>},
      ]
    },
    {path: 'signin', element: <Signin/>},
    {path: 'signup', element: <Signup/>},
    {path: '*', element: <ErrorPage/>}
  ]

  let element = useRoutes(routes)
  return (
    <div className='App'>
      <>{element}</>
    </div>
  );
}

export default App;
