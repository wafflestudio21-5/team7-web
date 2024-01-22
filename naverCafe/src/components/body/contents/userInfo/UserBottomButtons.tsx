import styled, { css } from "styled-components";
import { useUserContext } from "../../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotCheckedModal from "./NotCheckedModal";

const Wrapper = styled.div<{
  $myInfoUserId: string;
  $userInfoUserId: string;
}>`
  height: 34px;
  margin: 10px 0 20px 4px;
  position: relative;
  .auth {
    ${(props) => {
      if (props.$myInfoUserId !== props.$userInfoUserId) {
        return css`
          display: none;
        `;
      }
    }}
  }
  & > .left {
    position: absolute;
    left: 0;
    & > .checkAll {
      font-size: 13px;
      button {
        width: 14px;
        height: 14px;
        border: none;
        outline: none;
        cursor: pointer;
        margin-right: 14px;
      }
      & > .checked {
        background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-on.svg?ed25ed391f00228242d83867666d617e=);
      }
      & > .notChecked {
        background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-off.svg?35434b8085dcc93722a1fc0df301bcf1=);
      }
    }
  }
  & > .right {
    display: flex;
    position: absolute;
    right: 0;
    & > div > button {
      height: 34px;
      font-size: 12px;
      line-height: 34px;
      padding: 0 14px;
      border: transparent;
      background: #eff0f2;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
    }
    & > .delete button {
    }
    & > .writeArticle {
      margin-left: 10px;
    }
  }
`;

interface PropsUserBottomButtons {
  id: number;
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
  articleIdList?: number[];
  checkedArticleIdList?: number[];
  setCheckedArticleIdList?: (value: number[]) => void;
  likedArticleList?: number[];
  checkedLikedArticleIdList?: number[];
  setCheckedLikedArticleIdList?: (value: number[]) => void;
}
const UserBottomButtons = ({
  id,
  userInfo,
  articleIdList,
  checkedArticleIdList,
  setCheckedArticleIdList,
  likedArticleList,
  checkedLikedArticleIdList,
  setCheckedLikedArticleIdList,
}: PropsUserBottomButtons) => {
  const myInfo = useUserContext();
  const [isCheckAllArticleClicked, setIsCheckAllArticleClicked] =
    useState<boolean>(false);
  const [isCheckAllLikedArticleClicked, setIsCheckAllLikedArticleClicked] =
    useState<boolean>(false);
  const [isNotCheckedModalOpen, setIsNotCheckedModalOpen] =
    useState<boolean>(false);

  // "작성글" tab 전체 선택에 대한 useEffect와 함수입니다.
  useEffect(() => {
    if (checkedArticleIdList && articleIdList && setCheckedArticleIdList) {
      if (checkedArticleIdList.length === articleIdList.length) {
        setIsCheckAllArticleClicked(true);
      } else if (checkedArticleIdList.length < articleIdList.length) {
        setIsCheckAllArticleClicked(false);
      }
    }
  }, [articleIdList, checkedArticleIdList, setCheckedArticleIdList]);
  const handleCheckAllArticles = () => {
    if (isCheckAllArticleClicked) {
      // all checked -> none of them checked로
      setIsCheckAllArticleClicked(false);
      if (setCheckedArticleIdList) {
        setCheckedArticleIdList([]);
      }
    } else {
      // none of them checked -> all checked로
      setIsCheckAllArticleClicked(true);
      if (setCheckedArticleIdList && articleIdList) {
        setCheckedArticleIdList(articleIdList);
      }
    }
  };
  const handleDeleteArticle = () => {
    if (checkedArticleIdList?.length === 0) {
      setIsNotCheckedModalOpen(true);
    } else {
      alert("게시글을 삭제하시겠습니까?");
      //   checkedArticleIdList?.map((articleId) => {
      //     // delete요청
      //   });
      if (setCheckedArticleIdList) {
        setCheckedArticleIdList([]);
      }
    }
  };

  //   "좋아요한 글" tab 전체 선택에 대한 useEffect와 함수입니다.
  useEffect(() => {
    if (
      checkedLikedArticleIdList &&
      likedArticleList &&
      setCheckedLikedArticleIdList
    ) {
      if (checkedLikedArticleIdList.length === likedArticleList.length) {
        setIsCheckAllLikedArticleClicked(true);
      } else if (checkedLikedArticleIdList.length < likedArticleList.length) {
        setIsCheckAllLikedArticleClicked(false);
      }
    }
  }, [
    checkedLikedArticleIdList,
    setCheckedLikedArticleIdList,
    likedArticleList,
  ]);
  const handleCheckAllLikedArticles = () => {
    if (isCheckAllLikedArticleClicked) {
      setIsCheckAllLikedArticleClicked(false);
      if (setCheckedLikedArticleIdList) {
        setCheckedLikedArticleIdList([]);
      }
    } else {
      setIsCheckAllLikedArticleClicked(true);
      if (setCheckedLikedArticleIdList && likedArticleList) {
        setCheckedLikedArticleIdList(likedArticleList);
      }
    }
  };
  const handleDeleteLikedArticle = () => {
    if (checkedLikedArticleIdList?.length === 0) {
      setIsNotCheckedModalOpen(true);
    } else {
      alert("게시글을 삭제하시겠습니까?");
      //   checkedLikedArticleIdList?.map((articleId) => {
      //     // delete요청
      //   });
      if (setCheckedLikedArticleIdList) {
        setCheckedLikedArticleIdList([]);
      }
    }
  };

  if (id === 0) {
    return (
      <Wrapper $myInfoUserId={myInfo.userId} $userInfoUserId={userInfo.userId}>
        {isNotCheckedModalOpen ? (
          <NotCheckedModal
            setIsNotCheckedModalOpen={setIsNotCheckedModalOpen}
          />
        ) : null}
        <div className="left">
          <div className="checkAll auth">
            <button
              className={isCheckAllArticleClicked ? "checked" : "notChecked"}
              onClick={() => handleCheckAllArticles()}
            />
            <span>전체선택</span>
          </div>
        </div>
        <div className="right">
          <div className="delete auth">
            <button onClick={() => handleDeleteArticle()}>삭제</button>
          </div>
          <div className="writeArticle">
            <button>
              <Link to={"/write"}>글쓰기</Link>
            </button>
          </div>
        </div>
      </Wrapper>
    );
  } else if (id === 1) {
    return (
      <Wrapper $myInfoUserId={myInfo.userId} $userInfoUserId={userInfo.userId}>
        <div className="right">
          <div className="writeArticle">
            <button>
              <Link to={"/write"}>글쓰기</Link>
            </button>
          </div>
        </div>
      </Wrapper>
    );
  } else if (id === 2) {
    return (
      <Wrapper $myInfoUserId={myInfo.userId} $userInfoUserId={userInfo.userId}>
        <div className="right">
          <div className="writeArticle">
            <button>글쓰기</button>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper $myInfoUserId={myInfo.userId} $userInfoUserId={userInfo.userId}>
        {isNotCheckedModalOpen ? (
          <NotCheckedModal
            setIsNotCheckedModalOpen={setIsNotCheckedModalOpen}
          />
        ) : null}
        <div className="left">
          <div className="checkAll auth">
            <button
              className={
                isCheckAllLikedArticleClicked ? "checked" : "notChecked"
              }
              onClick={() => handleCheckAllLikedArticles()}
            />
            <span>전체선택</span>
          </div>
        </div>
        <div className="right">
          <div className="cancelLike auth">
            <button onClick={() => handleDeleteLikedArticle()}>
              좋아요 취소
            </button>
          </div>
          <div className="writeArticle">
            <button>글쓰기</button>
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default UserBottomButtons;
