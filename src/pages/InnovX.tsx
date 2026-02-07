import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { companiesShort, innovxData } from "@/data/companies";

const InnovX = () => {
  const navigate = useNavigate();
  const companiesWithInnovx = companiesShort.filter((c) => innovxData[c.company_id]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-header gradient-text text-3xl">InnovX Projects</h1>
        <p className="text-muted-foreground mt-1 text-sm">Innovation intelligence across companies</p>
      </motion.div>

      {companiesWithInnovx.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground">No InnovX data available yet.</p>
        </div>
      ) : (
        companiesWithInnovx.map((company) => {
          const data = innovxData[company.company_id];
          return (
            <div key={company.company_id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-foreground">{company.short_name}</h2>
                <button onClick={() => navigate(`/company/${company.company_id}`)} className="text-xs text-primary hover:underline">
                  View details →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {data.innovx_projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card-hover p-5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">{project.project_name}</h4>
                      <span className={`badge-category text-[10px] ${
                        project.tier_level === "Tier 1" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                      }`}>
                        {project.tier_level}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{project.problem_statement}</p>
                    <p className="text-xs"><span className="text-muted-foreground">Value:</span> <span className="text-foreground">{project.business_value}</span></p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.aligned_pillar_names.map((p, pi) => (
                        <span key={pi} className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">{p}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default InnovX;
