import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";

function Post() {
  return (
    <PostContainer>
      <PostHeader>
        <div className="left">
          <div className="profile">
            <FaUserCircle size="35" />
          </div>
          <p className="nickName">luna_lu_bloom</p>
          <p className="createdAt">12시간</p>
        </div>
        <div className="dots">
          <BsThreeDots />
        </div>
      </PostHeader>

      <ImgContainer>
        <img src="https://i.ibb.co/873vt93/53198237-881544528871246-5193888411861123072-n.png" />
      </ImgContainer>

      <IconContainer>
        <div className="leftbox">
          <FcLike size="25" />
          <IoChatbubbleOutline size="25" />
          <IoPaperPlaneOutline size="25" />
        </div>
        <FaRegBookmark size="22" />
      </IconContainer>

      <Contents>
        <p className="LikeCount">좋아요 7만개</p>
        <div className="contents">
          <p className="titleNickName">luna_lu_bloom</p>
          <p className="SummaryContent">개발자한테 손절당하는 방법</p>
        </div>
        <p className="commentCount">댓글 700개 모두 보기</p>
      </Contents>

      <hr />
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100%;
  max-width: 468px;
  background-color: #fafafa;
  color: black;
  margin: 0 auto;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .left {
    display: flex;
    margin-left: 5px;
  }

  .profile {
  }

  .nickName {
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 0%;
    margin-left: 10px;
  }

  .createdAt {
    font-size: 12px;
    color: grey;
    margin-bottom: 0%;
    margin-top: 7px;
    margin-left: 10px;
  }

  .dots {
    margin-right: 10px;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;

  .leftbox {
    display: flex;
    gap: 5px;
  }
`;

const Contents = styled.div`
  margin-left: 10px;
  .LikeCount {
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 0%;
    font-size: 14px;
  }

  .contents {
    display: flex;
  }

  .titleNickName {
    font-weight: bolder;
    margin: 0%;
    font-size: 14px;
  }

  .SummaryContent {
    font-size: 14px;
    margin-top: 0%;
    margin-bottom: 0%;
    margin-left: 5px;
  }

  .commentCount {
    font-size: 14px;
    margin: 0%;
    color: grey;
  }
`;
