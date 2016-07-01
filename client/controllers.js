angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService', '$rootScope', '$cookieStore', 
  function ($scope, $location, AuthService, $rootScope, $cookieStore) {

    

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      var userIn = false;
      
      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
          
          
         //$cookieStore.put('loggedIn', true); 

         
         //$rootScope.loggedIn = $cookieStore.get('loggedIn');
         //console.log("Login Cookie: "+$cookieStore.get('loggedIn'));

       
         
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

angular.module('myApp').controller('profileController',
  ['$scope', '$location', 'AuthService','$http','$route',
  function ($scope, $location, AuthService, $http, $route) {

    $scope.vm = this;
    
    $scope.vm.user = {};
    $scope.formData = {};
    $scope.formMacs = {};
    
    console.log("ProfileController")
    AuthService.getProfile()
      .success(function(data){
      
        $scope.vm.user = data;
      })
      .error(function(e){
        console.log(e);
      });
      
      //Reset Password
      $scope.reset = function(){
        $http.post('/user/resetPass/', $scope.formData)
          .success(function(data){
            if(data.success){
              console.log(data.username);
              $location.path('/');
            } else{
              console.log("DID NOT WORK");
            }
          });
      };
      
      //Change Macros STOPPED HERE FINISH MACROS CHANGING FORM
      $scope.changeMacs = function(){
        $http.post('/user/changeMacros/', $scope.formMac)
          .success(function(data){
            if(data.success){
              console.log(data);
              $route.reload();
            } else{
              console.log("DID NOT WORK CHANGING MACROS");
            }
          });
      };
      
      

   
   
}]);

angular.module('myApp').controller('calorieController', 
['$scope', '$http', 'AuthService', 
function ($scope, $http, AuthService){
   
   
  
   
   
   
    $scope.sortType = ''; // sort type
    $scope.sortReverse = false; // set the sort order
    $scope.searchFood = ''; // search filter
    $scope.dateCals = [];
    $scope.total = 0;
    $scope.totalProtein = 0;
    var totalCarb = 0;
    var totalFat = 0;
    

              
  
  
  
    console.log("CalorieController")
    AuthService.getTracker()
      .success(function(data){
        $scope.cals = data;
        console.log("Tracker")
        console.log(data)
      })
      .error(function(e){
        console.log(e);
      });
      
      
      AuthService.getCurrentDateTracker().
        success(function(data){
          $scope.dateCals = data;
          
      
        })
        .error(function(e){
          console.log(e);
        })
      
     $scope.getProteinTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.dateCals.length; i++){
      
        total += ($scope.dateCals[i].protein);
      }
       return total
    }
      
     $scope.getCarbTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.dateCals.length; i++){
      
        total += ($scope.dateCals[i].carb);
      }
       return total
    }
    
     $scope.getFatTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.dateCals.length; i++){
      
        total += ($scope.dateCals[i].fat);
      }
       return total
    }
       
      
      
      
      
      
      
      // when submitting the add form, send the text to the node API
    $scope.createCalorieCalc = function() {
      
        //$scope.calorieCalcs = [];
        //$scope.formData = {};
        $scope.formData.total = (($scope.formData.protein*4) + ($scope.formData.carb*4) +
        ($scope.formData.fat*9));
        $scope.formData.dateMade = Date.now();
        console.log($scope.formData);
        $http.post('/user/macroTrackers', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.cals = data;
                console.log("Post")
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
            
            AuthService.getCurrentDateTracker().
            success(function(data){
            $scope.dateCals = data;
            })
          .error(function(e){
            console.log(e);
            })
      
            
    };
    
    $scope.deleteCalorieCalc = function(id) {
      
      $http.delete('/user/deleteMacTrack/' +id)
        .success(function(data){
          
          $scope.cals = data;
          console.log(data);
          
        })
        .error(function(data){
          console.log('Error: ' +data);
        });
       AuthService.getCurrentDateTracker().
            success(function(data){
            $scope.dateCals = data;
            })
      };
    
      
}]);



  

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService', '$rootScope', '$cookieStore',
  function ($scope, $location, AuthService, $rootScope, $cookieStore) {

    
    $scope.sampleText = "test";
    /*
    AuthService.getTheUser().
    success(function(data){
        
       
        $scope.loggedIn = data.status;
       
        console.log(data)
        console.log($scope.loggedIn)
      })
      .error(function(e){
        console.log(e);
      });*/
    
    
    
    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
         
         
          
          //console.log("Logout Cookie: "+$cookieStore.get('loggedIn'));
          //$cookieStore.put('loggedIn', false);
          //$cookieStore.remove('loggedIn');
          $rootScope.loggedIn = false;
          
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.age,
      $scope.registerForm.weight, $scope.registerForm.password,
      $scope.registerForm.goalProtein, $scope.registerForm.goalCarb,
      $scope.registerForm.goalFat)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Username already in use please try again.";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

angular.module('myApp').controller('macController', 
['$scope', '$http', 'AuthService', 
function ($scope, $http, AuthService){

  AuthService.getTracker();  

}]);