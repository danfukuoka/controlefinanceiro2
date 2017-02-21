function changeColor(elementos, color){

    for(var i=0, len=elementos.length; i<len; i++)
    {
        elementos[i].style["background-color"] = color;
    }
}

// Get the modal
var modalCompra = document.getElementsByClassName('modalExcluir_compra')[0];
var modalCategoria = document.getElementsByClassName('modalExcluir_categoria')[0];
var modalEstabelecimento = document.getElementsByClassName('modalExcluir_estabelecimento')[0];

// Get the <span> element that closes the modal
var spanCompra = document.getElementsByClassName("close_compra")[0];
var spanCategoria = document.getElementsByClassName("close_categoria")[0];
var spanEstabelecimento = document.getElementsByClassName("close_estabelecimento")[0];

// When the user clicks on <span> (x), close the modal
spanCompra.onclick = function() {
    modalCompra.style.display = "none";
}
spanCategoria.onclick = function() {
    modalCategoria.style.display = "none";
}
spanEstabelecimento.onclick = function() {
    modalEstabelecimento.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalCompra) {
        modalCompra.style.display = "none";
    }else if(event.target == modalCategoria) {
        modalCategoria.style.display = "none";
    }else if(event.target == modalEstabelecimento) {
        modalEstabelecimento.style.display = "none";
    }

}
