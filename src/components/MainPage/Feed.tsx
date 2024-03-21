import styled from "styled-components";
import Post from "./Post";

function Feed() {
  return (
    <FeedContainer>
      <Header>
        <img src="https://i.ibb.co/nrYtrMq/Banner.png" />
      </Header>
      <hr />
      <Post />
    </FeedContainer>
  );
}

export default Feed;

const FeedContainer = styled.div`
  background-color: #fafafa;
  height: 1000px;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;

  img {
    margin-left: 15px;
    margin-top: 15px;
  }
`;
