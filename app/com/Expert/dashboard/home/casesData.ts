export interface IncomingCase {
  id: string;
  clientName: string;
  problemType: string;
  status: "Pending" | "In-Progress" | "Completed";
  receivedDate: string;
}

// إضافة تصدير باسم Case ليتوافق مع الاستيراد في صفحة Expert Dashboard
export type Case = IncomingCase;

export const incomingCases: IncomingCase[] = [
  {
    id: "C-0041",
    clientName: "Layla Al-Hassan",
    problemType: "Acne & Hyperpigmentation",
    status: "Pending",
    receivedDate: "Jul 15, 2026",
  },
  {
    id: "C-0042",
    clientName: "Sara Mahmoud",
    problemType: "Dry Skin & Sensitivity",
    status: "In-Progress",
    receivedDate: "Jul 15, 2026",
  },
  {
    id: "C-0043",
    clientName: "Hana Yusuf",
    problemType: "Combination Skin Routine",
    status: "Pending",
    receivedDate: "Jul 14, 2026",
  },
  {
    id: "C-0040",
    clientName: "Dina Farouk",
    problemType: "Anti-Aging & Hydration",
    status: "Completed",
    receivedDate: "Jul 10, 2026",
  },
];