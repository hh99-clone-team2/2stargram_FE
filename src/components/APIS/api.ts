import axios from "axios";

export const instance = axios.create({
  // API 통신을 위해 axios 인스턴스 생성
  baseURL: "https://tmi-balance.store",
  // 기본이 되는 api 주소
});

// MainPage 조회 (팔로우 된 사람의 게시글만 표시)
export const getMainPage = async () => {
  try {
    const data = await instance.get(`/api/p/explore`);
    console.log("------------", data);
    return data;
  } catch (error) {
    console.error("에러남 ㅅㄱ", error);
    throw error;
  }
};

// 게시물의 좋아요 상태를 토글하는 함수
export const toggleLike = async (postId: number, token: string) => {
  try {
    const response = await instance.post(
      `/api/likes/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data.message);
    return response.data; // 추후 처리를 위해 응답 데이터 반환
  } catch (error) {
    console.error("좋아요 작업 실패", error);
    throw error;
  }
};

// 좋아요 버튼이 눌릴 때 마다 api 요청 보냄
// 추가 / 취소 상태를 관리 버튼이 눌렸을때
// isUserLike useState로 true false 반복해서 관리
// useEffect 사용해서 마운트 될때마다 로컬에 좋아요 상태 저장 (의존정배열에 like 넣어주기)
// 버튼이 눌렸을 때 실행되는 함수
// 좋아요 상태를 true / false 변경  &  api 요청 함수

export const postWithFollow = async (token: string, cursor: number) => {
  console.log(token);
  try {
    const response = await instance.get("/api/p/explore", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        cursor,
      },
    });
    console.log("------------", response);
    return response;
  } catch (error) {
    console.error("팔로우한 사람의 게시물 조회 중 에러 발생", error);
    throw error;
  }
};
