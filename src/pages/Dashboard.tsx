import { motion } from "framer-motion";
import { Building2, Users, Briefcase, TrendingUp, Lightbulb } from "lucide-react";
import { companiesShort } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Companies", value: "8", icon: Building2, color: "text-primary" },
  { label: "Marquee Companies", value: "2", icon: TrendingUp, color: "text-[hsl(var(--category-marquee))]" },
  { label: "Super Dream", value: "2", icon: Briefcase, color: "text-[hsl(var(--category-super-dream))]" },
  { label: "Dream Companies", value: "1", icon: Users, color: "text-[hsl(var(--category-dream))]" },
  { label: "InnovX Projects", value: "4", icon: Lightbulb, color: "text-warning" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-header gradient-text text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Company Intelligence Overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card cursor-pointer"
            onClick={() => navigate("/companies")}
          >
            <div className="relative z-10">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Companies */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-foreground">Featured Companies</h2>
          <button
            onClick={() => navigate("/companies")}
            className="text-xs text-primary hover:underline"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {companiesShort.slice(0, 4).map((c, i) => (
            <CompanyCard key={c.company_id} company={c} index={i} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {[
              { label: "Enterprise", count: 1, pct: 12.5 },
              { label: "Marquee", count: 2, pct: 25 },
              { label: "Super Dream", count: 2, pct: 25 },
              { label: "Dream", count: 1, pct: 12.5 },
              { label: "Regular", count: 2, pct: 25 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24">{item.label}</span>
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-xs text-foreground font-medium w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Browse Companies", to: "/companies", icon: Building2 },
              { label: "Hiring Rounds", to: "/hiring", icon: Briefcase },
              { label: "InnovX Projects", to: "/innovx", icon: Lightbulb },
              { label: "Analytics", to: "/analytics", icon: TrendingUp },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.to)}
                className="glass-card-hover p-4 text-left"
              >
                <action.icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-sm text-foreground font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
