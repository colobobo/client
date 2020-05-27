import React, { FC, Fragment } from "react";
import DraggableElement from "../DraggableElement";
import "./index.scss";

import { selectors } from "../../redux";
import { useSelector } from "react-redux";

const overflowXSafeOffset = -50;

const GameCanvas: FC = () => {
  // selectors

  const objectsArray = useSelector(selectors.round.selectObjectsAsArray);
  const areaWidth = useSelector(selectors.area.selectWidth);

  // return

  return (
    <div className="game-canvas">
      {objectsArray.map(object => {
        const rightOverflow = object.x + object.width - areaWidth;
        const leftOverflow = -object.x;

        return (
          <Fragment key={object.id}>
            {/* center copy */}
            {leftOverflow < object.width - overflowXSafeOffset &&
              rightOverflow < object.width - overflowXSafeOffset && (
                <DraggableElement
                  key={object.id}
                  styles={{
                    width: object.width,
                    height: object.height,
                    backgroundColor: object.color
                  }}
                  id={object.id}
                  x={object.x}
                  y={object.y}
                  text={"center"}
                />
              )}

            {/* left copy */}
            {rightOverflow > overflowXSafeOffset && (
              <DraggableElement
                key={object.id + "-left"}
                styles={{
                  width: object.width,
                  height: object.height,
                  backgroundColor: object.color
                }}
                id={object.id}
                x={object.x}
                y={object.y}
                xOffset={-areaWidth}
                text={"left"}
              />
            )}

            {/* right copy */}
            {leftOverflow > overflowXSafeOffset && (
              <DraggableElement
                key={object.id + "-right"}
                styles={{
                  width: object.width,
                  height: object.height,
                  backgroundColor: object.color
                }}
                id={object.id}
                x={object.x}
                y={object.y}
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
