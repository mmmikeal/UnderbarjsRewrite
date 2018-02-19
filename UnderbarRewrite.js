(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val)
  {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  //Return an array of the first n elements of an array. If n is undefined,
  //return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var length = array.length;
    if (n > length)
      return array;
    return n === undefined? array[length-1]: array.slice(length-n,length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection))
    {
      for (var i = 0; i < collection.length; i ++)
      {
        iterator(collection[i], i, collection);
      }
    }

    else //if not array, must be object
      for (var key in collection)
      {
        iterator(collection[key], key, collection);
      }


  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {

    // _.reduce(collection, function, accumulator


    return _.reduce(collection, function(total, item){
      if (!!test(item))
      {
        total.push(item);
      }
      return total;
     // return total + item;

    },[]);

}

/*  THIS COMMENTED CODE WORKS FOR FILTER USING EACH!!!!!!!
      var trueArray = [];
      _.each(collection,function(item, index){ //oh nice .each checks for objects too
        if (test(item) === true)
        {
          trueArray.push(item)
        }
      }
      )
        return trueArray;
    };
    */

    //its reduce time bitches

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {

   return _.filter(collection, function(item){

      return !(test(item));
    }); //reject's test should be the opposite test which i pass into filter

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var answer = [];

      _.each(array, function(item,index){
      if ((_.indexOf(array,item) === index)) //indexOf only returns the first index!!
      {
        answer.push(item);
      }
    });
      return answer;

    };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    return _.reduce(collection,function(total,item){

      total.push(iterator(item));
      return total;
     //return total + item;


    },[]);



    /* THIS COMMENTED OUT CODE WORKS FOR MAP USING EACH!!!
    var storedEach = [];
    _.each(collection,function(item){
      storedEach.push(iterator(item));
    })
    return storedEach;

    */
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
   return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {


        if (arguments.length === 2)
        {
          accumulator = _.first(collection);
          collection = _.last(collection,collection.length-1);
        }

      _.each(collection, function(item){
        accumulator = iterator(accumulator,item);
      });

return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return wasFound;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var booIte = false;
    if (arguments.length === 1)
    {
        booIte = true;
    }
    return _.reduce(collection, function(acc, item){
      if (acc === false)
      {
        return false;
      }

      if (booIte)
        return item;

      return !!iterator(item); //takes null
    },true);
    };
    // TIP: Try re-using reduce() here.


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var noIte = false;
    if (arguments.length === 1)
      noIte = true;

    return !(_.every(collection,function(truth){

      if (noIte === true)
        return !truth;

      return !iterator(truth);

    }));
      // the opposite of every is NONE, if NONE fails, NONE implies that SOME of the statements passed
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
// in the example there are 3 arguments

    _.each(arguments,function(arguments1) //for each of the arguments which are objects, must get into the key values
    {
        _.each(arguments1,function(value,key) //this format is backwards because of the documentation in each
        {
            obj[key] = value;
        });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    // turn arguments into an array
    var argArray = [];
   _.each(arguments,function(arguments1) //for each of the arguments which are objects, must get into the key values
    {
      argArray.push(arguments1);
    });
      _.each(argArray,function(arguments2)
      {
        _.each(arguments2,function(value,key) //this format is backwards because of the documentation in each
        {
          if (obj[key] === undefined) //strange, i think this is defined as "doesnt write a VALUE that already exists"
          {
            obj[key] = value;
          }
        });
    });
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var alreadyObj ={};   //create an object where key = func parameters, value is result
    var alreadyCalled = false;
    var result;

      return function() {

      var strArg = JSON.stringify(arguments); //seriously?
      if (alreadyObj[strArg] != undefined)
        {
          alreadyCalled = true;
          return alreadyObj[strArg];
        }

      if (!alreadyCalled)
      {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.

        result = func.apply(this, arguments);

        alreadyObj[strArg] = result;
        return result;

      }
      // The new function always returns the originally computed result.

    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var argArray = [];
    var result;
    _.each(arguments,function(item){
      argArray.push(item);
    });

    var input = argArray.slice(2,argArray.length);  //check this later

   setTimeout(function(){
    return func.apply(this,input);
  },wait);
/*
   var start = new Date().getTime();
    var end = start + wait;
    while (start < end){
      start = new Date().getTime();
    }
*/ //this didnt work idk why fUCK
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var arrayCop = array.slice(0,array.length);
    var arrayCop2 = array.slice(0,array.length);
    //Knuth Method
    /* scale through each element in the array (_.each)
      *randomIndex = Math.floor(Math.random()*currentIndex); COOL WTF
      *swap the random index value with the current one
    */
     _.map(arrayCop,function(item){
      var index = _.indexOf(arrayCop,item);
      var randomIndex = Math.ceil(Math.random()*index);
      arrayCop[index] = arrayCop2[randomIndex];
      arrayCop2[randomIndex] = item;

    });
    return arrayCop;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

if (typeof functionOrKey === "function")
{
 return _.map(collection,function(item){

      return functionOrKey.apply(item); //makes item the THIS in functionOrKey

    });


}

else
{
return _.map(collection,function(item){

      return item[functionOrKey].apply(item);

    });

}

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    if (typeof iterator === "function")
    {
      return collection.sort(function(a,b){
        return iterator(a)-iterator(b);
      });
    }

    else
      return collection.sort(function(a,b){
        return a[iterator] - b[iterator];
      });
/*
    return _.map(collection,function(){

      return sort()
    }); */

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var longest = 0;
    var longest =  _.reduce(args,function(a,b){
        return a.length < b.length ? b : a
    });


    var sol = _.map(args[longest], function(value,i){
        return _.map(args,function(array){return array[i]})
    });


    return sol;
    //combine each argument at the mapped index
    //return map

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var cache = [];

    while(nestedArray.length)
    {
      var first = nestedArray.shift();
      if(first instanceof Array === true)
        nestedArray = first.concat(nestedArray);

      else
        cache.push(first);
    }
  return cache;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var args = Array.prototype.slice.call(arguments);

    //reduce through arguments, accumulator will be first array
    //foreach through each element of accumulator, check if they are in each CURR array from the reduce statement


  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    /*
    var args = Array.prototype.slice.call(arguments);

    _.reduce(args,function(acc,current){



    });
*/
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };

}()
);
