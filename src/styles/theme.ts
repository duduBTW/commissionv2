// export const colors = {
//   primary: {
//     dark: "#FFFFFF",
//     main: "#E86B8E",
//     light: "#33181F",
//   },
//   content: "#262626",
//   background: "#0F0F0F",
//   text: {
//     "80": "rgba(255, 255, 255, 0.82);",
//     "60": "rgba(255, 255, 255, 0.62);",
//     "40": "rgba(255, 255, 255, 0.42);",
//   },
//   divider: "rgba(255, 255, 255, 0.08)",
//   success: {
//     light: "#F6FFF8",
//     main: "#50A773",
//     dark: "#169F00",
//   },
//   error: {
//     light: "#FFF6F6",
//     main: "#F03232",
//     dark: "#9F0000",
//   },
//   info: {
//     light: "#F6FDFF",
//     main: "#327DF0",
//     dark: "#00799F",
//   },
// } as const;
export const colors = {
  primary: {
    dark: "#CE4C71",
    main: "#E86B8E",
    light: "#FCEDF1",
  },
  content: "#FFFFFF",
  background: "#F5F3F8",
  text: {
    "80": "rgba(0, 0, 0, 0.82);",
    "60": "rgba(0, 0, 0, 0.62);",
    "40": "rgba(0, 0, 0, 0.42);",
    "20": "rgba(0, 0, 0, 0.08);",
  },
  divider: "rgba(0, 0, 0, 0.08)",
  success: {
    light: "#80EBB2",
    main: "#0FBD61",
    dark: "#169F00",
  },
  error: {
    light: "#F0323219",
    main: "#F03232",
    dark: "#9F0000",
  },
  info: {
    light: "#F6FDFF",
    main: "#327DF0",
    dark: "#00799F",
  },
} as const;

export const mq = {
  fromMobileSm: "@media (min-width: 375px)",
  fromMobileLg: "@media (min-width: 546px)",
  fromTabletSm: "@media (min-width: 768px)",
  fromTabletMd: "@media (min-width: 938px)",
  fromTabletLg: "@media (min-width: 1030px)",
  fromDesktopSm: "@media (min-width: 1270px)",
  fromDesktopLg: "@media (min-width: 1560px)",
  fromDesktopXl: "@media (min-width: 2240px)",
};
