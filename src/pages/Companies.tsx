import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { companiesShort } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";

const categories = ["All", "Marquee", "Super Dream", "Dream", "Enterprise", "Regular"];

const Companies = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return companiesShort.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.short_name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "All" || c.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-header gradient-text text-3xl">All Companies</h1>
        <p className="text-muted-foreground mt-1 text-sm">{companiesShort.length} companies in the database</p>
      </motion.div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>

        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filtered.map((c, i) => (
          <CompanyCard key={c.company_id} company={c} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-sm">No companies found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Companies;
