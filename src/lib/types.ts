export interface CompanyShort {
  company_id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  operating_countries: string;
  office_locations: string;
  employee_size: string;
  yoy_growth_rate: string;
}

export interface CompanyFull extends CompanyShort {
  incorporation_year: number;
  overview_text: string;
  nature_of_company: string;
  headquarters_address: string;
  office_count: string;
  hiring_velocity: string;
  employee_turnover: string;
  avg_retention_tenure: string;
  pain_points_addressed: string;
  focus_sectors: string;
  offerings_description: string;
  top_customers: string;
  core_value_proposition: string;
  vision_statement: string;
  mission_statement: string;
  core_values: string;
  unique_differentiators: string;
  competitive_advantages: string;
  weaknesses_gaps: string;
  key_challenges_needs: string;
  key_competitors: string;
  technology_partners: string;
  website_url: string;
  annual_revenue: string;
  annual_profit: string;
  valuation: string;
  profitability_status: string;
  ceo_name: string;
  employee_size: string;
  glassdoor_rating: number;
  [key: string]: any;
}

export interface SkillSet {
  skill_set_code: string;
  typical_questions: string;
}

export interface HiringRound {
  round_number: number;
  round_name: string;
  round_category: string;
  evaluation_type: string;
  assessment_mode: string;
  skill_sets: SkillSet[];
}

export interface JobRole {
  opportunity_type: string;
  role_title: string;
  role_category: string;
  job_description: string;
  compensation: string;
  ctc_or_stipend: number;
  bonus: string;
  benefits_summary: string;
  hiring_rounds: HiringRound[];
}

export interface HiringData {
  company_name: string;
  job_role_details: JobRole[];
}

export interface InnovXProject {
  project_name: string;
  problem_statement: string;
  target_users: string;
  innovation_objective: string;
  tier_level: string;
  differentiation_factor: string;
  aligned_pillar_names: string[];
  architecture_style: string;
  backend_technologies: string[];
  frontend_technologies: string[];
  ai_ml_technologies: string[];
  data_storage_processing: string;
  integrations_apis: string[];
  infrastructure_cloud: string;
  security_compliance: string;
  primary_use_case: string;
  secondary_use_cases: string[];
  scenario_description: string;
  user_journey_summary: string;
  business_value: string;
  success_metrics: string[];
}

export interface InnovXData {
  innovx_master: {
    company_name: string;
    industry: string;
    sub_industry: string;
    core_business_model: string;
    target_market: string;
    geographic_focus: string;
  };
  industry_trends: {
    trend_name: string;
    trend_description: string;
    time_horizon_years: number;
    strategic_importance: string;
    trend_drivers: string[];
    impact_areas: string[];
  }[];
  competitive_landscape: {
    competitor_name: string;
    competitor_type: string;
    core_strength: string;
    market_positioning: string;
    bet_name: string;
    bet_description: string;
    threat_level: string;
  }[];
  strategic_pillars: {
    pillar_name: string;
    pillar_description: string;
    focus_area: string;
    key_technologies: string[];
    cto_vision_statement: string;
    strategic_risks: string;
    strategic_assumptions: string;
  }[];
  innovx_projects: InnovXProject[];
}
