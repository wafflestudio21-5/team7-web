import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  & > .settingArea {
    & > div {
      background: #f9f9fa;
      padding: 20px 20px 19px;
      text-align: left;
      border-radius: 6px;
      font-size: 12px;
    }
    & > div:not(:first-child) {
      margin-top: 12px;
    }
    & > .announceSetting {
      label {
        padding-left: 22px;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          left: 0;
          top: 1px;
          cursor: pointer;
          background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-on.svg?ed25ed391f00228242d83867666d617e=);
        }
      }
      & > .notAnnouncement {
        &::before {
          background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-off.svg?35434b8…=);
        }
      }
    }
    & > .openSetting {
      button {
        border: none;
        outline: none;
        background: transparent;
        font-size: 12px;
        position: relative;
        &::after {
          content: "";
          display: inline-block;
          width: 7px;
          height: 4px;
          margin-left: 5px;
          background: url(https://ca-fe.pstatic.net/web-section/static/img/ico-menu-hide.svg?3e68c7e…=)
            no-repeat;
          vertical-align: 3px;
        }
        &.clicked::after {
          background: url(https://ca-fe.pstatic.net/web-section/static/img/ico-menu-show.svg?c73c0b3…=)
            no-repeat;
        }
      }
      & > .innerOpenSetting {
        padding: 14px 0 17px;
        font-size: 12px;
        & > .setOpenSetting {
          & > label {
            display: block;
            padding-left: 20px;
            position: relative;
            &::before {
              content: "";
              width: 14px;
              height: 14px;
              position: absolute;
              left: 0;
              top: 3px;
              background-size: 14px;
            }
          }
          & > .checked::before {
            background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-radio-btn-check.svg?f56a423a4bf4ae30d906cde83899f6db=);
          }
          & > .notChecked::before {
            background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-radio-btn-uncheck.svg?82678ae0b02f8c58500a73f50faee928=);
          }
          & > label:not(:first-child) {
            margin-top: 5px;
          }
        }
        & > .showOpenSetting {
          span {
            padding-left: 20px;
            position: relative;
            &::before {
              content: "";
              width: 5.5px;
              height: 5.5px;
              left: 5px;
              top: 3px;
              border-left: 1px solid #979797;
              border-bottom: 1px solid #979797;
              position: absolute;
            }
          }
        }
      }
    }
    & > .otherSettings {
      & > .commentSetting {
        label {
          padding-left: 22px;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            width: 14px;
            height: 14px;
            left: 0;
            top: 1px;
            cursor: pointer;
            background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-off.svg?35434b8…=);
          }
          &.checked::before {
            background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-on.svg?ed25ed391f00228242d83867666d617e=);
          }
        }
      }
    }
  }
`;

interface PropsWritingSideBar {
  isAnnouncement: boolean;
  setIsAnnouncement: (value: boolean) => void;
  openSetting: string;
  setOpenSetting: (value: string) => void;
  isCommentAllowed: boolean;
  setIsCommentAllowed: (value: boolean) => void;
}
const WritingSideBar = ({
  isAnnouncement,
  setIsAnnouncement,
  openSetting,
  setOpenSetting,
  isCommentAllowed,
  setIsCommentAllowed,
}: PropsWritingSideBar) => {
  const [isSetOpenSettingClicked, setIsSetOpenSettingClicked] =
    useState<boolean>(false);
  return (
    <Wrapper>
      <div className="settingArea">
        <div className="announceSetting">
          {/* rank n 이상일 경우에만 뜨도록 조정*/}
          <label
            className={isAnnouncement ? "announcement" : "notAnnouncement"}
            onClick={() => setIsAnnouncement(!isAnnouncement)}
          >
            공지로 등록
          </label>
        </div>
        <div className="openSetting">
          <button
            className={isSetOpenSettingClicked ? "clicked" : "notClicked"}
            onClick={() => setIsSetOpenSettingClicked(!isSetOpenSettingClicked)}
          >
            공개설정
          </button>

          <div className="innerOpenSetting">
            {isSetOpenSettingClicked ? (
              <div className="setOpenSetting">
                <label
                  className={
                    openSetting === "전체공개" ? "checked" : "notChecked"
                  }
                  onClick={() => setOpenSetting("전체공개")}
                >
                  전체공개
                </label>
                <label
                  className={
                    openSetting === "전체공개" ? "notChecked" : "checked"
                  }
                  onClick={() => setOpenSetting("n등급 이상 공개")}
                >
                  n등급 이상 공개
                </label>
              </div>
            ) : (
              <div className="showOpenSetting">
                <span>{openSetting}</span>
              </div>
            )}
          </div>
        </div>
        <div className="otherSettings">
          <div className="commentSetting">
            <label
              className={isCommentAllowed ? "checked" : "notChecked"}
              onClick={() => setIsCommentAllowed(!isCommentAllowed)}
            >
              댓글 허용
            </label>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WritingSideBar;
