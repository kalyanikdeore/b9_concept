// utils/sidebarConfig.js

import {
  Home,
  Users,
  ClipboardList,
  ClipboardCheck,
  User,
  Banknote,
  TrendingUp,
  CalendarCheck,
  FileText,
  PieChart,
  Settings,
  Clock,
  CheckCircle,
} from "lucide-react";

const sidebars = {
  admin: [
    { label: "Dashboard", link: "#", icon: Home },
    {
      label: "Manage Appointment ",
      icon: Users,
      subMenu: [{ label: "Listing show", link: "/dashboard/listing" }],
    },
    {
      label: "Manage Questions ",
      icon: Users,
      subMenu: [
        { label: "Questions List", link: "/dashboard/manage-questions" },
      ],
    },
    {
      label: "Manage Clients ",
      icon: Users,
      subMenu: [
        { label: "Clients Listing", link: "/dashboard/clientlisting" },
        {
          label: "Clients Appointments",
          link: "/dashboard/manage-appointments",
        },
        { label: "Clients Details", link: "/dashboard/manage-details" },
      ],
    },
  ],
  hr: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Employees",
      icon: Users,
      subMenu: [
        { label: "Employee List", link: "/dashboard/employees/list" },
        { label: "Attendance", link: "/dashboard/attendance" },
      ],
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "My Tasks", link: "/dashboard/tasks/my-tasks" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
        { label: "Team Tasks", link: "/dashboard/tasks/team" },
      ],
    },
  ],
  developer_team: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "My Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "Current Tasks", link: "/dashboard/tasks/current" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
        { label: "Completed", link: "/dashboard/tasks/completed" },
      ],
    },
    {
      label: "Time Tracking",
      icon: Clock,
      link: "/dashboard/time-tracking",
    },
    {
      label: "Standup Reports",
      icon: FileText,
      link: "/dashboard/standup-reports",
    },
  ],
  manager: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Team",
      icon: Users,
      subMenu: [
        { label: "Team Members", link: "/dashboard/team" },
        { label: "Task Allocation", link: "/dashboard/tasks/allocate" },
        { label: "Performance", link: "/dashboard/team/performance" },
      ],
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "Team Tasks", link: "/dashboard/tasks/team" },
        { label: "Review Updates", link: "/dashboard/tasks/review" },
        { label: "Create Task", link: "/dashboard/tasks/create" },
      ],
    },
    {
      label: "Reports",
      icon: PieChart,
      link: "/dashboard/reports",
    },
  ],
  accounts: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Financials",
      icon: Banknote,
      subMenu: [
        { label: "Invoices", link: "/dashboard/invoices" },
        { label: "Expenses", link: "/dashboard/expenses" },
      ],
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "My Tasks", link: "/dashboard/tasks/my-tasks" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
      ],
    },
  ],
  sales: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Leads",
      icon: TrendingUp,
      link: "/dashboard/leads",
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "Sales Targets", link: "/dashboard/tasks/sales-targets" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
        { label: "Follow-ups", link: "/dashboard/tasks/follow-ups" },
      ],
    },
  ],
  support: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Tickets",
      icon: CheckCircle,
      link: "/dashboard/tickets",
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "Open Tickets", link: "/dashboard/tasks/open" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
        { label: "Resolved", link: "/dashboard/tasks/resolved" },
      ],
    },
  ],
  designer: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Projects",
      icon: FileText,
      link: "/dashboard/projects",
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "Design Tasks", link: "/dashboard/tasks/design" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
        { label: "Completed", link: "/dashboard/tasks/completed" },
      ],
    },
  ],
  social_media: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Content Calendar",
      icon: CalendarCheck,
      link: "/dashboard/content-calendar",
    },
    {
      label: "Tasks",
      icon: ClipboardList,
      subMenu: [
        { label: "Content Creation", link: "/dashboard/tasks/content" },
        { label: "Daily Update", link: "/dashboard/tasks/daily-update" },
        { label: "Published", link: "/dashboard/tasks/published" },
      ],
    },
  ],
  // Default fallback for any unspecified roles
  default: [
    { label: "Dashboard", link: "dashboard", icon: Home },
    {
      label: "Mange Appointment ",
      icon: ClipboardList,
      subMenu: [{ label: "Listing show", link: "/dashboard/listing" }],
    },
  ],
};

export const getSidebarItems = (role) => {
  return sidebars[role] || sidebars.default;
};
