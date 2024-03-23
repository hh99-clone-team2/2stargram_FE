import { useEffect } from "react";
import {
  IoHomeSharp,
  IoHomeOutline,
  IoCompass,
  IoCompassOutline,
  IoPersonCircleOutline,
  IoPersonCircleSharp,
} from "react-icons/io5";
import styled from "styled-components";
import { FaRegSquarePlus, FaSquarePlus } from "react-icons/fa6";
import { IoMdPaperPlane, IoIosPaperPlane } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useIsModalStore } from "../../zustand/createModal/createModalState";

function Navbar() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const handleIsModal = () => {
    useSetIsModalClick();
  };

  return (
    <NavBarStyle>
      <NavButton onClick={() => navigate("/")}>
        {location.pathname === "/" ? <IoHomeSharp /> : <IoHomeOutline />}
      </NavButton>
      <NavButton>
        <IoCompassOutline />
        {/* <IoCompass /> */}
      </NavButton>
      <NavButton onClick={handleIsModal}>
        <FaRegSquarePlus />
        {/* <FaSquarePlus /> */}
      </NavButton>
      <NavButton>
        <IoMdPaperPlane />
        {/* <IoIosPaperPlane /> */}
      </NavButton>
      <NavButton onClick={() => navigate("/hoheesu")}>
        {params.userId ? <IoPersonCircleSharp /> : <IoPersonCircleOutline />}
      </NavButton>
    </NavBarStyle>
  );
}

const NavBarStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 48px;
  width: 100%;
  z-index: 9;
  background-color: #fff;
`;

const NavButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: none;
  & svg {
    font-size: 1.3rem;
  }
`;
export default Navbar;
