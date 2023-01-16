export function uniqKeysFromObjects(obj1, obj2) {
    let arr1 = Object.keys(obj1).sort();
    let arr2 = Object.keys(obj2).sort();
    let arrSame = arr1.filter((num) => arr2.includes(num));
    let arr1Unic = arr1.filter((num) => !arr2.includes(num));
    let arr2Unic = arr2.filter((num) => !arr1.includes(num));
  
    let allKeysArray = [...arrSame, ...arr1Unic, ...arr2Unic];
  
    return allKeysArray;
}