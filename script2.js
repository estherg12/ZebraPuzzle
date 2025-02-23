document.addEventListener("DOMContentLoaded", () =>{
    const vaciar = document.getElementById('volver');
    if (vaciar) {
      vaciar.addEventListener('click', function () {
        window.location.href = 'index.html';
      });
    } 
  })