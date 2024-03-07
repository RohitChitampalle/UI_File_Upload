import {
  RouterProvider
} from "react-router-dom";
import './App.css';
import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

import router from "./Routes/router";

function App() {
  return (
     <>
     < RouterProvider router = {
       router
     }
     />
     </>
  );
}

export default App;
