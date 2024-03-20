import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
body {
  display: flex;
  justify-content: center; 
  height: 100vh; 

  max-width: 615px; 
    margin: 0 auto; 
    box-sizing: border-box; /* padding 값을 포함하여 요소 크기 계산 */
}
  

`;

export default GlobalStyles;
