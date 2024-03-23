import styled from "styled-components";
import Post from "./Post";
import Story from "./Story";
import HorizonLine from "../Layout/HorizontalLine";

function Feed() {
  return (
    <>
      <Header>
        <img src="https://i.ibb.co/nrYtrMq/Banner.png" />
      </Header>
      <FeedContainer>
        <Story />
        <HorizonLine />
        <Post />
      </FeedContainer>
    </>
  );
}

export default Feed;

const FeedContainer = styled.div`
  background-color: #fff;
  height: 1000px;
  padding-top: 50px;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;

  img {
    margin-left: 15px;
    margin-top: 15px;
  }
`;
