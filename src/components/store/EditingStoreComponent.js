import React from "react"
import {PropTypes} from "react"
import {observer} from "mobx-react"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CriteriaSelectorComponent from "./../home/criteriaSelector/CriteriaSelectorComponent"
import {Tabs, Tab} from "material-ui/Tabs"
import Chip from 'material-ui/Chip';

@observer
export default class EditingStoreComponent extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {}
    }

    loadingState(){
        return <div>loading</div>
    }
    activeState(){
        let {model} = this.props
        let {item} = model
        let imageStyle = {
            backgroundImage: "url('"+item.image+"')",
            backgroundSize: "cover",
            height: "200px"}
        return (<div className="width100 row">

            <Tabs className="width100">
                <Tab label="General">
                    <div className="row width100">
                        <div
                            className="col-xs-12 col-sm-6 col-md-4 col-lg-4"
                            style={imageStyle}>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                            <TextField
                                floatingLabelText="Image"
                                fullWidth={true}
                                onChange={model.setImageEvent}
                                value={item.image}/>
                            <TextField
                                floatingLabelText="Url"
                                fullWidth={true}
                                onChange={model.setUrlEvent}
                                value={item.url}/>
                            <TextField
                                floatingLabelText="Name"
                                fullWidth={true}
                                onChange={model.setNameEvent}
                                value={item.name}/>

                        </div>
                    </div>
                </Tab>
                <Tab label="Tags">
                    <CriteriaSelectorComponent model={model.tagSelector}/>
                    <div className="displayFlex flexWrap flexCenter marginTop">
                        {item.tags.map(tag=><Chip
                            key={tag.name}
                            className="margin"
                            onRequestDelete={()=>model.removeTag(tag)}>
                            {tag.name}
                        </Chip>)}

                    </div>
                </Tab>
                <Tab label="Place">
                    <CriteriaSelectorComponent model={model.placeSelector}/>
                    {item.place.name?<div className="displayFlex flexCenter">
                        <h2>Place is <span style={{textDecoration: "underline"}}>{item.place.name}</span></h2>
                    </div>:""}
                </Tab>
            </Tabs>


        </div>)
    }
    render() {
        if (this.props.model && this.props.model.item){
            return this.activeState()
        }else{
            return this.loadingState()
        }
    }
}