var host = "http://localhost:53007";

app.factory('comprasService', function($resource) {
  var data = $resource(host+'/api/Compras/:action/:id', { action: '@action', id: '@id'}, {
      	update: {method:'PUT'}
      });
      return data;
});

app.factory('categoriasService', function($resource) {
  var data = $resource(host+'/api/Categorias/:action/:id', { action: '@action', id: '@id'}, {
      	update: {method:'PUT'}
      });
      return data;
});

app.factory('estabelecimentosService', function($resource) {
  var data = $resource(host+'/api/Estabelecimentos/:action/:id', { action: '@action', id: '@id'}, {
      	update: {method:'PUT'}
      });
      return data;
});