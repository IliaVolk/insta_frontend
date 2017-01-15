import React from "react"
import PlacesModel from "./PlacesModel"
import PlacesComponent from "./PlacesComponent"

export default props=>{
    return <PlacesComponent model={new PlacesModel()}/>
}