import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, TrendingUp } from "lucide-react";
import { CompanyShort } from "@/lib/types";
import { categoryTextColors, categoryBgLight } from "@/data/companies";

interface Props {
  company: CompanyShort;
  index: number;
}

const CompanyCard = ({ company, index }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={() => navigate(`/company/${company.company_id}`)}
      className="glass-card-hover p-5 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
          <img
            src={company.logo_url}
            alt={company.short_name}
            className="w-6 h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-sm font-bold text-foreground">${company.short_name[0]}</span>`;
            }}
          />
        </div>
        <span className={`badge-category ${categoryBgLight[company.category] || ''} ${categoryTextColors[company.category] || 'text-muted-foreground'}`}>
          {company.category}
        </span>
      </div>

      <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors text-sm mb-1">
        {company.short_name}
      </h3>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{company.name}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{company.employee_size}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{company.office_locations.split(";").slice(0, 3).join(", ")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <TrendingUp className="w-3 h-3 text-success" />
          <span className="text-success">{company.yoy_growth_rate} YoY</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
