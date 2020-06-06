import { enums } from "@colobobo/library";
import { Colors } from "../components/InterfaceButton";

// COLORS

type ColorConfig = {
  bgColor: string;
  bgBleedColor: string;
  colorTheme: Colors;
};

type ColorsConfig = {
  [key in enums.World]: ColorConfig;
};

const colorsConfig: ColorsConfig = {
  [enums.World.jungle]: {
    bgColor: "#E8FDC4",
    bgBleedColor: "#006845",
    colorTheme: Colors.red
  },
  [enums.World.river]: {
    bgColor: "#BBCBFC",
    bgBleedColor: "#000D3B",
    colorTheme: Colors.pink
  },
  [enums.World.mountain]: {
    bgColor: "#A4E7FF",
    bgBleedColor: "#1B62E0",
    colorTheme: Colors.red
  },
  [enums.World.desert]: {
    bgColor: "#FFE75E",
    bgBleedColor: "#FB472A",
    colorTheme: Colors.blue
  }
};

// WORLDS

type WorldConfig = ColorConfig & {
  name: enums.World;
  backgrounds: {
    first: string;
    second: string;
  };
  decorations: {
    top: string;
    bottom: string;
    bleeds: {
      top: string;
      bottom: string;
    };
  };
};

type WorldsConfig = {
  [key in enums.World]: WorldConfig;
};

const getConfigs = (): WorldsConfig => {
  let worldsConfig = {};
  Object.values(enums.World).forEach(world => {
    worldsConfig = {
      ...worldsConfig,
      [world]: {
        name: world,
        ...colorsConfig[world],
        backgrounds: {
          first: require(`../assets/worlds/${world}/background-1.png`),
          second: require(`../assets/worlds/${world}/background-2.png`)
        },
        decorations: {
          top: require(`../assets/worlds/${world}/decorations/top.png`),
          bottom: require(`../assets/worlds/${world}/decorations/bottom.png`),
          bleeds: {
            top: require(`../assets/worlds/${world}/decorations/bleeds/top.png`),
            bottom: require(`../assets/worlds/${world}/decorations/bleeds/bottom.png`)
          }
        }
      } as WorldConfig
    };
  });

  return worldsConfig as WorldsConfig;
};

export const worldsConfig = getConfigs();
