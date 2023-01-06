import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
let compProps = {};
compProps.obj1 = require("./JSON for match/data2.json");
compProps.obj2 = require("./JSON for match/data2.json");
compProps.DiffObject={};
compProps.DiffObject2={};

// compProps.obj1 = {
//   SameKeySameValue: "sameValue",
//   sameKeyDiffValue: "DiffValue1",
// sameKeyDiffTypeOfValue: {ab:"Diff_Type_Of_Value"},
//   bkey: true,
//   c1key: {
//          a: { x: 1, y: 3 },
//          b: null,
//          c: [ "8", 7, [ 9, 0 ] ],
//          d: [ "8", 7, { x1: 2, y1: 5 }, 'a'],
//          e: [ "8", null, [ 9, 0 ] ],
//        },
//   dkey: ["d2","d23"],
//   d2key: ["d11", "d111", 112,23456, true, null, undefined],
//   d11key: ["d11", 112, [12,13]],
//   d12key: ["d11", 112, {x: 12, z: 13}],

//   ekey: {vv: 111, g: 1111}, /* проработать!*/

//   fkey: {a: 1, ErrDontShowIt: {v: 1, Show2: 12}},
//   gkey: null,
//    hkey: [121,122,{vm: 1, gm: 12},124],
  //  jkey: [null],
//    kkey: undefined,
//    lkey: {z: null, g: undefined},
// };

// compProps.obj2 = {
//   SameKeySameValue: "sameValue",
//   sameKeyDiffValue: "DiffValue2",
  // sameKeyDiffTypeOfValue: "Diff_Type_Of_Value",
  // b21key: true,
//   b22key: {vb: 21, g12b: 22},
  // c2key: "234c1",
  // dkey: ["d2","d23"],
  
  // ekey: {ve: 221, ge: 2222}, /* вот тут проблема видимо т.к. общий ключ но составы обьекта разные*/
  
  // f21key: {a: 21, b: 2},
  // f22key2: {a: 21, b: {v: 221, g: 2}},
  // f23key3: {a: 21, b: {v: 221, g: {gv: 212, gg: 22}}},
  // gkey: null,
  // h21key: [21,22,23,24],
  // h22key: [21,22,{vm: 1, gm: 2},24],
  // jkey: null,
  // kkey: undefined, /*тоже не хочет в паре работать*/
// };
function diffTypeOfValueMarker(compProps, obj, objID ,typeOfThisLevelData){
  switch (typeOfThisLevelData) {
    case 'arrayType':
      if (objID === 'obj1') {
        compProps.NextLevelKeysObj1='obj1 arrayType';
      } else {
        compProps.NextLevelKeysObj2='obj2 arrayType';
      }      
      break;
    case 'objectType':
      let arrOfObjNames = Object.keys(obj);
      if (objID === 'obj1') {
        compProps.NextLevelKeysObj1='obj1 objectType';
        // console.log('71) obj ', obj);
        // console.log('72) arrOfObjNames ', arrOfObjNames);
         arrOfObjNames.forEach((i,x) => {
          // console.log('73) i', i, '; x ', x)
           compProps[i] = {keyNameDiff : 'y 5 y obj1UnicKey', keyValueDiff: 'y 5 y object1UnicValue'}
        });
      } else {
        compProps.NextLevelKeysObj2='obj2 objectType';
      }      
      break;
    case 'primitiveType':
      if (objID === 'obj1') {
        compProps.NextLevelKeysObj1='obj1 primitiveType';
      } else {
        compProps.NextLevelKeysObj2='obj2 primitiveType';
      }      
      // console.log('87) objID ', objID ,'; compProps ', compProps)
      break;
    case 'undefinedType':
      if (objID === 'obj1') {
        compProps.NextLevelKeysObj1='obj1 undefinedType';
      } else {
        compProps.NextLevelKeysObj2='obj2 undefinedType';
      }      
      break;
    default:alert('ошибка в typeOfThisLevelData', compProps, ' objID ', objID,  ' obj ', obj)
      break;
  }
  // compProps[key] = {keyValueDiff : 'diffTypeOfValue'}
}

function diffObjectMaker2(compProps, key, obj1, obj2) {
  // if (key === 'dkey') {console.log('63) key= ',key, ' compProps= ', compProps, ' obj1= ', obj1, ' obj2= ', obj2 )}
  let type1 = myTypeOf(obj1);
  let type2 =  myTypeOf(obj2);
    // Разные типы
if (type1 !==type2) {
  compProps[key] = {keyNameDiff : 'sameKey', keyValueDiff : 'diffTypeOfValue'}
  diffTypeOfValueMarker(compProps[key], obj1,'obj1', type1)
  diffTypeOfValueMarker(compProps[key], obj2,'obj2', type2)

 if (key === 'sameKeyDiffTypeOfValue') {console.log('112) key= ',key, ' compProps= ', compProps, ' obj1= ', obj1, ' obj2= ', obj2 )}
 
 if ((type1 !=='undefinedType') && (type2==='undefinedType')) {
    compProps[key] = {keyNameDiff : 'x2x', keyValueDiff: 'y2y'}
    if (type1==='primitiveType') {
      compProps[key] = {keyNameDiff : 'x2x obj1UnicKey', keyValueDiff: 'y2y object1UnicValue'}
    }
  }
  if ((type1==='undefinedType') && (type2 !=='undefinedType')) {
    compProps[key] = {keyNameDiff : 'x3x', keyValueDiff: 'y3y'}
    if (type2==='primitiveType') {
      compProps[key] = {keyNameDiff : 'x3x obj2UnicKey', keyValueDiff: 'y3y object2UnicValue'}
    }
  }

} else {
  // Одинаковые типы
  // console.log('129) key= ', key,'; type1= ', type1, '; type2 = ', type2, '; type1 !==type2 ', type1 !==type2);

  if ((type1==='primitiveType') && (type2==='primitiveType')) {
    compProps[key] = {keyNameDiff : 'sameKey', keyValueDiff: obj1===obj2 ? 'sameValue' : 'diffValue'}
  }
 
  if ((type1==='objectType') && (type2 ==='objectType')) {
    if (key==='DiffObject') { compProps[key] = {keyNameDiff : 'rootKeyNoDiff', keyValueDiff: 'ItsAQuestionIsRootkeyValueHasDiff'}}
    compProps[key] = {keyNameDiff : 'sameKey', keyValueDiff: 'Y 4 Y'}
      let arrOfObj1Names = Object.keys(obj1).sort();
      let arrOfObj2Names = Object.keys(obj2).sort();
      let arrSame1D = arrOfObj1Names.filter((num) => arrOfObj1Names.includes(num));
      let arr1Unic1D = arrOfObj1Names.filter((num) => !arrOfObj2Names.includes(num));
      let arr2Unic1D = arrOfObj2Names.filter((num) => !arrOfObj1Names.includes(num));

    arrSame1D.forEach(key1 => {
      diffObjectMaker2(compProps[key], key1, obj1[key1], obj2[key1])
    });
    arr1Unic1D.forEach(key1 => {
      compProps.DiffObject[key1] = {keyNameDiff : 'obj1UnicKey', keyValueDiff: 'object1UnicValue'}
    });
    arr2Unic1D.forEach(key1 => {
      compProps.DiffObject[key1] = {keyNameDiff : 'obj2UnicKey', keyValueDiff: 'object2UnicValue'}
    });
  }
  if ((type1==='arrayType') && (type2 ==='arrayType')) {
     
    let arrMaxLength = Math.max(obj1.length, obj2.length);
    let arrValue =  new Array(arrMaxLength); 

    for (let index = 0; index < arrMaxLength; index++) {
        // diffObjectMaker2(compProps[index], index, obj1[index], obj2[index])
         if (obj1[index] === obj2[index]) {
          arrValue[index] = 'sameValue';
        } else {
          arrValue[index] = 'diffTypeOfValue';
        }
      }
      compProps[key] = {keyNameDiff : 'sameKey', keyValueDiff: arrValue}
      // console.log('168) key ',key, ' compProps[key] ', compProps[key]);
  }
  }
}

diffObjectMaker2(compProps, 'DiffObject', compProps.obj1, compProps.obj2); 

function myTypeOf(obj){
 switch (typeof obj) {
    default:
      return 'primitiveType';
  case "undefined":
    return "undefinedType";
  //------------------------ Object (Null/Array/Object) ----------------------------
  case "object":
    if (obj === null) {
      return 'primitiveType';
    } else {
      if (obj instanceof Array) {
          return  'arrayType';
      } else {
        return  'objectType';
      }
    }
  }
}

function allUnicKeys(compProps) {
  let arr1 = Object.keys(compProps.obj1).sort();
  let arr2 = Object.keys(compProps.obj2).sort();
  let arrSame1D = arr1.filter((num) => arr2.includes(num));
  let arr1Unic1D = arr1.filter((num) => !arr2.includes(num));
  let arr2Unic1D = arr2.filter((num) => !arr1.includes(num));
  compProps.arrSame1D = [...arrSame1D];
  compProps.arr1Unic1D = [...arr1Unic1D];
  compProps.arr2Unic1D = [...arr2Unic1D];;
  
  let allKeysArray1D = [...arrSame1D, ...arr1Unic1D, ...arr2Unic1D];

  let arrSame2D = [];
  let arr1Unic2D = [];
  let arr2Unic2D = [];

  while(arrSame1D.length) arrSame2D.push(arrSame1D.splice(0,1).concat('commonKey'));
  while(arr1Unic1D.length) arr1Unic2D.push(arr1Unic1D.splice(0,1).concat('unic1Key'));
  while(arr2Unic1D.length) arr2Unic2D.push(arr2Unic1D.splice(0,1).concat('unic2Key'));

  let allKeysArray2D = [...arrSame2D, ...arr1Unic2D,...arr2Unic2D];
  compProps.allKeysArray2D = allKeysArray2D;

  return allKeysArray1D;
}

function showValue(objValue,objId, DiffObject){
  
switch (typeof objValue) {
    default:
      return objValue;
  case "boolean":
    return '' + objValue;
  case "undefined":
    return "undefined";
  //------------------------ Object (Null/Array/Object) ----------------------------
  case "object":
    if (objValue === null) {
      return 'null';
    } else {
      if (objValue instanceof Array) {
        let resultArr = objValue.map(function (item, index) {
          
          if (objId !=='diffObj') {/*NOTE если двумя строчками ниже передаю DiffObject вместо compProps, то перестает отображаться */
          return  <tr key={item + '' + index}>
                        <td><span className={SpanClassCheck(objId, compProps)}>{showValue(item,objId)}</span></td>
                      </tr>
          } else {
            return  <tr key={item + '' + index}>
                        <td>{showValue(item,objId)}</td>
                      </tr>
          }
        });
        return <table>
                  <tbody>
                    <tr>
                      <td>"["</td>
                    </tr>               
                      {resultArr} 
                    <tr>
                      <td>"]"</td>
                    </tr>
                  </tbody>
                </table>
      } else {
        if (objId ==='diffObj') {
          console.log('261) objValue= ', objValue, '; DiffObject = ', DiffObject)
          // return 'x'
        }; 
        let resultObj = Object.entries(objValue).map(function ([key, value]) {
          if (key=== 'production'&& objId==='obj1') {console.log('254) value= ', value,' ; DiffObject', DiffObject);}
          if ((objId !=='diffObj')||(DiffObject[key]!== undefined)) {
            return <tr key={key + ':'+ showValue(value)}>
              <td> <span className={SpanClassCheck('key', DiffObject[key])}>{key} : </span></td>
              {/* <td> <span className={SpanClassCheck('key', value)}>{key} : </span></td> */}
              <td> <span className={SpanClassCheck(objId, DiffObject[key])}>{showValue(value,objId)}</span></td>
              </tr>;
          } else {
            return <tr key={key + ':'+ showValue(value)}>
              <td> {key} : </td>
              <td> {showValue(value,objId)}</td>
              </tr>;
          }
        });
        return <table>
        <tbody>
            <tr>
                  <td>&#123;</td>
                  </tr>{resultObj}<tr>
                  <td>&#125;</td>
                  </tr>
                  </tbody>
                </table>
      }
    }
}
}

function SpanClassCheck(objId, DiffObject){
  if (DiffObject === undefined) return "noValue";
  if (objId ===undefined) return "noValue";
  switch (objId) {
    case 'key': 
        if (DiffObject.hasOwnProperty('keyNameDiff')) {
          // console.log('289) DiffObject ', DiffObject);
          // console.log('290) DiffObject.keyNameDiff ', DiffObject.keyNameDiff);
          return DiffObject.keyNameDiff;
        } else {
          return 'abracadabra';
        }
    break;
    case 'obj1':
      switch (DiffObject.keyNameDiff) {
        case 'sameKey': return DiffObject.keyValueDiff; 
        // case 'sameValue': return DiffObject.keyValueDiff; 
        // case 'diffTypeOfValue': return DiffObject.keyValueDiff;
        case 'obj1UnicKey': return DiffObject.keyValueDiff;
        case 'obj2UnicKey': return 'noValue';
        default: {if ((DiffObject.keyNameDiff===undefined) && (DiffObject.keyValueDiff !== undefined)) {
          return DiffObject.keyValueDiff; 
          } else {
            return 'abracadabra'
          }
        };
      } 
    case 'obj2':      
      switch (DiffObject.keyNameDiff) {
        case 'sameKey': return DiffObject.keyValueDiff;
        // case 'sameValue': return DiffObject.keyValueDiff; 
        // case 'diffTypeOfValue': return DiffObject.keyValueDiff;
        case 'obj1UnicKey': return 'delitedValue';
        case 'obj2UnicKey': return DiffObject.keyValueDiff;
        default: {if ((DiffObject.keyNameDiff===undefined) && (DiffObject.keyValueDiff !== undefined)) {
                    return DiffObject.keyValueDiff; 
                    } else {
                      return 'abracadabra'
                    }
                  };
      }
    default:
      return "noValue";
  }
}

function showAllPrimaryKey(compProps){
  let keysArray = allUnicKeys(compProps);
  let vallueObj1 = compProps.obj1;
  let vallueObj2 = compProps.obj2;
  let vallueDiffObj = compProps.DiffObject;
  let resultArr = keysArray.map(function (item) {
    return <tr key = {item}>
      <td><span className={SpanClassCheck('key', vallueDiffObj[item])}>"{item}" :</span></td>
      <td><span className={SpanClassCheck('obj1', vallueDiffObj[item])}>{showValue(vallueObj1[item],'obj1', vallueDiffObj[item])}</span></td>
      <td><span className={SpanClassCheck('obj2', vallueDiffObj[item])}>{showValue(vallueObj2[item], 'obj2', vallueDiffObj[item])}</span></td>
      {/* <td>{showValue(vallueDiffObj[item], 'diffObj',vallueDiffObj[item])}</td> */}
      </tr>;
   });
return  resultArr
}

function createTable2(compProps) {
return (
  <table>
    <thead>
      <tr>
        <td>Ключ</td>
        <td>JSON_1 (old)</td>
        <td>JSON_2 (new)</td>
        <td>Diff</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
        {showAllPrimaryKey(compProps)}  
    </tbody>
  </table>
);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
let table2 = createTable2(compProps);
root.render(table2);