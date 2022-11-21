import { Navigate } from "react-router-dom";
import Dashboard from "../../pages/dashboard";

export default function PrivateRoutes(){
  let isAuth = true;
  return isAuth ? <Dashboard/> : <Navigate to='/signin' />
}