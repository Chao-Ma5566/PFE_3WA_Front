/*
 *check data from input is passed the length limite
 *@param {number} num Input length limited number
 *@param {value} data Input data need to check
 */
const lengthLimit = (value, max = 255) => {
    if(typeof value === "number") {
        const el = value.length;
        // on verrifie la length 
        if(el > max) {
            return false
        }
    } else if(typeof value === "string") {
        const el = value.trim().length;
        // on verrifie la length 
        if(el > max) {
            return false
        }
    }
    else if (typeof value === "object") {
        for (var info in value) {
            if (value[info].length > max) {
                return false
            }
        }
    }
    else if (Array.isArray(value)) {
        value.forEach(info =>{
            if(info.length > max){
                return false
            }
        })
    }
    return true
}
/*
*check data from input is vide or note
*
*@param {array} data Input data need to check
*/
const checkVide = (value) => {
    if (typeof value === 'string' && value.trim().length === 0) {
        return false
    }else if(typeof value === "number" && value.length === 0){
        return false
    }
    else if(typeof value === "object"){
        for (const key in value) {
            if (value[key].length === 0) {
                return false
            }
        }
    }
    else if (Array.isArray(value)) {
        value.forEach(info =>{
            if(info.length === 0){
                return false
            }
        })
    }
    return true
}
/*

/*
*check data from input is a interger and positive
*
*@param {num} data Input data need to check
*/
const isPositiveInteger = (num) => {
    if(Array.isArray(num)){
        num.forEach(n=>{
            const number = Number(n)
            if(!Number.isInteger(number) || number < 0){
                return false
            }
        })
        return true
    }else{
      const number = Number(num)
      if( Number.isInteger(number) && number >= 0){
          return true
      }else{
          return false
      }
    }
}
/*
*check data from input is a number
*
*@param {num} data Input data need to check
*/
const isNumber = (num) => {
    if(Array.isArray(num)){
        num.forEach(n=>{
            if(isNaN(n)){
                return false
            }
        })
        return true
    }else{
      if(isNaN(num)){
          return false
      }else{
          return true
      }
    }
}
export { lengthLimit, checkVide, isPositiveInteger, isNumber }
