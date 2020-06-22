import { enums } from "@colobobo/library";

type EditableTrapsAnimationConfig = {
  startFrame: number;
  endFrame: number;
};

type GeneratedTrapsAnimationConfig = {
  texture: string;
  animationKey: string;
  prefix: string;
};

export type TrapsAnimationConfig = EditableTrapsAnimationConfig &
  GeneratedTrapsAnimationConfig;

export type TrapsConfigsByWorlds = {
  [enums.World.desert]: {
    [key in enums.traps.Desert]: TrapsAnimationConfig;
  };
  [enums.World.jungle]: {
    [key in enums.traps.Jungle]: TrapsAnimationConfig;
  };
  [enums.World.mountain]: {
    [key in enums.traps.Mountain]: TrapsAnimationConfig;
  };
  [enums.World.river]: {
    [key in enums.traps.River]: TrapsAnimationConfig;
  };
};

export const trapsTexture = `texture-traps`;

const getGeneratedConfig = (
  world: enums.World,
  trapName: enums.traps.All
): GeneratedTrapsAnimationConfig => {
  return {
    prefix: `${world}/${trapName}/`,
    animationKey: `traps_${world}_${trapName}`,
    texture: trapsTexture
  };
};

export const trapsConfigsByWorlds: TrapsConfigsByWorlds = {
  [enums.World.desert]: {
    [enums.traps.Desert.fire]: {
      startFrame: 0,
      endFrame: 119,
      ...getGeneratedConfig(enums.World.desert, enums.traps.Desert.fire)
    },
    [enums.traps.Desert.meerkat]: {
      startFrame: 0,
      endFrame: 58,
      ...getGeneratedConfig(enums.World.desert, enums.traps.Desert.meerkat)
    },
    [enums.traps.Desert.snake]: {
      startFrame: 0,
      endFrame: 137,
      ...getGeneratedConfig(enums.World.desert, enums.traps.Desert.snake)
    }
  },
  [enums.World.jungle]: {
    [enums.traps.Jungle.bubblePlant]: {
      startFrame: 16,
      endFrame: 103,
      ...getGeneratedConfig(enums.World.jungle, enums.traps.Jungle.bubblePlant)
    },
    [enums.traps.Jungle.chameleon]: {
      startFrame: 0,
      endFrame: 74,
      ...getGeneratedConfig(enums.World.jungle, enums.traps.Jungle.chameleon)
    },
    [enums.traps.Jungle.liana]: {
      startFrame: 0,
      endFrame: 105,
      ...getGeneratedConfig(enums.World.jungle, enums.traps.Jungle.liana)
    }
  },
  [enums.World.mountain]: {
    [enums.traps.Mountain.geyser]: {
      startFrame: 0,
      endFrame: 37,
      ...getGeneratedConfig(enums.World.mountain, enums.traps.Mountain.geyser)
    },
    [enums.traps.Mountain.penguin]: {
      startFrame: 0,
      endFrame: 47,
      ...getGeneratedConfig(enums.World.mountain, enums.traps.Mountain.penguin)
    },
    [enums.traps.Mountain.stalactite]: {
      startFrame: 0,
      endFrame: 143,
      ...getGeneratedConfig(
        enums.World.mountain,
        enums.traps.Mountain.stalactite
      )
    }
  },
  [enums.World.river]: {
    [enums.traps.River.bubblePlant]: {
      startFrame: 11,
      endFrame: 91,
      ...getGeneratedConfig(enums.World.river, enums.traps.River.bubblePlant)
    },
    [enums.traps.River.fish]: {
      startFrame: 0,
      endFrame: 36,
      ...getGeneratedConfig(enums.World.river, enums.traps.River.fish)
    },
    [enums.traps.River.liana]: {
      startFrame: 0,
      endFrame: 105,
      ...getGeneratedConfig(enums.World.river, enums.traps.River.liana)
    }
  }
};

export const getTrapsConfig = (world: enums.World) =>
  trapsConfigsByWorlds[world];
