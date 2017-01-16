import React from "react"
import {PropTypes} from "react"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DialogActions from "./../common/DialogActions"
import Dialog from 'material-ui/Dialog';
import {observer} from "mobx-react"
import LoadingComponent from "./../common/LoadingComponent"

@observer
export default class PlacesComponent extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {}
    }

    loadingState(){
        let {model} = this.props

        return <LoadingComponent/>
    }
    activeState(){
        let {model} = this.props

        return (
            <div className="width100 row">
                {model.data.map((val, i)=>
                    <Card className="col-lg-2 col-md-3 col-sm-4 col-xs-6 hover"
                          onClick={()=>model.setEditingItem(val)}
                          key={i}>
                        <CardTitle title={val.name} subtitle={<span>size <b>{val.size}</b></span>} />

                    </Card>)}
                <div className="width100 displayFlex flexCenter">
                <Card className="col-lg-4 col-md-6 col-sm-8 col-xs-12">
                    <CardTitle title={<TextField
                        fullWidth={true}
                        floatingLabelText="Place Name"
                        onChange={model.setAddItemName}
                        value={model.toAdd.name}/>}
                    />
                    <CardActions>
                        <RaisedButton label="Add"
                                      fullWidth={true}
                                      onClick={model.add}/>
                    </CardActions>
                </Card>
                </div>

                <Dialog
                    title="Dialog"
                    actions={<DialogActions model={model}/>}
                    modal={false}
                    open={model.isDialogOpened}
                    onRequestClose={model.closeDialog}
                    autoScrollBodyContent={true}
                >
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Place Name"
                        onChange={model.setEditingItemName}
                        value={model.editingItem.name}/>
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