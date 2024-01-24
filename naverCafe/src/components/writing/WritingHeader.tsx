import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  & > .specialMenu {
    display: flex;
    padding: 14px 24px;
    border: 1px solid #e5e5e5;
    margin-top: 10px;
    margin-bottom: 20px;

    & > li {
      font-size: 13px;
      position: relative;
      & > a:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    & > li:not(:first-child) {
      padding-left: 22px;
      &::before {
        content: "";
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: #a3a9a9;
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
  }
  & > .header {
    display: flex;
    position: relative;
    border-bottom: 1px solid;
    h2 {
      font-size: 22px;
      margin: 0 0 16px;
    }
    button {
      position: absolute;
      right: 0;
      min-width: 46px;
      height: 36px;
      margin-left: 10px;
      font-size: 13px;
      font-weight: 700;
      line-height: 36px;
      color: #009f47;
      background-color: rgba(3, 199, 90, 0.12);
      border-radius: 6px;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }
`;
interface PropsWritingHeader {
  handleWritePost: () => Promise<void>;
}
const WritingHeader = ({ handleWritePost }: PropsWritingHeader) => {
  return (
    <Wrapper>
      <ul className="specialMenu">
        <li>
          <Link to={"/totalBoard"}>전체글보기</Link>
        </li>
        <li>
          <Link to={"/popularBoard"}>인기글</Link>
        </li>
      </ul>
      <div className="header">
        <h2>카페 글쓰기</h2>
        <button onClick={() => handleWritePost()}>등록</button>
      </div>
    </Wrapper>
  );
};

export default WritingHeader;
