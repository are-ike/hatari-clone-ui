import React from "react";
import PrimaryButton from "../../components/button/primary-button";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center h-[calc(100vh-120px)] justify-center">
      <p className="text-[200px] leading-[220px] text-dark-blue tracking-wider">
        404
      </p>
      <p className="mb-6 font-medium text-xl">Page Not Found</p>
      <PrimaryButton onClick={() => history.goBack()}>Go back</PrimaryButton>
    </div>
  );
};

export default PageNotFound;
