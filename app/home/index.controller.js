(function(){

function GetAllService($http){
	
	function GetAll(){
      return $http.get('/products');
    }
	
    var factory = {
      GetAll: GetAll
    };

    return factory;	
  }
  
  function GetByIdService($http){
	
	function GetById(id){
      return $http.get('/product/' + id);
    }

    var factory = {
      GetById: GetById
    };

    return factory;
  }
  
  function CreateService($http){
	
	function Create(data){
      return $http.post('/product/new', data);
    }

    var factory = {
      Create: Create
    };

    return factory;

  }
     
function Controller($scope, GetAllService,GetByIdService,CreateService) {

console.log("I am in controller");
   
	var refresh = function() {
		var promise = GetAllService.GetAll();
		promise.then(function(response){
		$scope.product = response.data;
		$scope.contact = "";
		});
	};
	refresh();

	$scope.addContact = function() {
		var promise = CreateService.Create($scope.contact);
		promise.then(function(){		  
			refresh();
		}); 
	};

	$scope.edit = function(id) {
		var promise = GetByIdService.GetById(id);
		promise.then(function(response){
			$scope.contact = response.data;
			let details = 'Детальная информация о товаре \n\n'+'название товара:   '+response.data.name+'\n'+'цена товара:   '+response.data.price+'\n'+'описание товара:   '+response.data.description+'\n'+'создан:   '+response.data.createdBy+'\n';
			confirm(details);
			jQuery("#contactAdd").show();
		});
	};  

	$scope.deselect = function() {
		  $scope.contact = "";
	}

};//Controller

angular
.module('app', [])
.factory('GetAllService', GetAllService)
.factory('GetByIdService', GetByIdService)
.factory('CreateService', CreateService)
.controller('AppCtrl', Controller);
})();