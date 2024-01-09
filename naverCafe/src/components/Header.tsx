import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  width: 1080px;
  height: 215px;
  /* background-color: bisque; */
`;
const TopBarDiv = styled.div`
  /* 주의: styled-component는 대문자로 선언되어야 한다. */
  display: flex;
  height: 35px;
  border-bottom: 1px solid #ebebeb;
  font-size: 12px;
  align-items: center;
  box-sizing: border-box;
  a {
    color: #333333;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .naverLogo > img {
    width: 52px;
    height: 10px;
  }
  .link,
  .menu {
    position: relative;
    left: 595px;
    /* 모든 디자인 마친 뒤 left 속성 변경해야 할 것 같습니다. */
  }
  .link::after {
    margin: 1px 8px 0px 6px;
    content: "|";
    color: #e5e5e5;
  }
  .link > button {
    border: none;
    outline: none;
    background-color: inherit;
    cursor: pointer;
    /* width: 12px;
    height: 16px; */
    img {
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
    }
  }
  .menu {
    display: flex;
    align-items: center;
    .userInfo {
      width: 56.4px;
      height: 18px;
      margin-right: 7px;
      .userId {
        display: inline-block;
        text-align: left;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      img {
        border-top-color: #777;
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        margin: 8px 0px 0px 0px;
        border-top: 4px solid;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        vertical-align: top;
      }
    }
    .naverTalk {
      background: url(https://ssl.pstatic.net/static/common/gnb/one/sp_gnb_v16.png?v=202307);
      background-repeat: no-repeat;
      display: block;
      width: 20px;
      height: 20px;
      background-position: -260px -160px;
      margin: 0px 7px;
    }
    .other {
      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
      vertical-align: top;
      position: relative;
      background-position: -229px -68px;
      width: 23px;
      height: 23px;
    }
  }
`;
const CafeIntro = styled.div`
  width: 1080px;
  height: 180px;
  background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/bg_default_title_white_180724.png);
  background-size: 1080px 180px;
  & > a {
    text-decoration: none;
    div {
      padding-left: 25px;
      text-align: left;
      h1 {
        margin: 0 auto;
        font-size: 40px;
        line-height: 40px;
        color: rgb(33, 33, 33);
        /* margin-top: 100px; */
        padding-top: 85px;
      }
      p {
        color: rgb(102, 102, 102);
        padding-top: 8px;
        font-size: 13px;
        line-height: 24px;
        margin: 0 auto;
      }
    }
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <TopBarDiv>
        <a href="https://www.naver.com/" className="naverLogo">
          <img
            src="https://ssl.pstatic.net/static/cafe/icon_naver_190423.png"
            alt="네이버"
          />
        </a>
        <div className="link">
          <a href="">카페홈</a>
        </div>
        <div className="link">
          <a href="">이웃</a>
        </div>
        <div className="link">
          <a href="">가입카페</a>
          <button>
            <img
              src="https://cafe.pstatic.net/cafe4/hidden.gif"
              alt="가입카페"
            />
          </button>
        </div>
        <div className="link">
          <a href="">새글</a>
        </div>
        <div className="link">
          <a href="">내소식</a>
        </div>
        <div className="link">
          <a href="">채팅</a>
        </div>
        <div className="menu">
          <span className="userInfo">
            <span className="userId">userIDIDIDI </span>
            <img
              src="https://cafe.pstatic.net/cafe4/hidden.gif"
              alt="유저 정보"
            />
          </span>
          <span className="naverTalk" />
          <span className="other" />
        </div>
      </TopBarDiv>
      <CafeIntro>
        <a href="/">
          <div>
            <span>
              <h1>카페 이름</h1>
              <p>카페 주소</p>
            </span>
          </div>
        </a>
      </CafeIntro>
    </Wrapper>
  );
};
export default Header;
