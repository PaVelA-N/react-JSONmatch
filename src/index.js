import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// let obj1 = require("./JSON for match/data1.json");
// let obj2 = require("./JSON for match/data2.json");

let obj1 = {
  // SameKeySameValue: "sameValue",
  // sameKeyDiffValue: "DiffValue1",
  // sameKeyDiffTypeOfValue: {ab:"Diff_Type_Of_Value"},
  // bkey: true,
  // c1key: {
  //        a: { x: 1, y: 3 },
  //        b: null,
  //        c: [ "8", 7, [ 9, 0 ] ],
  //        d: [ "8", 7, { x1: 2, y1: 5 }, 'a'],
  //        e: [ "8", null, [ 9, 0 ] ],
  //      },
  // dkey: ["d2","d23"],
  d11key: ["d11", 112, [12,13]],
  // d2key: ["d11", "d111", 112,23456, true, null, undefined],
  // d12key: ["d11", 112, {x: 12, z: 13}],
  // ekey: {vv: 221, g: 1111}, /* проработать!*/
  // fkey: {a: 1, ErrDontShowIt: {v: 1, Show2: 12}},
  // gkey: null,
  // hkey: [121,122,{vm: 12, gm: 12},124],
  // jkey: [null],
  // jkey2: [undefined],
  // kkey: undefined,
  // lkey: {a: true, z: null, g: undefined},
};
let obj2 = {
  // SameKeySameValue: "sameValue",
  // sameKeyDiffValue: "DiffValue2",
  // sameKeyDiffTypeOfValue: "Diff_Type_Of_Value",
  // b21key: true,
  // b22key: {vb: 21, g12b: 22},
  // c2key: "234c1",
  // c1key: {
  //   a: { x: 1, y: { x: null, y: 3 } },
  //   b: true,
  //   c: [ "8", true, [ 9, 0 ] ],
  //   d: [ "8", 7, { x1: true, y1: 5 }, 'a'],
  //   e: [ "8", null, [ 9, 0 ] ],
  // },
  // dkey: ["d2","d231"],
  d11key: ["d11", 112, [12,14]],
  // d12key: ["d11", 112, {x: undefined, z: 13}],
  // d2key: ["d11", "d111", 112,23456, true, null, undefined],
  // ekey: {vv: 221, ge: 2222}, /* вот тут проблема видимо т.к. общий ключ но составы обьекта разные*/
  // fkey: {a: undefined, ErrDontShowIt: {v: 1, Show2: 12}},
  // f21key: {a: 21, b: 2},
  // f22key2: {a: 21, b: {v: 221, g: 2}},
  // f23key3: {a: 21, b: {v: 221, g: {gv: 212, gg: 22}}},
  // gkey: null,
  // hkey: [121,122,{vm: 12, gm: 12},124],
  // h21key: [21,22,23,24],
  // h22key: [21,22,{vm: 1, gm: 2},24],
  // jkey: null,
  // jkey2: [undefined],
  // kkey: undefined, /*тоже не хочет в паре работать*/
  // lkey: {z: null, g: undefined},
};
let diffObject1 ={KeyMark:{}, ValueMark:{}};
let diffObject2 ={KeyMark:{}, ValueMark:{}};

let diff_Object1 = {KeyMark:{}, ValueMark:{}};
let diff_Object2 = {KeyMark:{}, ValueMark:{}};

// два объекта признаков раскраски - diffObject 1 и 2 для двух исходных JSON
  // признаки раскраски Ключей первого уровня key_i лежат в diffObject_i.KeyMark = {key_i : key_i_SpanMark, ...}  
  // признаки раскраски Значений для Ключей первого уровня Value(key_i) лежат в diffObject1.ValueMark = {key_i : value_i_SpanMark, ...}  
  // если значение исходного ключа - массив или обьект, то вместо признака расскраски значения лежит однотипный обьект - массив или обьект (с ключами, 
  // аналогичными ключам исходного обьекта)
  // а значениями этого обьекта являются признаки расскраски соотвествующих значений элементов массива или значений обьектов
  
  // diffObject-ы выводятся в таблицу ниже таблицы вывода JSON-ов

// let obj1 = {
  // a: "obl1, key=a Value=1",
  // b: "diff_text_value=1",
  // c: [1,3],
  // c: [1,{ g: 's1' },3],
  // d: "same_text_value",
  // e: [1],
  // err12: 12,
  // d3: { g: 's1' },
  // t1: {f: [1,2, 5, [6,7]], h: {g: 's1' }},
  // f: null,
  // y: true,
// };
// let obj2 = {
  // a: "obl2, key=a Value=1",
  // b: "diff_text_value=2",
  // c: [1,{ g: 's1' },3],
  // c: [1,2,3],
  // d: "same_text_value",
  // d2: "unic_text_value",
  // d3: {g: 's1', g2: 's21'},
  // e: undefined,
  // t1: {f: [1,4,5,22], h: {g: 's1', h: 's1'}},
  // g: "2134",
  // x1: null,
  // x2: undefined,
  // x3: false,
// };

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
        "59) Ошибка в ValueMatching. value1 = ",
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

function MainFunction(obj1, obj2) {
  // запускает FindDiff для всех первичных ключей

  let arr1 = Object.keys(obj1).sort();
  let arr2 = Object.keys(obj2).sort();
  // let arrSame = arr1.filter((num) => arr2.includes(num));
  let arr1Unic = arr1.filter((num) => !arr2.includes(num));
  let arr2Unic = arr2.filter((num) => !arr1.includes(num));

  let keysArray = AllKeysFrom2ObjectsIntoUnicKeysArray(obj1, obj2);

  let resultArr = keysArray.map(function (item) {
    let TypeMatchingResult = TypeMatching(obj1[item], obj2[item]);
    // if ((obj1[item]=== undefined)||(obj1[item]=== null)) {console.log('108) obj1[item]=undef, item= ', item, '; obj1[item]= ', obj1[item])}
    // if ((obj2[item]=== undefined)||(obj2[item]=== null)) {console.log('109) obj2[item]=undef, item= ', item, '; obj2[item]= ', obj2[item])}
    // не получился тензорный оператор - let spanMarkJeneral = : TypeMatchingResult==='diffType' ? (TypeMatchingResult + '-' + 'diffValue') : (TypeMatchingResult + '-' +  ValueMatching(obj1[item], obj2[item], TypeMatchingResult));
    // поэтому сделал возврат diffValue в функции ValueMatching при TypeMatchingResult === diffType, хотя можно тут if сделать
    let spanMarkJeneral =
      TypeMatchingResult +
      "-" +
      ValueMatching(obj1[item], obj2[item], TypeMatchingResult);
    if (arr1Unic.includes(item)) {
      spanMarkJeneral = "obj1UnicKey";
    }
    if (arr2Unic.includes(item)) {
      spanMarkJeneral = "obj2UnicKey";
    }
    // if (item === 't1') {console.log('133) item === t1;' + spanMarkJeneral + '-key')}
    
      diffObject1.KeyMark[item]=spanMarkJeneral + "-key";
      diffObject1.ValueMark[item]=spanMarkJeneral + "-obj1";
      diffObject2.KeyMark[item]=spanMarkJeneral + "-key";
      diffObject2.ValueMark[item]=spanMarkJeneral + "-obj2";
    return (

      <tr key={item}>
        <td>
          <span className={spanMarkJeneral + "-key"}>"{item}" :</span>
        </td>
          {ShowDiffOf2Objects(obj1[item], obj2[item], spanMarkJeneral, item)}
        {/* <td>
          <span className={spanMarkJeneral + "-diff"}>{spanMarkJeneral}</span>
        </td> */}
        <td>
          {item} : {ShowAnyType(diff_Object1.KeyMark[item])} <br></br> <br></br>"Value: "{ShowAnyType(diff_Object1.ValueMark[item])}
        </td>
        <td>
          {item} : {ShowAnyType(diff_Object2.KeyMark[item])} <br></br> <br></br>"Value: "{ShowAnyType(diff_Object2.ValueMark[item])}
        </td>
      </tr>
    );
  });
  return resultArr;
}

function ShowDiffOf2Objects(obj1, obj2, spanMarkJeneral, item) {
  // 0. тут выводится только две соседние ячейки - obj1 и obj2, без ключа для этих двух ячеек
  // 1. проверка типов двух аргументов - исходя из типов определяется раскраска и порядок вывода
  // 2. проверка значения - также определяет раскраску и обрамление ([] /{}) вывода

  // let spanMarkSameTypeCheck = spanMarkJeneral.substring(0,8);
  // console.log('119) spanMarkSameTypeCheck= ', spanMarkSameTypeCheck);

      console.log('278) type1= ', DefindMyTypeOf(obj1))
      console.log('279) type2= ', DefindMyTypeOf(obj2))

  switch (spanMarkJeneral) {
    case "obj1UnicKey":
      let type1 = DefindMyTypeOf(obj1);
      // if (type1 === 'objectType') {console.log('277) type1= ' + type1)}
      switch (type1) {
        case "primitiveType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>
                  {ShowAnyType(obj1)}
                </span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>нет ключа</span>
              </td>
            </>
          );
        case "undefinedType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>
                  ключ есть, значение = undeff
                </span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>нет ключа</span>
              </td>
            </>
          );
        case "arrayType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>
                  {ShowAnyType(obj1, spanMarkJeneral + "-obj1")}
                </span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>нет ключа</span>
              </td>
            </>
          );
        case "objectType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>
                  {ShowAnyType(obj1, spanMarkJeneral + "-obj1")}
                </span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>нет ключа</span>
              </td>
            </>
          );
        default:
          return (
            <>
              <td>Ошибка в FindDiff obj1UnicKey{obj1}</td>
              <td>нет ключа obj1UnicKey{obj2}</td>
            </>
          );
      }
    case "obj2UnicKey":
      let type2 = DefindMyTypeOf(obj2);
      switch (type2) {
        case "primitiveType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>нет ключа</span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>
                  {ShowAnyType(obj2)}
                </span>
              </td>
            </>
          );
        case "undefinedType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>нет ключа</span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>
                  ключ есть, значение = undeff
                </span>
              </td>
            </>
          );
        case "arrayType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>нет ключа</span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>
                  {ShowAnyType(obj2, spanMarkJeneral + "-obj2")}
                </span>
              </td>
            </>
          );
        case "objectType":
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>нет ключа</span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>
                  {ShowAnyType(obj2, spanMarkJeneral + "-obj2")}
                </span>
              </td>
            </>
          );
        default:
          return (
            <>
              <td>
                <span className={spanMarkJeneral + "-obj1"}>
                  389 нет ключа obj2UnicKey = "{obj2}"
                </span>
              </td>
              <td>
                <span className={spanMarkJeneral + "-obj2"}>
                  394 Ошибка в FindDiff obj2UnicKey = "{obj2}"
                </span>
              </td>
            </>
          );
      }
  }

  let type1 = DefindMyTypeOf(obj1);
  let type2 = DefindMyTypeOf(obj2);
  // console.log('414) obj1= ', obj1, '; type1= ', type1)
  // console.log('415) obj2= ', obj2, '; type2= ', type2)
  // return: primitiveType (в т.ч. для null)/ undefinedType / arrayType / objectType
  let typeMatching = type1 + "-vs-" + type2;
  if (type1 === type2) { /* ТОЧКА ВЫБОРА 1. - типы значений совпадают. Вторая точка выбора - стр. 488 - типы значений НЕ совпадают  */
    switch (typeMatching) {
      case "primitiveType-vs-primitiveType":
        // diffObject1.ValueMark[item]=spanMarkJeneral; - получается что здесь размечать не надо т.к. примитив уже размечен 
        // на стр 226 и 228. Получается в этой функции надо метить только сложные обьекты?
        // наверняка код функции можно разбить на вложенные функции чтобы не повторять блоки для разных типов данных
        // сделать компонент по типу ShowAnyType
        return (
          <>
            <td>
              <span className={spanMarkJeneral + "-obj1"}>
                {ShowAnyType(obj1)}
              </span>
            </td>
            <td>
              <span className={spanMarkJeneral + "-obj2"}>
                {ShowAnyType(obj2)}
              </span>
            </td>
          </>
        );
      case "undefinedType-vs-undefinedType":
        return (
          <>
            <td>
              <span className={spanMarkJeneral + "-obj1"}>
                ключ есть, значение = undeff
              </span>
            </td>
            <td>
              <span className={spanMarkJeneral + "-obj2"}>
                ключ есть, значение = undeff
              </span>
            </td>
          </>
        );
      case "arrayType-vs-arrayType":
        return (
          <>
            <td>
              <span className={spanMarkJeneral + "-obj1"}>
                {ShowAnyType(obj1, spanMarkJeneral + "-obj1")}
              </span>
            </td>
            <td>
              <span className={spanMarkJeneral + "-obj2"}>
                {ShowAnyType(obj2, spanMarkJeneral + "-obj2")}
              </span>
            </td>
          </>
        );
      case "objectType-vs-objectType":
        return (
          <>
            <td>
              <span className={spanMarkJeneral + "-obj1"}>
                {ShowAnyType(obj1, spanMarkJeneral + "-obj1")}
              </span>
            </td>
            <td>
              <span className={spanMarkJeneral + "-obj2"}>
                {ShowAnyType(obj2, spanMarkJeneral + "-obj2")}
              </span>
            </td>
          </>
        );
      default:
        return (
          <>
            <td>
              Ошибка в FindDiff {ShowAnyType(obj1, spanMarkJeneral + "-obj1")}
            </td>
            <td>
              Ошибка в FindDiff {ShowAnyType(obj2, spanMarkJeneral + "-obj2")}
            </td>
          </>
        );
    }
  } else { /* ТОЧКА ВЫБОРА 2. - типы значений НЕ совпадают. Первая точка выбора - стр. 410 - типы значений совпадают  */
    // console.log('489) функц FindDiff. spanMarkJeneral= ',spanMarkJeneral);
      // diffObject1.KeyMark[item]=spanMarkJeneral + "-key"; - ключи уже не надо метить, они выше размечены
      // diffObject1.ValueMark[item]=spanMarkJeneral + "-obj1"; /* тут надо сделать обьект или массив в соотвествии с типом исходных данных */
      // diffObject2.KeyMark[item]=spanMarkJeneral + "-key"; - ключи уже не надо метить, они выше размечены
      // diffObject2.ValueMark[item]=spanMarkJeneral + "-obj2"; /* тут надо сделать обьект или массив в соотвествии с типом исходных данных */
      // console.log('494) функц FindDiff. obj1= ',obj1);
    return (
      <>
        <td>{ShowAnyType(obj1, spanMarkJeneral + "-obj1")}</td>
        <td>{ShowAnyType(obj2, spanMarkJeneral + "-obj2")}</td>
      </>
    );
  }
}

function MakeDiffObject (obj1, obj2, diff_Object1, diff_Object2){
// console.log('503 obj1= ', obj1,'; obj2= ',obj2,'; diff_Object1=,',diff_Object1,' ; diff_Object2= ', diff_Object2)

  let type1 = DefindMyTypeOf(obj1);
  let type2 = DefindMyTypeOf(obj2);
  let KeySpanMark;
  let ValueSpanMark;
  // console.log('508) type1 =', type1 ,'; type2= ',  type2)
  if (type1 === type2) {
    // надо понять когда уходить в рекурсию
    switch (type1) {
      // case "primitiveType":
      //   // diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
      //   // diff_Object1.ValueMark[item] =  spanMarkJeneral +'-obj1'
      //   // diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
      //   // diff_Object2.ValueMark[item] =  spanMarkJeneral +'-obj2'
      //   break;
      // case "undefinedType":
      //   break;
      case "arrayType":
          let Obj1Length= obj1.length
          let Obj2Length= obj2.length
          let MinLength = Math.min(Obj1Length, Obj2Length)
          let MaxLength = Math.max(Obj1Length, Obj2Length)

          for (let index=0; index<MinLength; index++) {
            let TypeMatchingResult = TypeMatching(obj1[index], obj2[index]);
            let ValueMatchingResult = ValueMatching(obj1[index], obj2[index], TypeMatchingResult);
            // console.log('544) TypeMatchingResult', TypeMatchingResult)
            let spanMarkJeneral = TypeMatchingResult +"-" + ValueMatchingResult;
            console.log('546) spanMarkJeneral', spanMarkJeneral)
            if ((TypeMatchingResult.substring(0, 8) === "sameType")/*&&(ValueMatchingResult.substring(0, 9) === "sameValue")*/) {
              console.log('548) index= ', index ,'; obj1[index] = ', obj1[index],'; obj2[index] = ', obj2[index])
              diff_Object1.ValueMark[index] =  CreateMarkBelow2(obj1[index], '-obj1', diff_Object1.ValueMark[index], spanMarkJeneral)      
              diff_Object2.ValueMark[index] =  CreateMarkBelow2(obj2[index], '-obj2', diff_Object2.ValueMark[index], spanMarkJeneral)      
              // MakeDiffObject(obj1[index], obj2[index], diff_Object1.ValueMark[index], diff_Object2.ValueMark[index])
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
        let arr1 = Object.keys(obj1).sort();
        let arr2 = Object.keys(obj2).sort();

        let arrSame = arr1.filter((num) => arr2.includes(num));
        let arr1Unic = arr1.filter((num) => !arr2.includes(num));
        let arr2Unic = arr2.filter((num) => !arr1.includes(num));
      
        let keysArray = AllKeysFrom2ObjectsIntoUnicKeysArray(obj1, obj2);
        keysArray.map(function (item) {
          if (arrSame.includes(item)) {
            let TypeMatchingResult = TypeMatching(obj1[item], obj2[item]);
            // console.log('577) ', TypeMatchingResult)
            let spanMarkJeneral =
              TypeMatchingResult +
              "-" +
              ValueMatching(obj1[item], obj2[item], TypeMatchingResult);
              // console.log(spanMarkJeneral)
              if (TypeMatchingResult.substring(0, 8) === "sameType"){
                // console.log('585) ', TypeMatchingResult)
                switch (TypeMatchingResult) {
                  case 'sameType-objectType':
                    diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
                    diff_Object1.ValueMark[item] = {KeyMark:{}, ValueMark:{}};
                    diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
                    diff_Object2.ValueMark[item] = {KeyMark:{}, ValueMark:{}};
                    MakeDiffObject (obj1[item], obj2[item], diff_Object1.ValueMark[item], diff_Object2.ValueMark[item])                  
                    break;
                  case 'sameType-arrayType':
                    diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
                    diff_Object1.ValueMark[item] = {ValueMark:[]};
                    diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
                    diff_Object2.ValueMark[item] = {ValueMark:[]};
                      MakeDiffObject (obj1[item], obj2[item], diff_Object1.ValueMark[item], diff_Object2.ValueMark[item])                  
                    break;
                    default:
                      diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key'
                      diff_Object1.ValueMark[item] =  spanMarkJeneral +'-obj1'
                      diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key'
                      diff_Object2.ValueMark[item] =  spanMarkJeneral +'-obj2'
                    break;
                }
              } else {
                // блок разметки ключей разных типов ключей. 
                KeySpanMark = 'diffType'
                ValueSpanMark = 'diffValue'
                // console.log('612) KeySpanMark = diffType; item=', item, 'obj1[item]= ',obj1[item],'; obj2=',obj2[item])
                diff_Object1.KeyMark[item] =  spanMarkJeneral +'-key1'
                diff_Object2.KeyMark[item] =  spanMarkJeneral +'-key2'
                
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
        console.log('635) Ошибка в MakeDiffObject. obj1 = ', obj1 ,'; obj2 = ', obj2)
        console.log('634) Ошибка в MakeDiffObject. type1= ', type1 , '; type2 = ', type2)
        break;
    }
  } else {
    // возможно этот блок не нужен т.к. разные типы обрабатываюся внутри case "arrayType" (стр 521) и case "objectType" (стр 564)
    // ??? TODO #4 = сделано! надо проверить корректность реализации: тут вариант если типы разные => (Diff Type) + и без вариантов Diff Value
    // TODO - надо попробовать закомментить этот блок на сложном обьекте
    // KeySpanMark = 'diffType'
    // ValueSpanMark = 'diffValue'
    console.log('653) Непредвиденная обработка разных типов в MakeDiffObject')
    diff_Object1.ValueMark = CreateMarkBelow(obj1, diff_Object1.ValueMark, KeySpanMark, ValueSpanMark)
    diff_Object2.ValueMark = CreateMarkBelow(obj2, diff_Object2.ValueMark, KeySpanMark, ValueSpanMark)      
  }
}

function CreateMarkBelow2(obj, objName, diffObject, SpanMark){
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
        diffObject.KeyMark[key] = SpanMark +'-key'+objName.substring(4,5)
        diffObject.ValueMark[key] = CreateMarkBelow2(value, objName, diffObject, SpanMark)
      })

      break;
    default: console.log('678) Ошибка в CreateMarkBelow2. obj= ', obj)
    break;
  }
  return diffObject;
}

function CreateMarkBelow(obj, diffObject, KeySpanMark, ValueSpanMark){
  let diffObjectInternal;
  console.log('686) obj =',obj,' diffObject=', diffObject, KeySpanMark, ValueSpanMark)
  let type = DefindMyTypeOf(obj);
  switch (type) {
    case "primitiveType":
      diffObjectInternal = ValueSpanMark
      break;
    case "undefinedType":
      diffObjectInternal = ValueSpanMark
      break;
    case "arrayType":
      diffObjectInternal = obj.forEach((element, index) => {
        diffObject.ValueMark[element] = CreateMarkBelow(element, diffObject[index], KeySpanMark, ValueSpanMark)
      });
      break;
    case "objectType":
      // diffObject = {KeyMark:{}, ValueMark:{}}
      let x = {KeyMark: {}, ValueMark:{}}
      diffObjectInternal = Object.entries(obj).forEach(
    ([key, value]) => {
      // console.log('557) key=', key)
      x.KeyMark[key] = KeySpanMark
      x.ValueMark[key] =  ValueSpanMark
      return x
      // console.log('559) diffObject=', diffObject)
      // CreateMarkLevel(obj[key], diffObject.ValueMark[key])
    // CreateMarkLevel(value, diffObject.ValueMark[key]})
    }
    );
      break;
    default: console.log('700) Ошибка в CreateMarkLevel. obj= ', obj)
      break;
  }   
  return diffObjectInternal 
}
MakeDiffObject (obj1, obj2, diff_Object1, diff_Object2)

function ShowAnyType(obj, spanMarkLocal) {
  let type = DefindMyTypeOf(obj);
        // console.log('742) функц ShowAnyType. type= ',type,'; obj= ',obj);
  switch (type) {
    case "primitiveType":
      if (type === undefined) {
        return "undef xxx";
      } else {
        return ShowPrimitive(obj);
      }
    case "arrayType":
      return ShowArray(obj, spanMarkLocal);
    case "objectType":
      // console.log('752) функц ShowAnyType. obj= ',obj);
      return ShowObject(obj, spanMarkLocal);
    default:
      return ShowPrimitive(obj);
  }
}

function ShowPrimitive(obj) {
  return "" + obj;
}

function ShowArray(arr, spanMarkLocal) {
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
              <span className={spanMarkLocal}>{ShowPrimitive(item)}</span>
            </td>
          </tr>
        );
      case "arrayType":
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>
                {ShowAnyType(item, spanMarkLocal)}
              </span>
            </td>
          </tr>
        );
      case "objectType":
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>
                {ShowAnyType(item, spanMarkLocal)}
              </span>
            </td>
          </tr>
        );
      default:
        return (
          <tr key={"key_" + index}>
            <td>
              <span className={spanMarkLocal}>
                {"Ошибка функт. ShowArray стр. 311"}
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

function ShowObject(obj, spanMarkLocal) {
  let keysArray = Object.keys(obj);
  // console.log('699) keysArray= ', keysArray)
  let resultArr = keysArray.map(function (item) {
    // console.log('349) DefindMyTypeOf(item)', DefindMyTypeOf(obj[item]))
    switch (DefindMyTypeOf(obj[item])) {
      case "primitiveType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" : </td>
            <td>
              <span className={spanMarkLocal}>{ShowPrimitive(obj[item])}</span>
            </td>
          </tr>
        );
      case "undefinedType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" : </td>
            <td>
              <span className={spanMarkLocal}>{ShowPrimitive(obj[item])}</span>
            </td>
          </tr>
        );
      case "arrayType":
        // console.log('359)', spanMarkLocal )
        return (
          <tr key={"key_" + item}>
            <td>"{item}" : </td>
            <td>
              <span className={spanMarkLocal}>
                {ShowAnyType(obj[item], spanMarkLocal)}
              </span>
            </td>
          </tr>
        );
      case "objectType":
        return (
          <tr key={"key_" + item}>
            <td>"{item}" :</td>
            <td>
              <span className={spanMarkLocal}>
                {ShowAnyType(obj[item], spanMarkLocal)}
              </span>
            </td>
          </tr>
        );
      default:
        return (
          <tr key={"key_" + item}>
            <td>
              <span className={spanMarkLocal}>
                {"Ошибка функт. ShowArray стр. 749"}
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

function createTable(obj1, obj2) {
  return (
    <table>
      <thead>
        <tr>
          <td>Ключ</td>
          <td>JSON_1 (old)</td>
          <td>JSON_2 (new)</td>
          {/* <td>Diff-JeneralMark</td> */}
          <td>Diff-Object1</td>
          <td>Diff-Object2</td>
        </tr>
      </thead>
      <tbody>{MainFunction(obj1, obj2)}</tbody>
    </table>
  );
}

function createDiffTable(obj1, obj2) {
  // console.log('775) createDiffTable obj1 = ', obj1)
  // console.log('776) createDiffTable obj2 = ', obj2)
  return (
    <table>
      <thead>
        <tr>
          <td>Ключ</td>
          <td>Diff_1</td>
          <td>Diff_2</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td><table><tbody>{ShowAnyType(obj1)}</tbody></table> </td>
          <td><table><tbody>{ShowAnyType(obj2)}</tbody></table> </td>
        </tr>
      </tbody>
    </table>
  );
}

function DefindMyTypeOf(obj) {
  // return: primitiveType / undefinedType / arrayType / objectType
  switch (typeof obj) {
    default:
      return "primitiveType";
    case "undefined":
      return "undefinedType";
    //------------------------ Object (Null/Array/Object) ----------------------------
    case "object":
      if (obj === null) {
        return "primitiveType";
      } else {
        if (obj instanceof Array) {
          return "arrayType";
        } else {
          return "objectType";
        }
      }
  }
}

function AllKeysFrom2ObjectsIntoUnicKeysArray(obj1, obj2) {
  let arr1 = Object.keys(obj1).sort();
  let arr2 = Object.keys(obj2).sort();
  let arrSame = arr1.filter((num) => arr2.includes(num));
  let arr1Unic = arr1.filter((num) => !arr2.includes(num));
  let arr2Unic = arr2.filter((num) => !arr1.includes(num));

  let allKeysArray = [...arrSame, ...arr1Unic, ...arr2Unic];

  return allKeysArray;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
// const root1 = ReactDOM.createRoot(document.getElementById("root1"));
// const root2 = ReactDOM.createRoot(document.getElementById("root2"));
let table = createTable(obj1, obj2);
// let table1 = createDiffTable(diffObject1, diffObject2)
// let table2 = createDiffTable(diff_Object1, diff_Object2)
root.render(table);
// root1.render(table1);
// root2.render(table2);

// function MyInfo() {
//   let textBlock =
//     <div>
//     <h1>Name</h1>
//     <p>short story</p>
//       <ul>
//         <li>1</li>
//         <ol>
//           <li><span style={{color:'green', backgroundColor: 'lightgreen'}}>place 1: Palawan </span></li>
//           <li>place 2: Jamayca </li>
//           <li>place 3: Munich</li>
//         </ol>
//         <li>2</li>
//           <ul>
//             <li>1</li>
//             <li>2</li>
//             <li>3</li>
//           </ul>
//         <li>3</li>
//       </ul>
//     </div>;
//     return (textBlock);
//   }

// root.render(<MyInfo/>);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
