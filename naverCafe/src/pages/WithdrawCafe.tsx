import styled from "styled-components";
import { waffleCafe } from "../Constants";
import waffleManagerIcon from "../assets/waffleManagerLogo.svg";
import { withdrawCafe } from "../API/UserAPI";
const Wrapper = styled.div`
  display: inline-block;
  width: 400px;

  & > .header {
    background: url(https://ssl.pstatic.net/static/common/popup/bg_h_gray.gif)
      no-repeat;
    height: 40px;
    padding-top: 5px;
    text-align: left;
    text-indent: 15px;
    color: #fff;
  }
  & > .inner {
    padding: 20px 0 14px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e4e4e4;

    & > .cafeName {
      /* display: inline-block; */
      /* width: 382px; */
      border: 1px solid #f8f8f8;
      background: #fbfbfb;
      padding: 16px 15px 14px 15px;
      line-height: 17px;
      margin: 0 0 12px 0;
      height: 51px;
      box-sizing: border-box;
    }
    & > .message {
      font-size: 12px;
      position: relative;
      margin-bottom: 12px;
      img {
        width: 17px;
        height: 17px;
        position: relative;
        top: 3px;
        margin-right: 3px;
      }
    }
  }
  & > .buttons {
    border-top: 3px solid #f9f9f9;
    text-align: center;
    padding: 7px 0 15px 0;
    margin: 0 20px;
    button {
      img {
        width: 40px;
        height: 23px;
      }
      border: none;
      outline: none;
      background-color: #fff;
      cursor: pointer;
    }
    button.confirm {
      margin-right: 2px;
    }
  }
`;

const WithdrawCafe = () => {
  const handleconfirm = async () => {
    // post 요청
    await withdrawCafe()
      .then(() => {
        window.opener.postMessage("withdrawCafe");
        window.close();
      })
      .catch((err) => console.log(err));
  };

  console.log("called");
  return (
    <Wrapper>
      <div className="header">카페 탈퇴</div>
      <div className="inner">
        <div className="cafeName">
          카페명: <strong>{waffleCafe.name}</strong>
        </div>
        <div className="message">
          <img src={waffleManagerIcon} alt="" />
          <span>카페에서 탈퇴하시겠습니까?</span>
        </div>
      </div>
      <div className="buttons">
        <button className="confirm" onClick={() => handleconfirm()}>
          <img
            src="https://ssl.pstatic.net/static/common/popup/btn_confirm.gif"
            alt="확인"
          />
        </button>
        <button className="cancel" onClick={() => window.close()}>
          <img
            src="https://ssl.pstatic.net/static/common/popup/btn_cancel.gif"
            alt="취소"
          />
        </button>
      </div>
    </Wrapper>
  );
};
export default WithdrawCafe;
