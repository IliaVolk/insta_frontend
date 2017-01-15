import React from "react"
import {PropTypes} from "react"
import {observer} from "mobx-react"
import autobind from "autobind-decorator"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import DialogActions from "./../common/DialogActions"
import LoadingComponent from "./../common/LoadingComponent"

import EditingStoreComponent from "./EditingStoreComponent"

@observer
export default class StoresComponent extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {}
    }

    loadingState(){

        return <LoadingComponent/>
    }
    activeState(){
        let {model} = this.props

        return (
            <div className="width100 row">
                {model.data.map((item, i)=>
                <Card
                    className="col-lg-3 col-md-4 col-sm-6 col-xs-12 hover"
                    onClick={()=>model.setEditingItem(item)}
                    key={i}>
                    <CardHeader
                        title={item.name + " ("+item.place.name+")"}
                        subtitle={<span>Link: {item.url} <a target="_blank" href={item.url}>
                            <RaisedButton label="Open link" onClick={e=>e.stopPropagation()}/></a>
                        </span>}
                    />
                    <CardMedia
                    >
                        <img src={item.image} />
                    </CardMedia>
                    <CardActions>
                        <div className="displayFlex flexWrap flexCenter">
                            {item.tags.map(tag=><Chip
                                key={tag.id}
                                className="hover-cursor">
                                {tag.name}
                                </Chip>)}

                        </div>
                    </CardActions>
                </Card>)}
                <Card className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <EditingStoreComponent model={model.toAddModel}/>
                    <RaisedButton label="Add"
                                  fullWidth={true}
                                  onClick={model.add}/>
                </Card>

                <Dialog
                    bodyStyle={{minHeight: "300px"}}
                    title="Dialog"
                    actions={<DialogActions model={model}/>}

                    modal={false}
                    open={model.isDialogOpened}
                    onRequestClose={model.closeDialog}
                >
                    <EditingStoreComponent model={model.editingItemModel}/>
                </Dialog>
            </div>
        )
    }
    render() {
        let {model} = this.props
        if (model.isLoading){
            return this.loadingState()
        }else{
            return this.activeState()
        }
    }
}