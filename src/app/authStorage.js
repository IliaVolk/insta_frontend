const KEY = "auth-credentials"

class AuthStorage{
    get credentials(){
        try{
            let item = JSON.parse(localStorage[KEY])
            return item
        }catch (e){
            return null
        }
    }
    set credentials(val){
        localStorage.setItem(KEY, JSON.stringify(val))
    }
}

export default new AuthStorage();