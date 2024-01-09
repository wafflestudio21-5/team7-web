import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  width: 1080px;
  height: 67px;
  box-sizing: border-box;
  margin: 60px 0px 0px;
  padding: 24px 90px 24px 0px;
  text-align: left;
  border-top: 2px solid #333;
  align-items: center;
  position: relative;
  /* 네이버 카페 로고의 position을 absolute로 설정하기 위해 Wrapper의 position을 relative로 설정하였습니다. */

  .cafeName {
    font-size: 13px;
    font-weight: bold;
    &::after {
      content: "|";
      margin: 0 12px;
      color: #e5e5e5;
    }
  }
  .cafeLink {
    height: 19.49px;
    // 앞 .cafeName에서 정해진 19.49px이라는 높이를 그대로 사용하여 위치를 조정하는 것이 적절한지 모르겠습니다.
    & > a {
      vertical-align: top;
      font-size: 13px;
      font-weight: 400;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  & > a {
    /* Link 태그에 대한 css입니다. */
    vertical-align: top;
  }
  .cafeLogo {
    display: inline-block;
    width: 91px;
    height: 16px;
    background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
    background-repeat: no-repeat;
    background-position: -4px -4px;
    position: absolute;
    right: 0;
    top: 25px;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <span className="cafeName">{"{카페 이름}"}</span>
      <span className="cafeLink">
        <Link to={`/`}>{"{https://cafe.naver.com/toyprojecttest}"}</Link>
      </span>
      <Link to={"/"}>
        <span className="cafeLogo"></span>
      </Link>
    </Wrapper>
  );
};

export default Footer;
