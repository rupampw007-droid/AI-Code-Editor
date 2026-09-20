import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { me } from "./features/me";
import { setUserData } from "./redux/userSlice";
import ProjectPage from "./pages/ProjectPage";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    const fetch = async () => {
      const data = await me();
      dispatch(setUserData(data))
    }
    fetch()
  }, )
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/project/:id" element={<ProjectPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App