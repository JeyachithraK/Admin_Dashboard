import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Sidebar from "../Sidebar";
import RightSide from "../RigtSide/RightSide";
const MainDash = () => {
  return (

    <>
    {/* <Sidebar/> */}
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />
    </div>
    {/* <RightSide/> */}
    </>
  );
};

export default MainDash;
