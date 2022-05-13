'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
//////////////////////////////////////////////////////////////////////////
// 142. Simple Array Methods  SLICE SPLICE REVERSE CONCAT JOIN

// SLICE
// let arr = "abcde".split('')
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b', 'c']
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']
console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']

// SPLICE // it takes off the values of the variable
console.log(arr.splice(2)); // ['c', 'd', 'e']
console.log(arr); // ['a', 'b']
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(-1)); // ['e']
console.log(arr); // ['a', 'b', 'c', 'd']
console.log(arr.splice(1,2)); // ['b', 'c']
console.log(arr); // ['a', 'd']

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = 'jihgf'.split(''); 
console.log(arr2); // ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// CONCAT
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// JOIN 
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j



//////////////////////////////////////////////////////////////////////////
// 143. The new at Method AT

const arr = [23, 11, 64];
console.log(arr[0]); // 23
console.log(arr.at(0)) // 23 /////////// ATENCION- ESTO ES NUEVO! /////////////////

// getting last array element
console.log(arr[arr.length -1]); // 64
console.log(arr.slice(-1)[0]); // 64 // we get an array [64] and then we extract the first value using [0]
console.log(arr.at(-1)) // 64
console.log(arr.at(-2)) // 11

console.log('Jonas'.at(0)); // J
console.log('Jonas'.at(-1)); // s


//////////////////////////////////////////////////////////////////////////
// 144. Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdraw ${Math.abs(movement)}`); // abs = absolute
  }
}

console.log('------FOREACH-----------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdraw ${Math.abs(movement)}`); // abs = absolute
  }
});

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`); // abs = absolute
  }
}

console.log('------FOREACH-----------');
movements.forEach(function (mov, i, arr) {
  // the order is important: the first element is the current element, the second the current index and the third one always the entire array
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(mov)}`); // abs = absolute
  }
});

// And this is how we loop over arrays with the forEach method.
// Now when should you use forEach and when should you use the for of loop.
// Well one fundamental difference between the two of them is that you cannot break out of a forEach loop.
// So the continue and break statements do not work in a forEach loop at all.
// So instead, forEach will always loop over the entire array and there is nothing that you can do about it.
// So if you really need to break out of a loop then you have to keep using the for of loop, but other than that it really comes down to your personal preference.
// Just like so many other things in JavaScript.

//////////////////////////////////////////////////////////////////////////
// 145. forEach With Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// MAP
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// I got:
// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

// SET
const correnciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(correnciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}
correnciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); // USD: USD GBP: GBP EUR: EUR // that means that key and value are the same, key doesnt make sense
});

/////////////////////////////////////////////////////////////////////
// 146. PROJECT: "Bankist" App

/////////////////////////////////////////////////////////////////////
// 147. Creating DOM Elements

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // this delete the default html text
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////////////////////////
// 148. Coding Challenge #1

let juliaData1 = [3, 5, 2, 12, 7];
let kateData1 = [4, 1, 15, 8, 3];

let juliaData2 = [9, 16, 6, 8, 3];
let kateData2 = [10, 5, 6, 1, 4];

let juliaKateData = [];

const checkDogs = function (dogsJulia, dogsKate) {
  const juliaDataCorrected = dogsJulia.slice(1, -2);
  juliaKateData = juliaDataCorrected.concat(dogsKate);
  console.log(juliaKateData);
};
checkDogs(juliaData1, kateData1);

// const checkDogs2 = function (dogsJulia, dogsKate) {
//   juliaData1 = dogsJulia.slice(1, -2);
//   let juliaKateData1 = [...juliaData1, ...dogsKate];
//   console.log(juliaKateData1);
// };
// juliaData1 = [3, 5, 2, 12, 7];
// checkDogs2(juliaData1, kateData1);
juliaKateData.forEach(function (age, i) {
  // the order is important: the first element is the current element, the second the current index and the third one always the entire array
  if (age >= 3) {
    console.log(`Dog number ${i + 1} is a dog and is ${age} years old`);
  } else {
    console.log(`Dog number ${i + 1} is still a puppy 🐶`); // abs = absolute
  }
});
*/
/////////////////////////////////////////////////////////////////
// 149. Data Transformations: map, filter, reduce

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// here in the map method, we use a function to solve this problem of creating a new array.
// this is more in line with functional programming.
const movementsUSD = movements.map(function (mov) {
  return Math.round(mov * eurToUsd); // [220, 495, -440, 3300, -715, -143, 77, 1430]
  // return 23; // [23, 23, 23, 23, 23, 23, 23, 23]
});

console.log(movements);
console.log(movementsUSD);

// while here we simply loop over one array and then manually create a new one.
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

console.log(movementsUSDfor);

// ############################################################
// ########### ARRAY FUNTION !!!!! ############################
// ############################################################
console.log('---------ARRAY FUNTION--------');
const movementsUSDarray = movements.map(mov => Math.round(mov * eurToUsd));
console.log(movementsUSDarray);

const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdraw ${Math.abs(mov)}`; // abs = absolute
  }
});
console.log(movementsDescriptions);

// ############################################################
// ########### ARRAY FUNTION !!!!! ############################
// ############################################################
const movementsDescriptionsArray = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptionsArray);
