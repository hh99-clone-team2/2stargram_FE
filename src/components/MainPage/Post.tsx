import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUserCircle, FaRegBookmark } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { AiFillHeart } from "react-icons/ai";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";
import HorizonLine from "../Layout/HorizontalLine";
import { getMainPage, toggleLike } from "../APIS/api";
import { AxiosResponse } from "axios";
import CommentModal from "../Layout/CommentModals";

interface PostData {
  postId: number;
  username: string;
  createdAt: string;
  url: string;
  like: boolean;
  likes: number;
  contents: string;
  commentList: Comment[];
}

interface Comment {
  id: number;
  username: string;
  content: string;
}

function Post() {
  const [data, setData] = useState<PostData[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [showFullContent, setShowFullContent] = useState<{
    [key: number]: boolean;
  }>({});
  const [showCommentModal, setShowCommentModal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<PostData[]> = await getMainPage();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    const likedPostsFromStorage = JSON.parse(
      localStorage.getItem("likedPosts") || "{}",
    );
    setLikedPosts(likedPostsFromStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleLike = async (postId: number) => {
    const isLiked = !likedPosts[postId];
    setLikedPosts({ ...likedPosts, [postId]: isLiked });
    try {
      await toggleLike(postId, "your_auth_token_here");
    } catch (error) {
      console.error("Error toggling like: ", error);
    }
  };

  const toggleContentDisplay = (postId: number) => {
    setShowFullContent({
      ...showFullContent,
      [postId]: !showFullContent[postId],
    });
  };

  const toggleCommentModal = (postId: number) => {
    setShowCommentModal((prev) => (prev === postId ? null : postId));
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.postId}>
          <PostContainer>
            {/* 게시물 헤더 */}
            <PostHeader>
              <div className="left">
                <div className="profile">
                  <FaUserCircle size="35" />
                </div>
                <p className="nickName">{item.username}</p>
                <p className="createdAt">{item.createdAt}</p>
              </div>
              <div className="dots">
                <BsThreeDots />
              </div>
            </PostHeader>

            {/* 게시물 이미지 */}
            <ImgContainer>
              <img src={item.url} alt="Post image" />
            </ImgContainer>

            {/* 아이콘 컨테이너 */}
            <IconContainer>
              <div className="leftbox">
                <button onClick={() => handleLike(item.postId)}>
                  {likedPosts[item.postId] ? (
                    <AiFillHeart size="25" color="red" />
                  ) : (
                    <FcLike size="25" />
                  )}
                </button>
                <IoChatbubbleOutline
                  size="25"
                  onClick={() => toggleCommentModal(item.postId)}
                />
                <IoPaperPlaneOutline size="25" />
              </div>
              <FaRegBookmark size="22" />
            </IconContainer>

            {/* 게시물 내용 */}
            <Contents>
              <p className="LikeCount">Likes: {item.likes}</p>
              <div className="contents">
                <p className="titleNickName">{item.username}</p>
                <p className="SummaryContent">
                  {showFullContent[item.postId]
                    ? item.contents
                    : `${item.contents.split(". ")[0]}. ...`}
                  <button onClick={() => toggleContentDisplay(item.postId)}>
                    {showFullContent[item.postId] ? "Show less" : "Read more"}
                  </button>
                </p>
              </div>
              <p
                className="commentCount"
                onClick={() => toggleCommentModal(item.postId)}
              >
                {item.commentList.length}개의 댓글
              </p>
            </Contents>

            <HorizonLine />
          </PostContainer>

          {/* 댓글 모달 */}
          {showCommentModal === item.postId && (
            <CommentModal
              postId={item.postId}
              onClose={() => setShowCommentModal(null)}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100%;
  max-width: 468px;
  background-color: #fff;
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
    margin-top: 5px;
  }

  .SummaryContent {
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 0%;
    margin-left: 5px;
  }

  .commentCount {
    font-size: 14px;
    margin-top: 5px;
    color: grey;
  }
`;
