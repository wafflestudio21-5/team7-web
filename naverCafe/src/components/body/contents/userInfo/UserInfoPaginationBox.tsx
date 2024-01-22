import styled from "styled-components";
import { useMemo } from "react";
import UserBottomButtons from "./UserBottomButtons";
import UserRelatedArticleList from "./UserRelatedArticleList";

const Wrapper = styled.div``;
const UserRelatedArticleListUl = styled.ul`
  & > li:first-child {
    border-top: 1px solid #ebecef;
  }
  & > li {
    border-bottom: 1px solid #ebecef;
  }
`;
const BottomButtons = styled.div``;
const PageButtons = styled.div<{ $pageNumber: number }>`
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
  & > .active {
    font-weight: 700;
    background-color: #e5e7ea;
    &:hover {
      background-color: #d8d9dc;
    }
  }
`;

interface PropsUserInfoPaginationBox {
  bunch: number;
  id: number;
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
  pageNumber: number;
  setPageNumber: (value: number) => void;
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
}

const UserInfoPaginationBox = ({
  bunch,
  id,
  userInfo,
  pageNumber,
  setPageNumber,
  checkedArticleIdList,
  setCheckedArticleIdList,
}: PropsUserInfoPaginationBox) => {
  // checked 된 article의 id를 담는 list입니다.

  //   userRelatedArticleList입니다.
  const userRelatedArticleList = useMemo(() => {
    return UserRelatedArticleList({
      id,
      userInfo,
      checkedArticleIdList,
      setCheckedArticleIdList,
    });
  }, [id, checkedArticleIdList, userInfo, setCheckedArticleIdList]);

  // pageNumber 관리도 현재 컴포넌트 상에서 하고 싶은데, 그렇게 하면 다른 tab으로 옮겨질 때 오류가 나는 경우가 있어서...

  //   pagination 버튼의 총 개수입니다.
  const buttonNumber =
    Math.floor(userRelatedArticleList.length / bunch) +
    (userRelatedArticleList.length % bunch === 0 ? 0 : 1);

  //   {page: number, elements: JSX.Element}를 담는 리스트입니다.
  // elements는 bunch개씩 담겨있습니다.
  const newUserRelatedArticleList = useMemo(() => {
    const list = [];
    for (let i = 0; i < buttonNumber; i++) {
      list.push(userRelatedArticleList.slice(bunch * i, bunch * (i + 1)));
    }
    return list.map((elements, index) => {
      return {
        page: index + 1,
        elements: elements,
      };
    });
  }, [buttonNumber, userRelatedArticleList, bunch]);

  //   pagination button을 생성합니다.
  const paginationButtons = useMemo(() => {
    return newUserRelatedArticleList.map((element) => {
      return (
        <button
          key={element.page}
          className={element.page === pageNumber ? "active" : "inactive"}
          onClick={() => {
            setPageNumber(element.page);
            setCheckedArticleIdList([]);
          }}
        >
          {element.page}
        </button>
      );
    });
  }, [
    newUserRelatedArticleList,
    pageNumber,
    setCheckedArticleIdList,
    setPageNumber,
  ]);

  //   현재 보이는 page 상의 모든 article의 id를 모아둔 list입니다
  const articleIdList = newUserRelatedArticleList
    .filter((element) => element.page === pageNumber)[0]
    .elements.map((element) => Number(element.key));

  return (
    <Wrapper>
      <UserRelatedArticleListUl>
        {newUserRelatedArticleList
          .filter((element) => element.page === pageNumber)[0]
          .elements.reverse()}
      </UserRelatedArticleListUl>
      <BottomButtons>
        <UserBottomButtons
          id={id}
          userInfo={userInfo}
          checkedArticleIdList={checkedArticleIdList}
          setCheckedArticleIdList={setCheckedArticleIdList}
          articleIdList={articleIdList}
        />
      </BottomButtons>
      <PageButtons $pageNumber={pageNumber}>
        {paginationButtons.length === 1 ? null : paginationButtons}
      </PageButtons>
    </Wrapper>
  );
};

export default UserInfoPaginationBox;
