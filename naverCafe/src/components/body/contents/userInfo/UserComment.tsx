import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.li`
  width: 768px;
  padding: 15px 20px 15px 34px;
  box-sizing: border-box;
  text-align: left;
  font-size: 13px;
  & > a {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    & > .content {
      word-break: break-all;
    }
    & > .date {
      color: #878787;
    }
    & > .title {
      color: #878787;
      position: relative;
      em {
        position: relative;
        top: -1px;
        margin-left: 5px;
        color: #ff2f3b;
        font-size: 13px;
      }
    }
  }
`;
interface PropsUserComment {
  comment: {
    id: number;
    content: string;
    last_modified: string;
    title: string;
    articleId: number;
    commentCount: number;
  };
}
const UserComment = ({ comment }: PropsUserComment) => {
  return (
    <Wrapper>
      <Link to={`/articles/${comment.articleId}`}>
        <div className="content">{comment.content}</div>
        <div className="date">
          {comment.last_modified
            .replace(/-/g, ".")
            .replace(/T\d\d:\d\d:\d\d/, ". ")}
        </div>
        <div className="title">
          {comment.title}
          <em>{`[${comment.commentCount}]`}</em>
        </div>
      </Link>
    </Wrapper>
  );
};
export default UserComment;
