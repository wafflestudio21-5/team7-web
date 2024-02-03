import styled from "styled-components";
import { Link } from "react-router-dom";
import { CommentedArticleType } from "../../../../../Types";

const Wrapper = styled.li`
  display: grid;
  min-height: 38px;
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
      width: 556px;
      text-align: left;
      align-items: center;
      position: relative;
      word-break: break-all;
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
        font-style: normal;
      }
    }
  }
  & > .right {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 120px 80px;
    & > .date {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      font-size: 12px;
      padding: 4px 7px;
      box-sizing: border-box;
    }
    & > .viewCount {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      font-size: 12px;
      padding: 4px 7px;
      box-sizing: border-box;
    }
  }
`;

interface PropsUserCommentedArticle {
  article: CommentedArticleType;
}
const UserCommentedArticle = ({ article }: PropsUserCommentedArticle) => {
  return (
    <Wrapper>
      <div className="left">
        <div className="articleId">{article.id}</div>
        <div className="title">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
          <em>{`[${article.commentCnt}]`}</em>
        </div>
      </div>
      <div className="right">
        <div className="date">
          {article.createdAt.replace(/-/g, ".").replace(/T.*/, "")}
        </div>
        <div className="viewCount">{article.viewCnt}</div>
      </div>
    </Wrapper>
  );
};

export default UserCommentedArticle;
