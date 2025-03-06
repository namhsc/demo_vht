import { LayoutItem } from "app/app";

const layoutDefault: Record<string, LayoutItem[]> = {
  "layout_/dashboard_default": [
    {
      w: 3,
      h: 3,
      x: 0,
      y: 0,
      i: "timeDistributon",
    },
    {
      w: 3,
      h: 3,
      x: 9,
      y: 0,
      i: "platformStats",
    },
    {
      w: 6,
      h: 3,
      x: 3,
      y: 0,
      i: "feedbackRating",
    },
    {
      w: 12,
      h: 5,
      x: 0,
      y: 3,
      i: "tableRating",
    },
  ],
  "layout_/dashboard/user_experience_default": [
    {
      w: 3,
      h: 3,
      x: 0,
      y: 0,
      i: "timeDistributon",
    },
    {
      w: 3,
      h: 3,
      x: 9,
      y: 0,
      i: "platformStats",
    },
    {
      w: 6,
      h: 3,
      x: 3,
      y: 0,
      i: "feedbackRating",
    },
    {
      w: 12,
      h: 5,
      x: 0,
      y: 3,
      i: "tableRating",
    },
  ],
  "layout_/dashboard/vendor_activity_default": [
    {
      w: 2,
      h: 2,
      x: 0,
      y: 0,
      i: "countDeviceByVendor",
    },
    {
      w: 2,
      h: 2,
      x: 2,
      y: 0,
      i: "newDeviceVendor",
    },
    {
      w: 4,
      h: 2,
      x: 4,
      y: 0,
      i: "countDeviceByTy",
    },
    {
      w: 8,
      h: 3,
      x: 0,
      y: 2,
      i: "tableVendor",
    },
  ],
  "layout_/dashboard/business_activity_default": [
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
