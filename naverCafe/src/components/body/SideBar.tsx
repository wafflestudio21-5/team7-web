import styled, { css } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCafeInfo } from "../../API/CafeAPI";
import { waffleCafe } from "../../Constants";
import { useBoardGroup, useGetLikeBoard } from "../../API/BoardAPI";
import { CurrentBoardContext } from "../../contexts/BoardContext/CurrentBoardContext";
import { ArticleType, BoardType, UserInfoType } from "../../Types";
import { useMyProfile, withdrawCafe } from "../../API/UserAPI";
import { getUserInfo } from "../../API/UserAPI";
import CafeInfoModal from "./CafeInfoModal";
import WaffleManagerLogo from "../../assets/waffleManagerLogo.svg";
import { wholeArticle } from "../../API/ArticleAPI";

const Wrapper = styled.div`
  display: inline-block;
  width: 200px;
  height: 636px;
  /* height는 변할 수 있게 설정하는 것이 좋겠습니다. */
  /* background-color: aqua; */
`;
const Tab = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  border-top: 2px solid #000;
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
  /* & > button:nth-child(1) {
    border-right: 1px solid;
    border-color: #e5e5e5;
  } */
  /* 어떻게 중간 line을 만들지 모르겠습니다. */
  ${(props) => {
    if (props.className === "cafeInfo") {
      return css`
        & > button:first-child {
          color: #000;
        }
        & > button:last-child {
          color: #959595;
        }
      `;
    } else if (props.className === "myActivity") {
      return css`
        & > button:first-child {
          color: #959595;
        }
        & > button:last-child {
          color: #000;
        }
      `;
    }
  }}
  & > button {
    width: 100px;
    height: 38px;
    outline: none;
    border: none;
    background-color: inherit;
    padding: 0;
    font-weight: bold;
    cursor: pointer;
  }
`;
const CafeInfo = styled.div`
  width: 100%;
  /* height: 112.98px; */
  padding: 15px 10px 12px;
  box-sizing: border-box;
  .manager {
    box-sizing: border-box;
    .managerProfile {
      display: grid;
      grid-template-columns: 58px 122px;
      padding-bottom: 12px;
      border-bottom: 1px solid #ebebeb;

      /* .photo {
        img {
          border-radius: 50%;
          border: 1px solid;
        }
      } */

      .managerInfo {
        // manager의 프로필 사진, 이름, 개설날짜, 카페 소개 링크가 담긴 div 입니다.
        margin-left: 6px;
        & > p {
          text-align: left;
          font-size: 12px;
          line-height: 15px;
          color: #666;
          max-width: 100px;
          cursor: pointer;
        }
        & > p:hover {
          text-decoration: underline;
        }
        p:nth-child(1) {
          font-weight: bold;
          font-size: 13px;
          line-height: 17px;
          color: #000;
          margin-top: 3px;
        }
        p.cafeInfo {
          position: relative;
        }
      }
    }
  }
  .cafeInfo {
    // 카페 단계(ex. 씨앗1단계)와 카페 인원수를 담은 div입니다.
    padding: 12px 0px 0px;
    & > p {
      text-align: left;
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 13px;
      position: relative;
      & > .cafeState {
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 17px;
        margin: -2px 2px 0 0;
        background: url(https://cafe.pstatic.net/img/section/indi_cafe/ico_sprite_ranktbl.gif)
          no-repeat;
        vertical-align: top;
      }
      & > .peopleLogo {
        display: inline-block;
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_white_72ca546e.svg);
        background-repeat: no-repeat;
        vertical-align: top;
        background-position: -52px -66px;
        width: 16px;
        height: 14px;
        margin-right: 5px;
      }
      & > a {
        position: absolute;
        right: 0;
        color: #666666;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
const MyActivity = styled.div`
  .user {
    display: grid;
    grid-template-columns: 57.25px 122.75px;
    border-bottom: 1px solid #ebebeb;
    padding: 12px 10px;

    & > .userPhoto {
      position: relative;
      & > img {
        width: 57.25px;
        height: 57.25px;
        box-sizing: border-box;
      }
      & > .editUserInfo {
        display: inline-block;
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
        background-repeat: no-repeat;
        background-position: -172px -226px;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border: 0;
        outline: 0;
        z-index: 1;
        border-radius: 50%;
        position: absolute;
        top: 41.25px;
        right: 0px;
        cursor: pointer;
      }
    }
    & > .userInfo {
      margin-left: 6px;
      padding-top: 6px;
      text-align: left;
      & > a {
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      & > p {
        color: #666666;
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
  .userHistory {
    padding: 13px 10px;
    & > ul > li {
      font-size: 12px;
      line-height: 14px;
      margin-top: 6px;
      text-align: left;
      position: relative;
      & > span {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 5px;
        vertical-align: -1.4px;
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_white_72ca546e.svg);
        background-repeat: no-repeat;
      }
      &:nth-child(1) {
        margin-top: 0;
      }
      &:nth-child(2) > span {
        background-position: -119px -4px;
        height: 12px;
      }
      &:nth-child(3) > span {
        background-position: -59px -112px;
      }
      &:nth-child(4) > span {
        background-position: -119px -43px;
      }
      &:nth-child(5) > span {
        background-position: -119px -79px;
      }
      & > a:hover {
        text-decoration: underline;
      }
      & > em {
        position: absolute;
        right: 0;
        color: #666666;
        font-style: normal;
      }
    }
  }
`;

const Buttons = styled.div`
  button {
    width: 100%;
    height: 38px;
    margin-bottom: 9px;
    font-size: 13px;
    border-radius: 6px;
    background-color: #5a5a5a;
    border: none;
    font-weight: bold;
    line-height: 38px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  button:first-child {
    color: #fff;
  }
  button.login {
    background-color: #03c75a;
  }
  button.logout {
    color: #333;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }
`;
const Boards = styled.div<{ $isFavListChecked: boolean }>`
  border-top: 2px solid;
  .bookmarkedBoard {
    padding: 12px 11px 12px;
    font-size: 13px;
    font-weight: bold;
    line-height: 14px;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
    & > p > img:first-child {
      display: inline-block;
      margin-right: 3px;
      width: 12px;
      height: 12px;
      background-position: -102px -268px;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
    }
    & > p > img:last-child {
      border-top-color: #777;
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      margin: 5px 0px 0px 0px;
      ${(prop) =>
        prop.$isFavListChecked
          ? "border-bottom: 4px solid;"
          : "border-top: 4px solid;"}
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      vertical-align: top;
      position: absolute;
      right: 11px;
      cursor: pointer;
    }
  }
  .bookmarkedBoardList {
    display: ${(prop) => (prop.$isFavListChecked ? "block" : "none")};
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    p {
      color: #666;
      font-size: 12px;
      line-height: 16px;

      img {
        margin: 1px 3px 0 0;
        background-position: -44px -90px;
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_white_72ca546e.svg);
        width: 12px;
        height: 12px;
        display: inline-block;
        background-repeat: no-repeat;
        vertical-align: top;
        float: left;
      }
    }
    ul {
      padding: 0 10px;
      margin-top: 6px;
      font-size: 13px;
      line-height: 24px;
    }

    ul > li:first-child {
      margin-top: 2px;
    }
    ul > li:last-child {
      padding-bottom: 6px;
    }

    ul > li:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    ul > li > .list {
      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
      vertical-align: top;
      width: 10px;
      height: 11px;
      margin: 6px 5px 0 0;
      background-position: -306px -42px;
    }
  }
  .boards {
    margin: 6px 0px 0px;
    padding: 0px 0px 4px;
    font-size: 13px;
    line-height: 24px;
    text-align: left;
    border-bottom: 2px solid;
    div {
      padding: 0px 10px;
    }
    & > div > img {
      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
      vertical-align: top;
      width: 10px;
      height: 11px;
      margin: 6px 5px 0 0;
    }
    & > div:nth-child(1) > img {
      background-position: -306px -42px;
    }
    & > div:nth-child(2) {
      padding-bottom: 6px;
      //border-bottom: 1px solid #e5e5e5;
      & > img {
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/svg/ico-menu-hot.svg);
        background-size: 100%;
        background-repeat: no-repeat;
        height: 12px;
      }
    }
    & > div:nth-child(n + 3) {
      margin-top: 4px;
      & > img {
        background-position: -306px -42px;
      }
    }
    & > div:last-child {
      padding-bottom: 6px;
      border-bottom: 2px solid;
    }
    div > a:hover {
      text-decoration: underline;
    }
  }
`;
const RecentComments = styled.div`
  padding: 16px 12px;
  margin-top: 10px;
  margin-bottom: 8px;
  background-color: #f8f8f8;
  & > p {
    font-size: 13px;
    font-weight: bold;
    text-align: left;
  }

  li {
    font-size: 13px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: block;
    float: none;
    width: auto;
    line-height: 22px;
    text-align: left;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .ball {
    float: left;
    width: 3px;
    height: 3px;
    margin: 9px 8px 0 0;
  }

  img {
    border: 0;
    width: 3px;
    height: 3px;
    vertical-align: top;
  }
`;
const WithdrawCafeBox = styled.div`
  /* display: flex;
  align-items: center; */
  padding: 16px 12px;
  margin: 0px 0px 8px;
  background: #f8f8f8;
  color: #333333;
  font-size: 13px;
  height: 70px;
  box-sizing: border-box;
  text-align: left;
  & > span {
    display: inline-block;
    padding: 8px 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const CafeSmartBot = styled.div`
  margin-top: 10px;
  & > img {
    width: 200px;
    height: 64px;
  }
`;

const StyledDiv = styled.div<{ $isCurBoard: boolean }>`
  ${(prop) => (prop.$isCurBoard ? "font-weight:bold" : "")};

  &.totalBoard {
    display: flex;
    text-align: right;
    .articleNum {
      font-weight: 400;
      margin-left: auto;
    }
  }
`;
const StyledGroupTit = styled.div`
  position: relative;
  border-top: 2px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;

  word-break: break-all;
  word-wrap: break-word;
  text-align: left;
  margin: 0;
  height: 36px;

  h3 {
    margin: 0;
    padding: 0;
    font-size: 13px;
  }

  h3 > span {
    display: inline-block;
    max-width: 150px;
    padding: 12px 0 10px 0;
    font-size: 13px;
    line-height: 14px;
    vertical-align: top;
  }
`;
const StyledUl = styled.ul`
  padding: 0 10px;
  margin-top: 6px;
  font-size: 13px;
  line-height: 24px;

  li {
    margin-top: 2px;
    position: relative;
  }

  li > .list {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 6px 4px 0 0;
    border-left: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    vertical-align: top;
    float: left;
  }
  li > .brdimg {
    display: inline-block;
    background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
    background-repeat: no-repeat;
    vertical-align: top;
    margin: 6px 5px 0 0;
    background-position: -306px -42px;
    width: 10px;
    height: 11px;
    float: left;
  }
`;

const RedDot = () => {
  const style = {
    width: "7px",
    height: "7px",
    backgroundColor: "red",
    borderRadius: "50%",
    display: "inline-block",
    padding: "0",
    margin: "0 0 1px 5px",
  };
  return <div style={style} />;
};

const SideBar = () => {
  const liStyle = {
    fontWeight: "800",
  };
  const [articleNum, setArticleNum] = useState(0);
  wholeArticle(15, 1).then((res) => {
    setArticleNum(res.totalElements);
  });

  const [isCafeInfoChecked, setIsCafeInfoChecked] = useState<boolean>(true);
  const { myProfile } = useMyProfile();
  const [myInfo, setMyInfo] = useState<UserInfoType | null>(null);

  const [isCafeInfoModalOpen, setIsCafeInfoModalOpen] =
    useState<boolean>(false);

  const [isFavListChecked, setIsFavListChecked] = useState(false);

  const { favList, refetch } = useGetLikeBoard();
  const { groupList } = useBoardGroup();
  const { curBoardState, setCurBoardState } = useContext(CurrentBoardContext);
  const navigate = useNavigate();
  const [cafeInfo, setCafeInfo] = useState<{
    cafeName: string;
    createdAt: string;
    memberCnt: number;
  } | null>(null);

  const [titles, setTitles] = useState<string[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);

  async function LatestPosts(): Promise<{
    titles: string[];
    indexes: number[];
  }> {
    try {
      const res = await wholeArticle(15, 1);
      const titles = res.content.map((article: ArticleType) => article.title);
      const indexes = res.content.map((article: ArticleType) => article.id);
      return { titles, indexes };
    } catch (err) {
      console.error(err);
      return { titles: [], indexes: [] };
    }
  }

  useEffect(() => {
    if (myProfile) {
      refetch();
    }
  }, [curBoardState, isFavListChecked]);

  useEffect(() => {
    getCafeInfo()
      .then((res) => {
        console.log(res);
        setCafeInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    LatestPosts().then((result) => {
      if (result) {
        setTitles(result.titles);
        setIndexes(result.indexes);
      }
    });
  }, []);
  useEffect(() => {
    if (myProfile) {
      getUserInfo({ userNickname: myProfile.nickname })
        .then((res) => {
          console.log(res.data);
          return res.data.userInfo;
        })
        .then((res) => {
          setMyInfo({
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
  }, [myProfile]);

  const handleOnClickProfile = () => {
    console.log("yes");
    if (myProfile) {
      const url = `/users/${myProfile.nickname}/editInfo`;
      window.open(url, "_blank", "width=500, height=780");
      window.addEventListener("message", (event) => {
        if (event.data === "myProfileChanged") {
          navigate("/");
          window.location.reload();
        }
      });
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };
  const hanldeWithdrawCafe = () => {
    console.log("yes");
    if (myProfile) {
      // 배포시에는 링크 바꾸기!
      const url = `/users/${myProfile.nickname}/withdraw`;
      window.open(url, "_blank", "width=450, height=250");
      window.addEventListener("message", (event) => {
        if (event.data === "withdrawCafe") {
          withdrawCafe()
            .then(() => {
              navigate("/");
              localStorage.removeItem("accessToken");
              window.location.reload();
            })

            .catch((err) => {
              console.log(err);
              navigate("/");
              window.location.reload();
            });
        }
      });
    }
  };

  if (cafeInfo) {
    return (
      <Wrapper>
        <Tab className={isCafeInfoChecked ? "cafeInfo" : "myActivity"}>
          <button onClick={() => setIsCafeInfoChecked(true)}>카페정보</button>
          <button
            onClick={() => {
              if (myProfile === null) {
                if (
                  confirm(
                    "이 기능은 로그인해야만 사용할 수 있습니다.\n로그인하시겠습니까?"
                  ) === true
                ) {
                  navigate("/login");
                }
              } else {
                setIsCafeInfoChecked(false);
              }
            }}
          >
            나의활동
          </button>
        </Tab>
        {isCafeInfoChecked ? (
          <CafeInfo>
            <div className="manager">
              <div className="managerProfile">
                <div className="photo">
                  <img src={WaffleManagerLogo} alt="카페 메니저 사진" />
                </div>
                <div className="managerInfo">
                  <p>{waffleCafe.manager}</p>
                  <p>{waffleCafe.createdAt}</p>
                  <p
                    className="cafeIntroduce"
                    onMouseOver={() => setIsCafeInfoModalOpen(true)}
                    onMouseOut={() => setIsCafeInfoModalOpen(false)}
                  >
                    카페소개
                    {isCafeInfoModalOpen ? <CafeInfoModal /> : null}
                  </p>
                </div>
              </div>
              {/* <div className="manageCafe">
              <span>카페 관리</span>
              <span>통계</span>
            </div> */}
              {/* 카페 관리와 통게 링크는 등급이 매니저인 사람에게만 보이는 란인 것 같아 보류해두겠습니다. */}
            </div>
            <div className="cafeInfo">
              <p>
                <span className="cafeState" />
                씨앗 1단계
              </p>
              <p>
                <span className="peopleLogo" />
                {cafeInfo.memberCnt}
              </p>
            </div>
          </CafeInfo>
        ) : (
          <MyActivity>
            <div className="user">
              <div className="userPhoto">
                <img
                  src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_70.png"
                  alt="프로필 이미지"
                />
                <button
                  className="editUserInfo"
                  onClick={() => handleOnClickProfile()}
                />
              </div>
              <div className="userInfo">
                <Link to={`/users/${myInfo?.nickname}`}>
                  {myInfo?.nickname}
                </Link>
                <p>{myInfo?.registerDate}</p>
              </div>
            </div>
            <div className="userHistory">
              <ul>
                <li>{myInfo?.rank}</li>
                <li>
                  <span />
                  방문 횟수
                  <em>{myInfo?.visitCount}</em>
                </li>
                <li>
                  <span />
                  <Link
                    to={`/users/${myInfo?.nickname}`}
                    state={{ onfocus: 0 }}
                  >
                    내가 쓴 게시글
                  </Link>
                  <em>{myInfo?.myArticleCount}</em>
                </li>
                <li>
                  <span />
                  <Link
                    to={`/users/${myInfo?.nickname}`}
                    state={{ onfocus: 1 }}
                  >
                    내가 쓴 댓글
                  </Link>
                  <em>{myInfo?.myCommentCount}</em>
                </li>
                <li>
                  <span />
                  <Link to={`/`}>내 거래내역 보기</Link>
                </li>
              </ul>
            </div>
          </MyActivity>
        )}
        <Buttons>
          <button
            className={myProfile ? "writePost" : "login"}
            onClick={() => {
              if (myProfile) {
                navigate("/write");
              } else {
                navigate("/login");
              }
            }}
          >
            {myProfile ? "카페 글쓰기" : "로그인"}
          </button>
          <br />
          {myProfile ? (
            <button className="logout" onClick={() => handleLogOut()}>
              로그아웃
            </button>
          ) : null}
        </Buttons>
        <Boards $isFavListChecked={isFavListChecked}>
          {myProfile && (
            <>
              <div className="bookmarkedBoard">
                <p onClick={() => setIsFavListChecked(!isFavListChecked)}>
                  <img
                    src="https://cafe.pstatic.net/cafe4/hidden.gif"
                    alt="즐겨찾기"
                  />
                  즐겨찾는 게시판
                  <img
                    src="https://cafe.pstatic.net/cafe4/hidden.gif"
                    alt="즐겨찾기 더보기"
                  />
                </p>
              </div>
              <div className="bookmarkedBoardList">
                <ul className="favBoard">
                  {favList && favList.boards.length > 0 ? (
                    favList.boards
                      .sort((a, b) => a.id - b.id)
                      .map((favBoard: BoardType, index: number) => (
                        <li
                          className="favBoard"
                          key={index}
                          onClick={() => navigate(`/board/${favBoard.id}`)}
                          style={curBoardState === favBoard.id ? liStyle : {}}
                        >
                          <img
                            className="list"
                            src="https://cafe.pstatic.net/cafe4/hidden.gif"
                          />
                          {favBoard.name}
                        </li>
                      ))
                  ) : (
                    <li>
                      <p className="favNotice">
                        게시판 상단의{" "}
                        <img src="https://cafe.pstatic.net/cafe4/hidden.gif" />
                        아이콘을
                        <br /> 클릭하시면 추가됩니다.
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
          <div className="boards">
            <StyledDiv $isCurBoard={curBoardState === 0} className="totalBoard">
              <img
                src="https://cafe.pstatic.net/cafe4/hidden.gif"
                alt="전체글보기"
              />
              <Link
                to={`/totalboard`}
                onClick={() => {
                  setCurBoardState(0);
                }}
              >
                전체글보기
              </Link>
              <p className="articleNum">{articleNum}</p>
            </StyledDiv>
            <StyledDiv $isCurBoard={curBoardState === -1}>
              <img
                src="https://cafe.pstatic.net/cafe4/hidden.gif"
                alt="인기글"
              />
              <Link
                to={`/popularboard`}
                onClick={() => {
                  setCurBoardState(-1);
                }}
              >
                인기글
              </Link>
            </StyledDiv>
            {groupList &&
              groupList.boardGroups.map((group, index) => (
                <>
                  <StyledGroupTit className="cafe-menu-tit" key={index}>
                    <h3>
                      <span>{group.name}</span>
                    </h3>
                  </StyledGroupTit>
                  <StyledUl className="cafe-menu-list">
                    {group.boards.map((board, index) => (
                      <li>
                        <img
                          className="list"
                          src="https://cafe.pstatic.net/cafe4/hidden.gif"
                        ></img>
                        <img
                          className="brdimg"
                          src="https://cafe.pstatic.net/cafe4/hidden.gif"
                          alt={board.name}
                        />
                        <StyledDiv
                          key={index}
                          $isCurBoard={curBoardState === board.id}
                        >
                          <Link
                            to={`/board/${board.id}`}
                            onClick={() => {
                              setCurBoardState(board.id);
                            }}
                          >
                            {board.name}
                          </Link>
                          {board.isHot && <RedDot />}
                          {/* 추가기능: 인기 게시판일 때 게시판 옆에 빨간 점이 뜬다. */}
                        </StyledDiv>
                      </li>
                    ))}
                  </StyledUl>
                </>
              ))}

            {/* 그 외 게시판 새로 추가시 더해지는 기능이 있으면 좋겠습니다. */}
            {/* 그러러면 boards div 안에 있는 div들이 state로서 선언되면 될 것 같습니다. */}
          </div>
        </Boards>
        <RecentComments>
          <p>최신 게시글</p>
          <ul className="recentCommentList">
            {/* state로서 li 요소를 나타내면 좋을 것 같습니다. */}
            {/* 만약 요소의 개수가 0이라면 다른 text를 담는 것으로 하는 로직이면 좋을 것 같습니다. */}
            {titles.slice(0, 5).map((title, index) => (
              <li
                key={index}
                onClick={() => navigate(`/articles/${indexes[index]}`)}
                style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                <div className="ball">
                  <img src="	https://ssl.pstatic.net/static/cafe/cafe_pc/ico-blank.png" />
                </div>
                {title}
              </li>
            ))}
          </ul>
        </RecentComments>
        {myProfile ? (
          <WithdrawCafeBox>
            <span onClick={() => hanldeWithdrawCafe()}>카페탈퇴하기</span>
          </WithdrawCafeBox>
        ) : null}
        <CafeSmartBot>
          <img
            src="https://ssl.pstatic.net/static/cafe/banner_chatbot.png"
            alt="카페 스마트봇"
          />
        </CafeSmartBot>
      </Wrapper>
    );
  }
};
export default SideBar;

/*
미구현 사항-------------------------------------------------------------------------------------------

#1
원본 카페에서는 즐겨찾는 게시판에서 게시판을 클릭할 경우
클릭한 게시판이 강조 처리가 됩니다. (즐겨찾는 게시판의 '스프링' 게시판만, 밑에 있는 '스프링'은 강조 처리 안됨.)
그런데 그냥 즐겨찾는 게시판에는 강조 처리가 안되는 것으로 놔뒀습니다.

#2
원본 카페에서는 즐겨찾는 게시판 버튼을 클릭하면 새 창이 뜹니다.
그런데 새 창은 따로 뜨지 않는 것으로 구현했습니다. (구독 기능을 제외했기 때문에)

---------------------------------------------------------------------------------------------------
*/
