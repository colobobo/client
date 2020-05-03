import { Dispatch } from "@reduxjs/toolkit";

const dispatchAll = (
  actions: object,
  actionType: string,
  dispatch: Dispatch
) => {
  Object.values(actions).forEach(action => {
    if (typeof action === "object") {
      if (action.type === actionType) {
        dispatch(action);
        return;
      }
      dispatchAll(action, actionType, dispatch);
    }
  });
};

export default {
  dispatchAll
};
