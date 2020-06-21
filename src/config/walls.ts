import { enums } from "@colobobo/library";

type EditableWallsAnimationConfig = {
  startFrame: number;
  endFrame: number;
};

type GeneratedWallsAnimationConfig = {
  texture: string;
  animationKey: string;
  prefix: string;
};

export type WallsAnimationConfig = EditableWallsAnimationConfig &
  GeneratedWallsAnimationConfig;

export type WallsConfigsByWorlds = {
  [key in enums.World]: WallsAnimationConfig;
};

export const wallsShapes = "shapes-walls";

export const wallsTexture = `texture-walls`;

const getGeneratedConfig = (
  world: enums.World
): GeneratedWallsAnimationConfig => {
  return {
    prefix: `${world}/`,
    animationKey: `walls_${world}`,
    texture: wallsTexture
  };
};

export const wallsConfigsByWorlds: WallsConfigsByWorlds = {
  [enums.World.desert]: {
    startFrame: 0,
    endFrame: 124,
    ...getGeneratedConfig(enums.World.desert)
  },
  [enums.World.jungle]: {
    startFrame: 0,
    endFrame: 74,
    ...getGeneratedConfig(enums.World.jungle)
  },
  [enums.World.mountain]: {
    startFrame: 0,
    endFrame: 99,
    ...getGeneratedConfig(enums.World.mountain)
  },
  [enums.World.river]: {
    startFrame: 0,
    endFrame: 79,
    ...getGeneratedConfig(enums.World.river)
  }
};

export const getWallsConfig = (world: enums.World) =>
  wallsConfigsByWorlds[world];
