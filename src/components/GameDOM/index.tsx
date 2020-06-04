import React, { FC, Fragment, useMemo } from "react";
import DraggableElement from "../DraggableElement";
import "./index.scss";

import { selectors } from "../../redux";
import { useSelector } from "react-redux";

const overflowXSafeOffset = -50;

const GameCanvas: FC = () => {
  // selectors

  const membersArray = useSelector(selectors.round.selectMembersAsArray);
  const areaWidth = useSelector(selectors.area.selectWidth);

  const memberWidth = useMemo(() => 150, []);

  // return

  return (
    <div className="game-canvas">
      {membersArray.map(member => {
        const rightOverflow = member.position.x + memberWidth - areaWidth;
        const leftOverflow = -member.position.x;

        return (
          <Fragment key={member.id}>
            {/* center copy */}
            {leftOverflow < memberWidth - overflowXSafeOffset &&
              rightOverflow < memberWidth - overflowXSafeOffset && (
                <DraggableElement
                  key={member.id}
                  styles={{
                    width: memberWidth,
                    height: memberWidth,
                    backgroundColor: "#ffe136"
                  }}
                  id={member.id}
                  x={member.position.x}
                  y={member.position.y}
                  text={"center"}
                />
              )}

            {/* left copy */}
            {rightOverflow > overflowXSafeOffset && (
              <DraggableElement
                key={member.id + "-left"}
                styles={{
                  width: memberWidth,
                  height: memberWidth,
                  backgroundColor: "#ffe136"
                }}
                id={member.id}
                x={member.position.x}
                y={member.position.y}
                xOffset={-areaWidth}
                text={"left"}
              />
            )}

            {/* right copy */}
            {leftOverflow > overflowXSafeOffset && (
              <DraggableElement
                key={member.id + "-right"}
                styles={{
                  width: memberWidth,
                  height: memberWidth,
                  backgroundColor: "#ffe136"
                }}
                id={member.id}
                x={member.position.x}
                y={member.position.y}
                xOffset={areaWidth}
                text={"right"}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default GameCanvas;
