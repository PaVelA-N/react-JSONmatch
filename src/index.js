import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
let compProps = {};

compProps.obj1 = require("./JSON for match/data1.json");
compProps.obj2 = require("./JSON for match/data2.json");

function allUnicKeys(compProps) {
  let arr1 = Object.keys(compProps.obj1).sort();
  let arr2 = Object.keys(compProps.obj2).sort();
  let arrSame1D = arr1.filter((num) => arr2.includes(num));
  let arr1Unic1D = arr1.filter((num) => !arr2.includes(num));
  let arr2Unic1D = arr2.filter((num) => !arr1.includes(num));
  let allKeysArray1D = [...arrSame1D, ...arr1Unic1D, ...arr2Unic1D];
  return allKeysArray1D;
}

function checkStrings(str1, str2) {
  str1 = Array.isArray(str1) ? str1 : str1.split(",");
  str2 = Array.isArray(str2) ? str2 : str2.split(",");
  let result = "";

  for (var i = 0; i < str2.length; i++) {
    if (str2[i] !== str1[i]) str2[i] = str2[i];
  }

  return str2.join(",");
  // return ('XXX' + <span class='highlight'>);

  // return str2.forEach(function(str2) {result += str2.name + ', '});
  // authors.forEach(
  //     function(author) {
  //         result += author.name + ', ';
  //     }
  // );
}

function showValue(objValue){
switch (typeof objValue) {
  case "string":
    return objValue;
    break;
  case "number":
    return objValue;
    break;
  case "symbol":
    return objValue;
    break;
  case "boolean":
    return '' + objValue;
    break;
  case "undefined":
    return "undefined";
    break;
  //------------------------ Object (Null/Array/Object) ----------------------------
  case "object":
    if (objValue === null) {
      return 'null';
    } else {
      if (objValue instanceof Array) {
        let resultArr = objValue.map(function (item, index) {
          return  <tr key={item + '' + index}>
                        <td>{showValue(item)}</td>
                      </tr>
        });
        return <table>
                  <tbody>{resultArr} </tbody>
                </table>
      } else {
        let resultObj = Object.entries(objValue).map(function ([key, value]) {
          return <tr key={key + ':'+ showValue(value)}>
            <td> {key} : </td>
            <td> {showValue(value)} </td>
            </tr>;
        });

        return <table>
                  <tbody> {resultObj} </tbody>
                </table>
      }
    }

    break;
}
}

function showAllKey(compProps){
  let keysArray = allUnicKeys(compProps);
  let vallueObj1 = compProps.obj1;
  let vallueObj2 = compProps.obj2;
  let resultArr = keysArray.map(function (item) {
    return <tr key = {item}>
          <td>"{item}" : </td>
          <td>{showValue(vallueObj1[item])}</td>
          <td>{showValue(vallueObj2[item])}</td>
          </tr>;
  });
return  resultArr
}

function  createTable2(compProps) {
return (
  <table>
    <thead>
      <tr>
        <td>Ключ</td>
        <td>JSON_1</td>
        <td>JSON_2</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
        {showAllKey(compProps)}  
    </tbody>
  </table>
);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
let table2 = createTable2(compProps);
root.render(table2);

//   if(Array.isArray(value)) return <ArrayComponent value={value}>
//   if(typeof value === 'object') return <ObjectComponent value={value}>
//   return <PrimitiveComponent value={value}>

//   а с таблицами что-то такое
//   return <table><td><DataComponent obj={obj1}></td><td><DataComponent obj={obj2}></td></table>
