import { enums } from "@colobobo/library";

// enums

export enum PlatformPosition {
  start = "start",
  finish = "finish"
}

export enum PlatformAnimationsKey {
  lightIn = "light-in",
  lightOut = "light-out",
  panel = "panel",
  ray = "ray"
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

export const platformsTexture = "platforms-texture";

export const platformsShapes = "shapes-plateforms";

const defaultEditableConfig: EditablePlateformsConfig = {
  [PlatformPosition.start]: {
    [PlatformAnimationsKey.lightIn]: {
      startFrame: 0,
      endFrame: 13
    },
    [PlatformAnimationsKey.lightOut]: {
      startFrame: 13,
      endFrame: 17
    },
    [PlatformAnimationsKey.panel]: {
      startFrame: 0,
      endFrame: 12
    },
    [PlatformAnimationsKey.ray]: {
      startFrame: 0,
      endFrame: 64
    }
  },
  [PlatformPosition.finish]: {
    [PlatformAnimationsKey.lightIn]: {
      startFrame: 0,
      endFrame: 26
    },
    [PlatformAnimationsKey.lightOut]: {
      startFrame: 26,
      endFrame: 26
    },
    [PlatformAnimationsKey.panel]: {
      startFrame: 0,
      endFrame: 12
    },
    [PlatformAnimationsKey.ray]: {
      startFrame: 0,
      endFrame: 64
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
): PlatformsAnimationConfig => {
  let prefix = "";
  switch (animationKey) {
    case PlatformAnimationsKey.lightIn:
    case PlatformAnimationsKey.lightOut:
      prefix = `${world}/${position}/`;
      break;
    case PlatformAnimationsKey.panel:
      prefix = `common/panels/${position}/`;
      break;
    case PlatformAnimationsKey.ray:
      prefix = `common/ray/`;
      break;
  }
  return {
    ...editableConfigsByWorld[world][position][animationKey],
    animationKey: `${world}_platforms_${position}_${animationKey}`,
    prefix,
    texture: platformsTexture
  };
};

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
  [PlatformAnimationsKey.panel]: getAnimationConfig(
    world,
    position,
    PlatformAnimationsKey.panel
  ),
  [PlatformAnimationsKey.ray]: getAnimationConfig(
    world,
    position,
    PlatformAnimationsKey.ray
  )
});

export const getPlatFormsConfig = (world: enums.World): PlatformsConfig => ({
  [PlatformPosition.start]: getPositionConfig(world, PlatformPosition.start),
  [PlatformPosition.finish]: getPositionConfig(world, PlatformPosition.finish)
});
