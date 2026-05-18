"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderOpen, Upload, Download, FileText, Search, Filter, Trash2, X, Plus, ShieldCheck, FileCheck, FileCode 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Document = {
  id: string;
  title: string;
  category: "HR Policy" | "IT Compliance" | "Legal & Contracts" | "Templates";
  fileSize: string;
  uploadedBy: string;
  updatedAt: string;
};

const initialDocuments: Document[] = [
  { id: "DOC-101", title: "LEGPRO Employee Handbook 2026", category: "HR Policy", fileSize: "4.2 MB", uploadedBy: "Aditi Sharma", updatedAt: "2026-05-15" },
  { id: "DOC-102", title: "Information Security Policy v3.2", category: "IT Compliance", fileSize: "1.8 MB", uploadedBy: "Vikram Patel", updatedAt: "2026-05-10" },
  { id: "DOC-103", title: "Standard NDA Agreement Template", category: "Legal & Contracts", fileSize: "650 KB", uploadedBy: "Legal Team", updatedAt: "2026-04-20" },
  { id: "DOC-104", title: "Remote Work & Asset Allocation Guidelines", category: "HR Policy", fileSize: "2.1 MB", uploadedBy: "Aditi Sharma", updatedAt: "2026-05-01" },
  { id: "DOC-105", title: "Annual Performance Review Template", category: "Templates", fileSize: "450 KB", uploadedBy: "Neha Gupta", updatedAt: "2026-03-15" },
  { id: "DOC-106", title: "Data Privacy & GDPR Framework", category: "IT Compliance", fileSize: "3.5 MB", uploadedBy: "Vikram Patel", updatedAt: "2026-02-28" },
];

export function DocumentsModule() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "HR Policy" as Document["category"],
    fileSize: "1.5 MB",
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: Document = {
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      title: uploadForm.title || "Uploaded Document",
      category: uploadForm.category,
      fileSize: uploadForm.fileSize,
      uploadedBy: "Current User",
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadOpen(false);
    setUploadForm({ title: "", category: "HR Policy", fileSize: "1.5 MB" });
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || doc.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Document Repository</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Access and manage company policies, compliance documents, and reusable templates.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          <Upload size={18} /> Upload Document
        </button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Documents</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{documents.length}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20 dark:text-primary"><FolderOpen size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">HR Policies</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{documents.filter(d => d.category === "HR Policy").length}</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"><FileCheck size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">IT Compliance</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{documents.filter(d => d.category === "IT Compliance").length}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"><ShieldCheck size={20} /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Legal & Templates</p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{documents.filter(d => d.category === "Legal & Contracts" || d.category === "Templates").length}</p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"><FileCode size={20} /></div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <option value="All">All Categories</option>
            <option value="HR Policy">HR Policy</option>
            <option value="IT Compliance">IT Compliance</option>
            <option value="Legal & Contracts">Legal & Contracts</option>
            <option value="Templates">Templates</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Document Title</th>
                <th className="px-6 py-3.5 font-semibold">Category</th>
                <th className="px-6 py-3.5 font-semibold">Size</th>
                <th className="px-6 py-3.5 font-semibold">Uploaded By</th>
                <th className="px-6 py-3.5 font-semibold">Last Updated</th>
                <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">No documents found matching your search.</td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primary/10 p-2.5 text-primary dark:bg-primary/20"><FileText size={18} /></div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{doc.title}</p>
                          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{doc.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        doc.category === "HR Policy" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                        doc.category === "IT Compliance" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                        doc.category === "Legal & Contracts" && "bg-rose-500/15 text-rose-700 dark:text-rose-400",
                        doc.category === "Templates" && "bg-purple-500/15 text-purple-700 dark:text-purple-400"
                      )}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">{doc.fileSize}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{doc.updatedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading ${doc.title}...`)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                        >
                          <Download size={14} /> Download
                        </button>
                        <button
                          type="button"
                          onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-white/5 dark:hover:text-rose-500"
                          title="Delete Document"
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
      </div>

      {/* Upload Document Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Upload New Document</h3>
                <button type="button" onClick={() => setIsUploadOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Document Title</label>
                  <input type="text" required value={uploadForm.title} onChange={e => setUploadForm({...uploadForm, title: e.target.value})} placeholder="e.g. Information Security Policy v3.2" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Category</label>
                    <select value={uploadForm.category} onChange={e => setUploadForm({...uploadForm, category: e.target.value as Document["category"]})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <option value="HR Policy">HR Policy</option><option value="IT Compliance">IT Compliance</option><option value="Legal & Contracts">Legal & Contracts</option><option value="Templates">Templates</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Estimated Size</label>
                    <input type="text" value={uploadForm.fileSize} onChange={e => setUploadForm({...uploadForm, fileSize: e.target.value})} placeholder="e.g. 2.5 MB" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">Select File</label>
                  <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-white/20 dark:bg-white/5">
                    <div className="space-y-1">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Drag & drop your file here, or click to browse</p>
                      <p className="text-[10px] text-slate-400">Supports PDF, DOCX, XLSX (Max 10MB)</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-white/10">
                  <button type="button" onClick={() => setIsUploadOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">Cancel</button>
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-95">Upload File</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
