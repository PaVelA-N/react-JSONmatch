import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const obj1 = {
    akey: "a1f",
    a1key: {a:"a1f"},
    bkey: true,
    c1key: {
           a: { x: 1, y: 3 },
           b: null,
           c: [ "8", 7, [ 9, 0 ] ],
           d: [ "8", 7, { x1: 2, y1: 5 }, 'a'],
           e: [ "8", null, [ 9, 0 ] ],
         },
    dkey: ["d11", "d111", 112,23456, true, null, undefined],
    d11key: ["d11", 112, [12,13]],
    d12key: ["d11", 112, {x: 12, z: 13}],
    ekey: {vv: 111, g: 1111},
    fkey: {a: 1, ErrDontShowIt: {v: 1, Show2TimesThisLast: 12}},
    gkey: null,
     hkey: [121,122,{vm: 1, gm: 12},124],
     jkey: [null],
     kkey: undefined,
     lkey: {z: null, g: undefined},
};

const obj2 = {
    akey: "a1f",
    a1key: "234c1",
    b21key: true,
    b22key: {vb: 21, g12b: 22},
    c2key: "234c1",
    dkey: ["d2","d23"],
    ekey: {ve: 221, ge: 2222},
    f21key: {a: 21, b: 2},
    f22key2: {a: 21, b: {v: 221, g: 2}},
    f23key3: {a: 21, b: {v: 221, g: {gv: 212, gg: 22}}},
    gkey: null,
    h21key: [21,22,23,24],
    h22key: [21,22,{vm: 1, gm: 2},24],
    jkey: null,
    kkey: undefined,
};

let compProps={};
compProps.obj1 = obj1;
compProps.obj2 = obj2;

function allUnicKeys(compProps){
    let arr1 = Object.keys(compProps.obj1).sort();
    let arr2 = Object.keys(compProps.obj2).sort();
    // console.log('arr1 :' + arr1);
    // console.log('arr2 :' + arr2);
   
    let arrSame1D = arr1.filter(num => arr2.includes(num));
    let arr1Unic1D = arr1.filter(num => !arr2.includes(num));
    let arr2Unic1D = arr2.filter(num => !arr1.includes(num));
    // console.log('arrSame1D :' + arrSame1D);
    // console.log('arr1Unic1D :' + arr1Unic1D);
    // console.log('arr2Unic1D :' + arr2Unic1D);
    let arrSame2D = [];
    let arr1Unic2D = [];
    let arr2Unic2D = [];

    while(arrSame1D.length) arrSame2D.push(arrSame1D.splice(0,1).concat('commonKey'));
     while(arr1Unic1D.length) arr1Unic2D.push(arr1Unic1D.splice(0,1).concat('unic1Key'));
     while(arr2Unic1D.length) arr2Unic2D.push(arr2Unic1D.splice(0,1).concat('unic2Key'));
 
    let allKeysArray2D = [...arrSame2D, ...arr1Unic2D,...arr2Unic2D];
    // console.log('allKeysArray2D :')
    // console.log(allKeysArray2D);
    compProps.allKeysArray2D = allKeysArray2D;
    return compProps;
}
allUnicKeys(compProps);

  function showObject(compProps){
    let allKeysArray2D = compProps.allKeysArray2D;
    let obj1 = compProps.obj1;
    let result = allKeysArray2D.map(function(item) {
        switch (item[1]) {
            case 'commonKey':
                    let elem1 = showElement(obj1[item[0]]);
                    let elem2 = showElement(obj2[item[0]]);
                    if (elem1===elem2) {
                        console.log('elem1 = elem2');
                        return <tr key={item}>
                        <td>{item[0]}</td>
                        <td style={{ color: 'green' }}> {'Общий ключ'}</td> 
                        <td>{elem1}</td> 
                        <td style={{ color: 'darkgreen', 'backgroundColor': 'lightgreen'}}>{elem2}</td>
                        </tr>;                
                    } else {
                        console.log('elem1 < > elem2');
                        return <tr key={item}>
                        <td>{item[0]}</td>
                        <td style={{ color: 'green'}}> {'Общий ключ'}</td> 
                        <td>{elem1}</td> 
                        <td style={{ color: 'red', 'backgroundColor': 'yellow'}}>{elem2}</td>
                        </tr>;                
                    }
                break;
            case 'unic1Key':
                return <tr key={item}>
                <td>{item[0]}</td>
                <td>{'Уник. ключ 1-го об.'}</td>
                <td>{showElement(obj1[item[0]])}</td>
                <td>{' - нет - '}</td>
                </tr>;                
                break;
            case 'unic2Key':
                return <tr key={item}>
                <td>{item[0]}</td>
                <td>{'Уник. ключ 2-го об.'}</td>
                <td>{' - нет - '}</td>
                <td>{showElement(obj2[item[0]])}</td>
                </tr>;                
                break;
        }
    });
    return (result);
}
function showElement(element){
    // console.log('Начало showElement, на входе element: ' +element );
switch (typeof element) {
    case 'string':
        return(element)        
        break;
    case 'number':
        return(element )        
        break;
    case 'symbol':
        return(element)        
        break;
    case 'boolean':
        return('"' + element+'"')        
        break;
    case 'undefined':
        return('"' + element +'"')        
        break;
//------------------------ Object ----------------------------
            case 'object':
                if (element === null) {
                    return('"' + element+'"')
                    } else {
                         if (element instanceof Array){
                            let resultArr = element.map(function(item) {return ' ' +showElement(item)});
                            // console.log('array result1:');
                            // console.log(result1);
                            return('Array: [ ' + resultArr + ' ]')
                        } else{
                            let resultKey;
                            let resultValue;
                            let resultObj=''; 
                            Object.entries(element).forEach(([key, value]) => {
                                resultKey = key;
                                resultValue = showElement(value);
                                // console.log(' -res-: ' + `${resultKey} ${resultValue}`);
                                resultObj += resultKey + ' : ' + resultValue + ', ' ;    
                                });
                            return('Object: { ' + resultObj +'}')
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