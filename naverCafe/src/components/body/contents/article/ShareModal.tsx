import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  width: 350px;
  background-color: #f9f9fa;
  position: absolute;
  left: -290px;
  top: 25px;
  border-radius: 6px;
  box-shadow: 0px -2px 6px rgba(87, 98, 104, 0.08),
    0px 5px 10px rgba(87, 98, 104, 0.2);
  padding: 5px 0 10px 0;
  z-index: 2;
  & > .background {
  }
  & > .background > .header {
    position: relative;
    button {
      position: absolute;
      left: 320px;
      top: -10px;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url(https://ssl.pstatic.net/static/common/spi/2023/0824/sp_spi_layer.png);
        background-size: 282px 265px;
        background-position: -252px -160px;
      }
    }
  }
  & > .background > .body {
    display: flex;
    align-items: center;
    justify-content: center;
    label {
      display: inline-block;
      width: 250px;
      height: 30px;
      background-color: #fff;
      border: 1px solid #e6e6ea;
      border-collapse: collapse;
      padding-top: 5px;
      color: #2196f3;
      cursor: pointer;
    }
    button {
      color: #767678;
      height: 37px;
      border: 1px solid #e6e6ea;
      border-radius: 0 9px 9px 0;
      background: #f4f4f5;
      border-collapse: collapse;
      cursor: pointer;
    }
  }
  & > .background > .message {
    background-color: #fff;
    padding: 28px 0 20px 0;
    border-bottom: 1px solid #e6e6ea;
  }
  & > .background > .closeModal {
    padding: 14px 0 4px 0;
    background-color: #fff;
  }
`;
interface PropsShareModal {
  setIsShareModalOpen: (value: boolean) => void;
  handleCopyPathToClipBoard: (value: string) => void;
}
const ShareModal = ({
  setIsShareModalOpen,
  handleCopyPathToClipBoard,
}: PropsShareModal) => {
  const [isPathCopied, setIsPathCopied] = useState<boolean>(false);
  const location = useLocation();

  if (isPathCopied) {
    return (
      <Wrapper>
        <div className="background">
          <div className="message">
            주소가 복사되었습니다.
            <br />
            원하는 곳에 붙여넣기(Ctrl+V)해주세요.
          </div>
          <button
            className="closeModal"
            onClick={() => setIsShareModalOpen(false)}
          >
            닫기
          </button>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div className="background">
          <div className="header">
            <h3>공유하기</h3>
            <button onClick={() => setIsShareModalOpen(false)}>
              <span />
            </button>
          </div>
          <div className="body">
            <label
              htmlFor="copyPathButton"
              onClick={() => {
                handleCopyPathToClipBoard(location.pathname);
                setIsPathCopied(true);
              }}
            >
              https://cafewaffle.shop{location.pathname}
            </label>
            <button
              id="copyPahtButton"
              onClick={() => {
                handleCopyPathToClipBoard(location.pathname);
                setIsPathCopied(true);
              }}
            >
              복사
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default ShareModal;
