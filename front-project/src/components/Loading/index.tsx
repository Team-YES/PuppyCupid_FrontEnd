import { LoadingStyle } from "./styled";

const Loading = () => {
  return (
    <LoadingStyle>
      <div className="Loading_center">
        <div className="Loading_wrap">
          <div className="Loading_loader"></div>
          <p className="Loading_text">LOADING...</p>
        </div>
      </div>
    </LoadingStyle>
  );
};

export default Loading;
