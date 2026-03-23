import Link from "next/link";
import { FileText, Plus, Clock } from "lucide-react";
import Header from "@/components/home/header";
import TemplateSection from "@/components/home/template-section";
import RecentDocuments from "@/components/home/recent-documents";

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Start New Document Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Start a new document</h2>
          <Link 
            href="/Documents/new"
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Plus size={24} className="text-gray-700" />
            <span className="text-gray-700 font-medium">Blank document</span>
          </Link>
        </div>
      </section>

      {/* Templates Section */}
      <TemplateSection />

      {/* Recent Documents Section */}
      <RecentDocuments />
    </main>
  );
}

export default Home;
