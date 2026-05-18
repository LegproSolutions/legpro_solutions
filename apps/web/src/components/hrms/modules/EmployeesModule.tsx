"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, Edit2, Trash2, Eye, Upload, Filter, 
  ChevronLeft, ChevronRight, X, Building2, UserCheck, Shield, FileText, Check, AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Employee = {
  id: string;
  name: string;
  email: string;
  dept: string;
  role: string;
  status: "Active" | "Probation" | "On Leave" | "Terminated";
  joinDate: string;
  phone: string;
  avatar?: string;
};

const initialEmployees: Employee[] = [
  { id: "EMP-2401", name: "Aditi Sharma", email: "aditi.s@legpro.com", dept: "HR", role: "HR Executive", status: "Active", joinDate: "2024-01-15", phone: "+91 98765 43210" },
  { id: "EMP-2402", name: "Vikram Patel", email: "vikram.p@legpro.com", dept: "Operations", role: "Operations Lead", status: "Active", joinDate: "2023-06-10", phone: "+91 98765 43211" },
  { id: "EMP-2403", name: "Neha Gupta", email: "neha.g@legpro.com", dept: "IT", role: "Senior Software Engineer", status: "Probation", joinDate: "2025-02-01", phone: "+91 98765 43212" },
  { id: "EMP-2404", name: "Arjun Rao", email: "arjun.r@legpro.com", dept: "Sales", role: "Sales Manager", status: "Active", joinDate: "2022-11-20", phone: "+91 98765 43213" },
  { id: "EMP-2405", name: "Kavya Nair", email: "kavya.n@legpro.com", dept: "Finance", role: "Financial Analyst", status: "Active", joinDate: "2024-08-05", phone: "+91 98765 43214" },
  { id: "EMP-2406", name: "Rohan Desai", email: "rohan.d@legpro.com", dept: "IT", role: "DevOps Engineer", status: "On Leave", joinDate: "2023-09-15", phone: "+91 98765 43215" },
  { id: "EMP-2407", name: "Pooja Verma", email: "pooja.v@legpro.com", dept: "HR", role: "Recruiter", status: "Active", joinDate: "2024-03-12", phone: "+91 98765 43216" },
  { id: "EMP-2408", name: "Siddharth Sen", email: "siddharth.s@legpro.com", dept: "Operations", role: "Associate", status: "Probation", joinDate: "2025-01-10", phone: "+91 98765 43217" },
];

const departments = ["All", "HR", "Operations", "IT", "Sales", "Finance"];
const roles = ["All", "HR Executive", "Operations Lead", "Senior Software Engineer", "Sales Manager", "Financial Analyst", "DevOps Engineer", "Recruiter", "Associate"];

export function EmployeesModule() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Modal / Drawer state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: "",
    email: "",
    dept: "IT",
    role: "Senior Software Engineer",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
    phone: "",
  });

  // Upload state for viewing employee
  const [uploadedDocs, setUploadedDocs] = useState<Array<{ name: string; date: string }>>([
    { name: "Offer_Letter.pdf", date: "2024-01-15" },
    { name: "ID_Proof.pdf", date: "2024-01-15" },
  ]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.id.toLowerCase().includes(search.toLowerCase()) ||
                          emp.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === "All" || emp.dept === deptFilter;
      const matchRole = roleFilter === "All" || emp.role === roleFilter;
      return matchSearch && matchDept && matchRole;
    });
  }, [employees, search, deptFilter, roleFilter]);

  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, page]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...formData } as Employee : emp));
      setEditingEmployee(null);
    } else {
      const newEmp: Employee = {
        id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name || "New Employee",
        email: formData.email || "new@legpro.com",
        dept: formData.dept || "IT",
        role: formData.role || "Engineer",
        status: (formData.status as Employee["status"]) || "Active",
        joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
        phone: formData.phone || "+91 00000 00000",
      };
      setEmployees([newEmp, ...employees]);
    }
    setIsAddModalOpen(false);
    setFormData({ name: "", email: "", dept: "IT", role: "Senior Software Engineer", status: "Active", joinDate: new Date().toISOString().split("T")[0], phone: "" });
  };

  const openEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData(emp);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedDocs([...uploadedDocs, { name: file.name, date: new Date().toISOString().split("T")[0] }]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Employee Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage employee directories, roles, departments, and documents.</p>
        </div>
        <button
          type="button"
          onClick={() => { setEditingEmployee(null); setFormData({ name: "", email: "", dept: "IT", role: "Senior Software Engineer", status: "Active", joinDate: new Date().toISOString().split("T")[0], phone: "" }); setIsAddModalOpen(true); }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Employees</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{employees.length}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><UserCheck size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active Staff</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {employees.filter(e => e.status === "Active").length}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><Check size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Departments</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{departments.length - 1}</p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"><Building2 size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">On Probation</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {employees.filter(e => e.status === "Probation").length}
              </p>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"><AlertCircle size={20} /></div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {departments.map(d => <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>)}
            </select>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {roles.map(r => <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>)}
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Employee</th>
                <th className="px-6 py-3.5 font-semibold">ID</th>
                <th className="px-6 py-3.5 font-semibold">Department</th>
                <th className="px-6 py-3.5 font-semibold">Role</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">No employees found matching your criteria.</td>
                </tr>
              ) : (
                paginatedEmployees.map((emp) => (
                  <tr key={emp.id} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 font-display font-semibold text-primary dark:text-accent">
                          {emp.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{emp.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{emp.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{emp.dept}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{emp.role}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        emp.status === "Active" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                        emp.status === "Probation" && "bg-amber-500/15 text-amber-700 dark:text-amber-400",
                        emp.status === "On Leave" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                        emp.status === "Terminated" && "bg-rose-500/15 text-rose-700 dark:text-rose-400"
                      )}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setViewingEmployee(emp)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
                          title="View Profile & Docs"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(emp)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-white/5 dark:hover:text-primary"
                          title="Edit Employee"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(emp.id)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-white/5 dark:hover:text-rose-500"
                          title="Delete Employee"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-white/10">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{Math.min(filteredEmployees.length, (page - 1) * itemsPerPage + 1)}</span> to <span className="font-semibold text-slate-900 dark:text-white">{Math.min(filteredEmployees.length, page * itemsPerPage)}</span> of <span className="font-semibold text-slate-900 dark:text-white">{filteredEmployees.length}</span> employees
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <span className="text-xs font-semibold text-slate-900 dark:text-white px-2">Page {page} of {totalPages || 1}</span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name || ""} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" 
                    placeholder="e.g. Aditi Sharma" 
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email || ""} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" 
                      placeholder="e.g. aditi@legpro.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone || ""} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Department</label>
                    <select 
                      value={formData.dept || "IT"} 
                      onChange={e => setFormData({...formData, dept: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                    >
                      {departments.filter(d => d !== "All").map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Role / Designation</label>
                    <select 
                      value={formData.role || "Senior Software Engineer"} 
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                    >
                      {roles.filter(r => r !== "All").map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Joining Date</label>
                    <input 
                      type="date" 
                      value={formData.joinDate || ""} 
                      onChange={e => setFormData({...formData, joinDate: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Status</label>
                    <select 
                      value={formData.status || "Active"} 
                      onChange={e => setFormData({...formData, status: e.target.value as Employee["status"]})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Probation">Probation</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95"
                  >
                    {editingEmployee ? "Save Changes" : "Create Employee"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Employee Profile & Documents Modal */}
      <AnimatePresence>
        {viewingEmployee && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display text-lg font-bold text-white shadow-md shadow-primary/20">
                    {viewingEmployee.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{viewingEmployee.name}</h3>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{viewingEmployee.id} • {viewingEmployee.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingEmployee(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Profile Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 dark:bg-white/5 dark:border-white/5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Email Address</p>
                    <p className="mt-0.5 font-medium text-slate-900 dark:text-white">{viewingEmployee.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Phone Number</p>
                    <p className="mt-0.5 font-medium text-slate-900 dark:text-white">{viewingEmployee.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Department</p>
                    <p className="mt-0.5 font-medium text-slate-900 dark:text-white">{viewingEmployee.dept}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Joining Date</p>
                    <p className="mt-0.5 font-medium text-slate-900 dark:text-white">{viewingEmployee.joinDate}</p>
                  </div>
                </div>

                {/* Documents Upload Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText size={18} className="text-primary dark:text-accent" /> Employee Documents
                    </h4>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20 dark:border-accent/30 dark:bg-accent/10 dark:text-accent dark:hover:bg-accent/20">
                      <Upload size={14} /> Upload Document
                      <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>

                  <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white dark:divide-white/5 dark:border-white/10 dark:bg-slate-900/50">
                    {uploadedDocs.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 transition hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-500 dark:bg-white/5 dark:text-slate-400">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{doc.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setUploadedDocs(uploadedDocs.filter((_, i) => i !== idx))}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-white/5 dark:hover:text-rose-500"
                          title="Delete Document"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 p-4 bg-slate-50 flex justify-end dark:border-white/10 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => setViewingEmployee(null)}
                  className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
