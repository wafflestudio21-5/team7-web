import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext";
import { useState, useEffect } from "react";

const Wrapper = styled.li`
  display: grid;
  height: 38px;
  grid-template-columns: 660px 200px;

  & > .left {
    display: flex;
    padding: 3px 18px 6px 4px;
    & > .checkBoxNotShown {
      display: none;
    }
    & > .checkBoxShown {
      & > .checkBoxClicked {
        button {
          display: inline-block;
          width: 14px;
          height: 14px;
          background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-on.svg?ed25ed391f00228242d83867666d617e=);
          cursor: pointer;
          border: none;
          outline: none;
        }
      }
      & > .checkBoxNotClicked {
        button {
          display: inline-block;
          width: 14px;
          height: 14px;
          background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-off.svg?35434b8085dcc93722a1fc0df301bcf1=);
          cursor: pointer;
          border: none;
          outline: none;
        }
      }
    }
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

interface PropsUserLikedArticle {
  article: {
    id: number;
    content: string;
    last_modified: string;
    title: string;
    viewCount: number;
    commentCount: number;
  };
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
  checkedLikedArticleIdList: number[];
  setCheckedLikedArticleIdList: (value: number[]) => void;
}
const UserLikedArticle = ({
  article,
  userInfo,
  checkedLikedArticleIdList,
  setCheckedLikedArticleIdList,
}: PropsUserLikedArticle) => {
  const myInfo = useUserContext();
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState<boolean>(false);

  useEffect(() => {
    if (checkedLikedArticleIdList.includes(article.id)) {
      setIsCheckBoxClicked(true);
    } else if (checkedLikedArticleIdList.length === 0) {
      setIsCheckBoxClicked(false);
    }
  }, [checkedLikedArticleIdList, article.id]);

  const handleCheckBoxClick = () => {
    if (isCheckBoxClicked) {
      // checked -> not checked
      setIsCheckBoxClicked(false);
      setCheckedLikedArticleIdList(
        checkedLikedArticleIdList.filter(
          (articleId) => articleId !== article.id
        )
      );
    } else {
      // not checked -> checked
      setIsCheckBoxClicked(true);
      setCheckedLikedArticleIdList([...checkedLikedArticleIdList, article.id]);
    }
  };
  return (
    <Wrapper>
      <div className="left">
        <div
          className={
            myInfo.userId === userInfo.userId
              ? "checkBoxShown"
              : "checkBoxNotShown"
          }
        >
          <div
            className={
              isCheckBoxClicked ? "checkBoxClicked" : "checkBoxNotClicked"
            }
          >
            <button onClick={() => handleCheckBoxClick()} />
          </div>
        </div>
        <div className="articleId">{article.id}</div>
        <div className="title">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
          <em>{`${
            article.commentCount === 0 ? "" : `[${article.commentCount}]`
          }`}</em>
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

export default UserLikedArticle;
