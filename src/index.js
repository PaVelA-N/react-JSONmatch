// import React from 'react';
import ReactDOM from 'react-dom/client';
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

const param={body:'', row:'', text:'', key:'', keyValue:'', tbl:'',td: '',tr: '', rowIndex:'', colIndex:'',obj:{},};
param.body = document.body;
const obj1  = {
   a: { x: 1, y: 3 },
   b: null,
   c: [ "8", 7, [ 9, 0 ] ],
        d: [ "8", 7, { x1: 2, y1: 5 }, 'a'],
        e: [ "8", null, [ 9, 0 ] ],
 };
const obj2 = {
    akey: "a1sdfg",
    bkey: "b2",
    ckey: 3,
    dkey: "d3",
    ekey: true,
    fkey: undefined,
    gkey: "g3",
};

param.obj = obj2; 

function objShow (props) {
    let keysArray = Object.keys(obj2);
    let valueArray = Object.values(obj2);
    const rows = keysArray.length; 
    console.log('Board ', props);
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
            <div className="string-row" key={row}>             {renderElement(props)}            </div>
                break;
        case 'number': 
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
                break;
        case 'boolean': 
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
                break;
        case 'symbol': 
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
                break;
        case 'undefined': 
            <div className="string-row" key={row}>         {            renderElement(props)        }        </div>
                break;
    }
}

function renderElement(props) {
    document.getElementById('root1').innerHTML += '<ul>' + props.key + ' : ' + props.value + '</ul>';
}

let props = obj2;
objShow (props);

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