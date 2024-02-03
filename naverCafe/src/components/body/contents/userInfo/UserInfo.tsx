//UserPage에서 MyPage, MemberPage로 나뉘면 될 것 같습니다.
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getUserInfo, useMyProfile } from "../../../../API/UserAPI";
import { UserInfoType } from "../../../../Types";

import UserArticleList from "./userRelatedList/UserArticleList";
import UserCommentList from "./userRelatedList/UserCommentList";
import UserCommentedArticleList from "./userRelatedList/UserCommentedArticleList";
import UserLikedArticleList from "./userRelatedList/UserLikedArticleList";

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
  & > .introduce {
    text-align: left;
    word-break: break-all;
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

const UserInfo = () => {
  const { nickname } = useParams();
  const userNickname = nickname ? nickname : "";
  const { myProfile } = useMyProfile();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  // 내 정보인지, 타인의 정보인지 알아봅니다.
  const [isMyInfo, setIsMyInfo] = useState<boolean>(false);

  const location = useLocation();
  // userInfo를 설정합니다.
  useEffect(() => {
    if (userNickname) {
      getUserInfo({ userNickname: userNickname })
        .then((res) => {
          console.log(res.data);
          return res.data.userInfo;
        })
        .then((res) => {
          setUserInfo({
            nickname: res.nickname,
            rank: res.rank,
            introduction: res.introduction,
            visitCount: res.visit_count,
            myArticleCount: res.my_article_count,
            myCommentCount: res.my_comment_count,
            registerDate: res.register_date,
            image: res.image,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [userNickname]);

  const [isAdmin, setIsAdmin] = useState(false);

  // 현재 보고 있는 게 나의 정보인지 아닌지 확인합니다.
  useEffect(() => {
    if (myProfile && userNickname) {
      if (myProfile.nickname === userNickname) {
        setIsMyInfo(true);
      } else {
        setIsMyInfo(false);
      }
    }

    setIsAdmin(userInfo?.rank === "ADMIN");
  }, [myProfile, userNickname]);

  const [tabSelectIndex, setTabSelectIndex] = useState<number>(0);
  const [checkedArticleIdList, setCheckedArticleIdList] = useState<number[]>(
    []
  );
  useEffect(() => {
    if (location.state) {
      setTabSelectIndex(location.state.onfocus);
    }
    setIsAdmin(userInfo?.rank === "ADMIN");
  }, [location.state]);
  console.log(location);

  const infoList = [
    {
      id: 0,
      select: "작성글",
      data: (
        <UserArticleList
          id={0}
          isMyInfo={isMyInfo}
          userNickname={userNickname as string}
          checkedArticleIdList={checkedArticleIdList}
          setCheckedArticleIdList={setCheckedArticleIdList}
        />
      ),
    },
    {
      id: 1,
      select: "작성댓글",
      data: (
        <UserCommentList
          id={1}
          isMyInfo={isMyInfo}
          userNickname={userNickname as string}
          checkedArticleIdList={checkedArticleIdList}
          setCheckedArticleIdList={setCheckedArticleIdList}
        />
      ),
    },
    {
      id: 2,
      select: "댓글단 글",
      data: (
        <UserCommentedArticleList
          id={2}
          isMyInfo={isMyInfo}
          userNickname={userNickname as string}
          checkedArticleIdList={checkedArticleIdList}
          setCheckedArticleIdList={setCheckedArticleIdList}
        />
      ),
    },
    {
      id: 3,
      select: "좋아요한 글",
      data: (
        <UserLikedArticleList
          id={3}
          isMyInfo={isMyInfo}
          // userNickname={userNickname as string}
          checkedArticleIdList={checkedArticleIdList}
          setCheckedArticleIdList={setCheckedArticleIdList}
        />
      ),
    },
  ];

  return (
    <Wrapper>
      <Header>
        <div className="userInfo">
          <span className="userThumb">
            <img
              src={
                userInfo?.image
                  ? userInfo.image
                  : "https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_363.png"
              }
              alt="프로필 사진"
            />
          </span>
          <div className="text">
            <h2>
              {`${userInfo?.nickname}`}
              {isAdmin && ` 관리자 ADMIN`}
            </h2>
            <div className="info">
              <span>
                방문 <strong>{userInfo?.visitCount}</strong>
              </span>
              <span>
                작성글 <strong>{userInfo?.myArticleCount}</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="introduce">{userInfo?.introduction}</div>
        <Tab>
          {infoList.map((info) => {
            if (!isMyInfo) {
              if (info.id === 0 || info.id === 2) {
                return (
                  <li
                    key={info.id}
                    className={
                      info.id === tabSelectIndex ? "active" : "inactive"
                    }
                    onClick={() => {
                      setCheckedArticleIdList([]);
                      setTabSelectIndex(info.id);
                    }}
                  >
                    {info.select}
                  </li>
                );
              }
            } else {
              return (
                <li
                  key={info.id}
                  className={info.id === tabSelectIndex ? "active" : "inactive"}
                  onClick={() => {
                    setCheckedArticleIdList([]);
                    setTabSelectIndex(info.id);
                  }}
                >
                  {info.select}
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
        <div className="list">
          {infoList.filter((info) => info.id === tabSelectIndex)[0].data}
        </div>
      </List>
    </Wrapper>
  );
};
export default UserInfo;
