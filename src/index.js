import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

import { uniqKeysFromObjects, DefindMyTypeOf, ShowPrimitive } from './helpers/objects'

let obj1 = require("./JSON for match/data11.json");
let obj2 = require("./JSON for match/data12.json");

let diff_Object1 = {KeyMark:{}, ValueMark:{}};
let diff_Object2 = {KeyMark:{}, ValueMark:{}};

// два объекта признаков раскраски - diffObject 1 и 2 для двух исходных JSON
  // признаки раскраски Ключей первого уровня key_i лежат в diffObject_i.KeyMark = {key_i : key_i_SpanMark, ...}  
  // признаки раскраски Значений для Ключей первого уровня Value(key_i) лежат в diffObject1.ValueMark = {key_i : value_i_SpanMark, ...}  
  // если значение исходного ключа - массив или обьект, то вместо признака расскраски значения лежит однотипный обьект - массив или обьект (с ключами, 
  // аналогичными ключам исходного обьекта)
  // а значениями этого обьекта являются признаки расскраски соотвествующих значений элементов массива или значений обьектов

function ValueMatching(value1, value2, typeOfBothValue) {
  if (typeOfBothValue === "diffType") {
    return "diffValue";
  }
  switch (typeOfBothValue) {
    case "sameType-primitiveType":
      if (value1 === value2) {
        return "sameValue";
      } else {
        return "diffValue";
      }
    case "sameType-arrayType":
      let isSameArrays =
        value1.length === value2.length &&
        value1.every(function (element, index) {
          if (TypeMatching(element, value2[index]) === "diffType") {
            return false;
          } else {
            return (
              ValueMatching(
                element,
                value2[index],
                TypeMatching(element, value2[index])
              ).substring(0, 9) === "sameValue"
            );
          }
        });
      if (isSameArrays) {
        return "sameValue";
      } else {
        return "diffValue";
      }

    case "sameType-objectType":
      let keysArrayObj1 = Object.keys(value1);
      let keysArrayObj2 = Object.keys(value2);

      let isSameObject =
        ValueMatching(keysArrayObj1, keysArrayObj2, "sameType-arrayType") ===
          "sameValue" &&
        keysArrayObj1.every(function (key) {
          // console.log('60) ValueMatching(keysArrayObj1, keysArrayObj2, sameType-arrayType)', (ValueMatching(keysArrayObj1, keysArrayObj2, 'sameType-arrayType')==='sameValue'));
          let elementOfObjectsTypeMatching = TypeMatching(
            value1[key],
            value2[key]
          );
          // console.log('62) elementOfObjectsTypeMatching', elementOfObjectsTypeMatching)
          if (elementOfObjectsTypeMatching.substring(0, 8) === "diffType") {
            return false;
          } else {
            // console.log('66) ValueMatching(value1[key], value2[key], elementOfObjectsTypeMatching)', ValueMatching(value1[key], value2[key], elementOfObjectsTypeMatching).substring(0,9)==='sameValue')
            return (
              ValueMatching(
                value1[key],
                value2[key],
                elementOfObjectsTypeMatching
              ).substring(0, 9) === "sameValue"
            );
          }
        });
      if (isSameObject) {
        return "sameValue";
      } else {
        return "diffValue";
      }
    case "sameType-undefinedType":
      return "sameValue";
    default:
      console.log(
        "179) Ошибка в ValueMatching. value1 = ",
        value1,
        "; value2= ",
        value2,
        "; typeOfBothValue = ",
        typeOfBothValue
      );
      break;
  }
}

function TypeMatching(obj1, obj2) {
  if (DefindMyTypeOf(obj1) === DefindMyTypeOf(obj2)) {
    // return: primitiveType / undefinedType / arrayType / objectType
    switch (DefindMyTypeOf(obj1)) {
      case "primitiveType":
        return "sameType-primitiveType";
      case "arrayType":
        return "sameType-arrayType";
      case "objectType":
        return "sameType-objectType";
      case "undefinedType":
        return "sameType-undefinedType";
      default:
        return "sameType-Error";
    }
  } else {
    // console.log('107) ',obj1, obj2)
    return "diffType";
  }
}
function GetSpanMark(diffObject, item){
  if (diffObject !=undefined) {
    return diffObject
  } else {
    return ('abracadanra')
  }
}

function MainFunction2(obj1, obj2, diffObj1, diffObj2) {
  // запускает ShowAnyType2 для всех первичных ключей
  let keysArray = uniqKeysFromObjects(obj1, obj2);
  let resultArr = keysArray.map(function (item) {
    return (
      <tr key={item}>
        <td>
          <span className={diffObj1.KeyMark[item]}>"{item}" :</span>
        </td>
        <td>
            {ShowAnyType2(obj1[item], diffObj1.ValueMark[item], item)}
        </td>
        <td>
            {ShowAnyType2(obj2[item], diffObj2.ValueMark[item], item)}
        </td>
      </tr>
    );
  });
  return resultArr;
}

function Make2DiffObjects(obj1, obj2, diff_Object1, diff_Object2){
  // diff_Object1.ValueMark;
  // diff_Object2.ValueMark;
  // diffObject= []  diffObject= {KeyMark:{}, ValueMark:{}}
  let resultArray = [];
  // console.log('701 obj1= ', obj1,'; obj2= ',obj2,'; diff_Object1=,',diff_Object1,' ; diff_Object2= ', diff_Object2)
  
    let type1 = DefindMyTypeOf(obj1);
    let type2 = DefindMyTypeOf(obj2);
    let KeySpanMark;
    let ValueSpanMark;
    // console.log('714) type1 =', type1 ,'; type2= ',  type2)
    if (type1 === type2) {
      // не уверен что оптимально выбираю места для ухода в рекурсию
      switch (type1) {
        case "primitiveType":
          let TypeMatchingResult = 'sameType-primitiveType';
          let ValueMatchingResult = ValueMatching(obj1, obj2, TypeMatchingResult);
          // console.log('544) TypeMatchingResult', TypeMatchingResult)
          let spanMarkJeneral = TypeMatchingResult +"-" + ValueMatchingResult;
        //   // diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
          diff_Object1 =  spanMarkJeneral +'-obj1'
        //   // diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
          diff_Object2 =  spanMarkJeneral +'-obj2'
          break;
        case "undefinedType":
          console.log('677) case "undefinedType":')
          break;
        case "arrayType":
          // console.log('732 obj1= ', obj1,'; obj2= ',obj2,'; diff_Object1=,',diff_Object1,' ; diff_Object2= ', diff_Object2)
          diff_Object1.ValueMark=[];
          diff_Object2.ValueMark=[];
            let Obj1Length= obj1.length
            let Obj2Length= obj2.length
            let MinLength = Math.min(Obj1Length, Obj2Length)
            let MaxLength = Math.max(Obj1Length, Obj2Length)
  
            for (let index=0; index<MinLength; index++) {
              let TypeMatchingResult = TypeMatching(obj1[index], obj2[index]);
              let ValueMatchingResult = ValueMatching(obj1[index], obj2[index], TypeMatchingResult);
              // console.log('691) TypeMatchingResult', TypeMatchingResult)
              let spanMarkJeneral = TypeMatchingResult +"-" + ValueMatchingResult;
              if (TypeMatchingResult.substring(0, 8) === "sameType") {
                // diff_Object1, diff_Object2
                if (ValueMatchingResult.substring(0, 9) === "sameValue") {
                  diff_Object1.ValueMark[index] =  CreateMarkBelow2(obj1[index], '-obj1', diff_Object1.ValueMark[index], spanMarkJeneral)      
                  diff_Object2.ValueMark[index] =  CreateMarkBelow2(obj2[index], '-obj2', diff_Object2.ValueMark[index], spanMarkJeneral)      
                } else {
                  // console.log('701) spanMarkJeneral', spanMarkJeneral)
                  // console.log('702) index= ', index ,'; obj1[index] = ', obj1[index],'; obj2[index] = ', obj2[index])
                  diff_Object1.ValueMark[index]=[]
                  diff_Object2.ValueMark[index]=[]
                  // QUESTION почему надо diff_Object(i).ValueMark[index]=[] тут и в 683-684 строках объявить?
                  // diff_Object1.ValueMark[index] =  CreateMarkBelow2(obj1[index], '-obj1', diff_Object1.ValueMark[index], spanMarkJeneral)      
                  // diff_Object2.ValueMark[index] =  CreateMarkBelow2(obj2[index], '-obj2', diff_Object2.ValueMark[index], spanMarkJeneral)      
                  let transfArray = Make2DiffObjects(obj1[index], obj2[index], diff_Object1.ValueMark[index],diff_Object2.ValueMark[index] )
                  diff_Object1.ValueMark[index] = transfArray[0]
                  diff_Object2.ValueMark[index] = transfArray[1]
                  // console.log('761) transfArray= ', transfArray)
                  // console.log('762) diff_Object1.ValueMark= ', diff_Object1.ValueMark ,'; diff_Object2.ValueMark = ', diff_Object2.ValueMark)
                }
                // непонятно зачем этот блок ниже  нужен?
                // diff_Object1.ValueMark[index]={ValueMark:[]};
                // diff_Object2.ValueMark[index]={ValueMark:[]};
                // let transfArray = Make2DiffObjects(obj1[index], obj2[index], diff_Object1.ValueMark[index],diff_Object2.ValueMark[index] )
                // console.log('769) transfArray= ', transfArray)
                // diff_Object1.ValueMark[index] = transfArray[0]
                // diff_Object2.ValueMark[index] = transfArray[1]
              } else {
                // TODO #2 = сделано! тут вариант если типы разные => (Diff Type) + и без вариантов Diff Value  
                KeySpanMark = 'diffType'
                ValueSpanMark = 'diffValue'
                diff_Object1.ValueMark[index] =  CreateMarkBelow2(obj1[index], '-obj1', diff_Object1.ValueMark[index], KeySpanMark+'-'+ValueSpanMark)      
                diff_Object2.ValueMark[index] =  CreateMarkBelow2(obj2[index], '-obj2', diff_Object2.ValueMark[index], KeySpanMark+'-'+ValueSpanMark)      
              }
          } 
  
          for (let index=MinLength; index<MaxLength; index++) {
            // TODO #3 = сделано! надо проверить корректность реализации: тут вариант для уникальных индексов массива (превышающих длинну другого массива) unicValue. 
            if (Obj1Length===MaxLength) {
              ValueSpanMark = 'obj1UnicKey'
              diff_Object1.ValueMark[index] = CreateMarkBelow2(obj1[index], '-obj1', diff_Object1.ValueMark[index], ValueSpanMark)
            } else {
              ValueSpanMark = 'obj2UnicKey'
              diff_Object2.ValueMark[index] = CreateMarkBelow2(obj2[index], '-obj2', diff_Object2.ValueMark[index], ValueSpanMark)
            }
          }
          break;
        case "objectType":{
          diff_Object1 = {KeyMark:{}, ValueMark:{}};
          diff_Object2 = {KeyMark:{}, ValueMark:{}};
          let arr1 = Object.keys(obj1).sort();
          let arr2 = Object.keys(obj2).sort();
  
          let arrSame = arr1.filter((num) => arr2.includes(num));
          let arr1Unic = arr1.filter((num) => !arr2.includes(num));
          let arr2Unic = arr2.filter((num) => !arr1.includes(num));
        
          let keysArray = uniqKeysFromObjects(obj1, obj2);
          keysArray.map(function (item) {
            if (arrSame.includes(item)) {
              let TypeMatchingResult = TypeMatching(obj1[item], obj2[item]);
              // console.log('577) ', TypeMatchingResult)
              let spanMarkJeneral =
                TypeMatchingResult +
                "-" +
                ValueMatching(obj1[item], obj2[item], TypeMatchingResult);
                // console.log('810) obj1[item]= ',obj1[item],'; obj2[item]= ', obj2[item])
                // console.log(spanMarkJeneral)
                if (TypeMatchingResult.substring(0, 8) === "sameType"){
                  // console.log('585) ', TypeMatchingResult)
                  diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
                  diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
                  let transfArray;
                  switch (TypeMatchingResult) {
                    case 'sameType-objectType':
                      diff_Object1.ValueMark[item] = {ValueMark:{}};
                      diff_Object2.ValueMark[item] = {ValueMark:{}};
                      transfArray = Make2DiffObjects (obj1[item], obj2[item], diff_Object1.ValueMark[item], diff_Object2.ValueMark[item])
                      // console.log('821) transfArray= ', transfArray)
                      diff_Object1.ValueMark[item] = transfArray[0];
                      diff_Object2.ValueMark[item] = transfArray[1];
                      break;
                    case 'sameType-arrayType':
                      diff_Object1.ValueMark[item] = [];
                      diff_Object2.ValueMark[item] = [];
                      transfArray = Make2DiffObjects (obj1[item], obj2[item], diff_Object1.ValueMark[item], diff_Object2.ValueMark[item])
                      transfArray = Make2DiffObjects (obj1[item], obj2[item], diff_Object1.ValueMark[item], diff_Object2.ValueMark[item])
                      // console.log('829) transfArray= ', transfArray)
                      diff_Object1.ValueMark[item] = transfArray[0].ValueMark;
                      diff_Object2.ValueMark[item] = transfArray[1].ValueMark;
                      break;
                      default:
                        diff_Object1.ValueMark[item]=spanMarkJeneral+'-obj1'
                        diff_Object2.ValueMark[item]=spanMarkJeneral+'-obj2'
                      break;
                  }
                } else {
                  // блок разметки ключей в случае разных типов значений у одного ключа. 
                  KeySpanMark = 'diffType'
                  ValueSpanMark = 'diffValue'
                  // console.log('612) KeySpanMark = diffType; item=', item, 'obj1[item]= ',obj1[item],'; obj2=',obj2[item])
                  diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
                  diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
                  
                  diff_Object1.ValueMark[item] =  CreateMarkBelow2(obj1[item], '-obj1', diff_Object1.ValueMark[item], KeySpanMark+'-'+ValueSpanMark)      
                  diff_Object2.ValueMark[item] =  CreateMarkBelow2(obj2[item], '-obj2', diff_Object2.ValueMark[item], KeySpanMark+'-'+ValueSpanMark)      
                }
            }
            //Ниже идут два блока разметки уникальных ключей. 
            if (arr1Unic.includes(item)) {
              diff_Object1.KeyMark[item] =   'obj1UnicKey' + '-key1'
              diff_Object1.ValueMark[item] =  CreateMarkBelow2(obj1[item], '-obj1', diff_Object1.ValueMark[item], 'obj1UnicKey')
              diff_Object2.KeyMark[item] =   'obj1UnicKey' + '-key2'
              diff_Object2.ValueMark[item] =  CreateMarkBelow2(obj2[item], '-obj2', diff_Object2.ValueMark[item], 'obj1UnicKey')
            }
            if (arr2Unic.includes(item)) {
              diff_Object1.KeyMark[item] =   'obj2UnicKey' + '-key1'
              diff_Object1.ValueMark[item] =  CreateMarkBelow2(obj1[item], '-obj1', diff_Object1.ValueMark[item], 'obj2UnicKey')
              diff_Object2.KeyMark[item] =   'obj2UnicKey' + '-key2'
              diff_Object2.ValueMark[item] =  CreateMarkBelow2(obj2[item], '-obj2', diff_Object2.ValueMark[item], 'obj2UnicKey')
            }
          })
        }  
          break;
        default: 
          console.log('635) Ошибка в Make2DiffObjects. obj1 = ', obj1 ,'; obj2 = ', obj2)
          console.log('634) Ошибка в Make2DiffObjects. type1= ', type1 , '; type2 = ', type2)
          break;
      }
    } else {
      // возможно этот блок не нужен т.к. разные типы обрабатываюся внутри case "arrayType" (стр 521) и case "objectType" (стр 564)
      // ??? TODO #4 = сделано! надо проверить корректность реализации: тут вариант если типы разные => (Diff Type) + и без вариантов Diff Value
      // TODO - надо попробовать закомментить этот блок на сложном обьекте
      // KeySpanMark = 'diffType'
      // ValueSpanMark = 'diffValue'
      console.log('653) Непредвиденная обработка разных типов в Make2DiffObjects')
      // diff_Object1.ValueMark = CreateMarkBelow(obj1, diff_Object1.ValueMark, KeySpanMark, ValueSpanMark)
      // diff_Object2.ValueMark = CreateMarkBelow(obj2, diff_Object2.ValueMark, KeySpanMark, ValueSpanMark)      
  }

resultArray[0]=diff_Object1;
resultArray[1]=diff_Object2;
return (resultArray)
}

function CreateMarkBelow2(obj, objName, diffObject, SpanMark){
  // в diffObject получаем diffObject.ValueMark для разметки одинаковой меткой всего дерева ниже
  //  SpanMark = 'diffType' или "obj(i)UnicKey"
  // в objName - метка "-obj1" / "-obj2"
  let type = DefindMyTypeOf(obj);
  // console.log(type);
  switch (type) {
    // case ("primitiveType" || "undefinedType"):   
    //   console.log("primitiveType || undefinedType"); 
    //   diffObject = SpanMark + objName;
    //   break;
    case "primitiveType":   
      // console.log("primitiveType"); 
      diffObject = SpanMark + objName;
      break;
    case "undefinedType":
      // console.log("undefinedType"); 
      diffObject = SpanMark + objName;
      break;
    case "arrayType":
      diffObject= []
      // console.log('664) Массив', obj)
      obj.forEach(function (value, index) {
        // console.log('667) index= ', index, '; obj[index]=', obj[index])
        diffObject[index] = CreateMarkBelow2(value, objName, diffObject, SpanMark)
      })
      break;
    case "objectType":
      // console.log('670) Объект', obj)
      diffObject= {KeyMark:{}, ValueMark:{}}
      Object.entries(obj).forEach(function([key, value]) {
        diffObject.KeyMark[key] = SpanMark +'-key'
        diffObject.ValueMark[key] = CreateMarkBelow2(value, objName, diffObject, SpanMark)
      })

      break;
    default: console.log('678) Ошибка в CreateMarkBelow2. obj= ', obj)
    break;
  }
  return diffObject;
}

function ShowAnyType2(obj, DiffObject, item) {
  let type = DefindMyTypeOf(obj);
  switch (type) {
    case "primitiveType":
      return (
        <span className={DiffObject}>
          {ShowPrimitive(obj)}
        </span>
      )
    case "undefinedType":  
      if (obj === undefined) {
        return (
          <span className={DiffObject}>
            нет ключа
          </span>
          );
      } else {
        console.log('950) Error - функц ShowAnyType2. type= ',type,'; obj= ',obj);
      }
    case "arrayType":
      return ShowArray2(obj, DiffObject, item);
    case "objectType":
      return ShowObject2(obj, DiffObject, item);
    default:
      return ShowPrimitive(obj);
  }
}

function getSpan(cb, item, DiffObject, index) {
  return (
    <span className={DiffObject[index]}>{cb(item)}</span>
  )
}

function getTableRow(cb, item, type, DiffObject, index) {
  let dataContent;
  if(type === 'undefinedType' || type === 'primitiveType') {
    dataContent = getSpan(cb, item, DiffObject, index);
  } else {
    dataContent = cb(item);
  }
  return (
    <tr key={"key_" + index}>
      <td>
        {dataContent}
      </td>
    </tr>
  );
}

function ShowArray2(arr, DiffObject, item) {
        // console.log('1062) arr = ',arr ,'; DiffObject= ', DiffObject)
  let resultArr = arr.map(function (item, index) {
    switch (DefindMyTypeOf(item)) {
      case "primitiveType":
       
        return getTableRow(ShowAnyType2, item, "primitiveType", DiffObject, index);
      case "undefinedType":

        return getTableRow(ShowPrimitive, item, "undefinedType");
      case "arrayType":

        return getTableRow(ShowAnyType2, item, "arrayType");
      case "objectType":

        return getTableRow(ShowAnyType2, item, "objectType");
      default:
        return (
          <tr key={"key_" + index}>
            <td>
                {"Ошибка функт. ShowArray2 стр. 1072"}
            </td>
          </tr>
        );
    }
  });

  return (
    <table>
      <tbody>
        <tr>
          <td>&#91;</td>
        </tr>
        {resultArr}
        <tr>
          <td>&#93;</td>
        </tr>
      </tbody>
    </table>
  );
}

function ShowObject2(obj, DiffObject, item) {
  let keysArray = Object.keys(obj);
  let resultArr = keysArray.map(function (item) {
    switch (DefindMyTypeOf(obj[item])) {
      case "primitiveType":
        return (
          <tr key={"key_" + item}>
            <td>
            <span className={DiffObject.KeyMark[item]}>
                "{item}" : 
              </span>
              </td>
            <td>
              <span className={DiffObject.ValueMark[item]}>{ShowPrimitive(obj[item])}</span>
            </td>
          </tr>
        );
      case "undefinedType":
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={DiffObject.KeyMark[item]}>
                "{item}" : 
              </span>
            </td>
            <td>
              <span className={DiffObject.ValueMark[item]}>{ShowPrimitive(obj[item])}</span>
            </td>
          </tr>
        );
      case "arrayType":
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={DiffObject.KeyMark[item]}>
                "{item}" : 
              </span>
              </td>
            <td>
              <span className={GetSpanMark(DiffObject.ValueMark, item)}>
                {ShowAnyType2(obj[item], DiffObject.ValueMark[item])}
              </span>
            </td>
          </tr>
        );
      case "objectType":
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={DiffObject.KeyMark[item]}>
                "{item}" :
              </span>
            </td>
            <td>
                {ShowAnyType2(obj[item], DiffObject.ValueMark[item])}
            </td>
          </tr>
        );
      default:
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={'abracadabra'}>
                {"Ошибка функц. ShowArray стр. 1069"}
              </span>
            </td>
          </tr>
        );
    }
  });
  return (
    <table>
      <tbody>
        <tr>
          <td>&#123;</td>
        </tr>
        {resultArr}
        <tr>
          <td>&#125;</td>
        </tr>
      </tbody>
    </table>
  );
}

function createTable3(obj1, obj2,diffObj1,diffObj2) {
  return (
    <table>
      <thead>
        <tr>
          <td>Ключ</td>
          <td>JSON_1 (old)</td>
          <td>JSON_2 (new)</td>
        </tr>
      </thead>
      <tbody>{MainFunction2(obj1, obj2,diffObj1,diffObj2)}</tbody>
    </table>
  );
}

[diff_Object1, diff_Object2] = Make2DiffObjects(obj1, obj2, diff_Object1, diff_Object2)

const root = ReactDOM.createRoot(document.getElementById("root"));
let table = createTable3(obj1, obj2, diff_Object1, diff_Object2);
root.render(table);