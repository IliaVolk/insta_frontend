import Accepted from "material-ui/svg-icons/action/done"
import Dismissed from "material-ui/svg-icons/content/clear"
import React from "react"
const style = {position: "absolute", top: 20, left: 20}



const getContent = props=>{
    switch (props.state){
        case "accepted": return <Accepted className="scaled2" color="#008800"/>
        case "dismissed": return <Dismissed className="scaled2" color="#880000"/>
        default: return <div></div>
    }
}
export default props=>{
    return <div style={{position: "relative"}}>
        <div style={style}>
            {getContent(props)}
        </div>
    </div>
}