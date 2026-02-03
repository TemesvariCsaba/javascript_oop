
const muvelet = (a,b, callback)=>{
    const eredmeny =  callback(a,b)
    return {
        eredmeny
    }
}
const muveletLetrehoz = (jel) =>{
    if(jel == '+'){
        return(a,b) => {
            return a+b
        }
    }
    if (jel == '-'){
        return(a,b) =>{
            return a-b
        }
    }
    if (jel == '*'){
        return(a,b) =>{
            return a*b
        }
    }
}

export {muvelet, muveletLetrehoz}