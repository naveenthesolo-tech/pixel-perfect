import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, MapPin, Users, Calendar, TrendingUp, Globe, DollarSign } from "lucide-react";
import { companiesShort, companyFull, hiringData, innovxData, categoryTextColors, categoryBgLight, skillSetLabels } from "@/data/companies";
import { useState } from "react";

const tabs = ["Overview", "Hiring Rounds", "InnovX"];

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const companyId = Number(id);

  const shortData = companiesShort.find((c) => c.company_id === companyId);
  const fullData = companyFull[companyId];
  const hiring = hiringData[companyId];
  const innovx = innovxData[companyId];

  if (!shortData) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Company not found.</p>
        <button onClick={() => navigate("/companies")} className="text-primary text-sm mt-2 hover:underline">
          ← Back to companies
        </button>
      </div>
    );
  }

  const data = fullData || shortData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="glass-card p-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={shortData.logo_url}
                alt={shortData.short_name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xl font-bold text-foreground">${shortData.short_name[0]}</span>`;
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-heading font-bold text-foreground">{data.name}</h1>
                <span className={`badge-category ${categoryBgLight[shortData.category]} ${categoryTextColors[shortData.category]}`}>
                  {shortData.category}
                </span>
              </div>

              <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{shortData.employee_size}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{(fullData?.headquarters_address) || shortData.office_locations.split(";")[0]}</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-success" />{shortData.yoy_growth_rate} YoY</span>
                {fullData?.website_url && (
                  <a href={fullData.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border pb-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-[1px] ${
              activeTab === tab
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === "Overview" && <OverviewTab data={data} fullData={fullData} />}
        {activeTab === "Hiring Rounds" && <HiringTab hiring={hiring} />}
        {activeTab === "InnovX" && <InnovXTab innovx={innovx} />}
      </motion.div>
    </div>
  );
};

const OverviewTab = ({ data, fullData }: { data: any; fullData: any }) => {
  if (!fullData) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">Detailed data not available for this company yet.</p>
        <p className="text-xs text-muted-foreground mt-2">Basic information is shown in the header above.</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Company Overview",
      items: [
        { label: "Founded", value: fullData.incorporation_year, icon: Calendar },
        { label: "Type", value: fullData.nature_of_company },
        { label: "Headquarters", value: fullData.headquarters_address, icon: MapPin },
        { label: "Offices", value: fullData.office_count, icon: Globe },
      ],
    },
    {
      title: "Financials",
      items: [
        { label: "Revenue", value: fullData.annual_revenue, icon: DollarSign },
        { label: "Profit", value: fullData.annual_profit },
        { label: "Valuation", value: fullData.valuation },
        { label: "Status", value: fullData.profitability_status },
      ],
    },
    {
      title: "People & Culture",
      items: [
        { label: "Employee Size", value: fullData.employee_size, icon: Users },
        { label: "Retention", value: fullData.avg_retention_tenure },
        { label: "Turnover", value: fullData.employee_turnover },
        { label: "CEO", value: fullData.ceo_name },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {fullData.overview_text && (
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold text-foreground mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{fullData.overview_text}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-5">
            <h3 className="font-heading font-semibold text-foreground text-sm mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between items-start">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs text-foreground font-medium text-right max-w-[60%]">{item.value || "N/A"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "Focus Sectors", value: fullData.focus_sectors },
          { title: "Offerings", value: fullData.offerings_description },
          { title: "Core Values", value: fullData.core_values },
          { title: "Key Competitors", value: fullData.key_competitors },
          { title: "Technology Partners", value: fullData.technology_partners },
          { title: "Value Proposition", value: fullData.core_value_proposition },
        ].filter(s => s.value).map((section) => (
          <div key={section.title} className="glass-card p-5">
            <h4 className="font-heading font-semibold text-foreground text-sm mb-3">{section.title}</h4>
            <div className="flex flex-wrap gap-2">
              {section.value.split(";").map((item: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-secondary rounded-md text-xs text-muted-foreground">
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HiringTab = ({ hiring }: { hiring: any }) => {
  const [selectedRole, setSelectedRole] = useState(0);

  if (!hiring) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">Hiring data not available for this company yet.</p>
      </div>
    );
  }

  const role = hiring.job_role_details[selectedRole];

  return (
    <div className="space-y-6">
      {/* Role Selector */}
      <div className="flex gap-3">
        {hiring.job_role_details.map((r: any, i: number) => (
          <button
            key={i}
            onClick={() => setSelectedRole(i)}
            className={`glass-card px-4 py-3 text-left transition-all ${
              selectedRole === i ? "glow-border" : "hover:border-border"
            }`}
          >
            <p className="text-sm font-medium text-foreground">{r.role_title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{r.role_category} · {r.opportunity_type}</p>
          </button>
        ))}
      </div>

      {/* Role Details */}
      <div className="glass-card p-5">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Compensation</p>
            <p className="text-sm font-medium text-foreground">₹{(role.ctc_or_stipend / 100000).toFixed(1)}L {role.compensation}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Bonus</p>
            <p className="text-sm text-foreground">{role.bonus}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Rounds</p>
            <p className="text-sm font-medium text-foreground">{role.hiring_rounds.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Benefits</p>
            <p className="text-sm text-foreground line-clamp-2">{role.benefits_summary}</p>
          </div>
        </div>
      </div>

      {/* Rounds */}
      <div className="space-y-4">
        {role.hiring_rounds.map((round: any) => (
          <div key={round.round_number} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{round.round_number}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{round.round_name}</p>
                <p className="text-xs text-muted-foreground">{round.round_category} · {round.evaluation_type} · {round.assessment_mode}</p>
              </div>
            </div>

            <div className="space-y-3">
              {round.skill_sets.map((skill: any, i: number) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-3">
                  <span className="badge-category bg-primary/10 text-primary text-xs mb-2 inline-block">
                    {skillSetLabels[skill.skill_set_code] || skill.skill_set_code}
                  </span>
                  <ul className="space-y-1 mt-2">
                    {skill.typical_questions.split(";").map((q: string, qi: number) => (
                      <li key={qi} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{q.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InnovXTab = ({ innovx }: { innovx: any }) => {
  if (!innovx) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">InnovX data not available for this company yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Context */}
      <div className="glass-card p-5">
        <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Company Profile</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div><span className="text-muted-foreground">Industry:</span> <span className="text-foreground ml-1">{innovx.innovx_master.industry}</span></div>
          <div><span className="text-muted-foreground">Model:</span> <span className="text-foreground ml-1">{innovx.innovx_master.core_business_model}</span></div>
          <div><span className="text-muted-foreground">Market:</span> <span className="text-foreground ml-1">{innovx.innovx_master.target_market}</span></div>
        </div>
      </div>

      {/* Industry Trends */}
      <div>
        <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Industry Trends</h3>
        <div className="grid grid-cols-3 gap-3">
          {innovx.industry_trends.map((trend: any, i: number) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{trend.trend_name}</h4>
                <span className={`badge-category text-[10px] ${
                  trend.strategic_importance === "Critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                }`}>
                  {trend.strategic_importance}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{trend.trend_description}</p>
              <p className="text-[10px] text-muted-foreground">{trend.time_horizon_years}yr horizon</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h3 className="font-heading font-semibold text-foreground text-sm mb-3">InnovX Projects</h3>
        <div className="grid grid-cols-2 gap-4">
          {innovx.innovx_projects.map((project: any, i: number) => (
            <div key={i} className="glass-card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground">{project.project_name}</h4>
                <span className={`badge-category text-[10px] ${
                  project.tier_level === "Tier 1" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                }`}>
                  {project.tier_level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{project.problem_statement}</p>

              <div className="space-y-2 text-xs">
                <div><span className="text-muted-foreground">Objective:</span> <span className="text-foreground ml-1">{project.innovation_objective}</span></div>
                <div><span className="text-muted-foreground">Users:</span> <span className="text-foreground ml-1">{project.target_users}</span></div>
                <div><span className="text-muted-foreground">Journey:</span> <span className="text-primary ml-1">{project.user_journey_summary}</span></div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {[...project.backend_technologies, ...project.ai_ml_technologies].map((tech: string, ti: number) => (
                  <span key={ti} className="px-2 py-0.5 bg-secondary rounded text-[10px] text-muted-foreground">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Landscape */}
      <div>
        <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Competitive Landscape</h3>
        <div className="grid grid-cols-3 gap-3">
          {innovx.competitive_landscape.map((comp: any, i: number) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{comp.competitor_name}</h4>
                <span className={`badge-category text-[10px] ${
                  comp.threat_level === "High" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                }`}>
                  {comp.threat_level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{comp.core_strength}</p>
              <p className="text-[10px] text-muted-foreground italic">{comp.bet_name}: {comp.bet_description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
