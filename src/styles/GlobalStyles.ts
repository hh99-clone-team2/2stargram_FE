import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
body {
  position: relative;
  background-color: #fff;
  margin: 0 auto;
}
button{
  cursor: pointer;
}
`;
export default GlobalStyles;
