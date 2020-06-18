import logo from "../assets/logo/spritesheets/logo.png";
import teacher_fail from "../assets/illustrations/score/spritesheets/teacher_fail.png";
import teacher_success from "../assets/illustrations/score/spritesheets/teacher_success.png";
import group_fail from "../assets/illustrations/score/spritesheets/group_fail.png";
import group_success from "../assets/illustrations/score/spritesheets/group_success.png";
import sign from "../assets/illustrations/score/spritesheets/sign.png";

export enum animationId {
  logo = "logo",
  teacher_fail = "teacher_fail",
  teacher_success = "teacher_success",
  group_fail = "group_fail",
  group_success = "group_success",
  sign = "sign"
}

interface AnimationType {
  image: any;
  widthFrame: number;
  heightFrame: number;
  steps: number;
  fps: number;
  loop: boolean;
}

const animations: { [key: string]: AnimationType } = {
  [animationId.logo]: {
    image: logo,
    widthFrame: 400,
    heightFrame: 289,
    steps: 214,
    fps: 25,
    loop: true
  },
  [animationId.teacher_fail]: {
    image: teacher_fail,
    widthFrame: 150,
    heightFrame: 150,
    steps: 74,
    fps: 25,
    loop: false
  },
  [animationId.teacher_success]: {
    image: teacher_success,
    widthFrame: 150,
    heightFrame: 150,
    steps: 14,
    fps: 25,
    loop: true
  },
  [animationId.group_success]: {
    image: group_success,
    widthFrame: 1100,
    heightFrame: 620,
    steps: 96,
    fps: 25,
    loop: false
  },
  [animationId.group_fail]: {
    image: group_fail,
    widthFrame: 1100,
    heightFrame: 620,
    steps: 96,
    fps: 25,
    loop: false
  },
  [animationId.sign]: {
    image: sign,
    widthFrame: 600,
    heightFrame: 600,
    steps: 96,
    fps: 25,
    loop: true
  }
};

export default animations;
