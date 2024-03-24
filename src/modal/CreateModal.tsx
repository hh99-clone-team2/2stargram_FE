import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import { useIsModalStore } from "../zustand/createModal/CreateModalState";
import { CiImageOn } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import { addCreateNewPost } from "../api/userPage";

function CreateModal() {
  const [imgFile, setImgFile] = useState<any>();
  const [isBtnClick, setIsBtnClick] = useState("");
  const [createContent, setCreateContent] = useState("");

  const saveImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : "";
    setImgFile(file);
    // const inputElement = e.target as HTMLInputElement;
    // if (inputElement.files && inputElement.files.length > 0) {
    //   setImgFile(inputElement.files[0]);
    // }
  };

  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  const handleIsModal = () => {
    useSetIsModalClick();
  };

  const handleNextButtonClick = (buttonType: string) => {
    setIsBtnClick(buttonType);
  };

  const formData = new FormData();
  const handleAddPostButtonClick = () => {
    console.log(imgFile, createContent);
    formData.append("files", imgFile);
    formData.append(
      "createPostRequestDto",
      JSON.stringify({ content: createContent }),
    );
    addCreateNewPost(formData);
    for (const x of formData) {
      console.log(x);
    }
  };

  const handleChangeContent = (content: string) => {
    setCreateContent(content);
    console.log(createContent);
  };

  return (
    <ModalContainer>
      <button onClick={handleIsModal}>
        <IoCloseOutline />
      </button>
      <MainModalContainer>
        <ModalTitle>
          <h2>새 게시물 만들기</h2>
          {imgFile ? (
            <>
              {isBtnClick === "nextClick" ? (
                <button onClick={handleAddPostButtonClick}>게시물 생성</button>
              ) : (
                <button onClick={() => handleNextButtonClick("nextClick")}>
                  다음
                </button>
              )}
              <button onClick={() => handleNextButtonClick("backClick")}>
                <FaAngleLeft />
              </button>
            </>
          ) : null}
        </ModalTitle>
        <ModalFlexContainer>
          {imgFile ? (
            isBtnClick === "nextClick" ? (
              <>
                <ContentTextarea
                  value={createContent}
                  onChange={(e) => handleChangeContent(e.target.value)}
                  maxLength={1000}
                  placeholder="문구를 입력하세요..."
                />
                <MaxLength
                  style={
                    createContent.length >= 1000
                      ? { color: "red" }
                      : { color: "#333" }
                  }
                >
                  {createContent.length} / 1000
                </MaxLength>
              </>
            ) : (
              <>
                <ImagePreview
                  srcurl={URL.createObjectURL(imgFile)}
                ></ImagePreview>
              </>
            )
          ) : (
            <>
              <div>
                <CiImageOn />
                <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
              </div>
              <form>
                <label htmlFor="createFile">
                  <p>컴퓨터에서 선택</p>
                </label>
                <input
                  type="file"
                  id="createFile"
                  accept="image/*"
                  onChange={(e) => saveImgFile(e)}
                />
              </form>
            </>
          )}
        </ModalFlexContainer>
      </MainModalContainer>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #000000b5;
  & > button {
    background-color: transparent;
    border: none;
    font-size: 30px;
    color: #fff;
  }
`;
const MainModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 50%;
  font-size: 21px;
  border-radius: 12px;
  background-color: #fff;
`;
const ModalTitle = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid #ddd;
  & > h2 {
    text-align: center;
    font-weight: 600;
    line-height: 42px;
  }
  & > button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    &:nth-child(1) {
      left: 10px;
    }
    &:nth-child(2) {
      right: 10px;
    }
  }
`;

const ModalFlexContainer = styled.div`
  height: calc(100% - 42px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  gap: 20px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > svg {
      font-size: 5rem;
    }
    & > p {
      text-align: center;
    }
  }
  & > form > label {
    background: #0095f6;
    border: 1px solid #0095f6;
    padding: 7px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #1877fe;
      color: #fff;
    }
  }
  & > form > input {
    display: none;
  }
`;
const ContentTextarea = styled.textarea`
  position: relative;
  width: 90%;
  height: 80%;
  resize: none;
  padding-bottom: 20px;
`;
const MaxLength = styled.span`
  position: absolute;
  bottom: 5%;
  right: 10%;
  font-size: 10px;
`;
interface ImagePreviewProps {
  srcurl: string;
}
const ImagePreview = styled.div<ImagePreviewProps>`
  width: 90%;
  height: 90%;
  background: ${(props) => `url(${props.srcurl}) center`};
  background-repeat: no-repeat;
  background-size: cover;
`;

export default CreateModal;
