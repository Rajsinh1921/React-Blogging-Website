import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login } from "./Store/authSlice";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch;

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <center className="">
      <div className="min-h-screen flex flex-wrap contents-between bg-gray-500">
        <div className="w-full block">
          <Header />
          <main>{loading ? <LoadingSpinner /> : <Outlet />}</main>
          <Footer />
        </div>
      </div>
    </center>
  );
}

export default App;
