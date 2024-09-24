import { Button } from "antd";

const HeaderButton = ({
  buttonData,
  customClass,
}: {
  buttonData: any;
  customClass?: string;
}) => {
  return (
    <Button
      type="primary"
      className={`btn-navbar ${customClass}`}
      href={buttonData?.header?.headerButtonUrl}
      target="_blank"
    >
      {buttonData?.header?.headerButtonText}
    </Button>
  );
};

export default HeaderButton;
