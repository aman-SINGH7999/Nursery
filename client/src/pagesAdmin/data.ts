export type Activity = {
  id: string;
  customer: {
    name: string;
    email?: string;
  };
  type: "order" | "login" | "payment" | "support" | "signup";
  item?: string | null;
  time: string;
};

export const activities: Activity[] = [
  {
    id: "ACT-1001",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
    },
    type: "order",
    item: "iPhone 15 Pro",
    time: "10 Jan 2026, 10:45 AM",
  },
  {
    id: "ACT-1002",
    customer: {
      name: "Anjali Verma",
      email: "anjali.verma@gmail.com",
    },
    type: "payment",
    item: "Order #ORD-4521",
    time: "10 Jan 2026, 11:10 AM",
  },
  {
    id: "ACT-1003",
    customer: {
      name: "Mohit Singh",
    },
    type: "login",
    item: null,
    time: "10 Jan 2026, 12:05 PM",
  },
  {
    id: "ACT-1004",
    customer: {
      name: "Pooja Patel",
      email: "pooja.patel@gmail.com",
    },
    type: "support",
    item: "Refund Request",
    time: "10 Jan 2026, 01:30 PM",
  },
  {
    id: "ACT-1005",
    customer: {
      name: "Aman Gupta",
      email: "aman.gupta@gmail.com",
    },
    type: "signup",
    item: null,
    time: "10 Jan 2026, 02:15 PM",
  },
];
