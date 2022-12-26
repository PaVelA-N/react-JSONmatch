import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
let compProps={};
compProps.obj1 = require('./JSON for match/data1.json');
compProps.obj2 = require('./JSON for match/data2.json');

// function loadFilefunction(){
//     fetch('https://github.com/PaVelA-N/react-JSONmatch/blob/master/data1.json')
//     .then(alert('test'))
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// let urliOfJSON = 'https://github.com/PaVelA-N/react-JSONmatch/blob/master/data1.json'
//     let response = await fetch(urliOfJSON);

//     if (response.ok) { // если HTTP-статус в диапазоне 200-299
//       // получаем тело ответа (см. про этот метод ниже)
//       let json = await response.json();
//     } else {
//       alert("Ошибка HTTP: " + response.status);
//     }

//     function readJson () {
//         // http://localhost:8080
//         // fetch('/Reading/api/file')
//         fetch('https://github.com/PaVelA-N/react-JSONmatch/blob/master/data1.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("HTTP error " + response.status);
//             }
//             return response.json();
//         })
//         .then(json => {
//             this.users = json;
//             console.log(this);
//         })
//         .catch(function () {
//             this.dataError = true;
//         })
//      }

// let x = readJson();

    // if (response.ok) { // если HTTP-статус в диапазоне 200-299
    //     // получаем тело ответа (см. про этот метод ниже)
    //     let json = await response.json();
    //   } else {
    //     alert("Ошибка HTTP: " + response.status);
    //   }
// }

function allUnicKeys(compProps){
    let arr1 = Object.keys(compProps.obj1).sort();
    let arr2 = Object.keys(compProps.obj2).sort();
   
    let arrSame1D = arr1.filter(num => arr2.includes(num));
    let arr1Unic1D = arr1.filter(num => !arr2.includes(num));
    let arr2Unic1D = arr2.filter(num => !arr1.includes(num));
    let arrSame2D = arr1DInto2DWhithKeyMark(arrSame1D, 'commonKey');
    let arr1Unic2D = arr1DInto2DWhithKeyMark(arr1Unic1D, 'unic1Key');
    let arr2Unic2D = arr1DInto2DWhithKeyMark(arr2Unic1D, 'unic2Key');
 
    let allKeysArray2D = [...arrSame2D, ...arr1Unic2D,...arr2Unic2D];
    compProps.allKeysArray2D = allKeysArray2D;
    // return compProps;
}

function arr1DInto2DWhithKeyMark(arr1D, keyMark){
    let arr2D=[];
    while (arr1D.length) {arr2D.push(arr1D.splice(0,1).concat(keyMark))}
    return arr2D;
}

allUnicKeys(compProps);

function showObject(compProps){
    let allKeysArray2D = compProps.allKeysArray2D;
    let result = allKeysArray2D.map(function(item) {
    let elem1 = showElement(compProps.obj1[item[0]]);
    let elem2 = showElement(compProps.obj2[item[0]]);
        switch (item[1]) {
            case 'commonKey':
                return (
                        showRowOfTable(compProps, item, 'Общий ключ', elem1, elem2)      
                        );                
            case 'unic1Key':
                return (
                    showRowOfTable(compProps, item, 'Уник. ключ 1-го об.', elem1, ' - нет - ' )                
                    );                
            case 'unic2Key': 
                return (
                    showRowOfTable(compProps, item, 'Уник. ключ 2-го об.', ' - нет - ', elem2)
                    );              
        }
    });
    return (result);
}

function showRowOfTable(compProps, item, Text1, Text2, Text3){
if (Text2 === Text3) {
return (
    <tr key={item}>
    <td style={{'whiteSpace':'pre-wrap', 'backgroundColor': 'Palegreen'}}>{item[0]}</td>
    <td style={{'whiteSpace':'pre-wrap', 'backgroundColor': 'Palegreen'}}>{Text1}</td>
    <td style={{'whiteSpace':'pre-wrap'}}>{Text2}</td>
    <td style={{'whiteSpace':'pre-wrap', 'backgroundColor': 'lightgreen'}} >{Text3}</td>
    </tr>);
} else {
    Text3 = checkStrings(Text2, Text3);
    return (
        <tr key={item}>
        <td style={{'whiteSpace':'pre-wrap', 'backgroundColor': 'LightCyan'}} >{item[0]}</td>
        <td style={{'whiteSpace':'pre-wrap', 'backgroundColor': 'LightCyan'}}>{Text1}</td>
        <td style={{'whiteSpace':'pre-wrap'}}>{Text2}</td>
        <td style={{'whiteSpace':'pre-wrap', color: 'red', 'backgroundColor': 'lightyellow'}} >{Text3}</td>
        </tr>);
}
}

function checkStrings(str1, str2) {
    str1 = Array.isArray(str1) ? str1 : str1.split(',');
    str2 = Array.isArray(str2) ? str2 : str2.split(',');
    let result = '';

    for (var i=0; i<str2.length; i++) {
        if (str2[i] !== str1[i]) 
            str2[i] =  str2[i] ;
    }

    return str2.join(',');
    // return ('XXX' + <span class='highlight'>);
    
    // return str2.forEach(function(str2) {result += str2.name + ', '});
    // authors.forEach(
    //     function(author) {
    //         result += author.name + ', ';
    //     }
    // );

}

function showElement(element){
switch (typeof element) {
    case 'string':
        return(element);        
        break;
    case 'number':
        return(element)        
        break;
    case 'symbol':
        return(element)        
        break;
    case 'boolean':
        return('' + element+'')        
        break;
    case 'undefined':
        return('' + element +'')        
        break;
//------------------------ Object (Null/Array/Object) ----------------------------
            case 'object':
                if (element === null) {
                    return('' + element+'')
                    } else {
                         if (element instanceof Array){
                            let resultArr = element.map(function(item) {return ' ' +showElement(item)});
                             return('[ ' + resultArr + ' ]')
                        } else{
                            let resultKey;
                            let resultValue;
                            let resultObj=''; 
                            Object.entries(element).forEach(([key, value]) => {
                                resultKey = key;
                                resultValue = showElement(value);
                                resultObj += resultKey + ' : ' + resultValue + ', '+'\n';    
                                });
                            return('{'+'\n' + resultObj + '}' +'\n')
                        }
                    }
                    break;        
//----------------------------------------------------
    default:
        return('default: Н/Д?' + element )      
        break;
}
}

function createTable() {
     let res = showObject(compProps); 
     return <table>
        <thead>
           <tr>
              <td>Ключ</td>
              <td>Признак ключа</td>              
              <td>Значение 1</td>
              <td>Значение 2</td>
           </tr>
        </thead>
        <tbody>
           {res}
        </tbody>
     </table>;
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
let table = createTable();
root.render (table);

//   if(Array.isArray(value)) return <ArrayComponent value={value}>
//   if(typeof value === 'object') return <ObjectComponent value={value}>
//   return <PrimitiveComponent value={value}>
  
//   а с таблицами что-то такое
//   return <table><td><DataComponent obj={obj1}></td><td><DataComponent obj={obj2}></td></table>