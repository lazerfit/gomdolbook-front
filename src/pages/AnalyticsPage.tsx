import CalendarMonthly from "@/components/analytics/CalendarMonthly.tsx";
import { useParams } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage.js";
import AnalyticsNavBar from "@/components/analytics/AnalyticsNavBar.js";

const AnalyticsPage = () => {
  const { view = "calendar" } = useParams();

  const renderContent = () => {
    switch (view) {
      case "calendar":
        return <CalendarMonthly />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <>
      <AnalyticsNavBar />
      {renderContent()}
    </>
  );
};

export default AnalyticsPage;
