import { motion } from "framer-motion";
import { companiesShort } from "@/data/companies";

const Analytics = () => {
  const categoryCounts = companiesShort.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-header gradient-text text-3xl">Insights & Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">High-level placement intelligence</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground text-sm mb-4">Companies by Category</h3>
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{cat}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(count / companiesShort.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground w-4 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground text-sm mb-4">Top Growing Companies</h3>
          <div className="space-y-3">
            {[...companiesShort]
              .sort((a, b) => parseInt(b.yoy_growth_rate) - parseInt(a.yoy_growth_rate))
              .slice(0, 5)
              .map((c) => (
                <div key={c.company_id} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{c.short_name}</span>
                  <span className="text-sm font-medium text-success">{c.yoy_growth_rate}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground text-sm mb-4">Workforce Overview</h3>
          <div className="space-y-3">
            {companiesShort.slice(0, 5).map((c) => (
              <div key={c.company_id} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{c.short_name}</span>
                <span className="text-xs text-foreground">{c.employee_size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
