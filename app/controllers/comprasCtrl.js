app.controller("comprasCtrl", function($scope, comprasService, categoriasService, estabelecimentosService, $window){

	//$scope.compras = comprasService.query({}, function() {});
	$scope.msg_erro = "Campo Inválido!";

	$scope.categorias = categoriasService.query({}, function() {});
	$scope.estabelecimentos = estabelecimentosService.query({}, function() {});


	console.log("Estabelecimentos", $scope.estabelecimentos);
	$scope.box = document.getElementsByClassName("box_compra")[0];
	$scope.boxCategorias = document.getElementsByClassName("box_categorias_conteudo")[0];
	$scope.boxCategoriaEditar = document.getElementsByClassName("box_categoria_editar")[0];
	$scope.boxCategoriaAdicionar = document.getElementsByClassName("box_categoria_adicionar")[0];
	$scope.boxEstabelecimentos = document.getElementsByClassName("box_estabelecimentos_conteudo")[0];
	$scope.boxEstabelecimentoEditar = document.getElementsByClassName("box_estabelecimento_editar")[0];
	$scope.boxEstabelecimentoAdicionar =document.getElementsByClassName("box_estabelecimento_adicionar")[0];


	$scope.EditingCartao; //referencia ao cartão que está sendo editado
	$scope.compra_ativo; //guarda informacoes da compra ativa
	$scope.compra_add; //guarda informacoes da compra que sera adicionada
	$scope.categoria_add;
	$scope.estabelecimento_add;

	$scope.meses = [false, false, false, false, false, false, false, false, false, false, false, false];

	//classes css
	$scope.cartao_compra = "cartao_compra";


	$window.onload = function() {//alimenta com compras do mes atual

		var d = new Date();
		angular.element(document.getElementsByClassName("mes_sigla")[d.getMonth()]).triggerHandler('click');

	};


	//SHOWS
	$scope.show_edit_compra = function ($event, compra){

		$scope.erro_edit_compra_valor = "";

		document.getElementsByClassName("box_operacao")[0].innerHTML = "Editando";
		$scope.box.style.display = 'block';

		document.getElementsByClassName("box_editar")[0].style.display = 'block';
		document.getElementsByClassName("box_adicionar")[0].style.display = 'none';

		if($scope.EditingCartao){
			$scope.EditingCartao.style.backgroundColor = "white";
		}

		$scope.EditingCartao = $event.target;

		if($event.target.classList.contains('cartao_compra')) {
			$scope.EditingCartao = $event.target;

		}else if($event.target.classList.contains('cartao_element')) {
			$scope.EditingCartao = $event.target.parentElement;

		}else {
			$scope.EditingCartao = $event.target.parentElement.parentElement;
		}
	    
	    $scope.EditingCartao.style.backgroundColor = "rgba(158, 158, 158, 0.5)";
		

		$scope.compra_ativo = {"CompraID":compra.CompraID,"CategoriaID":compra.CategoriaID,"CategoriaNome":compra.CategoriaNome,"EstabelecimentoID":compra.EstabelecimentoID,"EstabelecimentoNome":compra.EstabelecimentoNome,"Data":compra.Data,"Valor":compra.Valor};


	};

	$scope.show_edit_categoria = function (categoria){

		$scope.erro_edit_categoria_nome = "";

		$scope.categoria_ativo = {"CategoriaID":categoria.CategoriaID,"Nome":categoria.Nome};

		document.getElementsByClassName("box_categoria_editar")[0].style.display = 'block';
	};

	$scope.show_edit_estabelecimento = function (estabelecimento){

		$scope.erro_edit_estabelecimento_nome = "";

		$scope.estabelecimento_ativo = {"EstabelecimentoID":estabelecimento.EstabelecimentoID, "Nome": estabelecimento.Nome};

		document.getElementsByClassName("box_estabelecimento_editar")[0].style.display = 'block';
	};	

	$scope.show_add_compra = function ($event){

		$scope.compra_add = {};
		$scope.erro_add_compra_categoria = "";
		$scope.erro_add_compra_estabelecimento = "";
		$scope.erro_add_compra_valor = "";
	

		changeColor(document.getElementsByClassName("cartao_compra_item"), "white");


		document.getElementsByClassName("box_operacao")[0].innerHTML = "Adicionar";
		$scope.box.style.display = 'block';

		document.getElementsByClassName("box_editar")[0].style.display = 'none';
		document.getElementsByClassName("box_adicionar")[0].style.display = 'block';		

		$event.target.backgroundColor = "#4a8c4d";

	};

	$scope.show_add_categoria = function ($event){

		$scope.erro_add_categoria_nome = "";
		$scope.categoria_add = "";

		document.getElementsByClassName("box_categoria_adicionar")[0].style.display = 'block';

	};

	$scope.show_add_estabelecimento = function ($event){

		$scope.erro_add_estabelecimento_nome = "";
		$scope.estabelecimento_add = "";

		document.getElementsByClassName("box_estabelecimento_adicionar")[0].style.display = 'block';

	};

	$scope.hide_compra = function (){
		$scope.EditingCartao.style.backgroundColor = "white";
		$scope.box.style.display = "none";
	};




	//HIDES
	$scope.hide_categorias = function (){
		if( $scope.boxCategorias.style.display ==  "none"){
			$scope.boxCategorias.style.display = "block";
		}else{
			$scope.boxCategorias.style.display =  "none";
			document.getElementsByClassName("box_categoria_editar")[0].style.display = 'none';
			document.getElementsByClassName("box_categoria_adicionar")[0].style.display = 'none';
		}
		
	};

	$scope.hide_categoria_editar = function (){
		$scope.boxCategoriaEditar.style.display = "none";
	};

	$scope.hide_categoria_adicionar = function (){
		$scope.boxCategoriaAdicionar.style.display = "none";
	};	

	$scope.hide_estabelecimentos = function (){
		if( $scope.boxEstabelecimentos.style.display ==  "none"){
			$scope.boxEstabelecimentos.style.display = "block";
		}else{
			$scope.boxEstabelecimentos.style.display =  "none";
			document.getElementsByClassName("box_estabelecimento_editar")[0].style.display = 'none';
			document.getElementsByClassName("box_estabelecimento_adicionar")[0].style.display = 'none';
		}
	};	

	$scope.hide_estabelecimento_adicionar = function (){
		$scope.boxEstabelecimentoAdicionar.style.display = "none";
	};	

	$scope.hide_estabelecimento_editar = function (){
		$scope.boxEstabelecimentoEditar.style.display = "none";
	};	


	$scope.add_compra = function (compra_add){

		var flag_erro = false;
		$scope.erro_add_compra_categoria = "";
		$scope.erro_add_compra_estabelecimento = "";
		$scope.erro_add_compra_valor = "";


		if( !compra_add.Categoria ){
			$scope.erro_add_compra_categoria = $scope.msg_erro;
			flag_erro = true;
		}


		if( !compra_add.Estabelecimento ){
			$scope.erro_add_compra_estabelecimento = $scope.msg_erro;
			flag_erro = true;
		}


		if(!compra_add.Valor){
			$scope.erro_add_compra_valor = $scope.msg_erro;
			flag_erro = true;
		}

		if (flag_erro) return false;

		var acao = {
			action:"addCompra"
		};

        var compra = {
            CategoriaID : compra_add.Categoria.CategoriaID,
            EstabelecimentoID : compra_add.Estabelecimento.EstabelecimentoID,
            Valor : compra_add.Valor,
            Data : new Date(),
            Categoria: compra_add.Categoria,
            Estabelecimento: compra_add.Estabelecimento
        };

        console.log("ira adicionar: ", compra);

		comprasService.save(acao,compra,
	 		function(data){

	 			compra.CompraID = data;

	 			//aqui
	 			console.log("compra.Data.getMonth()", compra.Data.getMonth());
	 			console.log("$scope.event_mes_clickado", $scope.mes_atual);

	 			if( compra.Data.getMonth() == $scope.mes_atual - 1){
	 				$scope.compras.push(data);
	 			}
	 			

	 			//$scope.compras.sort(function(a, b) {return new Date(b.Data) - new Date(a.Data);});

	 		}, function(erro){
	 			console.log("erro",data);
	 	});

	 	$scope.box.style.display = "none";
	 	changeColor(document.getElementsByClassName("cartao_compra_item"), "white");

	}


	$scope.add_categoria = function (categoria_add){

		var flag_erro = false;
		$scope.erro_add_categoria_nome = "";

		if(!categoria_add){
			$scope.erro_add_categoria_nome = $scope.msg_erro;
			flag_erro = true;
		}

		if (flag_erro) return false;


		
		var acao = {
			action:"addCategoria"
		};

		var categoria = {
			CategoriaID: 0,
			Nome: categoria_add
		}

		console.log("categoria_add", categoria);

		categoriasService.save(acao,categoria,
	 		function(data){

	 			$scope.categorias.push(data);

	 		}, function(erro){
	 			console.log("erro",data);
	 	});

	 	$scope.boxCategoriaAdicionar.style.display = "none";

	}

	$scope.add_estabelecimento = function (estabelecimento_add){

		var flag_erro = false;
		$scope.erro_add_estabelecimento_nome = "";

		if(!estabelecimento_add){
			$scope.erro_add_estabelecimento_nome = $scope.msg_erro;
			flag_erro = true;
		}

		if (flag_erro) return false;

		
		var acao = {
			action:"addEstabelecimento"
		};

		var estabelecimento = {
			EstabelecimentoID: 0,
			Nome: estabelecimento_add
		}

		console.log("estabelecimento_add", estabelecimento);

		estabelecimentosService.save(acao,estabelecimento,
	 		function(data){

	 			$scope.estabelecimentos.push(data);

	 		}, function(erro){
	 			console.log("erro",data);
	 	});

	 	$scope.boxEstabelecimentoAdicionar.style.display = "none";

	}



	$scope.delete_compra = function (compra_deletar){
		console.log("compra a ser deletada: ", compra_deletar);

	    //if(confirm("Apagar compra? \nCategoria: "+compra_deletar.CategoriaNome+"\nEstabelecimento: "+compra_deletar.EstabelecimentoNome+"\nValor: "+compra_deletar.Valor))
	    //{
		 	comprasService.delete({action: "deleteCompra", id: compra_deletar.CompraID },
		 		function(){

					$scope.compras = $scope.compras.filter(function (compra){
										if(compra.CompraID != compra_deletar.CompraID) return compra;
									});


					$scope.hide_compra();
					$scope.fecharMdalExcluir_compra();

		 		}, function(erro){
		 			console.log(erro);
		 	});
	    //}

	};

	$scope.delete_categoria = function (categoria_deletar){
		console.log("compra a ser deletada: ", categoria_deletar.Nome);

	    //if(confirm("Apagar Categoria? \nCategoria: "+categoria_deletar.Nome))
	    //{
		 	categoriasService.delete({action: "deleteCategoria", id: categoria_deletar.CategoriaID },
		 		function(){

					$scope.categorias = $scope.categorias.filter(function (categoria){
										if(categoria.CategoriaID != categoria_deletar.CategoriaID) return categoria;
									});

					if($scope.dependenciasCategoriaFiltradas.length){
						$scope.filtrar_mes($scope.event_mes_clickado);
					}

					$scope.hide_categoria_editar();
					$scope.fecharMdalExcluir_categoria();

		 		}, function(erro){
		 			console.log(erro);
		 	});
	    //}

	};

	$scope.delete_estabelecimento = function (estabelecimento_deletar){

	    //if(confirm("Apagar Estabelecimento? \nEstabelecimento: "+estabelecimento_deletar.Nome))
	    //{
		 	estabelecimentosService.delete({action: "deleteEstabelecimento", id: estabelecimento_deletar.EstabelecimentoID },
		 		function(){

					$scope.estabelecimentos = $scope.estabelecimentos.filter(function (estabelecimento){
										if(estabelecimento.EstabelecimentoID != estabelecimento_deletar.EstabelecimentoID) return estabelecimento;
									});


					if($scope.dependenciasEstabelecimentoFiltrados.length){
						$scope.filtrar_mes($scope.event_mes_clickado);
					}

					$scope.hide_estabelecimento_editar();
					$scope.fecharMdalExcluir_estabelecimento();

		 		}, function(erro){
		 			console.log(erro);
		 	});
	    //}

	};


	$scope.edit_compra = function (compra_ativo){

		console.log("compra_ativo", compra_ativo);

		var flag_erro = false;
		$scope.erro_edit_compra_valor = "";


		if(!compra_ativo.Valor){
			$scope.erro_edit_compra_valor = $scope.msg_erro;
			flag_erro = true;
		}

		if (flag_erro) return false;


		var acao = {
			action:"editCompra",
			id:compra_ativo.CompraID
		};

		$scope.categorias.forEach(function(entry) {
    		if(entry.CategoriaID==compra_ativo.CategoriaID){
    			compra_ativo.CategoriaNome = entry.Nome;
    		}
		});

		$scope.estabelecimentos.forEach(function(entry) {
    		if(entry.EstabelecimentoID==compra_ativo.EstabelecimentoID){
    			compra_ativo.EstabelecimentoNome = entry.Nome;
    		}
		});

		
		var estabelecimento = {
			EstabelecimentoID : compra_ativo.EstabelecimentoID,
			Nome: compra_ativo.EstabelecimentoNome
		}

		var categoria = {
			CategoriaID : compra_ativo.CategoriaID,
			Nome: compra_ativo.CategoriaNome
		}

		var compraNova =
		{
			CompraID: compra_ativo.CompraID,
			
			Categoria: categoria,
			CategoriaNome: compra_ativo.CategoriaNome,
			CategoriaID: compra_ativo.CategoriaID,

			Estabelecimento: estabelecimento,
			EstabelecimentoNome: compra_ativo.CategoriaNome,
			EstabelecimentoID: compra_ativo.EstabelecimentoID,

			Valor: compra_ativo.Valor,
			Data: compra_ativo.Data
		};

		console.log("compraEdit", compraNova);

		comprasService.update(acao,compraNova,
	 		function(data){
	 			console.log("sucesso",data);

	 		function diferente(objeto_compra) {
  				return objeto_compra.CompraID != compraNova.CompraID;
			}

			$scope.compras = $scope.compras.filter(function (compra){
										if(compra.CompraID == data.CompraID){
											compra.EstabelecimentoID = data.EstabelecimentoID;
											compra.EstabelecimentoNome =  data.EstabelecimentoNome;
											compra.CategoriaID = data.CategoriaID;
											compra.CategoriaNome = data.CategoriaNome;
											compra.Valor = data.Valor;
										}
										return compra;
									});



	 		}, function(erro){
	 			console.log("erro",data);
	 	});

	 	$scope.box.style.display = "none";
	 	changeColor(document.getElementsByClassName("cartao_compra_item"), "white");
	}

	$scope.edit_categoria = function (categoria_ativo){

		var flag_erro = false;
		$scope.erro_edit_categoria_nome = "";

		if(!categoria_ativo){
			$scope.erro_edit_categoria_nome = $scope.msg_erro;
			flag_erro = true;
		}

		if (flag_erro) return false;


		var acao = {
			action:"editCategoria",
			id:categoria_ativo.CategoriaID
		};


		categoriasService.update(acao,categoria_ativo,
	 		function(data){
	 			console.log("sucesso",data);

			$scope.categorias = $scope.categorias.filter(function (categoria){
										if(categoria.CategoriaID == data.CategoriaID){
											categoria.Nome = data.Nome;
										}
										return categoria;
									});

			$scope.filtrar_mes($scope.event_mes_clickado);

	 		}, function(erro){
	 			console.log("erro",data);
	 	});

	 	$scope.boxCategoriaEditar.style.display = "none";
	}

	$scope.edit_estabelecimento = function (estabelecimento_ativo){

		var flag_erro = false;
		$scope.erro_edit_estabelecimento_nome = "";

		if(!estabelecimento_ativo){
			$scope.erro_edit_estabelecimento_nome = $scope.msg_erro;
			flag_erro = true;
		}

		if (flag_erro) return false;

		var acao = {
			action:"editEstabelecimento",
			id:estabelecimento_ativo.EstabelecimentoID
		};


		estabelecimentosService.update(acao,estabelecimento_ativo,
	 		function(data){
	 			console.log("sucesso",data);

			$scope.estabelecimentos = $scope.estabelecimentos.filter(function (estabelecimento){
										if(estabelecimento.EstabelecimentoID == data.EstabelecimentoID){
											estabelecimento.Nome = data.Nome;
										}
										return estabelecimento;
									});


	 		}, function(erro){
	 			console.log("erro",data);
	 	});

	 	$scope.boxEstabelecimentoEditar.style.display = "none";
	}

	$scope.filtrar_mes = function($event){

		$scope.event_mes_clickado = $event;

		var mes_html = $event.target.innerHTML.replace(/&nbsp;/g,'');

		console.log(mes_html);

		var mes = 0;
		var meses = $scope.meses;

		for (var i=0; i < meses.length; i++){
			meses[i] = false;
		}

		switch(mes_html){
			case "Jan":
				mes = 1;
				mes_atual = 'Compras de Janeiro de 2017';
				break;
			case "Fev":
				mes = 2;
				mes_atual = 'Compras de Fevereiro de 2017';
				break;
			case "Mar":
				mes = 3;
				mes_atual = 'Compras de Março de 2017';
				break;
			case "Abr":
				mes = 4;
				mes_atual = 'Compras de Janeiro de 2017';
				break;
			case "Mai":
				mes = 5;
				mes_atual = 'Compras de Maio de 2017';
				break;
			case "Jun":
				mes = 6;
				mes_atual = 'Compras de Junho de 2017';
				break;
			case "Jul":
				mes = 7;
				mes_atual = 'Compras de Julho de 2017';
				break;
			case "Ago":
				mes = 8;
				mes_atual = 'Compras de Agosto de 2017';
				break;
			case "Set":
				mes = 9;
				mes_atual = 'Compras de Setembro de 2017';
				break;
			case "Out":
				mes = 10;
				mes_atual = 'Compras de Outubro de 2017';
				break;
			case "Nov":
				mes = 11;
				mes_atual = 'Compras de Novembro de 2017';
				break;
			case "Dez":
				mes = 12;
				mes_atual = 'Compras de Dezembro de 2017';
				break;
		}

		$scope.mes_atual = mes;

		if(mes>0){

			document.getElementsByClassName("mes_label")[0].innerHTML = mes_atual;
			meses[mes-1] = true;

			var acao = {
				action:"getCompraByMonth",
				id:mes
			};

			console.log(mes);

			comprasService.query(acao,mes,
				 		function(data){
				 			console.log("sucesso",data);
							$scope.compras = data;
							$scope.compra_add = $scope.compras[0];
							console.log("preencheu");

				 		}, function(erro){
				 			console.log("erro",data);
				 	});

		}else{

			console.log("mes erro");
		}

	}

	$scope.abrirModalExcluir_compra= function(){
		var modal = document.getElementsByClassName('modalExcluir_compra')[0];
		modal.style.display = "block";
	}

	$scope.fecharMdalExcluir_compra= function(){
		var modal = document.getElementsByClassName('modalExcluir_compra')[0];
		modal.style.display = "none";
	}

	$scope.abrirModalExcluir_categoria= function(){
		var modal = document.getElementsByClassName('modalExcluir_categoria')[0];
		modal.style.display = "block";
	}

	$scope.fecharMdalExcluir_categoria= function(){
		var modal = document.getElementsByClassName('modalExcluir_categoria')[0];
		modal.style.display = "none";
	}

	$scope.abrirModalExcluir_estabelecimento= function(){
		var modal = document.getElementsByClassName('modalExcluir_estabelecimento')[0];
		modal.style.display = "block";
	}

	$scope.fecharMdalExcluir_estabelecimento= function(){
		var modal = document.getElementsByClassName('modalExcluir_estabelecimento')[0];
		modal.style.display = "none";
	}

});




