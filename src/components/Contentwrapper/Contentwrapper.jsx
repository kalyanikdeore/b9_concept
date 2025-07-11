import React from "react";

function Contentwrapper({ children, className }) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto my-0 py-0 ' +  {className}`}>
      {children}
    </div>
  );
}
export default Contentwrapper;
