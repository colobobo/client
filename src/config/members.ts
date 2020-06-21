import { enums } from "@colobobo/library";

export enum MemberAnimations {
  start = "start",
  drag = "drag",
  finish = "finish"
}

type EditableMembersAnimationConfig = {
  startFrame: number;
  endFrame: number;
};

type GeneratedMembersAnimationConfig = {
  texture: string;
  animationKey: string;
  prefix: string;
};

export type MembersAnimationConfig = EditableMembersAnimationConfig &
  GeneratedMembersAnimationConfig;

export type MembersAnimationsConfig = {
  [key in MemberAnimations]: MembersAnimationConfig;
};

export type MembersConfigsBySkin = {
  [key in enums.member.Skins]: MembersAnimationsConfig;
};

export const membersTexture = "texture-members";

const getGeneratedConfig = (
  skin: enums.member.Skins,
  animationName: MemberAnimations
): GeneratedMembersAnimationConfig => {
  return {
    prefix: `${skin}/${animationName}/`,
    animationKey: `members_${skin}_${animationName}`,
    texture: membersTexture
  };
};

export const membersConfigsBySkin: MembersConfigsBySkin = {
  [enums.member.Skins.fatty]: {
    [MemberAnimations.start]: {
      startFrame: 0,
      endFrame: 21,
      ...getGeneratedConfig(enums.member.Skins.fatty, MemberAnimations.start)
    },
    [MemberAnimations.drag]: {
      startFrame: 1,
      endFrame: 8,
      ...getGeneratedConfig(enums.member.Skins.fatty, MemberAnimations.drag)
    },
    [MemberAnimations.finish]: {
      startFrame: 153,
      endFrame: 172,
      ...getGeneratedConfig(enums.member.Skins.fatty, MemberAnimations.finish)
    }
  },
  [enums.member.Skins.injured]: {
    [MemberAnimations.start]: {
      startFrame: 0,
      endFrame: 21,
      ...getGeneratedConfig(enums.member.Skins.injured, MemberAnimations.start)
    },
    [MemberAnimations.drag]: {
      startFrame: 1,
      endFrame: 8,
      ...getGeneratedConfig(enums.member.Skins.injured, MemberAnimations.drag)
    },
    [MemberAnimations.finish]: {
      startFrame: 153,
      endFrame: 172,
      ...getGeneratedConfig(enums.member.Skins.injured, MemberAnimations.finish)
    }
  },
  [enums.member.Skins.intellectual]: {
    [MemberAnimations.start]: {
      startFrame: 0,
      endFrame: 21,
      ...getGeneratedConfig(
        enums.member.Skins.intellectual,
        MemberAnimations.start
      )
    },
    [MemberAnimations.drag]: {
      startFrame: 1,
      endFrame: 8,
      ...getGeneratedConfig(
        enums.member.Skins.intellectual,
        MemberAnimations.drag
      )
    },
    [MemberAnimations.finish]: {
      startFrame: 153,
      endFrame: 172,
      ...getGeneratedConfig(
        enums.member.Skins.intellectual,
        MemberAnimations.finish
      )
    }
  },
  [enums.member.Skins.rebel]: {
    [MemberAnimations.start]: {
      startFrame: 0,
      endFrame: 21,
      ...getGeneratedConfig(enums.member.Skins.rebel, MemberAnimations.start)
    },
    [MemberAnimations.drag]: {
      startFrame: 1,
      endFrame: 8,
      ...getGeneratedConfig(enums.member.Skins.rebel, MemberAnimations.drag)
    },
    [MemberAnimations.finish]: {
      startFrame: 153,
      endFrame: 172,
      ...getGeneratedConfig(enums.member.Skins.rebel, MemberAnimations.finish)
    }
  },
  [enums.member.Skins.scout]: {
    [MemberAnimations.start]: {
      startFrame: 0,
      endFrame: 21,
      ...getGeneratedConfig(enums.member.Skins.scout, MemberAnimations.start)
    },
    [MemberAnimations.drag]: {
      startFrame: 1,
      endFrame: 8,
      ...getGeneratedConfig(enums.member.Skins.scout, MemberAnimations.drag)
    },
    [MemberAnimations.finish]: {
      startFrame: 153,
      endFrame: 172,
      ...getGeneratedConfig(enums.member.Skins.scout, MemberAnimations.finish)
    }
  }
};
