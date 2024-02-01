import { FocusEvent, useState } from "react";
import styled, { css } from "styled-components";
import { signup } from "../API/UserAPI";
import { useNavigate } from "react-router-dom";

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
  ul {
    color: #ff3f3f; // 글씨 색상을 빨간색으로 설정
    text-align: left;
    margin: 10px 0 10px 18px;
    letter-spacing: -0.4px;

    li {
      list-style: disc;
      padding-left: -10px;
      position: relative;
      font-size: 13px;
      line-height: 18px;
    }
  }
  p {
    margin-top: 10px;
    color: #ff3f3f;
    text-align: left;
    font-size: 13px;

    padding-left: 8px;
    letter-spacing: -0.4px;
  }
`;
const InfoBunch = styled.div`
  margin: 10px 0px;
`;
const InfoDiv = styled.div<{
  $error: boolean;
  $correctActive: boolean;
  $length: number;
}>`
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  border: ${(props) =>
    props.$error
      ? "2px solid #ff3f3f"
      : props.$correctActive
      ? "2px solid #09aa5c"
      : "1px solid #c6c6c6"};

  input {
    cursor: pointer;
    border: none;
    outline: none;
    font-size: 16px;

    color: ${(props) => (props.$error ? "#ff3f3f" : "black")};
    text-decoration: ${(props) => (props.$error ? "underline" : "none")};

    &::placeholder {
      color: ${(props) => (props.$error ? "#ff3f3f" : "#929294")};
    }
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
            background-position: ${props.$error
              ? "-310px -96px"
              : props.$length !== 0
              ? "-310px -160px"
              : "-342px -64px"};
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
            background-position: ${props.$error
              ? "-310px -32px"
              : props.$length !== 0
              ? "-310px -64px"
              : "-310px 0"};
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
            background-position: ${props.$error
              ? "-310px -256px"
              : props.$length !== 0
              ? "-216px -128px"
              : " -96px -296px"};
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
            background-position: ${props.$error
              ? "-310px -96px"
              : props.$length !== 0
              ? "-310px -160px"
              : "-342px -64px"};
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
            background-position: ${props.$error
              ? "-64px -296px"
              : props.$length !== 0
              ? "-32px -296px"
              : "-192px -296px"};
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
            background-position: ${props.$error
              ? "-128px -296px"
              : props.$length !== 0
              ? "-160px -296px"
              : "-310px -128px"};
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

const FirstInfoDiv = styled(InfoDiv)<{ $error: boolean }>`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  margin-bottom: ${(props) => (props.$error ? "0.7px" : "0")};
`;

const MiddleInfoDiv = styled(InfoDiv)<{ $error: boolean }>`
  margin-top: ${(props) => (props.$error ? "-3px" : "-1px")};
  margin-bottom: ${(props) => (props.$error ? "-3px" : "-1px")};
`;

const LastInfoDiv = styled(InfoDiv)<{ $error: boolean }>`
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  margin-top: ${(props) => (props.$error ? "0.7px" : "0")};
`;

const AuthDiv = styled.div<{ $error?: boolean }>`
  display: flex;
  height: 50px;
  align-items: center;
  padding: 14px;
  border: ${(props) =>
    props.$error ? "2px solid #ff3f3f" : "1px solid #c6c6c6"};
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  vertical-align: middle;

  & > button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;

    display: block;
    background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
    background-size: 372px 326px;
    background-repeat: no-repeat;
    width: 22px;
    height: 22px;
    margin-right: 6px;

    &.authPaperChecked {
      background-position: -342px -224px;
    }
    &.authPaperNotChecked {
      background-position: ${(props) =>
        props.$error ? "-342px -176px" : "-342px -200px"};
    }
  }

  label {
    cursor: pointer;
    small {
      // small 태그 안에 있는 글자([필수])가 세로 가운데 정렬이 안되어 보이는 문제 발생
      //(일단 원본 회원가입 창에서는 기울어지지 않은 모양이길래 small로 수정했습니다!)
      //원본에서는 em 이랑 label을 상속관계(?)가 아니도록 정렬한 것 같더라구요.. 그리고 원본에서도 수직 관계가 완벽히 맞진 않아서 괜찮을 것 같습니다ㅎㅎ!!

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

type FinalError = {
  id?: string;
  password?: string;
  email?: string;
  name?: string;
  birth?: string;
  phoneNumber?: string;
};

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [userBirth, setUserBirth] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
  const navigate = useNavigate();

  const [infoOnClick, setInfoOnClick] = useState({
    id: false,
    password: false,
    email: false,
    name: false,
    birth: false,
    phoneNumber: false,
  });

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
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[a-zA-Z\d!@#$%^&*()\-_+=]{8,16}$/;
  const correctEmail = /^[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const correctName = /^[가-힣A-Za-z]+$/;
  const correctBirth =
    /^(19|20)\d\d[.\s]?(0[1-9]|1[0-2])[.\s]?(0[1-9]|[12]\d|3[01])$/;
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
      if (userInfo && !correctEmail.test(userEmail!)) {
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

  //handleCreateAccount에서 전체 input 필드에 대한 유효성 검사를 한번에 진행하는 함수입니다.
  const validateAll = () => {
    return {
      id: checkError("id", userName, errorIdMessage, correctId) || undefined,
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
        checkError("name", name, errorNameMessage, correctName) || undefined,
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

  const handleCreateAccount = async () => {
    const finalError: FinalError = validateAll();
    setError(finalError);

    const hasErrors = Object.values(finalError).some(
      (error) => error !== undefined
    );

    if (!hasErrors && isAuthPaperChecked) {
      await signup({
        username: userName,
        password: userPassword,
        name: name,
        email: userEmail ? userEmail : null,
        birthDate: userBirth,
        phoneNumber: userPhoneNumber.replace(/-/g, ""),
      })
        .then(() => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    } else if (!isAuthPaperChecked) {
      console.log("auth paper is not checked");
      setIsAuthPaperChecked(false);
      setIsAuthPaperNeverClicked(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <a href="https://www.naver.com/"></a>
      </Header>
      <Content>
        <InfoBunch>
          <FirstInfoDiv
            className="id"
            $error={error.id ? true : false}
            $correctActive={infoOnClick.id}
            $length={userName.length}
          >
            <span className="idLogo" />
            <input
              type="text"
              name="id"
              placeholder="아이디"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={(e) => {
                handleValidation(e);
                setInfoOnClick((prev) => ({ ...prev, [e.target.name]: false }));
              }}
              onFocus={(e) => {
                setInfoOnClick((prev) => ({
                  ...prev,
                  [e.target.name]: true,
                }));
              }}
            />
            <span className="idNaver">@naver.com</span>
          </FirstInfoDiv>
          <MiddleInfoDiv
            className="password"
            $error={error.password ? true : false}
            $correctActive={infoOnClick.password}
            $length={userPassword.length}
          >
            <span className="passwordLogo" />
            <input
              type={isActiveShowPassword ? "text" : "password"}
              name="password"
              placeholder="비밀번호"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onBlur={(e) => {
                handleValidation(e);
                setInfoOnClick((prev) => ({ ...prev, [e.target.name]: false }));
              }}
              onFocus={(e) => {
                setInfoOnClick((prev) => ({
                  ...prev,
                  [e.target.name]: true,
                }));
              }}
            />
            <button
              className={isActiveShowPassword ? "showPassword" : "hidePassword"}
              onClick={() => setIsActiveShowPassword(!isActiveShowPassword)}
            />
          </MiddleInfoDiv>
          <LastInfoDiv
            className="email"
            $error={error.email ? true : false}
            $correctActive={infoOnClick.email}
            $length={userEmail ? userEmail.length : 0}
          >
            <span className="emailLogo" />
            <input
              type="text"
              name="email"
              placeholder="[선택] 비밀번호 분실 시 확인용 이메일"
              value={userEmail ? userEmail : ""}
              onChange={(e) => setUserEmail(e.target.value)}
              onBlur={(e) => {
                handleValidation(e);
                setInfoOnClick((prev) => ({ ...prev, [e.target.name]: false }));
              }}
              onFocus={(e) => {
                setInfoOnClick((prev) => ({
                  ...prev,
                  [e.target.name]: true,
                }));
              }}
            />
          </LastInfoDiv>
        </InfoBunch>

        <ul>
          {error.id ? <li>아이디: {error.id}</li> : null}
          {error.password ? <li>비밀번호: {error.password}</li> : null}
          {error.email ? <li>이메일: {error.email}</li> : null}
        </ul>

        <InfoBunch>
          <FirstInfoDiv
            className="name"
            $error={error.name ? true : false}
            $correctActive={infoOnClick.name}
            $length={name.length}
          >
            <span className="nameLogo" />
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => {
                handleValidation(e);
                setInfoOnClick((prev) => ({ ...prev, [e.target.name]: false }));
              }}
              onFocus={(e) => {
                setInfoOnClick((prev) => ({
                  ...prev,
                  [e.target.name]: true,
                }));
              }}
            />
          </FirstInfoDiv>
          <MiddleInfoDiv
            className="birth"
            $error={error.birth ? true : false}
            $correctActive={infoOnClick.birth}
            $length={userBirth.length}
          >
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
                setInfoOnClick((prev) => ({ ...prev, [e.target.name]: false }));
              }}
              onFocus={(e) => {
                setInfoOnClick((prev) => ({
                  ...prev,
                  [e.target.name]: true,
                }));
              }}
            />
          </MiddleInfoDiv>
          <LastInfoDiv
            className="phoneNumber"
            $error={error.phoneNumber ? true : false}
            $correctActive={infoOnClick.phoneNumber}
            $length={userPhoneNumber.length}
          >
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
                setInfoOnClick((prev) => ({ ...prev, [e.target.name]: false }));
              }}
              onFocus={(e) => {
                setInfoOnClick((prev) => ({
                  ...prev,
                  [e.target.name]: true,
                }));
              }}
            />
          </LastInfoDiv>
        </InfoBunch>

        <ul>
          {error.name ? <li>이름: {error.name}</li> : null}
          {error.birth ? <li>생년월일: {error.birth}</li> : null}
          {error.phoneNumber ? (
            <li>휴대전화번호: {error.phoneNumber}</li>
          ) : null}
        </ul>

        <AuthDiv
          $error={isAuthPaperChecked || isAuthPaperNeverClicked ? false : true}
        >
          <button
            className={
              isAuthPaperChecked ? "authPaperChecked" : "authPaperNotChecked"
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
      <SignUpButton
        onClick={() => {
          handleCreateAccount();
        }}
      >
        회원가입
      </SignUpButton>
    </Wrapper>
  );
};
export default SignUp;
