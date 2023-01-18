export function uniqKeysFromObjects(obj1, obj2) {
  let arr1 = Object.keys(obj1);
  let arr2 = Object.keys(obj2);
  let arr2Unic = arr2.filter((num) => !arr1.includes(num));

  return [...arr1, ...arr2Unic];
}

export function DefindMyTypeOf(obj) {
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
