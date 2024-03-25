import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt?: string;
  formattedTime?: string;
}

interface CommentData {
  postId: number;
  userId: number;
  commentId: number;
  username: string;
  content: string;
  createdAt: string;
  formattedTime: string;
}

interface CommentModalProps {
  postId: number;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ postId, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${postId}`, {
          headers: {
            // 토큰은 실제 사용 환경에 맞게 구성해야 합니다.
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzXyIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNzE0ODg3NDU0LCJpYXQiOjE3MTEyODc0NTR9.m7vV-uAoAFMF8esjhMyOBxJDK0nL3kngpYGVynKevqE",
          },
        });

        if (response.status === 200 && response.data.status) {
          const fetchedComments = response.data.data.map(
            (commentData: CommentData) => ({
              id: commentData.commentId,
              username: commentData.username,
              content: commentData.content,
              createdAt: commentData.createdAt,
              formattedTime: commentData.formattedTime,
            }),
          );
          setComments(fetchedComments);
        }
      } catch (error) {
        console.error("댓글 불러오기 중 오류 발생", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post<CommentData>(
        `/api/comments/${postId}/add`,
        { content: newComment },
        {
          headers: {
            // 토큰은 실제 사용 환경에 맞게 구성해야 합니다.
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzXyIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNzE0ODg3NDU0LCJpYXQiOjE3MTEyODc0NTR9.m7vV-uAoAFMF8esjhMyOBxJDK0nL3kngpYGVynKevqE",
          },
        },
      );

      if (response.status === 201) {
        // 새 댓글을 상태에 추가
        const newCommentData = response.data;
        setComments((prevComments) => [
          ...prevComments,
          {
            id: newCommentData.commentId,
            username: newCommentData.username,
            content: newCommentData.content,
            createdAt: newCommentData.createdAt,
            formattedTime: newCommentData.formattedTime,
          },
        ]);
        setNewComment(""); // 입력 필드 초기화
      }
    } catch (error) {
      console.error("댓글 추가 중 오류 발생", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(
        `/api/comments/${postId}/delete/${commentId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzXyIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNzE0ODg3NDU0LCJpYXQiOjE3MTEyODc0NTR9.m7vV-uAoAFMF8esjhMyOBxJDK0nL3kngpYGVynKevqE",
          },
        },
      );

      if (response.status === 200 && response.data.status) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId),
        );
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생", error);
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>닫기</button>
        <h2>댓글</h2>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <span>{comment.username}: </span>
            <span>{comment.content}</span>
            {comments.map((comment) => (
              <CommentItem key={comment.id}>
                <span>{comment.username}: </span>
                <span>{comment.content}</span>
                <button onClick={() => handleDeleteComment(comment.id)}>
                  삭제
                </button>{" "}
                {/* 삭제 버튼 추가 */}
              </CommentItem>
            ))}
          </CommentItem>
        ))}
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="댓글 추가..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">추가</button>
        </form>
      </ModalContent>
    </ModalBackground>
  );
};

export default CommentModal;

// 스타일 컴포넌트 정의는 이전과 동일합니다.
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
