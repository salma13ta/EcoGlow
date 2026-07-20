"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface Client {
  id: string;
  name: string;
  avatar: string;
  age: number;
  lastConsultation: string;
  skinType: string;
  totalCases: number;
  active: boolean;
}

interface ClientsTableProps {
  clients?: Client[];
}

export default function ClientsTable({ clients = [] }: ClientsTableProps) {
  const router = useRouter();

  if (!clients || clients.length === 0) {
    return (
      <div className="w-full text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
        جاري تحميل قائمة العملاء...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 1. تصميم الموبايل: نظام كروت (Mobile Cards - يظهر فقط على الشاشات الصغيرة) */}
      <div className="block md:hidden space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => router.push(`/com/Expert/dashboard/cases/${client.id}`)}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3 cursor-pointer active:scale-[0.99] transition-transform"
          >
            {/* الهيدر: العميل والحالة */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-base">{client.name}</h4>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">
                    {client.id}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  client.active
                    ? "bg-green-50 text-green-700 border-green-200/60"
                    : "bg-gray-50 text-gray-400 border-gray-200/60"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    client.active ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                {client.active ? "Active" : "Inactive"}
              </span>
            </div>

            {/* تفاصيل العميل في الموبايل */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50 text-xs">
              <div>
                <span className="text-gray-400 block">Skin Type:</span>
                <span className="font-medium text-gray-700">{client.skinType}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Age:</span>
                <span className="font-medium text-gray-700">{client.age} yrs</span>
              </div>
              <div>
                <span className="text-gray-400 block">Last Consult:</span>
                <span className="font-medium text-gray-700">{client.lastConsultation}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Total Cases:</span>
                <span className="font-medium text-gray-700">{client.totalCases} cases</span>
              </div>
            </div>

            {/* الأزرار على الموبايل */}
            <div
              className="flex gap-2 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() =>
                  router.push(`/com/Expert/dashboard/cases/${client.id}?tab=archive`)
                }
                className="flex-1 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                Archive
              </button>
              <button
                onClick={() => router.push(`/com/Expert/dashboard/cases/${client.id}`)}
                className="flex-1 py-2 text-xs font-medium bg-[#1e3d2f] text-white rounded-lg hover:bg-[#152c22] text-center"
              >
                Protocol
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. تصميم الشاشات الكبيرة: الجدول الأساسي (Desktop Table - يظهر فقط على md فأكبر) */}
      <div className="hidden md:block w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Skin Type</th>
                <th className="px-6 py-4">Last Consult</th>
                <th className="px-6 py-4">Cases</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {clients.map((client) => (
                <motion.tr
                  key={client.id}
                  whileHover={{ backgroundColor: "#fcfdfc", scale: 0.998 }}
                  transition={{ duration: 0.15 }}
                  className="cursor-pointer group"
                  onClick={() => router.push(`/com/Expert/dashboard/cases/${client.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                        <Image
                          src={client.avatar}
                          alt={client.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-[#1e3d2f] transition-colors">
                          {client.name}
                        </h4>
                        <span className="text-xs text-gray-400 uppercase tracking-wider block mt-0.5">
                          {client.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{client.age}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{client.skinType}</td>
                  <td className="px-6 py-4 text-gray-500">{client.lastConsultation}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{client.totalCases}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                        client.active
                          ? "bg-green-50 text-green-700 border-green-200/60"
                          : "bg-gray-50 text-gray-400 border-gray-200/60"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          client.active ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {client.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2.5 justify-end" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() =>
                          router.push(`/com/Expert/dashboard/cases/${client.id}?tab=archive`)
                        }
                        className="px-4 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        View Archive
                      </button>

                      <button
                        onClick={() => router.push(`/com/Expert/dashboard/cases/${client.id}`)}
                        className="px-4 py-1.5 text-xs font-medium bg-[#1e3d2f] text-white rounded-md hover:bg-[#152c22] transition-colors shadow-sm"
                      >
                        Update Protocol
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}