import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userBirth, setUserBirth] = useState<string>("");
  const [userSex, setUserSex] = useState<string>("");
  const [userNationality, setUserNationality] =
    useState<string>("대한한국 +82");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");

  const [errorId, setErrorId] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorName, setErrorId] = useState<boolean>(false);
  const [errorBirth, setErrorBirth] = useState<boolean>(false);
  const [errorSex, setErrorSex] = useState<boolean>(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<boolean>(false);

  const createAccount = () => {
    console.log({
      userId: userId,
      userPassword: userPassword,
      userEmail: userEmail,
      userName: userName,
      userBirth: userBirth,
      userSex: userSex,
      userPhoneNumber: userPhoneNumber,
    });
    axios
      .post("", {
        userId: userId,
        userPassword: userPassword,
        userEmail: userEmail,
        userName: userName,
        userBirth: userBirth,
        userSex: userSex,
        userPhoneNumber: userPhoneNumber,
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
    <div>
      <div>//header 입니다.</div>
      <div>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="[선택] 비밀번호 분실 시 화인용 이메일"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="생년월일 8자리"
          value={userBirth}
          onChange={(e) => setUserBirth(e.target.value)}
        />
        <ul>
          <li onClick={() => setUserSex("male")}>남자</li>
          <li onClick={() => setUserSex("female")}>여자</li>
          <li onClick={() => setUserSex("none")}>선택안함</li>
        </ul>
        <input
          type="text"
          placeholder="휴대전화번호"
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
        <button>{userNationality}</button>
        <button onClick={() => createAccount()}>회원가입</button>
      </div>
    </div>
  );
};
export default Login;
