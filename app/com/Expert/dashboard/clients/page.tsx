import ClientsTable from "./ClientsTable";

// الداتا كاملة بالـ 8 عملاء بدون أي اختصار عشان تظهر كلها فوراً
const CLIENTS = [
  {
    id: "CL01",
    name: "Layla Al-Hassan",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&auto=format",
    age: 28,
    lastConsultation: "Jul 15, 2026",
    skinType: "Oily / Combination",
    totalCases: 4,
    active: true,
  },
  {
    id: "CL02",
    name: "Sara Mahmoud",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format",
    age: 35,
    lastConsultation: "Jun 28, 2026",
    skinType: "Dry / Sensitive",
    totalCases: 2,
    active: true,
  },
  {
    id: "CL03",
    name: "Hana Yusuf",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&auto=format",
    age: 38,
    lastConsultation: "Jul 12, 2026",
    skinType: "Combination",
    totalCases: 6,
    active: true,
  },
  {
    id: "CL04",
    name: "Mira Abdullah",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format",
    age: 24,
    lastConsultation: "May 14, 2026",
    skinType: "Oily",
    totalCases: 1,
    active: false,
  },
  {
    id: "CL05",
    name: "Dina Farouk",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=60&h=60&fit=crop&auto=format",
    age: 45,
    lastConsultation: "Jul 01, 2026",
    skinType: "Dry / Mature",
    totalCases: 8,
    active: true,
  },
  {
    id: "CL06",
    name: "Yasmine Nasser",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&auto=format",
    age: 29,
    lastConsultation: "Jun 10, 2026",
    skinType: "Normal",
    totalCases: 3,
    active: true,
  },
  {
    id: "CL07",
    name: "Rania Karim",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&auto=format",
    age: 42,
    lastConsultation: "Jul 15, 2026",
    skinType: "Normal / Mature",
    totalCases: 5,
    active: true,
  },
  {
    id: "CL08",
    name: "Noor Al-Rashid",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    age: 31,
    lastConsultation: "Jul 15, 2026",
    skinType: "Sensitive / Reactive",
    totalCases: 2,
    active: true,
  },
];

export default function Page() {
  const activeCount = CLIENTS.filter((c) => c.active).length;
  const inactiveCount = CLIENTS.filter((c) => !c.active).length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase block">
          Client Registry — قائمة العملاء
        </span>
        <h1 className="text-3xl font-serif text-gray-900 mt-1">My Clients</h1>
        <p className="text-sm text-gray-500 mt-1">
          {activeCount} active · {inactiveCount} inactive
        </p>
      </div>

      <ClientsTable clients={CLIENTS} />
    </div>
  );
}