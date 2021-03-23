export enum AdminDevicesName {
  iPhone_5_SE = "iPhone 5/SE",
  iPhone_6_7_8 = "iPhone 6/7/8",
  iPhone_6_7_8_Plus = "iPhone 6/7/8 Plus",
  iPhone_X = "iPhone X",
  iPhone_11 = "iPhone 11",
  iPhone_11_Pro = "iPhone 11 Pro",
  iPad = "iPad",
  iPad_Pro = "iPad Pro",
  Samsung_Galaxy_S6 = "Samsung Galaxy S6",
  Samsung_Galaxy_S8 = "Samsung Galaxy S8",
  Samsung_Galaxy_S10_Plus = "Samsung Galaxy S10+"
}

export type AdminDevice = {
  name: AdminDevicesName;
  dimensions: {
    width: number;
    height: number;
  };
};

export const adminDevices: { [key in AdminDevicesName]: AdminDevice } = {
  [AdminDevicesName.iPhone_5_SE]: {
    name: AdminDevicesName.iPhone_5_SE,
    dimensions: {
      width: 320,
      height: 568
    }
  },
  [AdminDevicesName.iPhone_6_7_8]: {
    name: AdminDevicesName.iPhone_6_7_8,
    dimensions: {
      width: 375,
      height: 667
    }
  },
  [AdminDevicesName.iPhone_6_7_8_Plus]: {
    name: AdminDevicesName.iPhone_6_7_8_Plus,
    dimensions: {
      width: 414,
      height: 736
    }
  },
  [AdminDevicesName.iPhone_X]: {
    name: AdminDevicesName.iPhone_X,
    dimensions: {
      width: 375,
      height: 812
    }
  },
  [AdminDevicesName.iPhone_11]: {
    name: AdminDevicesName.iPhone_11,
    dimensions: {
      width: 414,
      height: 896
    }
  },
  [AdminDevicesName.iPhone_11_Pro]: {
    name: AdminDevicesName.iPhone_11_Pro,
    dimensions: {
      width: 375,
      height: 812
    }
  },
  [AdminDevicesName.iPad]: {
    name: AdminDevicesName.iPad,
    dimensions: {
      width: 768,
      height: 1024
    }
  },
  [AdminDevicesName.iPad_Pro]: {
    name: AdminDevicesName.iPad_Pro,
    dimensions: {
      width: 1024,
      height: 1366
    }
  },
  [AdminDevicesName.Samsung_Galaxy_S6]: {
    name: AdminDevicesName.Samsung_Galaxy_S6,
    dimensions: {
      width: 360,
      height: 640
    }
  },
  [AdminDevicesName.Samsung_Galaxy_S8]: {
    name: AdminDevicesName.Samsung_Galaxy_S8,
    dimensions: {
      width: 360,
      height: 740
    }
  },
  [AdminDevicesName.Samsung_Galaxy_S10_Plus]: {
    name: AdminDevicesName.Samsung_Galaxy_S10_Plus,
    dimensions: {
      width: 412,
      height: 869
    }
  }
};

export type AdminGroup = {
  name: String;
  devices: AdminDevicesName[];
  autoconnect: boolean;
};

export const adminGroups: AdminGroup[] = [
  {
    name: "Default room",
    devices: [AdminDevicesName.iPhone_6_7_8],
    autoconnect: false
  },
  {
    name: "Room with 2 mobiles",
    devices: [AdminDevicesName.iPhone_6_7_8, AdminDevicesName.iPhone_5_SE],
    autoconnect: true
  },
  {
    name: "Room with 3 mobiles",
    devices: [
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPhone_11,
      AdminDevicesName.Samsung_Galaxy_S10_Plus
    ],
    autoconnect: true
  },
  {
    name: "Room with same mobiles height",
    devices: [
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPhone_6_7_8
    ],
    autoconnect: true
  },
  {
    name: "Room with multiple mobiles height",
    devices: [
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPhone_11,
      AdminDevicesName.Samsung_Galaxy_S8,
      AdminDevicesName.Samsung_Galaxy_S10_Plus,
      AdminDevicesName.iPhone_X
    ],
    autoconnect: true
  },
  {
    name: "Room with mobiles and iPad",
    devices: [
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPhone_11,
      AdminDevicesName.iPad,
      AdminDevicesName.Samsung_Galaxy_S10_Plus
    ],
    autoconnect: true
  },
  {
    name: "Room with large devices",
    devices: [
      AdminDevicesName.iPhone_6_7_8,
      AdminDevicesName.iPad,
      AdminDevicesName.iPhone_11_Pro,
      AdminDevicesName.iPad,
      AdminDevicesName.iPhone_6_7_8
    ],
    autoconnect: true
  }
];
