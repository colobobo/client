export enum members {
  member1 = "member-1",
  member2 = "member-2",
  member3 = "member-3",
  member4 = "member-4",
  member5 = "member-5",
  member6 = "member-6"
}

type MemberConfig = Phaser.Types.Loader.FileTypes.SVGFileConfig;

type MembersConfig = {
  [key in members]: MemberConfig;
};

const getConfigs = (): MembersConfig => {
  let configs = {};
  Object.values(members).forEach(value => {
    configs = {
      ...configs,
      [value]: {
        key: value,
        url: `/images/members/${value}.svg`,
        svgConfig: {
          scale: 1
        }
      } as MemberConfig
    };
  });

  return configs as MembersConfig;
};

export const membersConfig = getConfigs();
