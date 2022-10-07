localStorage.clear();
const meses = ['Enero', 'Febrero', 'Marzo'];

localStorage.setItem('meses', JSON.stringify(meses));
console.log(JSON.parse(localStorage.getItem('meses')));

setTimeout(() => {
    
    meses.push('Octubre');
    
    localStorage.setItem('meses', JSON.stringify(meses));
    console.log(JSON.parse(localStorage.getItem('meses')));
}, 3000);