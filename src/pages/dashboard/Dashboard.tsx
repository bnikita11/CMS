// src/pages/DashboardPage.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input'; // You might need this for some dashboard elements
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, FilePlus } from 'lucide-react'; // For icons in dashboard cards/sections

// Dummy data for recent files
const recentFiles = [
  { id: '1', type: 'PDF', name: 'Company Registration Docs', date: '2 day ago', case: 'Karina Case: 11234' },
  { id: '2', type: 'PDF', name: 'Company Registration Docs', date: '2 day ago', case: 'Karina Case: 11234' },
  { id: '3', type: 'DOC', name: 'Project Proposal', date: '2 day ago', case: 'Karina Case: 11234' },
];

// Dummy data for activity
const activityData = [
  { id: '1', task: 'Book p. 77-85, read & complete tasks 1-6 on p. 85', case: 'Case #12314 By Anil', status: 'Done' },
  { id: '2', task: 'Workbook p. 17, tasks 1-6', case: 'Case #12314 By Anil', status: 'In Process' },
  { id: '3', task: 'Learn paragraph p. 99, Exercise 1,2,3', case: 'Case #12314 By Anil', status: 'Done' },
  { id: '4', task: 'Write essay 1000 words "WW2 results"', case: 'Case #12314 By Anil', status: 'In Process' },
  { id: '5', task: 'Internal conflicts in Philip Larkin poems, read p 380-515', case: 'Case #12314 By Anil', status: 'In Process' },
];

// Dummy data for calendar
const calendarData = [
  { id: '1', time: '10:20-11:00 AM', event: '9 Degree Project Estimation Meeting', creator: 'Peter' },
  { id: '2', time: '10:20-11:00 AM', event: '9 Degree Project Estimation Meeting', creator: 'Peter' },
  { id: '3', time: '10:20-11:00 AM', event: '9 Degree Project Estimation Meeting', creator: 'Peter' },
];

const DashboardPage: React.FC = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Total Clients
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-blue-600">
              +499
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Documents
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-green-600">
              +1000
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Corporate Clients
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-yellow-600">
              399
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Active Cases
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-purple-600">
              +100
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Individual Clients
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-pink-600">
              +499
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Invoices
            </CardTitle>
            <CardDescription className="text-2xl font-bold text-orange-600">
              +100
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  e-Discovery
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Most used link 2
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  Most used link 4
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Upgrade Your Plan
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Clients</p>
                <p className="text-xl font-bold">Up to 500</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Case</p>
                <p className="text-xl font-bold">Unlimited</p>
              </div>
            </div>
            <Button>Upgrade Plan</Button>
          </CardContent>
        </Card>
      </section>

      {/* Recent Files and Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Recent Files
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Total 200 files, 608 space usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="file-icon w-8 h-8 rounded-md bg-red-500 text-white flex items-center justify-center">
                      {file.type}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.date}, {file.case}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label
                htmlFor="file-upload"
                className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md py-2 px-4 transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <FilePlus className='w-4 h-4' />
                Quick file uploader
              </label>
              <input id="file-upload" type="file" className="hidden" />
              <p className="text-xs text-gray-500 mt-2">
                Drag & Drop or choose files from computer
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Case</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityData.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.task}</TableCell>
                    <TableCell>{activity.case}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          activity.status === "Done"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        )}
                      >
                        {activity.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Calendar Section */}
      <section className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Calendar
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Upcoming Meetings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              {calendarData.map((event) => (
                <div key={event.id} className="p-4 bg-white shadow rounded-lg">
                  <p className="text-sm font-medium text-gray-700">
                    {event.event}
                  </p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                  <p className="text-xs text-gray-400 italic">by {event.creator}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;