import styled from "styled-components";
import { useMemo, useState } from "react";
import UserBottomButtons from "./UserBottomButtons";

const Wrapper = styled.div``;
const UserRelatedList = styled.ul`
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
  children: JSX.Element;
  userRelatedList: JSX.Element[];
  bunch: number;
}

const UserInfoPaginationBox = ({
  children,
  userRelatedList,
  bunch,
}: PropsUserInfoPaginationBox) => {
  // 현재 보고 있는 page의 숫자입니다.
  const [pageNumber, setPageNumber] = useState<number>(1);

  //   pagination 버튼의 총 개수입니다.
  const buttonNumber =
    Math.floor(userRelatedList.length / bunch) +
    (userRelatedList.length % bunch === 0 ? 0 : 1);

  //   {page: number, elements: JSX.Element}를 담는 리스트입니다.
  // elements는 13개씩 담겨있습니다.
  const newUserRelatedList = useMemo(() => {
    const list = [];
    for (let i = 0; i < buttonNumber; i++) {
      list.push(userRelatedList.slice(bunch * i, bunch * (i + 1)));
    }
    return list.map((elements, index) => {
      return {
        page: index + 1,
        elements: elements,
      };
    });
  }, [buttonNumber, userRelatedList, bunch]);

  //   pagination button을 생성합니다.
  const paginationButtons = useMemo(() => {
    return newUserRelatedList.map((element) => {
      return (
        <button
          key={element.page}
          className={element.page === pageNumber ? "active" : "inactive"}
          onClick={() => setPageNumber(element.page)}
        >
          {element.page}
        </button>
      );
    });
  }, [newUserRelatedList, pageNumber]);

  //   전체 선택 기능 구현
  //   checked 된 article의 number 리스트
  const [checkedArticleIdList, setCheckedArticleIdList] = useState<number[]>(
    []
  );
  //   전체 선택 기능을 위한 check할 수 있는 article의 총 length입니다.
  const checkedListTotalLength = newUserRelatedList.filter(
    (element) => element.page === pageNumber
  )[0].elements.length;

  return (
    <Wrapper>
      <UserRelatedList>
        {
          newUserRelatedList.filter((element) => element.page === pageNumber)[0]
            .elements
        }
      </UserRelatedList>
      <BottomButtons>{children}</BottomButtons>
      <PageButtons $pageNumber={pageNumber}>
        {paginationButtons.length === 1 ? null : paginationButtons}
      </PageButtons>
    </Wrapper>
  );
};

export default UserInfoPaginationBox;
