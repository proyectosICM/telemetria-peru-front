import React from "react";

export function ForkliftWith4Tires() {

  const handleSelectTire = (pos) => {
    // setPositioning(pos);
    localStorage.setItem("tireSelected", pos);
  };

  return (
    <>
      <div style={{ margin:"auto", width: "80%", height: "65%", display: "flex", flexDirection: "row" }}>
        {/* Left side tires interaction area */}
        <div className="fkl-tires-l">
          <div className="fkl-tire" onClick={() => handleSelectTire(1)}></div>
          <div className="fkl-blank"></div>
          <div className="fkl-tire" onClick={() => handleSelectTire(3)}></div>
        </div>

        {/* Center placeholder for the forklift base */}
        <div className="fkl-base-forklift"></div>

        {/* Right side tires interaction area */}
        <div className="fkl-tires-r">
          <div className="fkl-tire" onClick={() => handleSelectTire(2)}></div>
          <div className="fkl-blank"></div>
          <div className="fkl-tire" onClick={() => handleSelectTire(4)}></div>
        </div>
      </div>
    </>
  );
}
