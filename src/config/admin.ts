export const devicesName = {
  iPhone_5_SE: "iPhone 5/SE",
  iPhone_6_7_8: "iPhone 6/7/8",
  iPhone_6_7_8_Plus: "iPhone 6/7/8 Plus",
  iPhone_X: "iPhone X",
  iPhone_11: "iPhone 11",
  iPhone_11_Pro: "iPhone 11 Pro",
  iPad: "iPad",
  iPad_Pro: "iPad Pro",
  Samsung_Galaxy_S6: "Samsung Galaxy S6",
  Samsung_Galaxy_S8: "Samsung Galaxy S8",
  Samsung_Galaxy_S10_Plus: "Samsung Galaxy S10+"
};

export const adminDevices = [
  {
    name: devicesName.iPhone_5_SE,
    resolution: {
      width: 320,
      height: 568
    }
  },
  {
    name: devicesName.iPhone_6_7_8,
    resolution: {
      width: 375,
      height: 667
    }
  },
  {
    name: devicesName.iPhone_6_7_8_Plus,
    resolution: {
      width: 414,
      height: 736
    }
  },
  {
    name: devicesName.iPhone_X,
    resolution: {
      width: 375,
      height: 812
    }
  },
  {
    name: devicesName.iPhone_11,
    resolution: {
      width: 414,
      height: 896
    }
  },
  {
    name: devicesName.iPhone_11_Pro,
    resolution: {
      width: 375,
      height: 812
    }
  },
  {
    name: devicesName.iPad,
    resolution: {
      width: 768,
      height: 1024
    }
  },
  {
    name: devicesName.iPad_Pro,
    resolution: {
      width: 1024,
      height: 1366
    }
  },
  {
    name: devicesName.Samsung_Galaxy_S6,
    resolution: {
      width: 360,
      height: 640
    }
  },
  {
    name: devicesName.Samsung_Galaxy_S8,
    resolution: {
      width: 360,
      height: 740
    }
  },
  {
    name: devicesName.Samsung_Galaxy_S10_Plus,
    resolution: {
      width: 412,
      height: 869
    }
  }
];

export const adminGroups = [
  {
    name: "Default room",
    devices: [devicesName.iPhone_6_7_8],
    autoconnect: false
  },
  {
    name: "Room with same mobiles height",
    devices: [
      devicesName.iPhone_6_7_8,
      devicesName.iPhone_6_7_8,
      devicesName.iPhone_6_7_8,
      devicesName.iPhone_6_7_8
    ],
    autoconnect: true
  },
  {
    name: "Room with multiple mobiles height",
    devices: [
      devicesName.iPhone_6_7_8,
      devicesName.iPhone_11,
      devicesName.Samsung_Galaxy_S8,
      devicesName.Samsung_Galaxy_S10_Plus,
      devicesName.iPhone_X
    ],
    autoconnect: true
  },
  {
    name: "Room with mobiles and ipad",
    devices: [
      devicesName.iPhone_6_7_8,
      devicesName.iPhone_11,
      devicesName.iPad,
      devicesName.Samsung_Galaxy_S10_Plus
    ],
    autoconnect: true
  },
  {
    name: "Room with tall mobiles",
    devices: [
      devicesName.iPhone_X,
      devicesName.iPhone_11,
      devicesName.iPad,
      devicesName.iPhone_11_Pro
    ],
    autoconnect: true
  },
  {
    name: "Room with 3 mobiles",
    devices: [
      devicesName.iPhone_6_7_8,
      devicesName.iPhone_11,
      devicesName.Samsung_Galaxy_S10_Plus
    ],
    autoconnect: true
  },
  {
    name: "Room with large mobiles",
    devices: [
      devicesName.iPhone_6_7_8,
      devicesName.iPad,
      devicesName.iPhone_11_Pro,
      devicesName.iPad,
      devicesName.iPhone_6_7_8
    ],
    autoconnect: true
  }
];
