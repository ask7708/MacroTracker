angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getProfile: getProfile,
      getMac : getMac,
      getTheUser : getTheUser,
      getTracker : getTracker,
      isLoggedIn : isLoggedIn,
      getCurrentDateTracker, getCurrentDateTracker
    });
    
function isLoggedIn() {

  if(user) {

    return true;
  } else {
    return false;
  }
}

function getProfile() {
 
 $http.get('/user/profile')
  // handle success
  .success(function (data) {
    
    console.log("Profile Data: "+data); 
    
  })
  
  return $http.get('/user/profile');

}

function getMac() {
 
 $http.get('/user/macroTrackers')
  // handle success
  .success(function (data) {
    
    console.log("Calorie Data: "+data); 
    
  })
  
  return $http.get('/user/macroTrackers');

  
  
}

function getTracker(){

$http.get('/user/macroTrackers')
.success(function(data){

  console.log("getTracker: "+JSON.stringify(data, null, "\t"))
  
})

return $http.get('/user/macroTrackers')

}


function getCurrentDateTracker(){

$http.get('/user/macrosByDate')
.success(function(data){

  console.log("getByDateTracker: "+JSON.stringify(data, null, "\t"))
  
})

return $http.get('/user/macrosByDate')

}






function getTheUser(){
  
 
   return $http.get('/user/status')
 
  
}

function getUserStatus() {
  return $http.get('/user/status')
  // handle success
  .success(function (data) {
    
   
    if(data.status){
      user = true;
      return true;
    } else {
     
      user = false;
      return false;
      
    }
    
  })
  // handle error
  .error(function (data) {
    user = false;
  });

}




function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/login',
    {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        console.log(data.status)
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });


  // return promise object
  return deferred.promise;

}

function logout() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/user/logout')
    // handle success
    .success(function (data) {
        
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}





function register(username, age, weight, password, goalProtein, goalCarb, goalFat) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/register',
    {username: username, age: age, weight: weight, password: password,
     goalProtein: goalProtein, goalCarb: goalCarb, goalFat:goalFat  
    })
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){

        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

}]);

