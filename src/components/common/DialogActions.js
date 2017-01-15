import React from "react"
import RaisedButton from "material-ui/RaisedButton"
export default props=>{
    let {model} = props
    return <div className="displayFlex flexCenter">
        <RaisedButton
            label="Delete"
            className="margin"
            onClick={model.delete}
            secondary={true}/>
        <RaisedButton
            label="Cancel"
            className="margin"
            onClick={model.closeDialog}/>
        <RaisedButton
            label="Save"
            className="margin"
            onClick={model.update}
            primary={true}/>
    </div>
}