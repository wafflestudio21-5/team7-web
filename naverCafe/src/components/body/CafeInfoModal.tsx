import styled from "styled-components";
import { waffleCafe } from "../../Constants";

const Wrapper = styled.div`
  display: inline-block;
  width: 300px;
  position: absolute;
  background-color: #fff;
  z-index: 1;
  padding: 25px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.1);
  & > div {
    margin-bottom: 10px;
  }
`;

const CafeInfoModal = () => {
  return (
    <Wrapper>
      <div className="name">
        <strong>카페명: </strong>
        {waffleCafe.name}
      </div>
      <div className="createdAt">
        <strong>카페 시작: </strong>
        {waffleCafe.createdAt}
      </div>
      <div className="locatino">
        <strong>위치: </strong>
        {waffleCafe.location}
      </div>
      <div className="description">
        <strong>소개: </strong>
        {waffleCafe.description}
      </div>
    </Wrapper>
  );
};
export default CafeInfoModal;
