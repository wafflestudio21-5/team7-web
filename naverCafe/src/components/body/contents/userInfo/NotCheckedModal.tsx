import styled from "styled-components";
const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 80px;
  transform: translate(-50%, 0%);
  z-index: 2;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.1);
  & > div:nth-child(1) {
    padding: 32px 32px 0;
    & > span {
      display: inline-block;
      width: 292px;
    }
  }
  & > div:nth-child(2) {
    margin-top: 16px;
    padding: 0 32px 16px;
    button {
      background-color: #f5f6f8;
      border: transparent;
      outline: transparent;
      width: 140px;
      height: 40px;
      cursor: pointer;
    }
  }
`;
interface PropsNotCheckedModal {
  setIsNotCheckedModalOpen: (value: boolean) => void;
}
const NotCheckedModal = ({
  setIsNotCheckedModalOpen,
}: PropsNotCheckedModal) => {
  return (
    <Wrapper>
      <div>
        <span>게시글을 선택해주세요</span>
      </div>
      <div>
        <button onClick={() => setIsNotCheckedModalOpen(false)}>확인</button>
      </div>
    </Wrapper>
  );
};

export default NotCheckedModal;
