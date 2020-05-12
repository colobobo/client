export const groups = [
  {
    name: "Default room",
    devices: ["iPhone 6/7/8"],
    autoconnect: true
  },
  {
    name: "Room with same mobiles height",
    devices: ["iPhone 6/7/8", "iPhone 6/7/8", "iPhone 6/7/8", "iPhone 6/7/8"],
    autoconnect: true
  },
  {
    name: "Room with multiple mobiles height",
    devices: [
      "iPhone 6/7/8",
      "iPhone 11",
      "Samsung Galaxy S8",
      "Samsung Galaxy S10/S10+/Note10",
      "iPhone X"
    ],
    autoconnect: true
  },
  {
    name: "Room with mobiles and ipad",
    devices: [
      "iPhone 6/7/8",
      "iPhone 11",
      "iPad",
      "Samsung Galaxy S10/S10+/Note10"
    ],
    autoconnect: false
  }
];
