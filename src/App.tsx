import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Layout/Navbar";
import ModalPortal from "./modalPortal/ModalPortal";
import CreateModal from "./modal/CreateModal";
import { useIsModalStore } from "./zustand/createModal/CreateModalState";

function App() {
  const useIsModal = useIsModalStore((state) => state.isModal);
  return (
    <>
      <GlobalStyles />
      <Outlet />
      {useIsModal && (
        <ModalPortal>
          <CreateModal />
        </ModalPortal>
      )}
      <Navbar />
    </>
  );
}

export default App;
