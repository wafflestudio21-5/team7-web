import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import deleteIcon from "../assets/editUserInfo-deleteIcon.svg";
import { editMyProfile, getUserInfo, useMyProfile } from "../API/UserAPI";

const Wrapper = styled.div``;
const Header = styled.div`
  height: 42px;
  background-color: #03c75a;
  text-align: left;
  padding: 0 20px;
  font-size: 13px;
  line-height: 42px;
  color: #fff;
  font-weight: 700;
`;
const Content = styled.div`
  padding: 0 32px;
  & .messages {
    padding: 8px 0 0;
    height: 25px;
    font-size: 12px;
    position: relative;
    & > .isNicknameValid {
    }
    & > .inputLength {
      position: absolute;
      right: 0;
    }
  }

  & > .profileImage {
    display: flex;
    margin-top: 32px;
    & > img {
      display: inline-block;
      width: 88px;
      height: 88px;
    }
    & > span {
      display: flex;
      margin-left: 19px;
      font-size: 12px;
      align-items: center;
    }
  }
  & > .setNickname {
    & > .nickname {
      & > div:nth-child(1) {
        margin: 0 0 8px;
        text-align: left;
        & > label {
          font-size: 14px;
          color: #333333;
        }
      }
      position: relative;
      & > input {
        width: 449px;
        height: 36px;
        padding: 9px 36px 9px 12px;
        background-color: #f5f6f8;
        box-sizing: border-box;
        border: 0;
        font-size: 14px;
        line-height: 20px;
        border-radius: 10px;
      }
      & > .delete {
        border: none;
        outline: none;
        padding: 0;
        background: none;
        width: 36px;
        height: 36px;
        position: absolute;
        right: 0px;
        top: 34px;
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      & > .inactive {
        display: none;
      }
      & > .message {
        font-size: 13px;
        padding: 8px 0 0;
        text-align: left;
        & > .validNicknameMessage {
          color: #03c75a;
        }
        & > .invalidNicknameMessage {
          color: #f53535;
        }
      }
    }
  }
  & > .setIntroduce {
    & > .introduce {
      margin-bottom: 8px;
      text-align: left;
      font-size: 14px;
    }
    & > textarea {
      width: 449px;
      height: 104px;
      padding: 10px 12px;
      box-sizing: border-box;
      background: #f5f6f8;
      resize: none;
      border-radius: 10px;
      border: transparent;
      overflow-wrap: break-word;
      font-family: "맑은 고딕", Malgun Gothic, dotum, sans-serif;
    }
  }
`;
const Footer = styled.div<{
  $isNicknameValid: boolean;
}>`
  button {
    width: 55px;
    height: 36px;
    padding: 0 12px;
    font-size: 13px;
    line-height: 36px;
    border-radius: 6px;
    font-weight: 700;
    border: 0;
    outline: 0;
    box-sizing: border-box;
  }
  & > .cancel {
    background: #eff0f2;
    margin-right: 8px;
    cursor: pointer;
  }
  & > .confirm {
    ${(props) => {
      if (props.$isNicknameValid) {
        return css`
          background: rgba(3, 199, 90, 0.12);
          color: #009f47;
          cursor: pointer;
        `;
      } else {
        return css`
          background-color: rgba(3, 199, 90, 0.06);
          color: rgba(0, 159, 71, 0.25);
        `;
      }
    }}
  }
`;

const EditUserInfo = () => {
  // 원래는 sidebar에서 데이터를 전해받고 싶었는데, postMessage 요청에서 원인 모를 오류가 발생하여 커스텀 훅 사용했습니다.
  const { myProfile } = useMyProfile();
  const [inputNickname, setInputNickname] = useState<string>("");
  const [inputIntroduce, setInputIntroduce] = useState<string>("");

  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>("");
  useEffect(() => {
    if (myProfile) {
      setInputNickname(myProfile.nickname);
      setInputIntroduce(myProfile.content ? myProfile.content : "");
    }
  }, [myProfile]);

  const handleSubmit = async () => {
    if (inputNickname.length !== 0) {
      // post 요청
      await editMyProfile({
        nickname: inputNickname,
        content: inputIntroduce,
        image: "",
        // image는 일단 이렇게 두겠습니다.
      })
        .then(() => {
          window.opener.postMessage("myProfileChanged");
          setInputNickname("");
          setInputIntroduce("");
          window.close();
        })
        .catch((err) => console.log(err));
    }
  };
  const useDebouncedInputNickname = (inputValue: string) => {
    const [value, setValue] = useState(inputValue);
    useEffect(() => {
      const handler = setTimeout(() => {
        setValue(inputValue);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }, [inputValue]);
    return value;
  };
  const debouncedNickname = useDebouncedInputNickname(inputNickname);
  console.log(debouncedNickname);

  const handleIsNicknameValid = async () => {
    if (myProfile) {
      if (inputNickname.length <= 1) {
        setIsNicknameValid(false);
        if (inputNickname.length === 0) {
          setNicknameErrorMessage("별명을 입력해주세요.");
        } else {
          setNicknameErrorMessage("두 글자 이상으로 작성해주세요");
        }
      } else {
        if (inputNickname !== myProfile.nickname) {
          await getUserInfo({ userNickname: inputNickname })
            .then(() => {
              setIsNicknameValid(false);
              setNicknameErrorMessage(
                "이미 존재하는 닉네임입니다. 다른 닉네임을 사용해주세요."
              );
            })
            .catch(() => {
              setIsNicknameValid(true);
              setNicknameErrorMessage("");
            });
        } else {
          setIsNicknameValid(true);
          setNicknameErrorMessage("");
        }
      }
    }
  };

  useEffect(() => {
    console.log("debounced");
    handleIsNicknameValid();
  }, [debouncedNickname]);
  return (
    <Wrapper>
      <Header>
        <span>프로필 설정</span>
      </Header>
      <Content>
        <div className="profileImage">
          <img
            src={
              myProfile?.image
                ? myProfile.image
                : "https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_70.png"
            }
            alt="프로필 이미지"
          />
          <span>멋있는 프로필 사진으로 꾸며보세요.</span>
        </div>
        <div className="setNickname">
          <div className="nickname">
            <div>
              <label htmlFor="nicknameInput">별명</label>
            </div>
            <input
              id="nicknameInput"
              type="text"
              value={inputNickname}
              onChange={(e) => setInputNickname(e.target.value)}
            />
            <button
              className={
                inputNickname.length === 0 ? "delete inactive" : "delete active"
              }
              onClick={() => setInputNickname("")}
            >
              <img src={deleteIcon} alt="입력 지우기" />
            </button>
            <div className="message">
              {isNicknameValid ? (
                <span className="validNicknameMessage">
                  사용할 수 있는 별명입니다.
                </span>
              ) : (
                <span className="invalidNicknameMessage">
                  {nicknameErrorMessage}
                </span>
              )}
            </div>
          </div>
          <div className="messages">
            <span className="isNicknameValid"></span>
            <span className="inputLength">
              <strong>{inputNickname.length}</strong>/20
            </span>
          </div>
        </div>
        <div className="setIntroduce">
          <div className="introduce">
            <label htmlFor="introduceInput">소개</label>
          </div>
          <textarea
            id="introduceInput"
            value={inputIntroduce}
            onChange={(e) => setInputIntroduce(e.target.value)}
          />
          <div className="messages">
            <span className="isIntroduceValid"></span>
            <span className="inputLength">
              <strong>{inputIntroduce.length}</strong>/300
            </span>
          </div>
        </div>
      </Content>
      <Footer $isNicknameValid={isNicknameValid}>
        <button className="cancel">취소</button>
        <button className="confirm" onClick={() => handleSubmit()}>
          확인
        </button>
      </Footer>
    </Wrapper>
  );
};
export default EditUserInfo;
