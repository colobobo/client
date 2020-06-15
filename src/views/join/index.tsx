import React, { FC, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../../redux";

// components
import InterfaceHeader from "../../components/InterfaceHeader";
import NumericKeypad from "../../components/NumericKeypad";

// style
import "./index.scss";

const Join: FC = () => {
  const { t } = useTranslation();
  const codeLength = 4;

  // states

  const [inputRoomId, setInputRoomId] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  // store
  const dispatch = useDispatch();
  const roomId = useSelector(selectors.room.selectId);
  const roomError = useSelector(selectors.room.selectError);
  const adminDeviceIndex = useSelector(selectors.admin.selectDeviceIndex);

  const history = useHistory();

  // handlers

  const joinRoom = useCallback(() => {
    dispatch(
      actions.webSocket.emit.room.join({
        height: window.innerHeight,
        width: window.innerWidth,
        id: inputRoomId,
        ...(adminDeviceIndex ? { adminIndex: adminDeviceIndex } : {})
      })
    );
  }, [adminDeviceIndex, dispatch, inputRoomId]);

  const handleChange = useCallback(event => {
    setInputRoomId(event.target.value);
  }, []);

  const handleChangeInputRoomId = useCallback(
    (value: string) => {
      setInputRoomId(value);

      if (inputRoomId.length === codeLength && errorStatus) {
        setErrorStatus(false);
      }
    },
    [errorStatus, inputRoomId.length]
  );

  const handleOnBackButtonClick = useCallback(() => {
    history.push("/");
  }, [history]);

  useEffect(() => {
    if (roomId) {
      history.push("/room/" + roomId);
    }
  }, [history, roomId]);

  useEffect(() => {
    if (inputRoomId.length === codeLength) {
      joinRoom();
    }
  }, [inputRoomId.length, joinRoom]);

  useEffect(() => {
    if (roomError === 1) {
      setErrorStatus(true);
    }
  }, [roomError]);

  // return

  return (
    <div className="join">
      <InterfaceHeader
        type="join"
        backButtonStatus={true}
        onBackButtonClick={handleOnBackButtonClick}
      />

      <div className="join__container">
        <form className="join__form">
          <div className="form__field">
            <label
              className="form__label"
              htmlFor="roomId"
              dangerouslySetInnerHTML={{
                __html: t("join.label")
              }}
            ></label>
            <input
              type="text"
              value={inputRoomId}
              onChange={handleChange}
              className="form__input"
              name="roomId"
              id="roomId"
              inputMode="none"
              placeholder="0000"
              maxLength={codeLength}
            />
            {errorStatus && (
              <p
                className="form__error"
                dangerouslySetInnerHTML={{
                  __html: t("join.message.error")
                }}
              />
            )}
          </div>
          <div className="form__numeric-keypad">
            <NumericKeypad
              inputValue={inputRoomId}
              onChangeInputValue={handleChangeInputRoomId}
              maxLengthValue={codeLength}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
