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

const props={body:'', row:'', text:'', key:'', keyValue:'', tbl:'',td: '',tr: '', rowIndex:'', colIndex:'',obj:{},arr:[]};
props.body = document.body;

const obj1 = {
    akey: "a1g",
    b1key: "b2",
    c1key: "b1",
    dkey: "d2",
//     ekey: true,
//     fkey: {a: 1, b: {v: 1, g: 2}},
//     gkey: null,
//     hkey: [21,22,{vm: 1, gm: 2},24],
//     jkey: null,
};

const obj2 = {
    akey: "1a2g",
    bkey: "b2",
    c2key: "c1",
    dkey: "d3",
    // ekey: true,
    // fkey1: {a: 1, b: 2},
    // fkey2: {a: 1, b: {v: 1, g: 2}},
    // fkey3: {a: 1, b: {v: 1, g: {gv: 12, gg: 22}}},
    // gkey: null,
    // hkey1: [21,22,23,24],
    // hkey2: [21,22,{vm: 1, gm: 2},24],
    // jkey: null,
};

props.obj = obj2; 
let compProps={};
compProps.obj1 = obj1;
compProps.obj2 = obj2;

function compareAll(compProps){
    let arr1 = Object.keys(compProps.obj1).sort();
    let arr2 = Object.keys(compProps.obj2).sort();
    compProps.arrSame = arr1.filter(num => arr2.includes(num));
    compProps.arr1Unic = arr1.filter(num => !arr2.includes(num));
    compProps.arr2Unic = arr2.filter(num => !arr1.includes(num));
    // console.log('arr1 :' + arr1)
    // console.log('arr2 :' + arr2)
    // console.log('arrSame :' + arrSame)
    // console.log('arr1Unic :' + arr1Unic)
    // console.log('arr2Unic :' + arr2Unic)
    return compProps;
}
compareAll(compProps);

function objShow (props) {
    let keysArray = Object.keys(props.obj);
    let valueArray = Object.values(props.obj);
    const rows = keysArray.length; 
    // console.log('Board ', props);
            return (
                <div>
                    {[...Array(rows).keys()].map(row => (
                        props.key = keysArray[row],
                        props.value = valueArray[row],
                        props.row = row,
                        selectTypeOfElement(props)
                    ))}
                </div>
            )
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

function renderElement(props) {
     document.getElementById('root1').innerHTML += '<ul>' + props.key + ' : ' + props.value + '</ul>';
}

objShow (props);

addTable1(compProps.arrSame);
addTable2(compProps.arr1Unic);
addTable3(compProps.arr2Unic);


// function tableCreate() {

//     const tbl = document.createElement('table');
//         tbl.setAttribute('id','table1');
//         tbl.style.width = '50%';
//         tbl.style.border = '2px solid black';

// for (let rowIndex = 0; rowIndex <2; rowIndex++) { /*(let key in obj) */
// let tr = tbl.insertRow(); /* tr видимо Table Row ? */
// tr.setAttribute('id','rowIndex'+ rowIndex);

// for (let colIndex = 0; colIndex < 2; colIndex++) { /*столбец */
// // if (rowIndex === 3 && colIndex === 4) {
// //     break;
// // } else 
// {
//     if (colIndex === 0) {
//         props.text='aaaa';
//         newCell(props);                
//     } else {
//         // text=key;
//         props.text = 'bbb';
//         newCell(props);                
//     }
//     // colIndex +=1
//     // newCell(props);
// }
// }
// }
// }

// function newCell(){
//     td = tr.insertCell();
//     td.appendChild(document.createTextNode(`Column: ${colIndex}; Key/Value: ${text}`));
//     // props.td.appendChild(document.createTextNode(`props.tbl. ${props.tbl} tr: ${props.tr} td: ${props.td} rowIndex: ${props.rowIndex} / colIndex: ${props.colIndex}`));
//     td.style.border = '1px solid black';
//             // if (i === 4 && j === 1) {
//             // td.setAttribute('rowSpan', '4');
//             // }
//     body.appendChild(tbl);
// }

// tableCreate()

// function deepCopyObject(objToCopy){
//    let inFunctionObj_copy={};
   
//    for (let key in objToCopy) {
//            switch (typeof objToCopy[key]) {
//                case 'number': 
//                    inFunctionObj_copy[key]= objToCopy[key];
//                break;	 
//                case 'undefined': 
//                    inFunctionObj_copy[key]= 'undefined';			      		
//                break;	 
//                case 'boolean': 
//                    inFunctionObj_copy[key]= objToCopy[key];			      		
//                break;	 
//                case 'string': 
//                    inFunctionObj_copy[key]= objToCopy[key];
//                break;	 
//                case 'symbol': 
//                    inFunctionObj_copy[key]= objToCopy[key];			      		
//                break;	 
//                case 'object': 
//                    if (objToCopy[key] === null) {
//                        inFunctionObj_copy[key]= null;
//                    } else {
//                        if (objToCopy[key] instanceof Array){
//                            inFunctionObj_copy[key]= deepCopyArray(objToCopy[key]);
//                        }
//                        else{
//                            inFunctionObj_copy[key]= deepCopyObject(objToCopy[key]);
//                        }
//                    }
//                break;	 
//            }
//    };
//    return inFunctionObj_copy;
// }
// function deepCopyArray(arrToCopy){
//    let inFunctionArr_copy=[];
   
//    for (let i=0; i < arrToCopy.length; i++) {
//            switch (typeof arrToCopy[i]) {
//                case 'number': 
//                    inFunctionArr_copy[i]= arrToCopy[i];
//                break;	 
//                case 'undefined': 
//                    inFunctionArr_copy[i]= 'undefined';			      		
//                break;	 
//                case 'boolean': 
//                    inFunctionArr_copy[i]= arrToCopy[i];			      		
//                break;	 
//                case 'string': 
//                    inFunctionArr_copy[i]= arrToCopy[i];
//                break;	 
//                case 'symbol': 
//                    inFunctionArr_copy[i]= arrToCopy[i];			      		
//                break;	 
//                case 'object': 
//                if (arrToCopy[i] === null) {
//                        inFunctionArr_copy[i]= null;
//                    } else {
//                        if (arrToCopy[i] instanceof Array){
//                            inFunctionArr_copy[i]= deepCopyArray(arrToCopy[i]);
//                        }
//                        else{
//                            inFunctionArr_copy[i]= deepCopyObject(arrToCopy[i]);
//                        }
//                    }
//                break;	 
//            }
//    };
//    return inFunctionArr_copy;
// }

// Obj_copy = deepCopyObject(obj);


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
    const sameElemTable = document.createElement('table');
    sameElemTable.setAttribute('id','table1');
    sameElemTable.style.width = '50%';
    sameElemTable.style.border = '2px solid black';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        sameElemTable.appendChild(thead);
        sameElemTable.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Ключ1";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Значение1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Ключ2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Значение2";

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
        row_2_data_2.innerHTML = obj1[ar[i]];
        // let row_2_data_3 = document.createElement('td');
        // row_2_data_3.innerHTML = "Netflix";
    
        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        // row_2.appendChild(row_2_data_3);
        tbody.appendChild(row_2);
    }
    document.getElementById('root1').appendChild(sameElemTable);    
}

function addTable2() {
    const unicObj1ElemTable = document.createElement('table1');
    unicObj1ElemTable.setAttribute('id','table2');
    unicObj1ElemTable.style.width = '50%';
    unicObj1ElemTable.style.border = '2px solid black';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        unicObj1ElemTable.appendChild(thead);
        unicObj1ElemTable.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Ключ1";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Значение1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Ключ2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Значение2";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "1.";
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "James Clerk";
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "Netflix";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);

    document.getElementById('root2').appendChild(unicObj1ElemTable);    
}

function addTable3() {
    const unicObj2ElemTable = document.createElement('table1');
    unicObj2ElemTable.setAttribute('id','table2');
    unicObj2ElemTable.style.width = '50%';
    unicObj2ElemTable.style.border = '2px solid black';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        unicObj2ElemTable.appendChild(thead);
        unicObj2ElemTable.appendChild(tbody);

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Ключ1";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Значение1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Ключ2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Значение2";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = "1.";
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "James Clerk";
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "Netflix";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);

    document.getElementById('root3').appendChild(unicObj2ElemTable);    
}