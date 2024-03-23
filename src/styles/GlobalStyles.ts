import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
body {
  background-color: #fff;
  margin: 0 auto;
  box-sizing: border-box;
}
button{
  cursor: pointer;
}
`;
export default GlobalStyles;
