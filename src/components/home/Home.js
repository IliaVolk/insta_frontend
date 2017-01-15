import React from "react"

import HomeComponent from "./HomeComponent"
import HomeModel from "./HomeModel"
export default (props)=>{
    let model = new HomeModel()
    let tags = props.location.query.tags
    if (tags){
        tags = tags.split(",").map(tag=>({
            name: tag
        }))
    }
    let place = {
        name: props.location.query.place
    }
    model.selectedTags = tags || []
    model.selectedPlace = place
    return <HomeComponent model={model}/>
}