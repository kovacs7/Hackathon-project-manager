import NavBar from "../NavBar/NavBar"
import {Outlet} from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default AuthLayout