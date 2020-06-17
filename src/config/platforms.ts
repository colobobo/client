import { enums } from "@colobobo/library";

// enums

export enum PlatformPosition {
  start = "start",
  finish = "finish"
}

export enum PlatformAnimationsKey {
  lightIn = "light-in",
  lightOut = "light-out",
  pannel = "pannel"
}

// editable plateforms types

type EditablePlatformsAnimationConfig = {
  startFrame: number;
  endFrame: number;
};

type EditablePlatformsPositionConfig = {
  [key in PlatformAnimationsKey]: EditablePlatformsAnimationConfig;
};

type EditablePlateformsConfig = {
  [key in PlatformPosition]: EditablePlatformsPositionConfig;
};

type EditablePlatformsConfigByWorld = {
  [key in enums.World]: EditablePlateformsConfig;
};

// generated plateforms types
export type PlatformsAnimationConfig = EditablePlatformsAnimationConfig & {
  texture: string;
  animationKey: string;
  prefix: string;
};

export type PlatformsPositionConfig = {
  [key in PlatformAnimationsKey]: PlatformsAnimationConfig;
};

type PlatformsConfig = {
  [key in PlatformPosition]: PlatformsPositionConfig;
};

// ====== EDITABLE CONFIG =======

const defaultEditableConfig: EditablePlateformsConfig = {
  [PlatformPosition.start]: {
    [PlatformAnimationsKey.lightIn]: {
      startFrame: 0,
      endFrame: 63
    },
    [PlatformAnimationsKey.lightOut]: {
      startFrame: 0,
      endFrame: 63
    },
    [PlatformAnimationsKey.pannel]: {
      startFrame: 0,
      endFrame: 63
    }
  },
  [PlatformPosition.finish]: {
    [PlatformAnimationsKey.lightIn]: {
      startFrame: 0,
      endFrame: 63
    },
    [PlatformAnimationsKey.lightOut]: {
      startFrame: 0,
      endFrame: 63
    },
    [PlatformAnimationsKey.pannel]: {
      startFrame: 0,
      endFrame: 63
    }
  }
};

const editableConfigsByWorld: EditablePlatformsConfigByWorld = {
  [enums.World.desert]: defaultEditableConfig,
  [enums.World.jungle]: defaultEditableConfig,
  [enums.World.mountain]: defaultEditableConfig,
  [enums.World.river]: defaultEditableConfig
};

// ======= GENERATED CONFIG =======

const getAnimationConfig = (
  world: enums.World,
  position: PlatformPosition,
  animationKey: PlatformAnimationsKey
): PlatformsAnimationConfig => ({
  ...editableConfigsByWorld[world][position][animationKey],
  animationKey: `${world}_platforms_${position}_${animationKey}`,
  prefix: `worlds/${world}/platforms/${position}/`,
  texture: "spritesheets"
});

const getPositionConfig = (
  world: enums.World,
  position: PlatformPosition
): PlatformsPositionConfig => ({
  [PlatformAnimationsKey.lightIn]: getAnimationConfig(
    world,
    position,
    PlatformAnimationsKey.lightIn
  ),
  [PlatformAnimationsKey.lightOut]: getAnimationConfig(
    world,
    position,
    PlatformAnimationsKey.lightOut
  ),
  [PlatformAnimationsKey.pannel]: getAnimationConfig(
    world,
    position,
    PlatformAnimationsKey.pannel
  )
});

export const getPlatFormsConfig = (world: enums.World): PlatformsConfig => ({
  [PlatformPosition.start]: getPositionConfig(world, PlatformPosition.start),
  [PlatformPosition.finish]: getPositionConfig(world, PlatformPosition.finish)
});
