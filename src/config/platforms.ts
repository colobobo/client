import { enums } from "@colobobo/library";

// ====== EDITABLE CONFIG =======

type EditableAnimationConfig = {
  startFrame: number;
  endFrame: number;
};

type EditableConfig = {
  start: EditableAnimationConfig;
  finish: EditableAnimationConfig;
};

type EditableConfigs = {
  [key in enums.World]: EditableConfig;
};

const editableConfigs: EditableConfigs = {
  [enums.World.desert]: {
    start: {
      startFrame: 0,
      endFrame: 63
    },
    finish: {
      startFrame: 0,
      endFrame: 28
    }
  },
  [enums.World.jungle]: {
    start: {
      startFrame: 0,
      endFrame: 63
    },
    finish: {
      startFrame: 0,
      endFrame: 28
    }
  },
  [enums.World.mountain]: {
    start: {
      startFrame: 0,
      endFrame: 63
    },
    finish: {
      startFrame: 0,
      endFrame: 28
    }
  },
  [enums.World.river]: {
    start: {
      startFrame: 0,
      endFrame: 63
    },
    finish: {
      startFrame: 0,
      endFrame: 28
    }
  }
};

// ======= GENERATED CONFIG =======

export type AnimationConfig = EditableAnimationConfig & {
  texture: string;
  animationKey: string;
  prefix: string;
};

type PlatformConfig = {
  start: AnimationConfig;
  finish: AnimationConfig;
};

type PlatformsConfig = {
  [key in enums.World]: PlatformConfig;
};

const getConfigs = (): PlatformsConfig => {
  let platformsConfig = {};
  Object.values(enums.World).forEach(world => {
    platformsConfig = {
      ...platformsConfig,
      [world]: {
        start: {
          ...editableConfigs[world].start,
          animationKey: `${world}_platforms_start_animation`,
          prefix: `worlds/${world}/platforms/start/`,
          texture: "spritesheets"
        },
        finish: {
          ...editableConfigs[world].finish,
          animationKey: `${world}_platforms_finish_animation`,
          prefix: `worlds/${world}/platforms/finish/`,
          texture: "spritesheets"
        }
      } as PlatformConfig
    };
  });

  return platformsConfig as PlatformsConfig;
};

export const platformsConfig = getConfigs();
