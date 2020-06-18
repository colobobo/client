import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { enums } from "@colobobo/library";
import { actions, selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import InterfaceBreak from "../../components/InterfaceBreak";
import InterfaceTimer from "../../components/InterfaceTimer";
import InterfaceButton, { Colors } from "../../components/InterfaceButton";

// assets
import { ReactComponent as PauseSVG } from "../../assets/icons/pause.svg";

// style
import "./index.scss";

interface Props {
  colorTheme: Colors;
}

const GameInterface: FC<Props> = ({ colorTheme }) => {
  const dispatch = useDispatch();
  const [hasClickedOnPause, setHasClickedOnPause] = useState(false);

  // Selectors
  const roundStatus = useTypedSelector(selectors.round.selectStatus);
  const endRoundTimeStamp = useTypedSelector(
    selectors.round.selectEndRoundTimeStamp
  );

  // Handles
  const handleOnClickToggleGameState = useCallback(() => {
    const newStatus =
      roundStatus === enums.round.Status.play
        ? enums.round.Status.pause
        : enums.round.Status.play;

    setHasClickedOnPause(true);
    dispatch(
      actions.webSocket.emit.round.statusUpdate({
        status: newStatus
      })
    );
  }, [dispatch, roundStatus]);

  useEffect(() => {
    if (roundStatus === enums.round.Status.play) setHasClickedOnPause(false);
  }, [roundStatus]);

  return (
    <div className="game-interface">
      {endRoundTimeStamp && <InterfaceTimer color={colorTheme} />}
      <InterfaceButton
        onClick={handleOnClickToggleGameState}
        color={colorTheme}
        classNames="game-interface__pause button--round"
      >
        <PauseSVG />
      </InterfaceButton>
      {roundStatus === enums.round.Status.pause && (
        <InterfaceBreak
          showContinue={hasClickedOnPause}
          handleOnClickToggleGameState={handleOnClickToggleGameState}
        />
      )}
    </div>
  );
};

export default GameInterface;
