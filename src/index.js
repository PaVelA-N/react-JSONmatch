import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// let data = {"name":"Jack","items":{"dog":1,"car":1,"phone":2}};
// let header = '<h2> Obj name is: ' + data.name + '</h2>';
// let list = '';
//    list += '<li>'  + ' шт. </li>';

// Для простых объектов доступны следующие методы:

// Object.keys(obj) – возвращает массив ключей.
// Object.values(obj) – возвращает массив значений.
// Object.entries(obj) – возвращает массив пар [ключ, значение].
// const obj1  = {
//    a: { x: 1, y: 3 },
//    b: null,
//    c: [ "8", 7, [ 9, 0 ] ],
//         d: [ "8", 7, { x1: 2, y1: 5 }, 'a'],
//         e: [ "8", null, [ 9, 0 ] ],
//  };

const props={body:'', row:'', text:'', key:'', keyValue:'', tbl:'',td: '',tr: '', rowIndex:'', colIndex:'',obj:{},arr:[], objType:''};
props.body = document.body;

const obj1 = {
    akey: "a1f",
    bkey: true,
    c1key: "122",
    // dkey: ["d11", "d111", 112,23456, true, null, undefined],
    dkey: ["d11", 112, [12,13]],
    ekey: {vv: 111, g: 1111},
    fkey: {a: 1, ErrDontShowIt: {v: 1, Show2TimesThisLast: 12}},
//     gkey: null,
    //  hkey: [121,122,{vm: 1, gm: 12},124],
    //  jkey: null,
    //  kkey: undefined,
};

const obj2 = {
    akey: "a2g",
    bkey: true,
    // bkey: {vb: 21, g12b: 22},
    c1key: "234c1",
    dkey: ["d2","d23"],
    ekey: {ve: 221, ge: 2222},
    fkey: {a: 21, b: 2},
    // fkey2: {a: 21, b: {v: 221, g: 2}},
    // fkey3: {a: 21, b: {v: 221, g: {gv: 212, gg: 22}}},
    // gkey: null,
    hkey: [21,22,23,24],
    // hkey2: [21,22,{vm: 1, gm: 2},24],
    jkey: null,
    kkey: undefined,
};

// props.obj = obj2; 
let compProps={};
compProps.obj1 = obj1;
compProps.obj2 = obj2;

function compareAll(compProps){
    let arr1 = Object.keys(compProps.obj1).sort();
    let arr2 = Object.keys(compProps.obj2).sort();
    compProps.arrSame = arr1.filter(num => arr2.includes(num));
    compProps.arr1Unic = arr1.filter(num => !arr2.includes(num));
    compProps.arr2Unic = arr2.filter(num => !arr1.includes(num));
    console.log('arr1 :' + arr1)
    console.log('arr2 :' + arr2)
    console.log('arrSame :' + compProps.arrSame)
    console.log('arr1Unic :' + compProps.arr1Unic)
    console.log('arr2Unic :' + compProps.arr2Unic)
    return compProps;
}
compareAll(compProps);

function objShow (props) {
    let keysArray = Object.keys(props.obj);
    let valueArray = Object.values(props.obj);
        const rows = keysArray.length; 
    // console.log('Board ', props);
    // let row = props.row;
    // let typeSelector = props.value; КАК ВАРИАНТ ТУТ НАДО СДЕЛАТЬ КОНДОВО И СЮДА СВИТЧ
    // switch (typeof typeSelector) {
            return (
                <div> 
                     {[...Array(rows).keys()].map(row => (
                        props.key = keysArray[row],
                        props.value = valueArray[row],
                        props.row = row,
                        // selectTypeOfElement(props) 
                        selectTypeOfElement2(props)
                    ))}
                </div>
            )
  }

function showElement (props) {
    let keysArray;
    let valueArray;
    // if (props.objType==='array') 
        if (props.objType==='array') {
            keysArray = [...Array(props.arr.length)];
            valueArray = props.arr;
            console.log('if + ' + props.arr);
            console.log('if  val+ ' + valueArray);
        } else {
            keysArray = Object.keys(props.obj);
            valueArray = Object.values(props.obj);
        }
    const rows = keysArray.length; 

    let zzz;
    let xxx = '';
         switch (props.objType) {
           case 'array':
            xxx = 'Array = [' + '</ul>';
                for (let row = 0; row < rows; row++  ) {
                    props.key = keysArray[row];
                    props.value = valueArray[row];
                    props.row = row;
                    zzz = selectTypeOfElement2(props);
                    console.log(zzz);
                    xxx += '<ul>' +row + ' : ' +  zzz + '</ul>';
                }
                xxx += ']';
                return ('<ul>' + xxx + '</ul>')
                    break;
           case 'object':
            xxx = 'Object = {';
           for (let row = 0; row < rows; row++  ) {
                props.key = keysArray[row];
                props.value = valueArray[row];
                props.row = row;
                zzz = selectTypeOfElement2(props);
                xxx += '<ul>' + props.key +' : ' +  zzz + '</ul>';
                }
                xxx += '}';
                return ('<ul>' + xxx + '</ul>')
                    break;        
        }  
  }

function selectTypeOfElement(props) {
    let row = props.row;
    let typeSelector = props.value;
    switch (typeof typeSelector) {
        case 'string': 
        return (
            <div className="string-row" key={row} >       {            renderElement(props)        }            </div>
        )
                break;
        case 'number': 
        return (
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
        )
                break;
        case 'boolean': 
        return (
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
        )
                break;
        case 'symbol': 
        return (
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
        )
                break;
        case 'undefined': 
        return (
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
        )
                break;
                case 'object': 
                   if (typeSelector === null) {
                       renderElement(props);
                   } else {
                        if (typeSelector instanceof Array){
                            props.obj=props.value;
                            document.getElementById('root1').innerHTML += '<ul>' + props.key + ' : is Array' +  '</ul>';    
                            objShow(props);
                       }
                       else{
                           props.obj=props.value;
                           document.getElementById('root1').innerHTML += '<ul>' + props.key + ' : is Object' +  '</ul>';    
                           objShow(props);
                        }
                   }
                break;	 
    }
}

function selectTypeOfElement2(props) {
    let row = props.row;
    let typeSelector = props.value;
    let yyy;
    switch (typeof typeSelector) {
        case 'string': 
        return (props.value) 
                break;
        case 'number': 
        return (props.value) 
                break;
        case 'boolean': 
        return (props.value) 
                break;
        case 'symbol': 
            return (props.value) 
                break;
        case 'undefined': 
        return (props.value) 
                break;
                case 'object': 
                   if (typeSelector === null) {
                    return ('null');
                   } else {
                        if (typeSelector instanceof Array){
                            props.arr = props.value;
                            props.objType = 'array';
                            yyy=showElement(props);
                            // return ('<ul>' + props.key + ' : is Array' +  yyy +  '</ul>')
                            return (yyy);
                       }
                       else{
                           props.obj=props.value;
                            props.objType = 'object';
                            yyy=showElement(props);
                           return (yyy)
                        }
                   }
                break;	 
    }
}

function renderElement(props) {
     document.getElementById('root1').innerHTML += '<ul>' + props.key + ' : ' + props.value + '</ul>';
    //  return ('root1').innerHTML += '<ul>' + props.key + ' : ' + props.value + '</ul>';
}

function renderElement2(props) {
     return ('<ul>' + props.key + ' : ' + props.value + '</ul>');
     }

// objShow (props);

addTable1(compProps.arrSame);
addTable2(compProps.arr1Unic);
addTable3(compProps.arr2Unic);

//  const root = ReactDOM.createRoot(document.getElementById('root'));
//  root.render( <   table/>);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// Конечно, лучше создавать элементы через
// var div = document.createElement('div');
// наполнять через div.innerHTML = "text";
// и добавлять их через element.appendChild(div);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// ------------------------------------Компоненты----------------------------------------
// const Person = (person) => {
//     return {
//         tag: 'div',
//         children: [
//             Name(person.name),
//             Age(person.age)
//         ]
//     }
// }
// const nickName = (nickname) => {
//     return {
//         tag: 'span',
//         text: nickname,
//         style: 'margin: 20px; background-color: gold; color : red',
//     }
// }

// const Age = (age) => {
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

// let tableName=[sameElemTable,obj1UnicElemTable,obj2UnicElemTable];
// tableName.forEach((element) =>addTable(element)); 

function addTable1(ar) {

    const sameElemTable = document.createElement('table1');
    props.tbl = document.getElementById("table1");
    sameElemTable.setAttribute('id','table1');

    sameElemTable.style.width = '100%';
    sameElemTable.style.border = '2px solid black';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        sameElemTable.appendChild(thead);
        sameElemTable.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Same keys. Ключ обьекта 1";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Значение обьекта 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Ключ обьекта 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Значение обьекта 2";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);
       
    for (let i = 0; i < ar.length; ++i) {
        // console.log(a[index]);
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = ar[i];
        let row_2_data_2 = document.createElement('td');

        let typeSelector = obj1[ar[i]];
        // console.log (i+" "+typeSelector);
        row_2_data_2.innerHTML = obj1[ar[i]] ; // Значение из обьекта 1
        switch (typeof typeSelector) {
            case 'object':
                if (typeSelector === null) {
                    row_2_data_2.innerHTML='null';
                    } else {
                         if (typeSelector instanceof Array){
                            row_2_data_2.innerHTML='';
                            props.objType = 'array';
                            props.arr = obj1[ar[i]];
                            row_2_data_2.innerHTML += showElement(props);
                        }
                        else{
                            row_2_data_2.innerHTML='';
                            props.objType = 'object';
                            props.obj = obj1[ar[i]];
                            row_2_data_2.innerHTML += showElement(props);
                         }
                    break;        
        }  
    }
                
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = " - ";
        let row_2_data_4 = document.createElement('td');
        if (obj1[ar[i]] === obj2[ar[i]]) { // Значение из обьекта 2
            row_2_data_4.innerHTML = obj2[ar[i]];     
            // row_2_data_4.innerHTML = 'test'
        } else {
            row_2_data_4.innerHTML ='<span style="color:red; font-size:20px">'+obj2[ar[i]]+'</span>';
        }
            
        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        tbody.appendChild(row_2);
    }
    document.getElementById('root1').appendChild(sameElemTable);    
}

function addTable2() {
    const unicObj1ElemTable = document.createElement('table2');
    unicObj1ElemTable.setAttribute('id','table2');
    unicObj1ElemTable.style.width = '50%';
    unicObj1ElemTable.style.border = '2px solid black';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        unicObj1ElemTable.appendChild(thead);
        unicObj1ElemTable.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Уникальные ключи обьекта 1";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = " Значение обьекта 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "-";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "-";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "1.";
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "Unic 1 key";
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "Unic 1 elem";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);

    document.getElementById('root2').appendChild(unicObj1ElemTable);    
}

function addTable3() {
    const unicObj2ElemTable = document.createElement('table3');
    unicObj2ElemTable.setAttribute('id','table3');
    unicObj2ElemTable.style.width = '50%';
    unicObj2ElemTable.style.border = '2px solid black';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        unicObj2ElemTable.appendChild(thead);
        unicObj2ElemTable.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Уникальные ключи обьекта 2";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = " Значение2";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "- ";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "-";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "1.";
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "Unic 2 key";
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "Unic 2 elem";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);

    document.getElementById('root3').appendChild(unicObj2ElemTable);    
}