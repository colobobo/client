import React, { FC, useCallback, useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../../redux";

// components
import InterfaceHeader from "../../components/InterfaceHeader";

// assets
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";

// style
import "./index.scss";

const Join: FC = () => {
  const { t } = useTranslation();

  // states

  const [inputRoomId, setInputRoomId] = useState("");

  // store
  const dispatch = useDispatch();
  const roomId = useSelector(selectors.room.selectId);
  const roomError = useSelector(selectors.room.selectCode);
  const screenSize = useSelector(selectors.device.selectScreenSize);

  const history = useHistory();

  // handlers

  const handleOnClickStart = useCallback(
    event => {
      event.preventDefault();
      dispatch(
        actions.webSocket.emit.room.join({
          height: screenSize.height,
          width: screenSize.width,
          id: inputRoomId
        })
      );
    },
    [dispatch, inputRoomId, screenSize]
  );

  const handleChange = useCallback(event => {
    setInputRoomId(event.target.value);
  }, []);

  const handleOnBackKeyClick = useCallback(() => {
    console.log("back key press");
  }, []);

  const handleOnNumericKeyClick = useCallback(() => {
    console.log("back key press");
  }, []);

  const numericKeypad = useMemo(() => {
    let numbersKey: any[] = [];

    for (let i = 1; i < 10; i++) {
      const numberKey = (
        <div
          className="button button--yellow"
          key={i}
          onClick={handleOnNumericKeyClick}
        >
          <span>{i}</span>
        </div>
      );

      numbersKey.push(numberKey);
    }

    return numbersKey;
  }, [handleOnNumericKeyClick]);

  useEffect(() => {
    if (roomId) {
      history.push("/room/" + roomId, { isCreator: false });
    }
  }, [history, roomId]);

  // return

  return (
    <div className="join">
      <InterfaceHeader type="join" />

      <div className="join__container">
        <form onSubmit={handleOnClickStart} className="join__form">
          <label className="form__label" htmlFor="roomId">
            {t("join.label")}
          </label>
          <input
            type="text"
            value={inputRoomId}
            onChange={handleChange}
            className="form__input"
            name="roomId"
            id="roomId"
            inputMode="none"
            placeholder="0000"
            maxLength={4}
          />
          <div className="form__numeric-keypad">
            {numericKeypad}
            <div className="button button--yellow" />
            <div
              className="button button--yellow"
              onClick={handleOnNumericKeyClick}
            >
              <span>0</span>
            </div>
            <div
              className="button button--yellow"
              onClick={handleOnBackKeyClick}
            >
              <span>
                <Chevron />
              </span>
            </div>
          </div>
        </form>
        <div className="join__error">{roomError}</div>
      </div>
    </div>
  );
};

export default Join;
