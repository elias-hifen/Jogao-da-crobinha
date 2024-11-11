const canvas = document.getElementById('crobinhaCanvas');
const ctx = canvas.getContext('2d')

//Tamanho
const tamanhos = 20;

let crobinha = [{ x: 10, y: 10 }];
let direction = 'right';
let comida = {};
let pontos = 0;
let velocidade = 170;

//Funções
function drawcrobinha(){
    ctx.fillStyle = 'Darkgreen';
    crobinha.forEach(segment => {
        ctx.fillRect(segment.x * tamanhos, segment.y * tamanhos, tamanhos, tamanhos);
        ctx.strokeStyle = '#1A6B19';
        ctx.strokeRect(segment.x * tamanhos, segment.y * tamanhos, tamanhos, tamanhos);
    })    
}
function draw(){
    cenario();
    drawcrobinha();
    drawFood();
    andar();
    pontuis();
}
comida = comidaposicao();
let intervalo = setInterval(draw, 150);
function andar(){
    const cabeca = {x: crobinha[0].x, y: crobinha[0].y}
    switch (direction){
        case 'up':
            cabeca.y--;
            break;
        case 'down':
            cabeca.y++;
            break;
        case 'right':
            cabeca.x++;
            break;
        case 'left':
            cabeca.x--;
            break;
    }
    if (cabeca.x < 0 || cabeca.x >= canvas.width / tamanhos || cabeca.y < 0 || cabeca.y >= canvas.height / tamanhos){
        clearInterval(intervalo);
        alert('Você morreu! Você bateu na borda');
        return;
    }
    if (crobinha.some(segment => segment.x === cabeca.x && segment.y === cabeca.y)){
        clearInterval(intervalo);
        alert('Você morreu! Acertou seu próprio corpo');
        return;
    }
    if (cabeca.x === comida.x && cabeca.y === comida.y){
        comida = comidaposicao();
        pontos += 1;
        if (pontos % 5 === 0) {
            velocidade *= 0.7;
            clearInterval(intervalo);
            intervalo = setInterval(draw, velocidade);
        }
    } else {
        crobinha.pop();
    }
    crobinha.unshift(cabeca);
}
function cenario(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let o = 0; o < canvas.height/tamanhos; o++){
        for (let p = 0; p < canvas.width/tamanhos; p++){
            ctx.fillStyle = (o + p) % 2 === 0 ? "#2B2B2B" : "#cdcdcd";
            ctx.fillRect(o * tamanhos, p * tamanhos, tamanhos, tamanhos);
        }
    }
}
function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(comida.x * tamanhos, comida.y * tamanhos, tamanhos, tamanhos);
}
function comidaposicao(){
    let comidaX, comidaY;
    do {
        comidaX = Math.floor(Math.random() * (canvas.width / tamanhos));
        comidaY = Math.floor(Math.random() * (canvas.height / tamanhos));
    } while (crobinha.some(segment => segment.x === comidaX && segment.y === comidaY));
    return {x: comidaX, y: comidaY};
}
function pontuis() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect (0, 0, 200, 40);
    ctx.fillStyle = 'White';
    ctx.font = "bold 40px Arial";
    ctx.fillText(`Pontos: ${pontos}`, 10, 35);
}


//eventos
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w':
            if (direction !== 'down') direction = 'up';
            console.log("para cima");
            break;
        case 's':
            if (direction !== 'up') direction = 'down';
            console.log("para baixo");
            break;
        case 'a':
            if (direction !== 'right') direction = 'left';
            console.log("para a esquerda");
            break;
        case 'd':
            if (direction !== 'left') direction = 'right';
            console.log("para a direita");
            break;
    }
})

setInterval(draw, velocidade);
