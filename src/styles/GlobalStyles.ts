import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
body {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */

  max-width: 615px; 
    margin: 0 auto; /* 가운데 정렬 */
    box-sizing: border-box; /* padding 값을 포함하여 요소 크기 계산 */
}
  

`;

export default GlobalStyles;
