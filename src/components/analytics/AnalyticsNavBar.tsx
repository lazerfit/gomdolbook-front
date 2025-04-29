import StatusTapNavigation from "@/ui/StatusTapNavigation.js";

type AnalyticsStatus = "calendar" | "month" | "week" | "day";

interface TapOptions<AnalyticsStatus> {
  label: string;
  status: AnalyticsStatus;
  path: string;
}

const statusOption: TapOptions<AnalyticsStatus>[] = [
  {
    label: "캘린더",
    status: "calendar",
    path: "/analytics/calendar",
  },
];

const AnalyticsNavBar = () => {
  return <StatusTapNavigation statusOption={statusOption} initialStatus="calendar" />;
};

export default AnalyticsNavBar;
