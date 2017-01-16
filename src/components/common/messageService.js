import autobind from "autobind-decorator"

class MessageService {
    constructor() {

    }
    error(text="error"){
        this.ref.error(text)
    }
    @autobind
    setRef(val){
        this.ref = val
    }
}

export default new MessageService()