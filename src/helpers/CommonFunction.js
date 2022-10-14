import { Colors,Fonts,Sizes } from "../constants/Themes";

export const isNull =(variable) => {
     if (variable === undefined || variable === null || variable === "") {
        return true;
    }
    
    return false
}

export const numberWithCommas = (num,n) =>{
    if(isNull((num))){
        return '';
    }
    n =  (!isNull(n)) ? n : 2;
    return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export const tabHeader = (tabTitle) =>{
    return {
        title: tabTitle,
        headerTitleStyle: { ...Fonts.white17SemiBold },
        headerStyle: {
            backgroundColor: Colors.primaryColor,
        },
        headerTintColor: 'white',
        headerTransparent:false
    };
}



export const objectLength = (obj) =>{
    return Object.keys(obj).length;
}

export const toFixed = (num,decimal) => { 
    decimal = (isNull(decimal)) ? 6 : decimal;
    num = parseFloat(num);
    return num.toFixed(decimal);
}