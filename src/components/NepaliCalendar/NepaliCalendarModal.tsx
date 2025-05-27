// // NepaliCalendarModal.tsx
// import { useState } from "react";
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import NepaliDate from "nepali-date-converter";

// const months = [
//   "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashoj",
//   "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
// ];

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// export default function NepaliCalendarModal() {
//   const todayBS = new NepaliDate(new Date());
//   const [year, setYear] = useState(todayBS.getYear());
//   const [month, setMonth] = useState(todayBS.getMonth());
//   const [selectedDay, setSelectedDay] = useState<number | null>(null);
//   const [selectedDate, setSelectedDate] = useState("");

//   // Approximate BS month lengths
//   const bsMonthLengths = [31, 31, 32, 32, 31, 30, 30, 29, 29, 30, 29, 30];
//   const daysInMonth = bsMonthLengths[month];

//   const getFirstDayOffset = () => {
//     const firstDay = new NepaliDate(year, month, 1).toJsDate();
//     return firstDay.getDay();
//   };

//   const offset = getFirstDayOffset();

//   const handleSelect = (day: number) => {
//     setSelectedDay(day);
//     setSelectedDate(`${year}-${month + 1}-${day}`);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger className="p-2 bg-blue-600 text-white rounded">Pick BS Date</DialogTrigger>
//       <DialogContent className="bg-white w-fit p-6 rounded-xl shadow-xl">
//         <div className="mb-4 flex justify-between items-center">
//           <button onClick={() => setMonth((month - 1 + 12) % 12)}>◀</button>
//           <h2 className="font-semibold">{months[month]} {year}</h2>
//           <button onClick={() => setMonth((month + 1) % 12)}>▶</button>
//         </div>

//         <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm font-medium">
//           {days.map((d) => <div key={d}>{d}</div>)}
//         </div>

//         <div className="grid grid-cols-7 gap-2 text-center text-sm">
//           {Array(offset).fill(null).map((_, i) => (
//             <div key={`empty-${i}`} className="text-gray-300">-</div>
//           ))}
//           {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
//             <div
//               key={day}
//               onClick={() => handleSelect(day)}
//               className={`p-2 rounded cursor-pointer hover:bg-blue-200 transition ${
//                 selectedDay === day ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         {selectedDate && (
//           <div className="mt-4 text-center text-sm text-gray-600">
//             Selected Date: <span className="font-semibold">{selectedDate}</span>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
