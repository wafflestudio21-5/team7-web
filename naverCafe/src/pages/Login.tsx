import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;
const NaverLogo = styled.a`
  background-image: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-size: 372px 326px;
  /* width: 50px;
  height: 50px; */
`;
const InputInfo = styled.input`
  display: block;
  width: 460px;
  height: 50px;
  margin: 0 auto;
`;

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userBirth, setUserBirth] = useState<string>("");
  const [userNationality, setUserNationality] =
    useState<string>("대한한국 +82");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");

  const [errorId, setErrorId] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorBirth, setErrorBirth] = useState<boolean>(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<boolean>(false);

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
      <div>
        header
        <NaverLogo></NaverLogo>
      </div>

      <div>
        <div>
          <InputInfo
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <InputInfo
            type="text"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <InputInfo
            type="text"
            placeholder="[선택] 비밀번호 분실 시 확인용 이메일"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <InputInfo
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <InputInfo
          type="text"
          placeholder="생년월일 8자리"
          value={userBirth}
          onChange={(e) => setUserBirth(e.target.value)}
        />
        {/* <ul>
          <li onClick={() => setUserSex("male")}>남자</li>
          <li onClick={() => setUserSex("female")}>여자</li>
          <li onClick={() => setUserSex("none")}>선택안함</li>
        </ul> */}
        <InputInfo
          type="text"
          placeholder="휴대전화번호"
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
        <button>{userNationality}</button>
        <button onClick={() => createAccount()}>회원가입</button>
      </div>
    </Wrapper>
  );
};
export default Login;
