"use client";

import Link from "next/link";
import { FileText, MoreVertical, Star } from "lucide-react";

const recentDocs = [
  {
    id: "1",
    title: "Project Proposal",
    lastEdited: "2 hours ago",
    owner: "You",
    thumbnail: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    id: "2",
    title: "Meeting Notes - Q1",
    lastEdited: "1 day ago",
    owner: "You",
    thumbnail: "bg-gradient-to-br from-green-50 to-green-100",
  },
  {
    id: "3",
    title: "Budget Report 2024",
    lastEdited: "3 days ago",
    owner: "You",
    thumbnail: "bg-gradient-to-br from-orange-50 to-orange-100",
  },
  {
    id: "4",
    title: "Team Handbook",
    lastEdited: "1 week ago",
    owner: "You",
    thumbnail: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
  {
    id: "5",
    title: "Product Roadmap",
    lastEdited: "2 weeks ago",
    owner: "You",
    thumbnail: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
  {
    id: "6",
    title: "Client Feedback Summary",
    lastEdited: "3 weeks ago",
    owner: "You",
    thumbnail: "bg-gradient-to-br from-indigo-50 to-indigo-100",
  },
];

export default function RecentDocuments() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Recent documents</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          See all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentDocs.map((doc) => (
          <Link
            key={doc.id}
            href={`/Documents/${doc.id}`}
            className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white hover:bg-gray-50"
          >
            {/* Document Preview */}
            <div className={`${doc.thumbnail} h-32 flex items-center justify-center p-4`}>
              <FileText size={40} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>

            {/* Document Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 text-pretty">{doc.title}</h3>
              <p className="text-xs text-gray-500">Edited {doc.lastEdited}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
