import {
  actions as adminActions,
  reducer as adminReducer,
  selectors as adminSelectors
} from "./Admin";
import {
  actions as areaActions,
  reducer as areaReducer,
  selectors as areaSelectors
} from "./Area";
import {
  actions as gameActions,
  reducer as gameReducer,
  selectors as gameSelectors
} from "./Game";
import {
  actions as roomActions,
  reducer as roomReducer,
  selectors as roomSelectors
} from "./Room";

import {
  actions as roundActions,
  reducer as roundReducer,
  selectors as roundSelectors
} from "./Round";

import {
  actions as transitionActions,
  reducer as transitionReducer,
  selectors as transitionSelectors
} from "./Transition";

import { actions as webSocketActions } from "./WebSocket";

export const actions = {
  admin: adminActions,
  area: areaActions,
  game: gameActions,
  room: roomActions,
  round: roundActions,
  transition: transitionActions,
  webSocket: webSocketActions
};

export const selectors = {
  admin: adminSelectors,
  area: areaSelectors,
  game: gameSelectors,
  room: roomSelectors,
  transition: transitionSelectors,
  round: roundSelectors
};

export const reducers = {
  admin: adminReducer,
  area: areaReducer,
  game: gameReducer,
  room: roomReducer,
  transition: transitionReducer,
  round: roundReducer
};
