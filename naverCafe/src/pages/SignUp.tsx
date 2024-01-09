import axios from "axios";
import { useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
`;
const Header = styled.div`
  height: 50px;
  padding: 16px 115px 16px 20px;
  box-sizing: border-box;
  a {
    display: block;
    background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
    background-size: 372px 326px;
    background-position: 0 -244px;
    background-repeat: no-repeat;
    width: 94px;
    height: 18px;
  }
`;
const Content = styled.div`
  padding: 30px 20px;
`;
const InfoBunch = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  margin: 10px 0px;
`;
const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  /* border-radius: ; */
  // border radius 값을 어떻게 주어야지 깔끔할지 모르겠습니다.
  input {
    cursor: pointer;
    border: none;
    outline: none;
    font-size: 16px;
  }
  & > button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  ${(props) => {
    switch (props.className) {
      case "id":
        return css`
          .idLogo {
            display: block;
            margin: 7.5px;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-position: -342px -64px;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
          }
          input {
            width: 314.08px;
            height: 22px;
            box-sizing: border-box;
          }
          .idNaver {
            color: #767678;
          }
        `;
      case "password":
        return css`
          .passwordLogo {
            display: block;
            margin: 7.5px;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-position: -310px 0;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
          }
          input {
            width: 361px;
            height: 22px;
          }
          button {
            display: block;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
            background-color: white;
            margin: 0px 17px 0px 7px;
            box-sizing: border-box;
          }
          .showPassword {
            background-position: -256px -296px;
          }
          .hidePassword {
            background-position: -256px -264px;
          }
        `;
      case "email":
        return css`
          .emailLogo {
            display: block;
            margin: 7.5px;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-position: -96px -296px;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
          }
          input {
            width: 405px;
            height: 22px;
            box-sizing: border-box;
          }
        `;
      case "name":
        return css`
          .nameLogo {
            display: block;
            margin: 7.5px;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-position: -342px -64px;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
          }
          input {
            width: 405px;
            height: 22px;
            box-sizing: border-box;
          }
        `;
      case "birth":
        return css`
          .birthLogo {
            display: block;
            margin: 7.5px;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-position: -192px -296px;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
          }
          input {
            width: 405px;
            height: 22px;
            box-sizing: border-box;
          }
        `;
      case "phoneNumber":
        return css`
          .phoneNumberLogo {
            display: block;
            margin: 7.5px;
            background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
            background-size: 372px 326px;
            background-position: -310px -128px;
            background-repeat: no-repeat;
            width: 30px;
            height: 30px;
          }
          input {
            width: 321px;
            height: 22px;
            box-sizing: border-box;
          }
        `;
    }
  }}
`;
const AuthDiv = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  padding: 14px;
  border: 1px solid #c6c6c6;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  & > button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
  }
  button {
    display: block;
    background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
    background-size: 372px 326px;
    background-position: -342px -200px;
    background-repeat: no-repeat;
    width: 22px;
    height: 22px;
    margin-right: 6px;
  }
  .authPaperChecked {
    background-position: -342px -224px;
  }
  .authPaperNotChecked {
    background-position: -342px -200px;
  }
  label {
    cursor: pointer;
    em {
      /* display: inline-block;
      vertical-align: middle; */
      // em 태그 안에 있는 글자([필수])가 세로 가운데 정렬이 안되어 보이는 문제 발생
      font-size: 13px;
      color: #09aa5c;
      margin-right: 4px;
    }
  }
  .authPaper {
    display: block;
    background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
    background-size: 372px 326px;
    background-position: -84px -232px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    padding: 11.5px 12px;
    background-clip: content-box;
    position: relative;
    left: 200px;
    // position: relative로 오른쪽 정렬을 하는 것이 적절한지 모르겠습니다.
  }
`;
const SignUpButton = styled.button`
  width: 460px;
  height: 52px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 20px;
  // position: absolute로 버튼의 위치를 조정하는 것이 적절한지 모르겠습니다.

  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: #09aa5c;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
  cursor: pointer;
`;

const SignUp = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userBirth, setUserBirth] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");

  const [errorId, setErrorId] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorBirth, setErrorBirth] = useState<boolean>(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<boolean>(false);

  //password 가시 여부를 나타내는 state
  const [isActiveShowPassword, setIsActiveShowPassword] =
    useState<boolean>(true);
  //인증 약관 동의 여부를 나타내는 state
  const [isAuthPaperChecked, setIsAuthPaperChecked] = useState<boolean>(false);

  const createAccount = () => {
    console.log({
      userId: userId,
      userPassword: userPassword,
      userEmail: userEmail,
      userName: userName,
      userBirth: userBirth,
      userPhoneNumber: userPhoneNumber,
    });
    return axios
      .post("", {
        userId: userId,
        username: userName,
        password: userPassword,
        email: userEmail,
        birthDate: userBirth,
        phoneNumber: userPhoneNumber,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Header>
        <a href="https://www.naver.com/"></a>
      </Header>
      <Content>
        <InfoBunch>
          <InfoDiv className="id">
            <span className="idLogo" />
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <span className="idNaver">@naver.com</span>
          </InfoDiv>
          <InfoDiv className="password">
            <span className="passwordLogo" />
            <input
              type={isActiveShowPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <button
              className={isActiveShowPassword ? "showPassword" : "hidePassword"}
              onClick={() => setIsActiveShowPassword(!isActiveShowPassword)}
            />
          </InfoDiv>
          <InfoDiv className="email">
            <span className="emailLogo" />
            <input
              type="text"
              placeholder="[선택] 비밀번호 분실 시 확인용 이메일"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </InfoDiv>
        </InfoBunch>

        <InfoBunch>
          <InfoDiv className="name">
            <span className="nameLogo" />
            <input
              type="text"
              placeholder="이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InfoDiv>
          <InfoDiv className="birth">
            <span className="birthLogo" />
            <input
              type="text"
              placeholder="생년월일 8자리"
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
            />
          </InfoDiv>
          <InfoDiv className="phoneNumber">
            <span className="phoneNumberLogo" />
            <input
              type="text"
              placeholder="휴대전화번호"
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
            />
          </InfoDiv>
        </InfoBunch>
        <AuthDiv>
          <button
            className={
              isAuthPaperChecked ? "authPaperChecked" : "authPaperNotchecked"
            }
            id="authPaperCheck"
            onClick={() => setIsAuthPaperChecked(!isAuthPaperChecked)}
          />
          <label htmlFor="authPaperCheck">
            <em>[필수]</em>
            인증 약관 전체동의
          </label>
          <button className="authPaper" />
        </AuthDiv>
      </Content>
      <SignUpButton onClick={() => createAccount()}>회원가입</SignUpButton>
    </Wrapper>
  );
};
export default SignUp;
