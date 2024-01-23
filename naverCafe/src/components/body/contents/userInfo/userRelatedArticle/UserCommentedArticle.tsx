import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.li`
  display: grid;
  height: 38px;
  grid-template-columns: 660px 200px;

  & > .left {
    display: flex;
    padding: 3px 18px 6px 4px;
    & > .articleId {
      display: flex;
      color: #878787;
      font-size: 11px;
      line-height: 13px;
      width: 69px;
      margin: -2px 6px 0 -6px;
      justify-content: center;
      align-items: center;
    }
    & > .title {
      display: flex;
      text-align: left;
      align-items: center;
      position: relative;
      a {
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      em {
        font-size: 12px;
        color: #ff2f3b;
        margin-left: 5px;
        position: relative;
        top: -2px;
      }
    }
  }
  & > .right {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 120px 80px;
    & > .date {
      display: inline-block;
      color: #666666;
      font-size: 12px;
      padding: 4px 7px;
      box-sizing: border-box;
    }
    & > .viewCount {
      display: inline-block;
      color: #666666;
      font-size: 12px;
      padding: 4px 7px;
      box-sizing: border-box;
    }
  }
`;

interface PropsUserCommentedArticle {
  article: {
    id: number;
    content: string;
    last_modified: string;
    title: string;
    viewCount: number;
    commentCount: number;
  };
}
const UserCommentedArticle = ({ article }: PropsUserCommentedArticle) => {
  // comment의 checkBox는 기능 구현이 너무 복잡할 것 같아 일단 보류하겠습니다.
  //   const [isCheckBoxClicked, setIsCheckBoxClicked] = useState<boolean>(false);
  return (
    <Wrapper>
      {/* 아래는 checkBox에 대한 코드입니다. 일단 주석 처리해두겠습니다. */}
      {/* <div
        className={isCheckBoxClicked ? "checkBoxClicked" : "checkBoxNotClicked"}
      >
        <span onClick={() => setIsCheckBoxClicked(!isCheckBoxClicked)} />
      </div> */}
      <div className="left">
        <div className="articleId">{article.id}</div>
        <div className="title">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
          <em>{`[${article.commentCount}]`}</em>
        </div>
      </div>
      <div className="right">
        <div className="date">
          {article.last_modified
            .replace(/-/g, ".")
            .replace(/T\d\d:\d\d:\d\d/, ". ")}
        </div>
        <div className="viewCount">{article.viewCount}</div>
      </div>
    </Wrapper>
  );
};

export default UserCommentedArticle;
