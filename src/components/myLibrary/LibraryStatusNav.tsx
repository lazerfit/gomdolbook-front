import StatusTapNavigation from "@/ui/StatusTapNavigation.js";

type LibraryStatus = "reading" | "to_read" | "finished";

const LibraryStatusNav = () => {
  const statusOption: { label: string; status: LibraryStatus; path: string }[] = [
    { label: "읽는 중", status: "reading", path: "/library/reading" },
    { label: "읽을 예정", status: "to_read", path: "/library/to_read" },
    { label: "읽기 완료", status: "finished", path: "/library/finished" },
  ];
  return <StatusTapNavigation statusOption={statusOption} initialStatus="reading" />;
};

export default LibraryStatusNav;
