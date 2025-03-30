import Main from "@/features/MainPageManager/Main";

const MainPage = ({
  isScrolled,
  setIsScrolled,
}: {
  isScrolled: boolean;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return <Main />;
};
export default MainPage;
