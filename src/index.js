import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { config } from './config'; 
import { uniqKeysFromObjects, DefindMyTypeOf } from "./helpers/objects";

let obj1 = require("./JSON for match/data1.json");
let obj2 = require("./JSON for match/data2.json");

let diff_Object1 = { KeyMark: {}, ValueMark: {} };
let diff_Object2 = { KeyMark: {}, ValueMark: {} };

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
              ValueMatching(element, value2[index], TypeMatching(element, value2[index])).substring(0, 9) ===
              "sameValue"
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
        ValueMatching(keysArrayObj1, keysArrayObj2, "sameType-arrayType") === "sameValue" &&
        keysArrayObj1.every(function (key) {
          let elementOfObjectsTypeMatching = TypeMatching(value1[key], value2[key]);
          if (elementOfObjectsTypeMatching.substring(0, 8) === "diffType") {
            return false;
          } else {
            return (
              ValueMatching(value1[key], value2[key], elementOfObjectsTypeMatching).substring(0, 9) === "sameValue"
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
    return "diffType";
  }
}
function GetSpanMark(diffObject, item) {
  if (diffObject !== undefined) {
    return diffObject;
  } else {
    return "abracadanra";
  }
}

function RootKeys({obj1, obj2, diffObj1, diffObj2}) {
  // запускает ShowAnyType2 для всех первичных ключей
  const keysArray = uniqKeysFromObjects(obj1, obj2);
  return keysArray.map(item => (
      <tr key={item}>
        <td>
          <span className={diffObj1.KeyMark[item]}>{item}</span>
        </td>
        <td>{ShowAnyType2(obj1[item], diffObj1.ValueMark[item], item)}</td>
        <td>{ShowAnyType2(obj2[item], diffObj2.ValueMark[item], item)}</td>
        {config.debug &&
          <>
            <td>
              {item} : {ShowAnyType2(diffObj1.KeyMark[item])} <br></br> <br></br>"Value: "
              {ShowAnyType(diffObj1.ValueMark[item])}
            </td>
            <td>
              {item} : {ShowAnyType2(diffObj2.KeyMark[item])} <br></br> <br></br>"Value: "
              {ShowAnyType(diffObj2.ValueMark[item])}
            </td>
          </>
        }
      </tr>
  ));
}

function Make2DiffObjects(obj1, obj2, diff_Object1, diff_Object2) {
  let resultArray = [];

  let type1 = DefindMyTypeOf(obj1);
  let type2 = DefindMyTypeOf(obj2);
  let KeySpanMark;
  let ValueSpanMark;
  if (type1 === type2) {
    // не уверен что оптимально выбираю места для ухода в рекурсию
    switch (type1) {
      case "primitiveType":
        let TypeMatchingResult = "sameType-primitiveType";
        let ValueMatchingResult = ValueMatching(obj1, obj2, TypeMatchingResult);
        let spanMarkJeneral = TypeMatchingResult + "-" + ValueMatchingResult;
        diff_Object1 = spanMarkJeneral + "-obj1";
        diff_Object2 = spanMarkJeneral + "-obj2";
        break;
      case "undefinedType":
        console.log('677) case "undefinedType":');
        break;
      case "arrayType":
        diff_Object1.ValueMark = [];
        diff_Object2.ValueMark = [];
        let Obj1Length = obj1.length;
        let Obj2Length = obj2.length;
        let MinLength = Math.min(Obj1Length, Obj2Length);
        let MaxLength = Math.max(Obj1Length, Obj2Length);

        for (let index = 0; index < MinLength; index++) {
          let TypeMatchingResult = TypeMatching(obj1[index], obj2[index]);
          let ValueMatchingResult = ValueMatching(obj1[index], obj2[index], TypeMatchingResult);
          let spanMarkJeneral = TypeMatchingResult + "-" + ValueMatchingResult;
          if (TypeMatchingResult.substring(0, 8) === "sameType") {
            if (ValueMatchingResult.substring(0, 9) === "sameValue") {
              diff_Object1.ValueMark[index] = CreateMarkBelow2(
                obj1[index],
                "-obj1",
                diff_Object1.ValueMark[index],
                spanMarkJeneral
              );
              diff_Object2.ValueMark[index] = CreateMarkBelow2(
                obj2[index],
                "-obj2",
                diff_Object2.ValueMark[index],
                spanMarkJeneral
              );
            } else {
              diff_Object1.ValueMark[index] = [];
              diff_Object2.ValueMark[index] = [];
              // QUESTION почему надо diff_Object(i).ValueMark[index]=[] тут и в 683-684 строках объявить?
              let transfArray = Make2DiffObjects(
                obj1[index],
                obj2[index],
                diff_Object1.ValueMark[index],
                diff_Object2.ValueMark[index]
              );
              diff_Object1.ValueMark[index] = transfArray[0];
              diff_Object2.ValueMark[index] = transfArray[1];
            }
          } else {
            // TODO #2 = сделано! тут вариант если типы разные => (Diff Type) + и без вариантов Diff Value
            KeySpanMark = "diffType";
            ValueSpanMark = "diffValue";
            diff_Object1.ValueMark[index] = CreateMarkBelow2(
              obj1[index],
              "-obj1",
              diff_Object1.ValueMark[index],
              KeySpanMark + "-" + ValueSpanMark
            );
            diff_Object2.ValueMark[index] = CreateMarkBelow2(
              obj2[index],
              "-obj2",
              diff_Object2.ValueMark[index],
              KeySpanMark + "-" + ValueSpanMark
            );
          }
        }

        for (let index = MinLength; index < MaxLength; index++) {
          // TODO #3 = сделано! надо проверить корректность реализации: тут вариант для уникальных индексов массива (превышающих длинну другого массива) unicValue.
          if (Obj1Length === MaxLength) {
            ValueSpanMark = "obj1UnicKey";
            diff_Object1.ValueMark[index] = CreateMarkBelow2(
              obj1[index],
              "-obj1",
              diff_Object1.ValueMark[index],
              ValueSpanMark
            );
          } else {
            ValueSpanMark = "obj2UnicKey";
            diff_Object2.ValueMark[index] = CreateMarkBelow2(
              obj2[index],
              "-obj2",
              diff_Object2.ValueMark[index],
              ValueSpanMark
            );
          }
        }
        break;
      case "objectType":
        {
          diff_Object1 = { KeyMark: {}, ValueMark: {} };
          diff_Object2 = { KeyMark: {}, ValueMark: {} };
          let arr1 = Object.keys(obj1).sort();
          let arr2 = Object.keys(obj2).sort();

          let arrSame = arr1.filter((num) => arr2.includes(num));
          let arr1Unic = arr1.filter((num) => !arr2.includes(num));
          let arr2Unic = arr2.filter((num) => !arr1.includes(num));

          let keysArray = uniqKeysFromObjects(obj1, obj2);
          keysArray.map(function (item) {
            if (arrSame.includes(item)) {
              let TypeMatchingResult = TypeMatching(obj1[item], obj2[item]);
              let spanMarkJeneral =
                TypeMatchingResult + "-" + ValueMatching(obj1[item], obj2[item], TypeMatchingResult);
              if (TypeMatchingResult.substring(0, 8) === "sameType") {
                diff_Object1.KeyMark[item] = spanMarkJeneral + "-key";
                diff_Object2.KeyMark[item] = spanMarkJeneral + "-key";
                let transfArray;
                switch (TypeMatchingResult) {
                  case "sameType-objectType":
                    diff_Object1.ValueMark[item] = { ValueMark: {} };
                    diff_Object2.ValueMark[item] = { ValueMark: {} };
                    transfArray = Make2DiffObjects(
                      obj1[item],
                      obj2[item],
                      diff_Object1.ValueMark[item],
                      diff_Object2.ValueMark[item]
                    );
                    diff_Object1.ValueMark[item] = transfArray[0];
                    diff_Object2.ValueMark[item] = transfArray[1];
                    break;
                  case "sameType-arrayType":
                    diff_Object1.ValueMark[item] = [];
                    diff_Object2.ValueMark[item] = [];
                    transfArray = Make2DiffObjects(
                      obj1[item],
                      obj2[item],
                      diff_Object1.ValueMark[item],
                      diff_Object2.ValueMark[item]
                    );
                    transfArray = Make2DiffObjects(
                      obj1[item],
                      obj2[item],
                      diff_Object1.ValueMark[item],
                      diff_Object2.ValueMark[item]
                    );
                    diff_Object1.ValueMark[item] = transfArray[0].ValueMark;
                    diff_Object2.ValueMark[item] = transfArray[1].ValueMark;
                    break;
                  default:
                    diff_Object1.ValueMark[item] = spanMarkJeneral + "-obj1";
                    diff_Object2.ValueMark[item] = spanMarkJeneral + "-obj2";
                    break;
                }
              } else {
                // блок разметки ключей в случае разных типов значений у одного ключа.
                KeySpanMark = "diffType";
                ValueSpanMark = "diffValue";
                diff_Object1.KeyMark[item] = spanMarkJeneral + "-key";
                diff_Object2.KeyMark[item] = spanMarkJeneral + "-key";

                diff_Object1.ValueMark[item] = CreateMarkBelow2(
                  obj1[item],
                  "-obj1",
                  diff_Object1.ValueMark[item],
                  KeySpanMark + "-" + ValueSpanMark
                );
                diff_Object2.ValueMark[item] = CreateMarkBelow2(
                  obj2[item],
                  "-obj2",
                  diff_Object2.ValueMark[item],
                  KeySpanMark + "-" + ValueSpanMark
                );
              }
            }
            //Ниже идут два блока разметки уникальных ключей.
            if (arr1Unic.includes(item)) {
              diff_Object1.KeyMark[item] = "obj1UnicKey" + "-key1";
              diff_Object1.ValueMark[item] = CreateMarkBelow2(
                obj1[item],
                "-obj1",
                diff_Object1.ValueMark[item],
                "obj1UnicKey"
              );
              diff_Object2.KeyMark[item] = "obj1UnicKey" + "-key2";
              diff_Object2.ValueMark[item] = CreateMarkBelow2(
                obj2[item],
                "-obj2",
                diff_Object2.ValueMark[item],
                "obj1UnicKey"
              );
            }
            if (arr2Unic.includes(item)) {
              diff_Object1.KeyMark[item] = "obj2UnicKey" + "-key1";
              diff_Object1.ValueMark[item] = CreateMarkBelow2(
                obj1[item],
                "-obj1",
                diff_Object1.ValueMark[item],
                "obj2UnicKey"
              );
              diff_Object2.KeyMark[item] = "obj2UnicKey" + "-key2";
              diff_Object2.ValueMark[item] = CreateMarkBelow2(
                obj2[item],
                "-obj2",
                diff_Object2.ValueMark[item],
                "obj2UnicKey"
              );
            }
          });
        }
        break;
      default:
        console.log("635) Ошибка в Make2DiffObjects. obj1 = ", obj1, "; obj2 = ", obj2);
        console.log("634) Ошибка в Make2DiffObjects. type1= ", type1, "; type2 = ", type2);
        break;
    }
  } else {
    // возможно этот блок не нужен т.к. разные типы обрабатываюся внутри case "arrayType" (стр 521) и case "objectType" (стр 564)
    // ??? TODO #4 = сделано! надо проверить корректность реализации: тут вариант если типы разные => (Diff Type) + и без вариантов Diff Value
    // TODO - надо попробовать закомментить этот блок на сложном обьекте
    // KeySpanMark = 'diffType'
    // ValueSpanMark = 'diffValue'
    console.log("653) Непредвиденная обработка разных типов в Make2DiffObjects");
  }

  resultArray[0] = diff_Object1;
  resultArray[1] = diff_Object2;
  return resultArray;
}

function CreateMarkBelow2(obj, objName, diffObject, SpanMark) {
  // в diffObject получаем diffObject.ValueMark для разметки одинаковой меткой всего дерева ниже
  //  SpanMark = 'diffType' или "obj(i)UnicKey"
  // в objName - метка "-obj1" / "-obj2"
  let type = DefindMyTypeOf(obj);
  switch (type) {
    case "primitiveType":
      diffObject = SpanMark + objName;
      break;
    case "undefinedType":
      diffObject = SpanMark + objName;
      break;
    case "arrayType":
      diffObject = [];
      obj.forEach(function (value, index) {
        diffObject[index] = CreateMarkBelow2(value, objName, diffObject, SpanMark);
      });
      break;
    case "objectType":
      diffObject = { KeyMark: {}, ValueMark: {} };
      Object.entries(obj).forEach(function ([key, value]) {
        diffObject.KeyMark[key] = SpanMark + "-key";
        diffObject.ValueMark[key] = CreateMarkBelow2(value, objName, diffObject, SpanMark);
      });

      break;
    default:
      console.log("678) Ошибка в CreateMarkBelow2. obj= ", obj);
      break;
  }
  return diffObject;
}

function ShowAnyType(obj, spanMarkLocal) {
  let type = DefindMyTypeOf(obj);
  switch (type) {
    case "primitiveType":
      if (type === undefined) {
        return "undef xxx";
      } else {
        return String(obj);
      }
    case "arrayType":
      return ShowArray(obj, spanMarkLocal);
    case "objectType":
      return ShowObject(obj, spanMarkLocal);
    default:
      return String(obj);
  }
}
function ShowAnyType2(obj, DiffObject, item) {
  if( Array.isArray(obj) ) {
    return ShowArray2(obj, DiffObject, item);
  }
  if( typeof obj === 'object' && obj !== null) {
    return ShowObject2(obj, DiffObject, item);
  }
  return <span className={DiffObject}>{String(obj)}</span>;
}

function ShowArray(arr, spanMarkLocal) {
  console.log();
  let resultArr = arr.map(function (item, index) {
    switch (DefindMyTypeOf(item)) {
      case "primitiveType":
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>{ShowAnyType(item)}</span>
            </td>
          </tr>
        );
      case "undefinedType":
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>{String(item)}</span>
            </td>
          </tr>
        );
      case "arrayType":
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>{ShowAnyType(item, spanMarkLocal)}</span>
            </td>
          </tr>
        );
      case "objectType":
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>{ShowAnyType(item, spanMarkLocal)}</span>
            </td>
          </tr>
        );
      default:
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>{"Ошибка функт. ShowArray стр. 311"}</span>
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

function getSpan(cb, item, DiffObject, index) {
  return <span className={DiffObject[index]}>{cb(item)}</span>;
}

function getTableRow(cb, item, type, DiffObject, index) {
  console.log("tr get:" + type);
  let dataContent;
  if (type === "undefinedType" || type === "primitiveType") {
    dataContent = getSpan(cb, item, DiffObject, index);
  } else {
    dataContent = cb(item);
  }

  return (
    <tr key={"key_" + index}>
      <td>{dataContent}</td>
    </tr>
  );
}

function ShowArray2(arr, DiffObject) {
  return (
    <table>
      <tbody>
        <tr>
          <td>&#91;</td>
        </tr>
        {arr.map((item, index) => {
          if( Array.isArray(item) ) {
            return ShowAnyType2(item, DiffObject)
          }
          if( typeof item === 'object' && item !== null ) {
            return ShowAnyType2(item, DiffObject)
          }
          return <span className={DiffObject[index]}>{ShowAnyType2(item, DiffObject)}</span>
        }).map((content, index) => (
            <tr key={index}>
              <td>{content}</td>
            </tr>
        ))}
        <tr>
          <td>&#93;</td>
        </tr>
      </tbody>
    </table>
  );
}

function ShowObject(obj, spanMarkLocal) {
  let keysArray = Object.keys(obj);
  let resultArr = keysArray.map(function (item) {
    switch (DefindMyTypeOf(obj[item])) {
      case "primitiveType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" : </td>
            <td>
              <span className={spanMarkLocal}>{String(obj[item])}</span>
            </td>
          </tr>
        );
      case "undefinedType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" : </td>
            <td>
              <span className={spanMarkLocal}>{String(obj[item])}</span>
            </td>
          </tr>
        );
      case "arrayType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" : </td>
            <td>
              <span className={spanMarkLocal}>{ShowAnyType(obj[item], spanMarkLocal)}</span>
            </td>
          </tr>
        );
      case "objectType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" :</td>
            <td>
              <span className={spanMarkLocal}>{ShowAnyType(obj[item], spanMarkLocal)}</span>
            </td>
          </tr>
        );
      default:
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={spanMarkLocal}>{"Ошибка функц. ShowArray стр. 1069"}</span>
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

function ShowObject2(obj, DiffObject, item) {
  let keysArray = Object.keys(obj);
  let resultArr = keysArray.map(function (item) {
    switch (DefindMyTypeOf(obj[item])) {
      case "primitiveType":
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={DiffObject.KeyMark[item]}>"{item}" :</span>
            </td>
            <td>
              <span className={DiffObject.ValueMark[item]}>{String(obj[item])}</span>
            </td>
          </tr>
        );
      case "undefinedType":
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={DiffObject.KeyMark[item]}>"{item}" :</span>
            </td>
            <td>
              <span className={DiffObject.ValueMark[item]}>{String(obj[item])}</span>
            </td>
          </tr>
        );
      case "arrayType":
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={DiffObject.KeyMark[item]}>"{item}" :</span>
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
              <span className={DiffObject.KeyMark[item]}>"{item}" :</span>
            </td>
            <td>{ShowAnyType2(obj[item], DiffObject.ValueMark[item])}</td>
          </tr>
        );
      default:
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={"abracadabra"}>{"Ошибка функц. ShowArray стр. 1069"}</span>
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

function CreateTable({obj1, obj2, diffObj1, diffObj2}) {
  return (
    <table>
      <thead>
        <tr>
          <td>Ключ</td>
          <td>JSON_1 (old)</td>
          <td>JSON_2 (new)</td>
          {config.debug &&
            <>
              <td>Diff-Object1</td>
              <td>Diff-Object2</td>
            </>
          }
        </tr>
      </thead>
      <tbody>
        <RootKeys obj1={obj1} obj2={obj2} diffObj1={diffObj1} diffObj2={diffObj2} />
      </tbody>
    </table>
  );
}

let transfArray;
transfArray = Make2DiffObjects(obj1, obj2, diff_Object1, diff_Object2);
diff_Object1 = transfArray[0];
diff_Object2 = transfArray[1];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CreateTable obj1={obj1} obj2={obj2} diffObj1={diff_Object1} diffObj2={diff_Object2} />);
