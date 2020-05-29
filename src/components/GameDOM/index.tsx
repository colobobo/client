import React, { FC, Fragment } from "react";
import DraggableElement from "../DraggableElement";
import "./index.scss";

import { selectors } from "../../redux";
import { useSelector } from "react-redux";

const overflowXSafeOffset = -50;

const GameCanvas: FC = () => {
  // selectors

  const membersArray = useSelector(selectors.round.selectMembersAsArray);
  const areaWidth = useSelector(selectors.area.selectWidth);

  // return

  return (
    <div className="game-canvas">
      {membersArray.map(member => {
        const rightOverflow = member.position.x + member.width - areaWidth;
        const leftOverflow = -member.position.x;

        return (
          <Fragment key={member.id}>
            {/* center copy */}
            {leftOverflow < member.width - overflowXSafeOffset &&
              rightOverflow < member.width - overflowXSafeOffset && (
                <DraggableElement
                  key={member.id}
                  styles={{
                    width: member.width,
                    height: member.height,
                    backgroundColor: member.color
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
                  width: member.width,
                  height: member.height,
                  backgroundColor: member.color
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
                  width: member.width,
                  height: member.height,
                  backgroundColor: member.color
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
