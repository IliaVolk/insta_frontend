import TagsComponent from "./TagsComponent"
import TagsModel from "./TagsModel"
import React from "react"

export default props=>{
    return <TagsComponent model={new TagsModel()}/>
}