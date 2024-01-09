import axios from "axios";
import { FocusEvent, useState } from "react";
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
    small {
      /* display: inline-block;
      vertical-align: middle; */
      // small 태그 안에 있는 글자([필수])가 세로 가운데 정렬이 안되어 보이는 문제 발생 (원래 회원가입 창에 기울어지지 않은 모양이길래 small로 수정했습니다!)
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

type ValidationRule = {
  regex: RegExp;
  errorMessages: string[];
};

type ValidationRules = {
  [key: string]: ValidationRule;
};

type FieldName2Kor = {
  [key: string]: string;
};

type FinalError = {
  id?: string;
  password?: string;
  email?: string;
  name?: string;
  birth?: string;
  phoneNumber?: string;
};

const SignUp = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userBirth, setUserBirth] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");

  const errorIdMessage = [
    "필수 정보입니다.",
    "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
    "사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.", //중복되는 아이디가 있는 경우로, 백엔드와 연결 후 진행해야 할 것 같습니다.
  ];
  const errorPasswordMessage = [
    "필수 정보입니다.",
    "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
  ];
  const errorEmailMessage = ["이메일 주소가 정확한지 확인해 주세요."];
  const errorNameMessage = [
    "필수 정보입니다.",
    "한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)",
  ];
  const errorBirthMessage = [
    "필수 정보입니다.",
    "생년월일은 8자리 숫자로 입력해 주세요.",
  ];
  const errorPhoneNumberMessage = [
    "필수 정보입니다.",
    "휴대전화번호가 정확한지 확인해 주세요.",
  ];

  //각 필드의 error 메시지를 담는 배열
  const [error, setError] = useState<{
    id?: string;
    password?: string;
    email?: string;
    name?: string;
    birth?: string;
    phoneNumber?: string;
  }>({});

  const correctId = /^[a-z0-9_-]{5,20}$/;
  const correctPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const correctEmail = /^[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const correctName = /^[가-힣A-Za-z]+$/;
  const correctBirth = /^(19|20)\d\d[.\s]?(0[1-9]|1[0-2])[.\s]?(0[1-9]|[12]\d|3[01])$/;
  const correctPhoneNumber = /^010[-\s]?\d{4}[-\s]?\d{4}$/;

  //handleValidation 내부에서 반복적으로 실행되는 작업을 수행하는 함수
  const checkError = (
    fieldName: string,
    userInfo: string | null,
    errorMessageList: string[],
    correctUserInfo: RegExp
  ) => {
    if (fieldName === "email") {
      //이메일은 필수 정보가 아니므로 비어 있어도 괜찮음
      if (userInfo && !correctEmail.test(userEmail)) {
        return errorEmailMessage[0];
      }
      return null; //이메일이 비어있거나 유효한 경우
    } else {
      //나머지(아이디, 비밀번호, 이름, 생일, 전화번호) 필드는 필수 정보임
      if (userInfo === "" || userInfo === null) {
        return errorMessageList[0]; //필수 정보입니다.
      } else if (!correctUserInfo.test(userInfo!)) {
        return errorMessageList[1]; //해당 필드에 대한 특정 오류 메시지
      }
      return null; //오류가 없는 경우
    }
  };

  //각 input 필드가 blur일 때, handleValidation이 작동
  const handleValidation = (e: FocusEvent<HTMLInputElement, Element>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // 각 필드에 맞는 정규식과 오류 메시지를 매핑
    const validationRules: ValidationRules = {
      id: { regex: correctId, errorMessages: errorIdMessage },
      password: { regex: correctPassword, errorMessages: errorPasswordMessage },
      email: { regex: correctEmail, errorMessages: errorEmailMessage },
      name: { regex: correctName, errorMessages: errorNameMessage },
      birth: { regex: correctBirth, errorMessages: errorBirthMessage },
      phoneNumber: {
        regex: correctPhoneNumber,
        errorMessages: errorPhoneNumberMessage,
      },
    };

    const newError = checkError(
      fieldName,
      fieldValue,
      validationRules[fieldName].errorMessages,
      validationRules[fieldName].regex
    );

    // 오류 상태 업데이트 (이전 오류 상태 유지)
    setError((prevErrors) => ({
      ...prevErrors,
      [fieldName]: newError,
    }));
  };

  const fieldName2Kor: FieldName2Kor = {
    id: "아이디",
    password: "비밀번호",
    email: "이메일",
    name: "이름",
    birth: "생년월일",
    phoneNumber: "휴대전화번호",
  };

  //phoneNumber의 경우, 하이픈을 자동으로 추가
  const autoHyphen = (e: FocusEvent<HTMLInputElement, Element>) => {
    const phoneNumber = e.target.value;

    //phoneNumber에 오류가 없는 경우
    if (
      !checkError(
        e.target.name,
        phoneNumber,
        errorPhoneNumberMessage,
        correctPhoneNumber
      )
    ) {
      const cleaned = phoneNumber.replace(/[\s-]/g, "");
      setUserPhoneNumber(cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    }
  };

  //birth의 경우, .을 자동으로 추가
  const autoPoint = (e: FocusEvent<HTMLInputElement, Element>) => {
    const birth = e.target.value;

    //birth에 오류가 없는 경우
    if (!checkError(e.target.name, birth, errorBirthMessage, correctBirth)) {
      const cleaned = birth.replace(/[\s.]/g, "");
      setUserBirth(cleaned.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3"));
    }
  };

  //password 가시 여부를 나타내는 state
  const [isActiveShowPassword, setIsActiveShowPassword] =
    useState<boolean>(false);
  //인증 약관 동의 여부를 나타내는 state
  const [isAuthPaperChecked, setIsAuthPaperChecked] = useState<boolean>(false);
  //인증 약관 동의 버튼의 최초 클릭 여부를 나타내는 state
  const [isAuthPaperNeverClicked, setIsAuthPaperNeverClicked] =
    useState<boolean>(true);

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

  //handleCreateAccount에서 전체 input 필드에 대한 유효성 검사를 한번에 진행하는 함수입니다.
  const validateAll = () => {
    return {
      id: checkError("id", userId, errorIdMessage, correctId) || undefined,
      password:
        checkError(
          "password",
          userPassword,
          errorPasswordMessage,
          correctPassword
        ) || undefined,
      email:
        checkError("email", userEmail, errorEmailMessage, correctEmail) ||
        undefined,
      name:
        checkError("name", userName, errorNameMessage, correctName) ||
        undefined,
      birth:
        checkError("birth", userBirth, errorBirthMessage, correctBirth) ||
        undefined,
      phoneNumber:
        checkError(
          "phoneNumber",
          userPhoneNumber,
          errorPhoneNumberMessage,
          correctPhoneNumber
        ) || undefined,
    };
  };

  const handleCreateAccount = () => {
    const finalError: FinalError = validateAll();
    setError(finalError);

    const hasErrors = Object.values(finalError).some((error) => error !== null);

    if (!hasErrors || isAuthPaperChecked) {
      createAccount();
    }
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
              name="id"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onBlur={(e) => handleValidation(e)}
            />
            <span className="idNaver">@naver.com</span>
          </InfoDiv>
          <InfoDiv className="password">
            <span className="passwordLogo" />
            <input
              type={isActiveShowPassword ? "text" : "password"}
              name="password"
              placeholder="비밀번호"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onBlur={(e) => handleValidation(e)}
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
              name="email"
              placeholder="[선택] 비밀번호 분실 시 확인용 이메일"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              onBlur={(e) => handleValidation(e)}
            />
          </InfoDiv>
        </InfoBunch>

        <ul>
          {Object.entries(error).map(([key, value]) => {
            if (["id", "password", "email"].includes(key) && value) {
              return (
                <li key={key}>
                  {fieldName2Kor[key]}: {value}
                </li>
              );
            }
            return null;
          })}
        </ul>

        <InfoBunch>
          <InfoDiv className="name">
            <span className="nameLogo" />
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={(e) => handleValidation(e)}
            />
          </InfoDiv>
          <InfoDiv className="birth">
            <span className="birthLogo" />
            <input
              type="text"
              name="birth"
              placeholder="생년월일 8자리"
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
              onBlur={(e) => {
                handleValidation(e);
                autoPoint(e);
              }}
            />
          </InfoDiv>
          <InfoDiv className="phoneNumber">
            <span className="phoneNumberLogo" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="휴대전화번호"
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
              onBlur={(e) => {
                handleValidation(e);
                autoHyphen(e);
              }}
            />
          </InfoDiv>
        </InfoBunch>

        <ul>
          {Object.entries(error).map(([key, value]) => {
            if (["name", "birth", "phoneNumber"].includes(key) && value) {
              return (
                <li key={key}>
                  {fieldName2Kor[key]}: {value}
                </li>
              );
            }
            return null;
          })}
        </ul>

        <AuthDiv>
          <button
            className={
              isAuthPaperChecked ? "authPaperChecked" : "authPaperNotchecked"
            }
            id="authPaperCheck"
            onClick={() => {
              setIsAuthPaperChecked(!isAuthPaperChecked);
              setIsAuthPaperNeverClicked(false);
            }}
          />
          <label htmlFor="authPaperCheck">
            <small>[필수]</small>
            인증 약관 전체동의
          </label>
          <button className="authPaper" />
        </AuthDiv>
        {isAuthPaperChecked || isAuthPaperNeverClicked ? null : (
          <p>필수 약관에 모두 동의해 주세요.</p>
        )}
      </Content>
      <SignUpButton onClick={() => handleCreateAccount()}>
        회원가입
      </SignUpButton>
    </Wrapper>
  );
};
export default SignUp;
