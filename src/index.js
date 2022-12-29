import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
let compProps = {};

compProps.obj1 = require("./JSON for match/data1.json");
compProps.obj2 = require("./JSON for match/data2.json");

// compProps.obj1 = {
//     akey: "a1f",
//     a1key: {a:"a1f"},
//     bkey: [ 9, 0 ],
//     c1key: {
//            a: { x: 1, y: 3 },
//            b: null,
//            c: [ "8", 7, [ 9, 0 ] ],
//            d: [ "8", 7, { x1: 2, y1: 5 }, 'a'],
//            e: [ "8", null, [ 9, 0 ] ],
//          },
//     dkey: ["d11", "d111", 112,23456, true, null, undefined],
//     d11key: ["d11", 112, [12,13]],
//     d12key: ["d11", 112, {x: 12, z: 13}],
//     ekey: {vv: 111, g: 1111},
//     fkey: {a: 1, ErrDontShowIt: {v: 1, Show2TimesThisLast: 12}},
//     gkey: null,
//      hkey: [121,122,{vm: 1, gm: 12},124],
//      jkey: [null],
//      kkey: undefined,
//      lkey: {z: null, g: undefined},
//      qkey: 123,
// };


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


function allUnicKeys(compProps) {
  let arr1 = Object.keys(compProps.obj1).sort();
  let arr2 = Object.keys(compProps.obj2).sort();

  let arrSame1D = arr1.filter((num) => arr2.includes(num));
  let arr1Unic1D = arr1.filter((num) => !arr2.includes(num));
  let arr2Unic1D = arr2.filter((num) => !arr1.includes(num));
  // let arrSame2D = arr1DInto2DWhithKeyMark(arrSame1D, "commonKey");
  // let arr1Unic2D = arr1DInto2DWhithKeyMark(arr1Unic1D, "unic1Key");
  // let arr2Unic2D = arr1DInto2DWhithKeyMark(arr2Unic1D, "unic2Key");

  let allKeysArray1D = [...arrSame1D, ...arr1Unic1D, ...arr2Unic1D];
  // let allKeysArray2D = [...arrSame2D, ...arr1Unic2D, ...arr2Unic2D];
  return allKeysArray1D;
}

function arr1DInto2DWhithKeyMark(arr1D, keyMark) {
  let arr2D = [];
  while (arr1D.length) {
    arr2D.push(arr1D.splice(0, 1).concat(keyMark));
  }
  return arr2D;
}

// allUnicKeys(compProps);

function showObject(compProps) {
  let allKeysArray2D = compProps.allKeysArray2D;
  let result = allKeysArray2D.map(function (item) {
    let elem1 = showElement(compProps.obj1[item[0]]);
    let elem2 = showElement(compProps.obj2[item[0]]);
    switch (item[1]) {
      case "commonKey":
        return showRowOfTable(compProps, item, "Общий ключ", elem1, elem2);
      case "unic1Key":
        return showRowOfTable(
          compProps,
          item,
          "Уник. ключ 1-го об.",
          elem1,
          " - нет - "
        );
      case "unic2Key":
        return showRowOfTable(
          compProps,
          item,
          "Уник. ключ 2-го об.",
          " - нет - ",
          elem2
        );
    }
  });
  return result;
}

function newShowKeys(compProps){
    let obj1=compProps.obj1;
    let keys = Object.keys(obj1);
    console.log('keys obj1', keys);
    let result=keys.map(function (index) {return newShowKey(index, obj1[index]) });
    return     result    ;
}

function newShowKey(elementName, elementValue1){
    // console.log('elementName =', elementName);
    // console.log('elementValue =', elementValue);
    let elementValue2 = newShowElementValue(elementValue1);
    return <tr>
    <td>{elementName}</td>
    <td>{elementValue2}</td>
    </tr>;
}

function newShowElementValue(elementValue3){
        switch (typeof elementValue3) {
          case "string":
            return elementValue3;
            break;
          case "number":
            return elementValue3;
            break;
          case "symbol":
            return elementValue3;
            break;
          case "boolean":
            return '' + elementValue3;
            break;
          case "undefined":
            return "undefined";
            break;
          //------------------------ Object (Null/Array/Object) ----------------------------
          case "object":
            if (elementValue3 === null) {
              return 'null';
            } else {
              if (elementValue3 instanceof Array) {
                let resultArr = elementValue3.map(function (item) {
                  return <tr>
                  <td>{newShowElementValue(item)}</td>
                  </tr>;
                });
                return <tr>{resultArr}</tr>;
              } else {
                console.log('1) elementValue = ' + elementValue3);
                let resultObj = Object.entries(elementValue3).forEach(([key, value]) => {
                  console.log('2) key = ' + key + ' , value = ' + value );
                  console.log('3) resultObj' );
                  return (<tr>
                    <td> {key} </td>
                    <td>   {newShowElementValue(value)} </td>
                    </tr>);
                });
                console.log('resultObj x ', resultObj);
                return <td>{resultObj}</td>;
                // return resultObj ;
              }
            }

            break;
          //----------------------------------------------------
          default:
            return "default: Н/Д?" + elementValue3;
            break;
        }
}

function showObject1(compProps) {
    let allKeysArray2D = compProps.allKeysArray2D;
    // console.log('allKeysArray2D', allKeysArray2D);
    let result =    newShowKeys(compProps);
    // let result = allKeysArray2D.map(function (index, item) {return index });
    // let result = allKeysArray2D.map(function (item) {
    //   let elem1 = showElement(compProps.obj1[item[0]]);
    //   console.log([item[0]]);
    //   console.log(elem1);
    //   let elem2 = showElement(compProps.obj2[item[0]]);
    //   console.log([item[0]]);
    //   console.log(elem2);
    //   switch (item[1]) {
    //     case "commonKey":
    //       return showRowOfTable(compProps, item, "Общий ключ", elem1, elem2);
    //     case "unic1Key":
    //       return showRowOfTable(
    //         compProps,
    //         item,
    //         "Уник. ключ 1-го об.",
    //         elem1,
    //         " - нет - "
    //       );
    //     case "unic2Key":
    //       return showRowOfTable(
    //         compProps,
    //         item,
    //         "Уник. ключ 2-го об.",
    //         " - нет - ",
    //         elem2
    //       );
    //   }
    // });
    console.log('showObject1 result' + result);
    return <tr>
         <td>{result}</td>
      </tr>;
  }

function showRowOfTable(compProps, item, Text1, Text2, Text3) {
  if (Text2 === Text3) {
    return (
      <tr key={item}>
        <td style={{ whiteSpace: "pre-wrap", backgroundColor: "Palegreen" }}>
          {item[0]}
        </td>
        <td style={{ whiteSpace: "pre-wrap", backgroundColor: "Palegreen" }}>
          {Text1}
        </td>
        <td style={{ whiteSpace: "pre-wrap" }}>{Text2}</td>
        <td style={{ whiteSpace: "pre-wrap", backgroundColor: "lightgreen" }}>
          {Text3}
        </td>
      </tr>
    );
  } else {
    Text3 = checkStrings(Text2, Text3);
    // console.log("Text3", Text3);
    return (
      <tr key={item}>
        <td style={{ whiteSpace: "pre-wrap", backgroundColor: "LightCyan" }}>
          {item[0]}
        </td>
        <td style={{ whiteSpace: "pre-wrap", backgroundColor: "LightCyan" }}>
          {Text1}
        </td>
        <td style={{ whiteSpace: "pre-wrap" }}>{Text2}</td>
        <td
          style={{
            whiteSpace: "pre-wrap",
            color: "red",
            backgroundColor: "lightyellow",
          }}
        >
          {Text3}
        </td>
      </tr>
    );
  }
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

function showElement(element) {
  switch (typeof element) {
    case "string":
      return element;
      break;
    case "number":
      return element;
      break;
    case "symbol":
      return element;
      break;
    case "boolean":
      return "" + element + "";
      break;
    case "undefined":
      return "" + element + "";
      break;
    //------------------------ Object (Null/Array/Object) ----------------------------
    case "object":
      if (element === null) {
        return "" + element + "";
      } else {
        if (element instanceof Array) {
          let resultArr = element.map(function (item) {
            return " " + showElement(item);
          });
          return "[ " + resultArr + " ]";
        } else {
          let resultKey;
          let resultValue;
          let resultObj = "";
          Object.entries(element).forEach(([key, value]) => {
            resultKey = key;
            resultValue = showElement(value);
            resultObj += resultKey + " : " + resultValue + ", " + "\n";
          });
          return "{" + "\n" + resultObj + "}" + "\n";
        }
      }
      break;
    //----------------------------------------------------
    default:
      return "default: Н/Д?" + element;
      break;
  }
}

function createTable() {
  let res = showObject(compProps);
  return (
    <table>
      <thead>
        <tr>
          <td>Ключ</td>
          <td>Признак ключа</td>
          <td>Значение 1</td>
          <td>Значение 2</td>
        </tr>
      </thead>
      <tbody>{res}</tbody>
    </table>
  );
}

function createTable1(compProps) {
    let res1 = showObject1(compProps);
    // let res1 = (<p> text <b>text </b> </p>);
    let res2 = (<p> res2 in <b>createTable1</b> </p>);
    // res1 = compProps.allKeysArray2D.forEach(
    //     (element) => {
    //         console.log(element[0])
    //         // compProps.obj1[element[0]]
    //         res1 = (<p> text   </p>)
    //         console.log(res1)
    //         return res1
    //       }
    // );
    return (
      <table>
        <thead>
          <tr>
            {/* <td>Ключ</td>
            <td>Признак ключа</td> */}
            <td>JSON_1</td>
            <td>JSON_2</td>
          </tr>
        </thead>
        <tbody>
        <tr>
            {/* <td>Ключ</td>
            <td>Признак ключа</td> */}
            <td>{res1}</td>
            <td>{res2}</td>
          </tr>
        </tbody>
      </table>
    );
  }

// const root = ReactDOM.createRoot(document.getElementById("root"));
// let table = createTable();
// root.render(table);

// const element = <h1>Hello, world</h1>;
// root.render(element);

// const name = 'Michael';
// var nameUser = () => "Franklin";
// const element = <h1>Здравствуй, {name}</h1>;
// const element_2 = <h1>Здравствуй, {nameUser()}</h1>;

// ReactDOM.render(element, document.getElementById("root1"));
// ReactDOM.render(element_2, document.getElementById("root2"));

// let personArray =[{name : 'Вася', age: 15, sex: 'male', address: 'Moscow', nickName : 'Kitty' },{name : 'Петя', age: 16, sex: 'male', address: 'Riga', nickName : 'Rex' },{name : 'Оля', age: 12, sex: 'female', address: 'Riga', nickName : 'Star' },]; 
// let jsonDataObject ={name : 'Вася', age: 15, sex: 'male', address: 'Moscow', nickName : 'Kitty' }

// const jsonObject = (dataObject) => {
//     return {
//         tag: 'div',
//         children: [
//             // elementKey(element.key),
//             // elementValue(element.age)
//             elementKey = Object.entries(dataObject).forEach(([key, value]) => {
//                 return key;
//             //     resultValue = showElement(value);
//             //     resultObj += resultKey + " : " + resultValue + ", " + "\n";
//               })
//         ]
//     }
// }     

// const elementKey = (key) => {
//     return {
//         tag: 'span',
//         text: key,
//         style: 'margin: 10px; background-color: lightgreen',
//      }
// }

// const elementValue = (age) => {
//     return {
//         tag: 'span',
//         text: age,
//     }
// }

// const render = (root, ...virtual_DOM) => {
//     console.log(virtual_DOM)
//     virtual_DOM.forEach(node => {
//         const el = document.createElement(node.tag)
//         if( node.style ) {
//             el.setAttribute('style', node.style)
//         }
//         if( node.text ) {
//             const text_el = document.createTextNode(node.text)
//             el.appendChild(text_el)
//         }
//         if( node.children ) {
//             node.children.map(child => render(el, child))
//         }
//         root.appendChild(el)
//     })
// }

// const res1 = personArray.forEach((item, index, array) => {
//     render(
//         document.getElementById('root2'),
//         jsonObject({ name: jsonDataObject[index].name, age: jsonDataObject[index].age }),

//     )
// })

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

const root1 = ReactDOM.createRoot(document.getElementById("root1"));
let table1 = createTable1(compProps);
// root1.render(table1);

const root2 = ReactDOM.createRoot(document.getElementById("root2"));
let table2 = createTable2(compProps);
root1.render(table2);

//   if(Array.isArray(value)) return <ArrayComponent value={value}>
//   if(typeof value === 'object') return <ObjectComponent value={value}>
//   return <PrimitiveComponent value={value}>

//   а с таблицами что-то такое
//   return <table><td><DataComponent obj={obj1}></td><td><DataComponent obj={obj2}></td></table>
