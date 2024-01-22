//UserPage에서 MyPage, MemberPage로 나뉘면 될 것 같습니다.
import styled from "styled-components";
import { useState } from "react";
import { useUserContext } from "../../../../contexts/UserContext";
import UserInfoPaginationBox from "./UserInfoPaginationBox";
const Wrapper = styled.div``;
const Header = styled.div`
  & > .userInfo {
    display: flex;
    & > .userThumb {
      display: inline-block;
      img {
        width: 80px;
        height: 80px;
      }
    }
    & > .text {
      margin-left: 20px;
      text-align: left;
      h2 {
        margin: 14px 0 0 0;
        font-size: 24px;
        line-height: 29px;
        font-weight: 700;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      & > .info {
        margin-top: 5px;
        font-size: 14px;
        & > span:nth-child(2) {
          margin-left: 17px;
        }
      }
    }
  }
`;
const Tab = styled.ul`
  display: flex;
  border-bottom: 1px solid #666;
  padding: 29px 0 18px 0;
  & > li {
    cursor: pointer;
    padding-bottom: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
  & > li:not(:first-child) {
    margin-left: 16px;
  }

  & > .active {
    color: #03c75a;
    font-weight: 700;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 2px;
      border-radius: 2px;
      background-color: #03c75a;
    }
  }
`;
const List = styled.div`
  & > .headerComment {
    display: flex;
    padding: 2px;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
  }
  & > .header {
    display: grid;
    height: 40px;
    grid-template-columns: 660px 120px 80px;
    & > div {
      display: flex;
      padding: 2px;
      box-sizing: border-box;
      color: #4e4e4e;
      font-size: 13px;
      font-weight: 700;
      justify-content: center;
      align-items: center;
    }
  }
`;
const exampleUserInfo = {
  userId: "gryffindorGoat",
  username: "harry potter",
  userNickname: "해리포터",
  rank: 3,
  visit_count: 23,
  my_article_count: 3,
};
const UserInfo = () => {
  const [tabSelectIndex, setTabSelectIndex] = useState<number>(0);
  const myInfo = useUserContext();
  // exampleUserInfo를 context로서 전달, checkBox 표시 여부는 userId 비교를 통해?
  // 아니면 list -> 요소 props 전달을 통해?
  const userInfo = exampleUserInfo;
  const infoList = [
    {
      id: 0,
      title: "작성글",
      dataList: <UserInfoPaginationBox id={0} bunch={3} userInfo={userInfo} />,
    },
    {
      id: 1,
      title: "작성댓글",
      dataList: <UserInfoPaginationBox id={1} bunch={13} userInfo={userInfo} />,
    },
    {
      id: 2,
      title: "댓글단 글",
      dataList: <UserInfoPaginationBox id={2} bunch={26} userInfo={userInfo} />,
    },
    {
      id: 3,
      title: "좋아요한 글",
      dataList: <UserInfoPaginationBox id={3} bunch={26} userInfo={userInfo} />,
    },
  ];

  return (
    <Wrapper>
      <Header>
        <div className="userInfo">
          <span className="userThumb">
            <img
              src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_363.png"
              alt="프로필 사진"
            />
          </span>
          <div className="text">
            <h2>{`${exampleUserInfo.userNickname}(${exampleUserInfo.userId})`}</h2>
            <div className="info">
              <span>
                방문 <strong>{exampleUserInfo.visit_count}</strong>
              </span>
              <span>
                작성글 <strong>{exampleUserInfo.my_article_count}</strong>
              </span>
            </div>
          </div>
        </div>
        <Tab>
          {infoList.map((info) => {
            if (exampleUserInfo.userId !== myInfo.userId) {
              if (info.id === 0 || info.id === 2) {
                return (
                  <li
                    key={info.id}
                    className={
                      info.id === tabSelectIndex ? "active" : "inactive"
                    }
                    onClick={() => setTabSelectIndex(info.id)}
                  >
                    {info.title}
                  </li>
                );
              }
            } else {
              return (
                <li
                  key={info.id}
                  className={info.id === tabSelectIndex ? "active" : "inactive"}
                  onClick={() => setTabSelectIndex(info.id)}
                >
                  {info.title}
                </li>
              );
            }
          })}
        </Tab>
      </Header>
      <List>
        {tabSelectIndex === 1 ? (
          <div className="headerComment">
            <div>댓글</div>
          </div>
        ) : (
          <div className="header">
            <div className="title">제목</div>
            <div className="date">작성일</div>
            <div className="viewCount">조회</div>
          </div>
        )}
        <div>
          {infoList.filter((info) => info.id === tabSelectIndex)[0].dataList}
        </div>
      </List>
    </Wrapper>
  );
};
export default UserInfo;
