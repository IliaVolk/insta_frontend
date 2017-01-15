import React from "react"
import {PropTypes} from "react"
import _styles from "./styles.sass"
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from "material-ui/svg-icons/action/favorite-border"
import Dimensions from 'react-dimensions'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TagsHomeComponent from "./TagsHomeComponent"
import {Link} from "react-router"
import {observer} from "mobx-react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from "material-ui/Chip"
import LoadingComponent from "./../common/LoadingComponent"
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: "100%",
        overflowY: 'auto',
    },

};
@observer
export default class HomeComponent extends React.Component {
    constructor() {
        super()
    }
    componentWillReceiveProps(props){
        let {model} = props
        model.getSearchResults()
    }
    componentWillMount(){
        let {model} = this.props
        model.getSearchResults()
    }
    render(){
        let {model} = this.props
        return (<div className="displayFlex cols flexCenter width100">
            <TagsHomeComponent model={model}/>
            <div style={styles.root} className="row width100">
                {model.isLoading? <LoadingComponent/>:
                    model.stores.map((item,i) => (
                    <Card
                        className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
                        key={i}>
                        <CardHeader
                            title={<span>{item.name} <a target="_blank" href={item.url}>
                            <RaisedButton label="Open link" onClick={e=>e.stopPropagation()}/></a></span>}
                            subtitle={item.place.name||""}
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
                    </Card>
                ))}
            </div>
        </div>)
    }
}

