import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <>
      <GlobalStyles />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
