import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, GraduationCap, Lightbulb, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/companies", icon: Building2, label: "All Companies" },
  { to: "/hiring", icon: GraduationCap, label: "Hiring Rounds" },
  { to: "/innovx", icon: Lightbulb, label: "InnovX" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-heading text-lg font-bold text-foreground tracking-tight">
          SRM <span className="text-primary">Placements</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Company Intelligence Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card p-3">
          <p className="text-xs text-muted-foreground">Powered by</p>
          <p className="text-sm font-heading font-semibold text-foreground">SRM University</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
