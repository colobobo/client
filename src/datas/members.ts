import { enums } from "@colobobo/library";

type MemberSkinConfig = Phaser.Types.Loader.FileTypes.SVGFileConfig;

type MembersSkinConfig = {
  [key in enums.member.Skins]: MemberSkinConfig;
};

const getConfigs = (): MembersSkinConfig => {
  let configs = {};
  Object.values(enums.member.Skins).forEach(value => {
    configs = {
      ...configs,
      [value]: {
        key: value,
        url: require(`../assets/members/${value}.svg`),
        svgConfig: {
          scale: 1
        }
      } as MemberSkinConfig
    };
  });

  return configs as MembersSkinConfig;
};

export const membersSkinConfig = getConfigs();
