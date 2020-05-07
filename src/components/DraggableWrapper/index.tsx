import React, { FC, useCallback, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

import "./index.scss";

gsap.registerPlugin(Draggable);

interface Props {
  id: string;
  classNames?: string;
  bounds?: Draggable.Vars["bounds"];
  onDraggableInstance: (draggable: Draggable, id: string) => any;
  onDragStart: (id: string) => any;
  onDrag: (id: string) => any;
  onDragEnd: (id: string) => any;
  onRef: (ref: HTMLDivElement) => any;
}

const DraggableWrapper: FC<Props> = ({
  children,
  classNames,
  id,
  bounds,
  onDraggableInstance,
  onDragStart,
  onDrag,
  onDragEnd,
  onRef
}) => {
  // ref
  const $container = useRef(null);
  const $draggable = useRef<Draggable[] | null>(null);

  // handlers

  const handleRef = useCallback(
    ref => {
      $container.current = ref;
      onRef(ref);
    },
    [onRef]
  );

  const handleOnDragStart = useCallback(() => {
    onDragStart(id);
  }, [id, onDragStart]);

  const handleOnDragEnd = useCallback(() => {
    onDragEnd(id);
  }, [id, onDragEnd]);

  const handleOnDrag = useCallback(() => {
    onDrag(id);
  }, [id, onDrag]);

  // effects

  useEffect(() => {
    $draggable.current = Draggable.create($container.current, {
      bounds,
      onDragStart: handleOnDragStart,
      onDragEnd: handleOnDragEnd,
      onDrag: handleOnDrag
    });

    onDraggableInstance($draggable.current[0], id);
  }, [
    bounds,
    handleOnDrag,
    handleOnDragEnd,
    handleOnDragStart,
    id,
    onDraggableInstance
  ]);

  // return

  return (
    <div className={`draggable-wrapper ${classNames}`} ref={handleRef}>
      {children}
    </div>
  );
};

export default DraggableWrapper;
