import { enums } from "@colobobo/library";

type MemberConfig = {
  skin: Phaser.Types.Loader.FileTypes.SVGFileConfig;
};

type MembersConfig = {
  [key in enums.member.Skins]: MemberConfig;
};

const getConfigs = (): MembersConfig => {
  let membersConfig = {};
  Object.values(enums.member.Skins).forEach(skin => {
    membersConfig = {
      ...membersConfig,
      [skin]: {
        skin: {
          key: skin,
          url: require(`../assets/members/${skin}/skin.svg`),
          svgConfig: {
            scale: 1
          }
        }
      } as MemberConfig
    };
  });

  return membersConfig as MembersConfig;
};

export const membersConfig = getConfigs();
