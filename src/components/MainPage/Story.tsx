import styled from "styled-components";

function Story() {
  return (
    <StoryContainer>
      <StoryContents>
        <img src="https://i.ibb.co/SrQjJ0W/PF.jpg" />
        <p>luna_lu_bloom</p>
      </StoryContents>
      <StoryContents>
        <img src="https://i.ibb.co/LZ5bXBG/download.jpg" />
        <p>sunny__0</p>
      </StoryContents>
      <StoryContents>
        <img src="https://i.ibb.co/jH8bxt1/202011251629164408647-20201125163024-01.webp" />
        <p>ddong_ju__</p>
      </StoryContents>
      <StoryContents>
        <img src="https://i.ibb.co/j65mPHW/42eef0a18fa3349bdfb72eb060335406.png" />
        <p>_rabbitttt</p>
      </StoryContents>
      <StoryContents>
        <img src="https://i.ibb.co/yPN646g/202203280740332487988-20220328074113-03.webp" />
        <p>poo_ppo</p>
      </StoryContents>
    </StoryContainer>
  );
}
export default Story;

const StoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  overflow: hidden;
`;

const StoryContents = styled.div`
  color: black;
  font-size: 11px;
  font-weight: normal;
  text-align: center;

  img {
    width: 70px;
    height: 70px;
    margin-left: 5px;
    border-radius: 50%;
    background-clip: content-box, border-box;
    border: 3px solid transparent;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to left, #dd2a7b 0%, #feda77 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
  }

  p {
    margin-top: 3px;
  }
`;
