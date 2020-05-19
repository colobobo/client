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
  actions as deviceActions,
  reducer as deviceReducer,
  selectors as deviceSelectors
} from "./Device";
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

import { actions as webSocketActions } from "./WebSocket";

export const actions = {
  admin: adminActions,
  area: areaActions,
  device: deviceActions,
  game: gameActions,
  room: roomActions,
  webSocket: webSocketActions
};

export const selectors = {
  admin: adminSelectors,
  area: areaSelectors,
  device: deviceSelectors,
  game: gameSelectors,
  room: roomSelectors
};

export const reducers = {
  admin: adminReducer,
  area: areaReducer,
  device: deviceReducer,
  game: gameReducer,
  room: roomReducer
};
