export default function (f, that, time=500){
    var locked = false,
        lockedTimeout = null
    return function (){
        if (locked)return
        locked = true
        clearTimeout(lockedTimeout)
        lockedTimeout = setTimeout(()=>{
            locked = false
        }, time)
        f.apply(that, Array.prototype.slice.call(arguments))
    }
}