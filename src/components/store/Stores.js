import React from "react";
import StoresComponent from "./StoresComponent"
import StoresModel from "./StoresModel"

export default props=>{
    return <StoresComponent model={new StoresModel()}/>
}