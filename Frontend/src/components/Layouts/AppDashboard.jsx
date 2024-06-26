import { Outlet } from "react-router-dom";
import AppMenu from "../App/AppMenu";
import useAccountData from "../../store/authStore";
import { useEffect } from "react";

const AppDashboard = () => {
  const { data, getAccountData } = useAccountData();

  useEffect(() => {
    getAccountData();
  }, [getAccountData]);
  return (
    <>
      <div className="max-w-screen-2xl flex flex-row justify-between max-h-initial mx-auto rounded-sm bg-yellow-400">
        <AppMenu />
        <div className="mx-auto w-full bg-gray-100">
          {data ? (
            <Outlet />
          ) : (
            <p className="text-center p-4 text-xl font-medium">
              Please Log In First.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AppDashboard;
