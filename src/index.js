// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// let data = {"name":"Jack","items":{"dog":1,"car":1,"phone":2}};
// let header = '<h2> Obj name is: ' + data.name + '</h2>';
// let list = '';
//    list += '<li>'  + ' шт. </li>';

const param={body:'', text:'', key:'', keyValue:'', tbl:'',td: '',tr: '', rowIndex:'', colIndex:'',obj:{},};
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
    ckey: "c3",
    // dkey: "d3",
    // ekey: "e3",
    // fkey: "f3",
    // gkey: "g3",
};

param.obj = obj2; 

function tableCreate(param) {
            param.tbl = document.createElement('table');
                param.tbl.setAttribute('id','table1');
                param.tbl.style.width = '50%';
                param.tbl.style.border = '2px solid black';

    for (let key in param.obj) {
        param.tr = param.tbl.insertRow(); /* tr видимо Table Row ? */
        param.tr.setAttribute('id','rowIndex'+key);

        for (param.colIndex = 0; param.colIndex < 2; param.colIndex++) { /*столбец */
        // if (rowIndex === 3 && colIndex === 4) {
        //     break;
        // } else 
        {
            if (param.colIndex === 0) {
                param.text=obj2[key];
                newCell(param);                
            } else {
                // param.text=key;
                param.text = key +' - '+obj2[key].length;
                newCell(param);                
            }
            // param.colIndex +=1
            // newCell(param);
        }
        }
    }
}

function newCell(param){
    param.td = param.tr.insertCell(param);
    param.td.appendChild(document.createTextNode(`Column: ${param.colIndex}; Key/Value: ${param.text}`));
    // param.td.appendChild(document.createTextNode(`param.tbl. ${param.tbl} tr: ${param.tr} td: ${param.td} rowIndex: ${param.rowIndex} / colIndex: ${param.colIndex}`));
    param.td.style.border = '1px solid black';
            // if (i === 4 && j === 1) {
            // td.setAttribute('rowSpan', '4');
            // }
    param.body.appendChild(param.tbl);
}

// tableCreate(param);

// Для простых объектов доступны следующие методы:
// Object.keys(obj) – возвращает массив ключей.
// Object.values(obj) – возвращает массив значений.
// Object.entries(obj) – возвращает массив пар [ключ, значение].

function Board (props) {
    let keysArray = Object.keys(obj2);
    let valueArray = Object.values(obj2);
    const rows = keysArray.length; 
    const cells = 3;
    console.log('Board ', props);
    return (
        <div>
            {[...Array(rows).keys()].map(row => (
                <div className="string-row" key={row}>
                    {[...Array(1).keys()].map(cell => 
                        {
                        props.key = keysArray[row];
                        props.value = valueArray[row];
                        renderSquare(props)
                        })}
                </div>
            ))}
        </div>
    )
  }

    function renderSquare(props) {
        console.log('renderSquare ');
        document.getElementById('root1').innerHTML += '<ul>' + props.key + ' : ' + props.value + '</ul>';
    }

// Конечно, лучше создавать элементы через
// var div = document.createElement('div');
// наполнять через div.innerHTML = "text";
// и добавлять их через element.appendChild(div);

  function Square (props) {
    console.log('Square ', props);
    return (
      <span className="square"> ' ${props }    '  </span>
    );
  }

//   let props={a: 1};
  let props = obj2;
  Board (props);

  var car = {
    "model": "Dodge",
    "year": 1967,
    "color": "red",
    "body": "Hard top",
    "img": "imagescar-1", 
}

for (let j in car) {
  const element = document.getElementById(j);
  if (element) {
    element.innerHTML = (car[j]);
  }
};

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

// console.log('obj', obj);
// console.log('Obj_copy', Obj_copy);

// function myFunction() {
//     let table1 = document.createElement("Table1");
//     table1.setAttribute("id", "myTable");
//     document.body.appendChild(table1);

//     let tr1 = document.createElement("TR1");
//     tr1.setAttribute("id", "myTr1");
//     document.getElementById("myTable").appendChild(tr1);

//     let tr2 = document.createElement("TR2");
//     tr2.setAttribute("id", "myTr2");
//     document.getElementById("myTable").appendChild(tr2);

//     let td1 = document.createElement("TD1");
//     let td2 = document.createElement("TD2");
    
//     let cell1_1 = document.createTextNode("cell 1_1");
//     let cell2_1 = document.createTextNode("cell 2_1");
//     let cell3_1 = document.createTextNode("-----");

//     td1.appendChild(cell1_1);
//     td1.appendChild(cell2_1);

//     td2.appendChild(cell3_1);

//     let cell1_2 = document.createTextNode("cell 1_2");

//     td2.appendChild(cell1_2);
    
//     document.getElementById("myTr1").appendChild(td1);
//     document.getElementById("myTr2").appendChild(td2);
// }

// myFunction()

// function table (){
//    document.getElementById('root1').innerHTML += header;
//    document.getElementById('root1').innerHTML += '<ul>' + list + '</ul>';
//    document.getElementById('root1').innerHTML += '<p>Click the button to create a TABLE, a TR and a TD element.</p>';
//    // document.getElementById('root1').innerHTML +=(<button onclick="myFunction()">Try it</button>);
//    document.getElementById('root1').innerHTML += '<p>' + " ---- " + '</p>';
// };

// table();

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