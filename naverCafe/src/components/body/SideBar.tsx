import styled, { css } from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        margin: -2px 6px 0 0;
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

    & > .userPhoto > img {
      width: 57.25px;
      height: 57.25px;
      box-sizing: border-box;
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
      }
    }
  }
`;

const Buttons = styled.div`
  button:first-child {
    width: 100%;
    height: 38px;
    margin-bottom: 9px;
    font-size: 13px;
    color: #fff;
    border-radius: 6px;
    background-color: #5a5a5a;
    border: none;
    font-weight: bold;
    line-height: 38px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  button:last-child {
    width: 100%;
    height: 38px;
    margin-bottom: 9px;
    font-size: 13px;
    color: #333;
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    font-weight: bold;
    line-height: 38px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Boards = styled.div`
  border-top: 2px solid;
  .bookmarkedBoard {
    padding: 12px 11px 9px;
    font-size: 13px;
    font-weight: bold;
    line-height: 14px;
    text-align: left;
    border-bottom: 1px soild #e5e5e5;
    position: relative;
    :hover {
      text-decoration: underline;
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
      border-top: 4px solid;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      vertical-align: top;
      position: absolute;
      right: 11px;
      cursor: pointer;
    }
    /* .bookmarkedBoardList {
    } */
  }
  .boards {
    margin: 6px 0px 0px;
    padding: 0px 10px;
    font-size: 13px;
    line-height: 24px;
    text-align: left;
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
      border-bottom: 1px solid #e5e5e5;
      & > img {
        background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/svg/ico-menu-hot.svg);
        background-size: 100%;
        background-repeat: no-repeat;
        height: 12px;
      }
    }
    & > div:nth-child(3) {
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
  background-color: #f8f8f8;
  & > p {
    font-size: 13px;
    font-weight: bold;
    text-align: left;
  }
`;
const CafeSmartBot = styled.div`
  margin-top: 10px;
  & > img {
    width: 200px;
    height: 64px;
  }
`;

const SideBar = () => {
  const [isCafeInfoChecked, setIsCafeInfoChecked] = useState<boolean>(true);

  return (
    <Wrapper>
      <Tab className={isCafeInfoChecked ? "cafeInfo" : "myActivity"}>
        <button onClick={() => setIsCafeInfoChecked(true)}>카페정보</button>
        <button onClick={() => setIsCafeInfoChecked(false)}>나의활동</button>
      </Tab>
      {isCafeInfoChecked ? (
        <CafeInfo>
          <div className="manager">
            <div className="managerProfile">
              <div className="photo">
                <img
                  src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_thumb_noimg_55.png"
                  alt="카페 메니저 사진"
                />
              </div>
              <div className="managerInfo">
                <p>메니저 이름</p>
                <p>2024.00.00 개설</p>
                <p>카페소개</p>
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
              카페 인원수
              <Link to={`/`}>초대</Link>
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
            </div>
            <div className="userInfo">
              <Link to={`/`}>user 이름</Link>
              <p>2024.00.00 가입</p>
            </div>
          </div>
          <div className="userHistory">
            <ul>
              <li>user 직책</li>
              <li>
                <span />
                방문 횟수
                <em>n회</em>
              </li>
              <li>
                <span />
                <Link to={`/`}>내가 쓴 게시글</Link>
                <em>n개</em>
              </li>
              <li>
                <span />
                <Link to={`/`}>내가 쓴 댓글</Link>
                <em>2개</em>
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
        <button className="writePost">카페 글쓰기</button>
        <br />
        <button className="cafeChat">카페 채팅</button>
      </Buttons>
      <Boards>
        <div className="bookmarkedBoard">
          <p>
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
          <div className="bookmarkedBoardList"></div>
        </div>
        <div className="boards">
          <div>
            <img
              src="https://cafe.pstatic.net/cafe4/hidden.gif"
              alt="전체글보기"
            />
            <Link to={`/`}>전체글보기</Link>
          </div>
          <div>
            <img src="https://cafe.pstatic.net/cafe4/hidden.gif" alt="인기글" />
            <Link to={`/`}>인기글</Link>
          </div>
          <div>
            <img
              src="https://cafe.pstatic.net/cafe4/hidden.gif"
              alt="자유게시판"
            />
            <Link to={`/`}>자유게시판</Link>
          </div>
          {/* 그 외 게시판 새로 추가시 더해지는 기능이 있으면 좋겠습니다. */}
          {/* 그러러면 boards div 안에 있는 div들이 state로서 선언되면 될 것 같습니다. */}
        </div>
      </Boards>
      <RecentComments>
        <p>최신 댓글ㆍ답글</p>
        <ul className="recentCommentList">
          {/* state로서 li 요소를 나타내면 좋을 것 같습니다. */}
          {/* 만약 요소의 개수가 0이라면 다른 text를 담는 것으로 하는 로직이면 좋을 것 같습니다. */}
        </ul>
      </RecentComments>
      <CafeSmartBot>
        <img
          src="https://ssl.pstatic.net/static/cafe/banner_chatbot.png"
          alt="카페 스마트봇"
        />
      </CafeSmartBot>
    </Wrapper>
  );
};
export default SideBar;
