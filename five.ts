function identify<T>(arg: T) {
    return arg;
}

let output1 = identify<string>('my String'); //方式一
let output2 = identify('my String'); //方式二



//泛型接口

interface GenericIdentityFn<T> {
    (arg: T): T
}

function identity<T>(arg: T): T{
    return arg
} 

let myIdentity: GenericIdentityFn<number> = identity;

//myIdentity('string')// error
myIdentity(123) //correct


class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

//定义成number类型

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

console.log(myGenericNumber.add(myGenericNumber.zeroValue, 2));

//定义成string类型

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));


//错误
//function loggingIdentity<T>(arg: T): T {
  //  console.log(arg.length);  // Error: T doesn't have .length
//    return arg;
//}
//1 T[]
//function loggingIdentity<T>(arg: T[]): T[] {
  //  console.log(arg.length);  // Array has a .length, so no more error
 //   return arg;
//}
//2  Array
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}


function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
//getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

//用泛型写工厂类型
function create<T>(c: {new(): T; }): T {
    return new c();
}

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
  constructor(){
    super();
    this.keeper = new BeeKeeper();
  }
}

class Lion extends Animal {
  keeper: ZooKeeper;
  constructor(){
    super();
    this.keeper = new ZooKeeper();
  }
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!


//Keyof 

//function prop(obj: object, key: string) {
//  return obj[key];
//}

//function prop(obj: object, key: string) {
//  return (obj as any)[key];
//}

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

//Typeof
//typeof操作符用于获取变量的类型。因此这个操作符的后面接的始终是一个变量，且需要运用到类型定义当中.
type Person = {
  name: string;
  age: number;
}

let man: Person = {
  name: "jjchen",
  age: 30
}

type Human = typeof man;