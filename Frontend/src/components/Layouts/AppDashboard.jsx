import { Outlet } from "react-router-dom";
import AppMenu from "../App/AppMenu";

const AppDashboard = () => {
  return (
    <>
      <AppMenu />
      <Outlet />
    </>
  );
};

export default AppDashboard;
