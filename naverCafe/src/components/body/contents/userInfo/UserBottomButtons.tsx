import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotCheckedModal from "./NotCheckedModal";
import { deleteArticle, deleteLike } from "../../../../API/ArticleAPI";

const Wrapper = styled.div<{
  $isMyInfo: boolean;
}>`
  height: 34px;
  margin: 10px 0 20px 4px;
  position: relative;
  .auth {
    ${(props) => {
      if (!props.$isMyInfo) {
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
  & > .pageButtons {
    display: flex;
    justify-content: center;
    position: relative;
    top: 58px;
    button {
      background-color: inherit;
      border: none;
      font-size: 13px;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      box-sizing: border-box;
      margin: 0 4px;
    }
    button:hover {
      background-color: #f0f0f0;
    }
    & > li > .active {
      font-weight: 700;
      background-color: #e5e7ea;
      &:hover {
        background-color: #d8d9dc;
      }
    }
  }
`;

interface PropsUserBottomButtons {
  id: number;
  isMyInfo: boolean;
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
  articleIdList: number[];
  pageNumber: number;
  setPageNumber: (value: number) => void;
  totalPages: number;
  refetchUserArticles?: () => Promise<void>;
  refetchUserLikedArticles?: () => Promise<void>;
  setIsFirstRendering?: (value: boolean) => void;
}
const UserBottomButtons = ({
  id,
  isMyInfo,
  checkedArticleIdList,
  setCheckedArticleIdList,
  articleIdList,
  pageNumber,
  setPageNumber,
  totalPages,
  refetchUserArticles,
  refetchUserLikedArticles,
  setIsFirstRendering,
}: PropsUserBottomButtons) => {
  const [isCheckAllArticleClicked, setIsCheckAllArticleClicked] =
    useState<boolean>(false);
  const [isNotCheckedModalOpen, setIsNotCheckedModalOpen] =
    useState<boolean>(false);

  const handleCheckAllArticles = () => {
    if (isCheckAllArticleClicked) {
      // all checked -> none of them checked
      setIsCheckAllArticleClicked(false);
      setCheckedArticleIdList([]);
    } else {
      // none of them checked -> all checked
      setIsCheckAllArticleClicked(true);
      setCheckedArticleIdList(articleIdList);
    }
  };
  //   전체선택 버튼을 눌렀을 때 실행
  useEffect(() => {
    if (checkedArticleIdList.length === articleIdList.length) {
      setIsCheckAllArticleClicked(true);
    } else if (checkedArticleIdList.length < articleIdList.length) {
      setIsCheckAllArticleClicked(false);
    }
  }, [articleIdList, checkedArticleIdList]);

  const handleDeleteArticles = async () => {
    if (checkedArticleIdList.length === 0) {
      setIsNotCheckedModalOpen(true);
    } else {
      if (id === 0 && refetchUserArticles && setIsFirstRendering) {
        alert("게시글을 삭제하시겠습니까?");
        // await Promise.all을 해주어야지 article 삭제 작업이 완전히 완료될 때까지 기다렸다가 다음 코드가 실행됨
        // 만약 그냥 map(async () => await ~~) 이라면, 삭제 작업 각각은 비동기처리가 되기에, 아래의 await refetch 함수가 동기적으로 먼저 처리되게 됨
        // 그렇기에, refetch(비동기의 동기적 처리) => article 삭제(비동기) 순이 되므로, await Promise.all()을 해주는 것이 맞음
        await Promise.all(
          checkedArticleIdList.map((articleId) => {
            return deleteArticle(articleId);
          })
          // map 함수의 callback으로 async-await 함수가 들어가도 되는 이유: async 함수는 promise를 리턴하기 때문 -> await Promise.all은 배열의 모든 promise가 처리될 때까지 기다리기에 모든 작업을 기다려준다.
          // async 함수인데, await을 붙이지 않은 그냥 deleteArticle()만 실행했을 때 안되는 이유: map의 callback함수가 () => void이므로, promise를 반환하는 것이 아닌, void를 반환하기 때문 => promise.all이 인식을 못함
          // async - await callback과 같은 효과로, 그냥 promise를 반환하는 callback
        );
        setCheckedArticleIdList([]);
        setPageNumber(1);
        setIsFirstRendering(true);
        await refetchUserArticles();
      } else if (id === 3 && refetchUserLikedArticles && setIsFirstRendering) {
        alert("좋아요를 취소하시겠습니까?");
        await Promise.all(
          checkedArticleIdList.map((articleId) => {
            return deleteLike(articleId);
          })
        );
        setCheckedArticleIdList([]);
        setPageNumber(1);
        setIsFirstRendering(true);
        await refetchUserLikedArticles();
      }
      setCheckedArticleIdList([]);
    }
  };

  // pagination buttons입니다.
  const pageButtons =
    totalPages === 1
      ? null
      : Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={
                pageNumber === index + 1
                  ? "pageButton active"
                  : "pageButton inactive"
              }
              onClick={() => setPageNumber(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ));
  console.log(totalPages);

  if (id === 0) {
    return (
      <Wrapper $isMyInfo={isMyInfo}>
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
            <button onClick={() => handleDeleteArticles()}>삭제</button>
          </div>
          <div className="writeArticle">
            <button>
              <Link to={"/write"}>글쓰기</Link>
            </button>
          </div>
        </div>
        <div className="pageButtons">{pageButtons}</div>
      </Wrapper>
    );
  } else if (id === 1) {
    return (
      <Wrapper $isMyInfo={isMyInfo}>
        <div className="right">
          <div className="writeArticle">
            <button>
              <Link to={"/write"}>글쓰기</Link>
            </button>
          </div>
        </div>
        <div className="pageButtons">{pageButtons}</div>
      </Wrapper>
    );
  } else if (id === 2) {
    return (
      <Wrapper $isMyInfo={isMyInfo}>
        <div className="right">
          <div className="writeArticle">
            <button>글쓰기</button>
          </div>
        </div>
        <div className="pageButtons">{pageButtons}</div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper $isMyInfo={isMyInfo}>
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
          <div className="cancelLike auth">
            <button onClick={() => handleDeleteArticles()}>좋아요 취소</button>
          </div>
          <div className="writeArticle">
            <button>글쓰기</button>
          </div>
        </div>
        <div className="pageButtons">{pageButtons}</div>
      </Wrapper>
    );
  }
};

export default UserBottomButtons;
