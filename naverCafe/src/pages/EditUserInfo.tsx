import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Header = styled.div``;
const Content = styled.div`
  padding: 0 32px;
`;
const Footer = styled.div<{
  $inputNicknameLength: number;
  $inputIntroduceLength: number;
}>``;

const EditUserInfo = () => {
  const [inputNickname, setInputNickname] = useState<string>("");
  const [inputIntroduce, setInputIntroduce] = useState<string>("");
  const handleSubmit = () => {
    if (inputNickname.length !== 0 && inputIntroduce.length !== 0) {
      // post 요청
      setInputNickname("");
      setInputIntroduce("");
    }
  };
  return (
    <Wrapper>
      <Header>
        <span>프로필 설정</span>
      </Header>
      <Content>
        <div className="profileImage">
          <img src="" alt="프로필 이미지" />
        </div>
        <div className="setNickname">
          <label htmlFor="">별명</label>
          <input type="text" />
          <button />
        </div>
        <div className="introduce">
          <label htmlFor="">소개</label>
          <textarea />
        </div>
      </Content>
      <Footer
        $inputNicknameLength={inputNickname.length}
        $inputIntroduceLength={inputIntroduce.length}
      >
        <button className="cancel">취소</button>
        <button className="confirm" onClick={() => handleSubmit()}>
          확인
        </button>
      </Footer>
    </Wrapper>
  );
};
export default EditUserInfo;
