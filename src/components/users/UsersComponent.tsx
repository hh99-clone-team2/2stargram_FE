import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsGearWide, BsChevronLeft } from "react-icons/bs";
import { IoMdGrid } from "react-icons/io";
import { FaRegBookmark, FaUserCog } from "react-icons/fa";
import { BiUserPin } from "react-icons/bi";
import styled from "styled-components";

function UsersComponent() {
  const [userPageCategory, setUserPageCategory] = useState("posts");
  const handleUserTypeButtonClick = (
    userType: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setUserPageCategory(userType.currentTarget.value);
  };

  const params = useParams();
  return (
    <>
      <HeaderContainer>
        <Header>
          <li>
            <BsGearWide />
            <BsChevronLeft />
          </li>
          <li>{params.userId}</li>
          <li>
            <FaUserCog />
          </li>
        </Header>
      </HeaderContainer>
      <section>
        <UserImgContainer>
          <UserImg></UserImg>
          <div>
            <h3>{params.userId}</h3>
            <UserButtonBox>
              <button>프로필 편집</button>
              <button>보관된 스토리 보기</button>
            </UserButtonBox>
          </div>
        </UserImgContainer>
      </section>
      <UserName>윤준수</UserName>
      <UserHighlightContainer>
        <Highlight>
          <div></div>
        </Highlight>
        <Highlight>
          <div></div>
        </Highlight>
        <Highlight>
          <div></div>
        </Highlight>
      </UserHighlightContainer>
      <UserInfoStyle>
        <div>
          <p>게시물</p>
          <p>2</p>
        </div>
        <div>
          <p>팔로워</p>
          <p>205</p>
        </div>
        <div>
          <p>팔로우</p>
          <p>135</p>
        </div>
      </UserInfoStyle>
      <PostTypeFlex>
        <PostTypeButton
          value="posts"
          userPageCategory={userPageCategory}
          onClick={handleUserTypeButtonClick}
        >
          <IoMdGrid />
        </PostTypeButton>
        <PostTypeButton
          value="marks"
          userPageCategory={userPageCategory}
          onClick={handleUserTypeButtonClick}
        >
          <FaRegBookmark />
        </PostTypeButton>
        <PostTypeButton
          value="tags"
          userPageCategory={userPageCategory}
          onClick={handleUserTypeButtonClick}
        >
          <BiUserPin />
        </PostTypeButton>
      </PostTypeFlex>
      <UserPostsList>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
        <ImgContainer>{/* <img src="" alt="" /> */}</ImgContainer>
      </UserPostsList>
    </>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
`;

const Header = styled.ul`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  & > li:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const UserImgContainer = styled.div`
  padding: 16px 16px 24px;
  display: flex;
  align-items: center;
  & > div > h3 {
    font-size: 21px;
    margin-bottom: 12px;
  }
`;
const UserImg = styled.div`
  border: 1px solid #ccc;
  width: 77px;
  height: 77px;
  border-radius: 50%;
  margin-right: 28px;
  background-image: url(https://velog.velcdn.com/images/ne_ol/post/cddea615-194f-4c19-86e4-b712b1619ddf/image.ico);
  background-size: cover;
`;

const UserName = styled.strong`
  font-weight: 600;
  padding: 0 16px 21px;
`;

const UserHighlightContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 16px 21px;
`;

const Highlight = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background-image: url("https://mblogthumb-phinf.pstatic.net/MjAxOTAxMzFfMjc2/MDAxNTQ4ODg4ODg5MzY3.v7f7pwG2zvWlnaXVZTRUqm9PQ0T6VCiVMoLYRsb2gZMg.vRH6N1hSEX4v-ddPCcAmGY7pVAUBLh_S5EaFpt6hmAIg.JPEG.ik102001/movie_image.jpg?type=w800");
    background-size: cover;
  }
`;

const UserButtonBox = styled.div`
  display: flex;
  gap: 7px;
  & > button {
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    padding: 9px 16px;
    border: none;
    background-color: #eee;
    &:hover {
      background-color: #ddd;
    }
  }
`;

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  & > div {
    text-align: center;
    & > p {
      font-size: 14px;
      &:nth-child(1) {
        font-weight: 300;
      }
      &:nth-child(2) {
        font-weight: 600;
      }
    }
  }
`;

const PostTypeFlex = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  justify-content: space-around;
`;

interface PostTypeButtonProps {
  value: string;
  userPageCategory: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostTypeButton = styled.button<PostTypeButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  gap: 6px;
  border: none;
  border-radius: 0;
  background-color: transparent;
  box-sizing: border-box;
  border-top: ${(props) =>
    props.userPageCategory === props.value ? "1px solid #333" : "transparent"};

  & > svg {
    color: ${(props) =>
      props.userPageCategory === props.value ? "blue" : "black"};
    size: 12px;
  }
`;

const UserPostsList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
`;

const ImgContainer = styled.div`
  background-image: url("https://i.namu.wiki/i/ZRcJDJ_BZTJuPENmHR_YvosOMVEWuEtOKLP_2j1PWC519WDMnhA0BVm2j07dJiMUank0w31T3FkYBVJVz_rmKv6ehtEtHqSA2flVMFEbn5HlwLsICrfptNpIP9MVwlUM6ceMZxQlYTV2Ng1AwmlkxQ.webp");
  background-repeat: no-repeat;
  background-size: cover;
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default UsersComponent;
