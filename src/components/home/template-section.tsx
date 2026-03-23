"use client";

import Link from "next/link";
import { FileText, Briefcase, Mail } from "lucide-react";

const templates = [
  {
    id: "blank",
    title: "Blank",
    description: "Start with a blank document",
    icon: FileText,
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
  },
  {
    id: "resume",
    title: "Resume",
    description: "Create a professional resume",
    icon: Briefcase,
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
  },
  {
    id: "letter",
    title: "Letter",
    description: "Write a formal letter",
    icon: Mail,
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
  },
];

export default function TemplateSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Link
              key={template.id}
              href={`/Documents/new?template=${template.id}`}
              className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              {/* Template Preview */}
              <div className={`${template.bgColor} h-48 flex items-center justify-center p-6`}>
                <Icon size={48} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </div>
              
              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
