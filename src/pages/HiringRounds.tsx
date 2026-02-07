import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { companiesShort, hiringData } from "@/data/companies";

const HiringRounds = () => {
  const navigate = useNavigate();
  const companiesWithHiring = companiesShort.filter((c) => hiringData[c.company_id]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-header gradient-text text-3xl">Hiring Rounds</h1>
        <p className="text-muted-foreground mt-1 text-sm">Explore interview processes across companies</p>
      </motion.div>

      {companiesWithHiring.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground">No hiring data available yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Try viewing Atlassian's company detail for hiring round info.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {companiesWithHiring.map((company, i) => {
            const data = hiringData[company.company_id];
            return (
              <motion.div
                key={company.company_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/company/${company.company_id}`)}
                className="glass-card-hover p-5 cursor-pointer"
              >
                <h3 className="font-heading font-semibold text-foreground">{company.short_name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{data.job_role_details.length} roles available</p>
                <div className="mt-3 space-y-2">
                  {data.job_role_details.map((role, ri) => (
                    <div key={ri} className="bg-secondary/50 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-foreground">{role.role_title}</p>
                        <p className="text-xs text-muted-foreground">{role.hiring_rounds.length} rounds · {role.role_category}</p>
                      </div>
                      <span className="text-xs text-primary font-medium">₹{(role.ctc_or_stipend / 100000).toFixed(0)}L</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="font-heading font-semibold text-foreground text-sm mb-2">All Companies with Hiring Data</h3>
        <p className="text-xs text-muted-foreground">Click on any company card above or visit the company detail page to explore hiring rounds in depth.</p>
      </div>
    </div>
  );
};

export default HiringRounds;
