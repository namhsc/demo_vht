import { LayoutItem } from "app/app";

const layoutDefault: Record<string, LayoutItem[]> = {
  "layout_/dashboard_default": [
    {
      i: "timeDistributon",
      x: 0,
      y: 0,
      w: 6,
      h: 4,
    },
    {
      i: "platformStats",
      x: 6,
      y: 0,
      w: 6,
      h: 4,
    },
    {
      i: "feedbackRating",
      x: 0,
      y: 4,
      w: 12,
      h: 4,
    },
  ],
  "layout_/user_experience_default": [
    {
      i: "timeDistributon",
      x: 0,
      y: 0,
      w: 6,
      h: 4,
    },
    {
      i: "platformStats",
      x: 6,
      y: 0,
      w: 6,
      h: 4,
    },
    {
      i: "feedbackRating",
      x: 0,
      y: 4,
      w: 12,
      h: 4,
    },
  ],
  "layout_/vendor_activity_default": [
    {
      i: "countDeviceByVendor",
      x: 0,
      y: 0,
      w: 4,
      h: 3,
    },
    {
      i: "newDeviceVendor",
      x: 4,
      y: 0,
      w: 4,
      h: 3,
    },
    {
      i: "countDeviceByTy",
      x: 0,
      y: 3,
      w: 8,
      h: 3,
    },
  ],
  "layout_/business_activity_default": [
    {
      i: "countUp",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
    },
    {
      i: "countOut",
      x: 3,
      y: 0,
      w: 2,
      h: 1,
    },
    {
      i: "typeUser",
      x: 5,
      y: 0,
      w: 4,
      h: 1,
    },
    {
      i: "revenueTotal",
      x: 0,
      y: 1,
      w: 4,
      h: 3,
    },
    {
      i: "userService",
      x: 9,
      y: 0,
      w: 3,
      h: 1,
    },
    {
      i: "totalServicePerMonth",
      x: 4,
      y: 1,
      w: 4,
      h: 3,
    },
    {
      i: "totalUserPackage",
      x: 8,
      y: 1,
      w: 4,
      h: 3,
    },
  ],
};

export { layoutDefault };
