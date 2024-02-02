import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/UserAPI";
import axios from "axios";
import { baseURL } from "../Constants";

const Wrapper = styled.div`
  width: 458px;
  margin: 0 auto;
  .loginButton {
    width: 402px;
    height: 52px;
    background-color: #03c75a;
    margin-top: 16px;
    padding: 13px 0;
    color: white;
    border: solid 1px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    cursor: pointer;
  }
`;
const Header = styled.div`
  height: 186px;
  padding-bottom: 48px;
  box-sizing: border-box;
  & > a {
    display: inline-block;
    margin-top: 108px;
    background-position: 0 -51px;
    background-repeat: no-repeat;
    width: 155px;
    height: 30px;
    background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_00_common_978240a6.png);
    background-size: 244px 107px;
  }
`;

const LoginPannel = styled.div<{ $isIDLoginSelected: boolean }>`
  position: relative;
  & > .menu {
    display: flex;
    width: 458px;
    height: 66px;
    border: 1px solid #c6c6c6;
    border-bottom: 0;
    box-sizing: border-box;
    border-radius: 6px 6px 0 0;
    background-color: white;
    position: relative;
    bottom: -13px;
    & > li {
      padding: 17px 0 0;
      width: 50%;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      background-color: white;
      border-radius: inherit;
      cursor: pointer;
      /* 선택되지 않은 tab의 border는 더 연한 색이어야 하는데 어떻게 구현할지 고민이 필요할 것 같습니다. */
    }
    & > .idLogin {
      position: relative;
      color: ${(props) => (props.$isIDLoginSelected ? "#213547" : "#777")};
      z-index: ${(props) => (props.$isIDLoginSelected ? 2 : 0)};
      background-color: ${(props) =>
        props.$isIDLoginSelected ? "white" : "#f8f9fa"};
      /* before 가상 선택자는 ID 로그인의 Logo에 대한 작업입니다. */
      &::before {
        display: inline-block;
        content: "";
        ${(props) =>
          props.$isIDLoginSelected
            ? css`
                background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_008d5216.png);
                background-size: 266px 225px;
                background-position: -142px -172px;
              `
            : css`
                background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_0c98137b.png);
                background-size: 283px 246px;
                background-position: -131px -224px;
              `};
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      /* after 가상 선택자는 tab 선택에 따른 border 작업입니다. */
      &::after {
        ${(props) =>
          props.$isIDLoginSelected
            ? css`
                content: "";
                position: absolute;
                top: -1px;
                right: -8px;
                background-repeat: no-repeat;
                width: 15px;
                height: 62px;
                background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_008d5216.png);
                background-size: 266px 225px;
                background-position: 0 -139px;
              `
            : css``}
      }
    }
    & > .socialLogin {
      position: relative;
      color: ${(props) => (props.$isIDLoginSelected ? "#777" : "#213547")};
      z-index: ${(props) => (props.$isIDLoginSelected ? 0 : 2)};
      background-color: ${(props) =>
        props.$isIDLoginSelected ? "#f8f9fa" : "white"};
      /* before 가상 선택자는 tab 선택에 따른 border에 대한 작업입니다. */
      &::before {
        ${(props) =>
          props.$isIDLoginSelected
            ? css``
            : css`
                content: "";
                position: absolute;
                top: -1px;
                left: -8px;
                background-repeat: no-repeat;
                width: 15px;
                height: 62px;
                background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_0c98137b.png);
                background-size: 283px 246px;
                background-position: -212px 0;
              `}
      }
    }
  }
`;
const Inner = styled.div`
  width: 458px;
  min-height: 255px;
  padding: 20px 28px;
  border: 1px solid #c6c6c6;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 5px 8px 0 rgba(68, 68, 68, 0.04);
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  /* z-index를 1로 설정 */
  /* & > .loginButton {
    width: 402px;
    height: 52px;
    background-color: #03c75a;
    margin-top: 16px;
    padding: 13px 0;
    color: white;
    border: solid 1px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    cursor: pointer;
  } */
`;
const IDLogin = styled.div<{
  $inputUsernameLength: number;
  $inputPasswordLength: number;
  $isLoginMaintained: boolean;
}>`
  & > .id,
  & > .password {
    display: flex;
    width: 402px;
    height: 48px;
    padding: 14px 17px 13px;
    border: 1px solid #dadada;
    box-sizing: border-box;
    position: relative;
    &:focus-within {
      border-color: #03c75a;
      & > .idLogo {
        background-position: -75px -203px;
      }
      & > .passwordLogo {
        background-position: -111px -203px;
      }
    }
    /* :focus-within 을 사용하면, 자식 요소가 focus되었을 때 부모요소에 효과를 줄 수 있다. */
    & > input {
      border: none;
      outline: none;
      width: 342px;
      height: 19px;
      padding-right: 30px;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
    }
  }
  & > .id {
    border-radius: 6px 6px 0 0;
    align-items: center;
    & > .idLogo {
      width: 16px;
      height: 16px;
      background-position: -93px -203px;
      background-repeat: no-repeat;
      background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_008d5216.png);
      background-size: 266px 225px;
      margin-right: 8px;
    }
    & > .deleteLogo {
      display: ${(props) =>
        props.$inputUsernameLength !== 0 ? "inline-block" : "none"};
    }
  }
  & > .password {
    border-radius: 0 0 6px 6px;
    align-items: center;
    & > .passwordLogo {
      width: 16px;
      height: 16px;
      background-position: -129px -203px;
      background-repeat: no-repeat;
      background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_008d5216.png);
      background-size: 266px 225px;
      margin-right: 8px;
    }
    & > .deleteLogo {
      display: ${(props) =>
        props.$inputPasswordLength !== 0 ? "inline-block" : "none"};
    }
  }
  .deleteLogo {
    width: 18px;
    height: 18px;
    background-position: -244px -187px;
    background-repeat: no-repeat;
    background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_008d5216.png);
    background-size: 266px 225px;
    position: absolute;
    right: 17px;
    cursor: pointer;
  }

  /* 로그인할 때 추가 설정(로그인 상태 유지, IP 보안 설정) */
  /* IP 보안의 경우, 실제 사용할 일이 없을 거 같아서 미완성인 상태로 놔두었습니다. */
  & > .loginSetting {
    height: 20px;
    position: relative;
    margin-top: 10px;
    & > .maintainLogin {
      position: absolute;
      left: 0;
      & > label {
        display: flex;
        align-items: center;
        color: #777;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;
        cursor: pointer;
      }
      & > label::before {
        display: inline-block;
        content: "";
        width: 18px;
        height: 18px;
        background-position: ${(props) =>
          props.$isLoginMaintained ? "-244px -167px" : "-244px -87px"};
        background-repeat: no-repeat;
        background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_008d5216.png);
        background-size: 266px 225px;
        margin-right: 5px;
      }
    }
    & > .IPSecurity {
      position: absolute;
      right: 0;
      & > label {
        display: flex;
        align-items: center;
        color: #777;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;
        cursor: pointer;
      }
    }
  }
  & > .errorMessage {
    margin-top: 24px;
    display: inline-block;
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    color: #ff003e;
    text-align: left;
  }
`;
const SocialLogin = styled.div`
  & > .loginButton {
    position: relative;
    top: 55px;
    & > a {
      color: #fff;
    }
  }
`;

const Find = styled.div`
  margin-top: 20px;
  & > ul {
    display: flex;
    justify-content: center;
    & > li {
      cursor: pointer;
      & > a {
        font-size: 14px;
        line-height: 17px;
        color: #888;
      }
    }
    & > li:nth-child(2),
    & > li:nth-child(3) {
      padding-left: 28px;
      &::before {
        content: "|";
        color: #dadada;
        position: relative;
        left: -14px;
      }
    }
  }
`;
const Login = () => {
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [isIDLoginSelected, setIsIDLoginSelected] = useState<boolean>(true);
  const [isLoginMaintained, setIsLoginMaintained] = useState<boolean>(false);

  const [isErrorOnId, setIsErrorOnId] = useState<boolean>(false);
  const [isErrorOnPassword, setIsErrorOnPassword] = useState<boolean>(false);
  const [isErrorOnBoth, setIsErrorOnBoth] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("activated!");
    const getCodeFromURL = () => {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);
      if (code) {
        if (localStorage.getItem("accessToken")) {
          navigate("/");
        } else {
          exchangeCodeForToken(code);
        }
      }
    };

    const exchangeCodeForToken = async (code: string) => {
      try {
        const tokenResponse = await axios.get(
          baseURL + `/api/v1/auth/socialSignin/naver?code=${code}`
        );
        const tokenData = await tokenResponse.data;
        console.log(tokenData);
        localStorage.setItem("accessToken", tokenData.accessToken);
        navigate("/");
      } catch (error) {
        console.error("Error exchanging code for token:", error);
      }
    };

    getCodeFromURL();
  }, []);

  const handleLogin = async () => {
    setIsErrorOnBoth(false);
    if (inputUsername.length == 0) {
      setIsErrorOnId(true);
      return;
    } else {
      setIsErrorOnId(false);
    }
    if (inputPassword.length === 0) {
      setIsErrorOnPassword(true);
      return;
    } else {
      setIsErrorOnPassword(false);
    }
    await login({ username: inputUsername, password: inputPassword })
      .then(async (res) => {
        console.log(res);
        window.localStorage.setItem("accessToken", res.data.accessToken);
        console.log(res.data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsErrorOnBoth(true);
      });
  };

  return (
    <Wrapper>
      <Header>
        <a href="https://www.naver.com/" />
      </Header>
      <LoginPannel $isIDLoginSelected={isIDLoginSelected}>
        <ul className="menu">
          <li className="idLogin" onClick={() => setIsIDLoginSelected(true)}>
            ID 로그인
          </li>
          <li
            className="socialLogin"
            onClick={() => setIsIDLoginSelected(false)}
          >
            소셜 로그인
          </li>
        </ul>
        <Inner>
          {isIDLoginSelected ? (
            <IDLogin
              $inputUsernameLength={inputUsername.length}
              $inputPasswordLength={inputPassword.length}
              $isLoginMaintained={isLoginMaintained}
            >
              <div className="id">
                <span className="idLogo" />
                <input
                  type="text"
                  placeholder="아이디"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                />
                <span
                  className="deleteLogo"
                  onClick={() => setInputUsername("")}
                />
              </div>
              <div className="password">
                <span className="passwordLogo" />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <span
                  className="deleteLogo"
                  onClick={() => setInputPassword("")}
                />
              </div>
              <div className="loginSetting">
                <div className="maintainLogin">
                  <label
                    htmlFor=""
                    onClick={() => setIsLoginMaintained(!isLoginMaintained)}
                  >
                    로그인 상태 유지
                  </label>
                </div>
                <div className="IPSecurity">
                  <label htmlFor="">IP 보안</label>
                </div>
              </div>
              <div className="errorMessage">
                {isErrorOnId ? <span>아이디를 입력해 주세요.</span> : <></>}
                {isErrorOnPassword ? (
                  <span>비밀번호를 입력해 주세요.</span>
                ) : (
                  <></>
                )}
                {isErrorOnBoth ? (
                  <span>
                    아이디(로그인 전용 아이디) 또는 비밀번호를 잘못
                    입력했습니다.
                    <br />
                    입력하신 내용을 다시 확인해주세요.
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <button className="loginButton" onClick={() => handleLogin()}>
                로그인
              </button>
            </IDLogin>
          ) : (
            <SocialLogin>
              <button className="loginButton">
                <a href="https://nid.naver.com/oauth2.0/authorize?client_id=OemkbWdkEHFr93oA3sxR&redirect_uri=https://wafflecafe.site/login&response_type=code&state=STATE_STRING">
                  Naver로 로그인
                </a>
              </button>
            </SocialLogin>
          )}
        </Inner>
        <Find>
          <ul>
            <li>
              <Link to={"/login"}>비밀번호 찾기</Link>
            </li>
            <li>
              <Link to={"/login"}>아이디 찾기</Link>
            </li>
            <li>
              <Link to={"/signup"}>회원가입</Link>
            </li>
          </ul>
        </Find>
      </LoginPannel>
    </Wrapper>
  );
};
export default Login;
