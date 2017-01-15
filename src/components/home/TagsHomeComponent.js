import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import {observer} from "mobx-react"
import CriteriaSelectorComponrnt from "./criteriaSelector/CriteriaSelectorComponent"
export default observer(props=> {
    let {model} = props
    let {selectedTags, removeTag, clearTags} = model
    return (
        <div className="displayFlex width100 cols flexCenter">
            <div className="displayFlex width100 flexCenter cols">
                <div className="displayFlex flexWrap flexCenter marginTop">
                    {selectedTags.map(tag=><Chip
                        key={tag.name}
                        className="margin"
                        onRequestDelete={()=>removeTag(tag)}>
                        {tag.name}
                    </Chip>)}

                </div>
                <div>
                    {selectedTags.length > 1 ? <RaisedButton label="Clear" onClick={clearTags}/> : ""}
                </div>
                <CriteriaSelectorComponrnt model={model.tagSelector}/>


            </div>
            <div className="small-container displayFlex flexCenter cols">
                <RaisedButton onClick={model.goSearch} label="Search" primary={true} fullWidth={true}/>
            </div>
        </div>
    )
})