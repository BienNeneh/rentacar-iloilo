import { useAuth } from "../context/AuthContext";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardHero from "../components/dashboard/DashboardHero";
import StatsCards from "../components/dashboard/StatsCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";


function Dashboard() {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">

      <DashboardNavbar />

      <DashboardHero />

      <StatsCards />

      <RecentActivity />

      <QuickActions />

    </div>
  );
}

export default Dashboard;