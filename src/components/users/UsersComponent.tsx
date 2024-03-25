import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsGearWide, BsChevronLeft } from "react-icons/bs";
import { IoMdGrid } from "react-icons/io";
import { FaRegBookmark, FaUserCog } from "react-icons/fa";
import { BiUserPin } from "react-icons/bi";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { followUser, getUserInfo, getUserPostsList } from "../../api/userPage";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type UserType = React.MouseEvent<HTMLButtonElement>;

function UsersComponent() {
  const [userPageCategory, setUserPageCategory] = useState("posts");
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();

  const handleUserTypeButtonClick = (userType: UserType) => {
    setUserPageCategory(userType.currentTarget.value);
  };

  const { userId } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  let userIdJWT = useRef<any>();
  if (accessToken !== null) {
    userIdJWT = useRef(jwtDecode(accessToken.substring(7)).sub);
  }
  const { data } = useQuery({
    queryKey: ["getUserPostsList", userId, pageNum],
    queryFn: () => getUserPostsList(userId!, pageNum),
  });

  return (
    <>
      {data ? (
        <>
          <HeaderContainer>
            <Header>
              <li style={{ cursor: "pointer" }}>
                <BsChevronLeft onClick={() => navigate(-1)} />
              </li>
              <li>{userId}</li>
              <li>
                <FaUserCog />
              </li>
            </Header>
          </HeaderContainer>
          <section>
            <UserImgContainer>
              <UserImg></UserImg>
              <div>
                <h3>{userId}</h3>
                <UserButtonBox>
                  {userId === userIdJWT.current ? (
                    <>
                      <button>프로필 편집</button>
                      <button>보관된 스토리 보기</button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        followUser(userId!);
                        window.location.reload();
                      }}
                    >
                      팔로우
                    </button>
                  )}
                </UserButtonBox>
              </div>
            </UserImgContainer>
          </section>
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
              <p>게시물</p>
            </div>
            <div>
              <p>팔로워</p>
              <p>{data.userInfo.follower}</p>
            </div>
            <div>
              <p>팔로우</p>
              <p>{data.userInfo.following}</p>
            </div>
          </UserInfoStyle>
          <PostTypeFlex>
            <PostTypeButton
              value="posts"
              userpagecategory={userPageCategory}
              onClick={handleUserTypeButtonClick}
            >
              <IoMdGrid />
            </PostTypeButton>
            <PostTypeButton
              value="marks"
              userpagecategory={userPageCategory}
              onClick={handleUserTypeButtonClick}
            >
              <FaRegBookmark />
            </PostTypeButton>
            <PostTypeButton
              value="tags"
              userpagecategory={userPageCategory}
              onClick={handleUserTypeButtonClick}
            >
              <BiUserPin />
            </PostTypeButton>
          </PostTypeFlex>
          <UserPostsList>
            {data
              ? data.posts.map((item: any) => {
                  return (
                    <ImgContainer key={item.postId}>
                      <img src={item.postImageList[0].url} alt="" />
                    </ImgContainer>
                  );
                })
              : null}
          </UserPostsList>
        </>
      ) : (
        <>
          <p>...로딩중</p>
        </>
      )}
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
  z-index: 99;
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
  userpagecategory: string;
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
    props.userpagecategory === props.value ? "1px solid #333" : "transparent"};

  & > svg {
    color: ${(props) =>
      props.userpagecategory === props.value ? "blue" : "black"};
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
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default UsersComponent;
