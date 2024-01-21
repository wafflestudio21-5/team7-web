import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  width: 101px;
  margin: 7px 0 0;
  padding: 8px 0;
  position: absolute;
  left: -85px;
  top: 12px;
  border-radius: 6px;
  z-index: 2;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.06);
  button {
    width: 100px;
    height: 32px;
    text-align: left;
    padding-left: 15px;
    &:hover {
      background-color: #f5f6f8;
      /* 왜 background-color가 적용되지 않는지 모르겠습니다. */
      text-decoration: underline;
    }
  }
`;
interface PropsCommentMenuModal {
  setIsEditMode: (value: boolean) => void;
  setIsMenuModalOpen: (value: boolean) => void;
}
const CommentMenuModal = ({
  setIsEditMode,
  setIsMenuModalOpen,
}: PropsCommentMenuModal) => {
  return (
    <Wrapper>
      <button
        className="editComment"
        onClick={() => {
          setIsEditMode(true);
          setIsMenuModalOpen(false);
        }}
      >
        수정
      </button>
      <button className="deleteComment">삭제</button>
    </Wrapper>
  );
};
export default CommentMenuModal;
