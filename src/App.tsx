
import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Outlet />
    </>
  );
}

export default App;
