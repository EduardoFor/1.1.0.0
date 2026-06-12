var habId = 'Tecnologia';
var atrId = 'Forca';
var totalXP = document.getElementById('XP-pool').value;
var numLados = document.getElementById('NumLados').value;
var numDice
var antDice
var numinaDice
var dmg
var forma = 'homnideoCheck';
var ImgFormaHumana
var ImgFormaGlabro
var ImgFormaCrinos
var ImgFormaHispo
var ImgFormaLupino
var ImgFormaDefault
//diminui o numero de dados a serem rolados
var reduceDice = 0;
var noReduceDice = 0;

const textColor = document.getElementById('textColor');
const mainColor = document.getElementById('mainColor');
const secondaryColor = document.getElementById('secondaryColor');
const contorno = document.getElementById('retirarContorno');
const negarDebuff = document.getElementById('retirarDebuff');
const damageDebuff = document.getElementById('vitalidadeTable');
const containerAtr = document.getElementById('atrTable');
const containerHab = document.getElementById('habTable');
const containAntDice = document.getElementById('antecedenteTable');
const containerForma = document.getElementById('formaTable');
const qtdDice = document.getElementById('NumDice');
const tipoPonto = document.getElementById("tipoPonto");
const containerTalentos = document.getElementById('talentosCol');
const containerPericias = document.getElementById('periciasCol');
const containerConhecimentos = document.getElementById('conhecimentosCol');

damageDebuff.addEventListener('change', function(event) {
dmg = event.target.id;
});

const imgHomnideo = document.getElementById('img-homnideo');
const imgGlabro = document.getElementById('img-glabro');
const imgCrinos = document.getElementById('img-crinos');
const imgHispo = document.getElementById('img-hispo');
const imgLupino = document.getElementById('img-lupino');

containerForma.addEventListener('change', function(event) {
if (event.target.checked){
	forma = event.target.id;
	switch (forma) {
		case 'homnideoCheck':
			document.getElementById('formaImg').src = imgHomnideo.value;
			console.log("imagem indexada: " + imgHomnideo.value);
			break;
		case 'glabroCheck':	
			document.getElementById('formaImg').src = imgGlabro.value;
			console.log("imagem indexada: " + imgGlabro.value);
			break;
		case 'crinosCheck':
			document.getElementById('formaImg').src = imgCrinos.value;
			console.log("imagem indexada: " + imgCrinos.value);
			break;
		case 'hispoCheck':
			document.getElementById('formaImg').src = imgHispo.value;
			console.log("imagem indexada: " + imgHispo.value);
			break;
		case 'lupinoCheck':
			document.getElementById('formaImg').src = imgLupino.value;
			console.log("imagem indexada: " + imgLupino.value);
			break;
	}
	desmarcarCheckboxes(forma);
} else {
	forma = 0;
}
});

// Adiciona um event listener de clique ao container
containerAtr.addEventListener('change', function(event) {
// Verifica se o elemento clicado tem um ID
if (event.target.checked){
	atrId = event.target.id;
	desmarcarCheckboxes(atrId);
	console.log(document.getElementById(atrId).value);
} else {
	atrId = 0;
}
});

// Adiciona um event listener de clique ao container
containerHab.addEventListener('change', function(event) {
// Verifica se o elemento clicado tem um ID
if (event.target.checked){
	habId = event.target.id;
	desmarcarCheckboxes(habId);
	console.log(habId);
} else {
	habId = 0;
}
});

// Adiciona um event listener de clique ao container
containAntDice.addEventListener('change', function(event) {
// Verifica se o elemento clicado tem um ID
antDice = event.target.id;
});

function getNumber() {

	let habValue = 0;
	let atrValue = 0;

	if (habId !== 0) {
		habValue = parseInt(document.getElementById(habId).value);
	}
	if (atrId !== 0) {
		atrValue = parseInt(document.getElementById(atrId).value) || 0;
	}

	switch (forma) {
		case 'glabroCheck':
			switch (atrId) {
				case 'Forca':
				case 'Vigor':
					atrValue += 2;
					break;
				case 'Aparencia':
					atrValue -= 1;
					break;
				case 'Manipulacao':
					atrValue -= 2;
					break;
			}
			break;
		case 'crinosCheck':
			switch (atrId) {
				case 'Forca':
					atrValue += 4;
					break;
				case 'Vigor':
					atrValue += 3;
					break;
				case 'Destreza':
					atrValue += 1;
					break;
				case 'Aparencia':
					atrValue = 0;
					break;
				case 'Manipulacao':
					atrValue -= 3;
					break;
			}
			break;
		case 'hispoCheck':
			switch (atrId) {
				case 'Forca':
				case 'Vigor':
					atrValue += 3;
					break;
				case 'Destreza':
					atrValue += 2;
					break;
				case 'Manipulacao':
					atrValue -= 3;
					break;
			}
			break;
		case 'lupinoCheck':
			switch (atrId) {
				case 'Forca':
					atrValue += 1;
					break;
				case 'Vigor':
				case 'Destreza':
					atrValue += 2;
					break;
				case 'Manipulacao':
					atrValue -= 3;
					break;
			}
			break;
	}

	let soma = habValue + atrValue;

	jogaDados(soma);
}

function jogaDados(soma) {
  
	let redutor = reduceDice;
	//console.log(redutor);
	if (noReduceDice === 1){
		redutor = 0;	
	}

	let modDados = parseInt(document.getElementById("modId").value) || 0;
	if (modDados > 0) {
		soma += modDados;
	}
	let somaMod = soma - redutor;	
	let qDice = somaMod;
	
	let diceArray = new Array(qDice); //Vetor com tamanho igual ao numero de dados
	let resultado = ""; //Variável para impressão do resultado
	
	//Elementos HTML para ordernar a saida
	const container = document.getElementById('dadosAuto');
	const paragrafo = document.createElement('p');
	
	//Apaga resultados anteriores antes de inserir novos
	while (container.firstChild) {
	container.removeChild(container.firstChild);
	}
	
	//Laço para lançamento de dados  
	for (let i = 0; i < qDice; i++) {
		//Lança o valor do dado  
		let x = Math.floor(Math.random() * 10) + 1 
		diceArray[i] = x;
	}
	
		diceArray.sort(function(a, b) {
		return b - a; // Para ordem decrescente
		});
		console.log(diceArray); 
	
	//Passagem dos dados ao vetor
	for (let i = 0; i < diceArray.length; i++) {
		resultado += diceArray[i];
		if (i < diceArray.length - 1) {
			resultado += ", ";
		}
		}
		
		//Impressão do resultado na tela
		paragrafo.textContent = `${resultado}`;
		container.appendChild(paragrafo);

		alterarLabel(diceArray);
}

function alterarLabel(diceArray) {

	const labelElement = document.getElementById("sucessosId");

	let dificuldade = parseInt(document.getElementById("diffId").value);
	if (document.getElementById('Aptidao').checked) {
		dificuldade -= 2; // Reduz a dificuldade em 2 se a aptidão estiver marcada
		console.log("Aptidão marcada, dificuldade reduzida para: " + dificuldade);
	}
	dificuldade -= parseInt(document.getElementById("reduceId").value) || 0; // Diminui a dificuldade com base no valor do input de redução
	if (dificuldade < 2) {
		dificuldade = 2; // Garante que a dificuldade não seja menor que 2
	}
	if (dificuldade > 10) {
		dificuldade = 10; // Garante que a dificuldade não seja maior que 10
	}
	let numSucessos = 0;

  	if (labelElement) {
    
		for (let i = 0; i < diceArray.length; i++) {
			if(diceArray[i] >= dificuldade){
				numSucessos += 1;
			}else if(diceArray[i] == 1){
				numSucessos -= 1;
			}
		}

		if(numSucessos > 0){
			labelElement.textContent = numSucessos +" Sucesso(s)";
		}else if(numSucessos === 0){
			labelElement.textContent = "Sem sucessos";
		}else if(numSucessos < 0){
			labelElement.textContent = "Falha crítica";
		}
  	}

}

function randomDice() {
	numLados = parseInt(document.getElementById('NumLados').value);
	numDice = parseInt(document.getElementById('NumDice').value);

	let diceArray = new Array(numDice); //Vetor com tamanho igual ao numero de dados
  	let resultado = "";

	const container = document.getElementById('dadosManual');
  	const paragrafo = document.createElement('p');

	while (container.firstChild) {
	container.removeChild(container.firstChild);
	}

	//Laço para lançamento de dados  
	for (let i = 0; i < numDice; i++) {
		//Lança o valor do dado  
		let x = Math.floor(Math.random() * numLados) + 1 
		diceArray[i] = x;
	}

	diceArray.sort(function(a, b) {
	  return b - a; // Para ordem decrescente
	});
	console.log(diceArray); 
  
	//Passagem dos dados ao vetor
	for (let i = 0; i < diceArray.length; i++) {
	  resultado += diceArray[i];
	  if (i < diceArray.length - 1) {
		resultado += ", ";
	  }
	}
	
	//Impressão do resultado na tela
	paragrafo.textContent = `${resultado}`;
	container.appendChild(paragrafo);
}

function iniciativa() {

	const container = document.getElementById('dadosIni');
  	const paragrafo = document.createElement('p');

	while (container.firstChild) {
	container.removeChild(container.firstChild);
	}
 
	let destreza = parseInt(document.getElementById('Destreza').value);
	console.log(destreza);
	let raciocinio = parseInt(document.getElementById('Raciocinio').value);
	console.log(raciocinio);

	let x = Math.floor(Math.random() * 10) + 1;
	console.log(x);

	let resultado = ((destreza + raciocinio) - reduceDice) + x;

	//Impressão do resultado na tela
	paragrafo.textContent = `${resultado}`;
	container.appendChild(paragrafo);
}

function antecedenteDice() {

	let antDiceValue = parseInt(document.getElementById(antDice).value);

	let diceArray = new Array(antDiceValue); //Vetor com tamanho igual ao numero de dados
  	let resultado = "";

	const container = document.getElementById('dadosAnt');
  	const paragrafo = document.createElement('p');

	while (container.firstChild) {
	container.removeChild(container.firstChild);
	}

	//Laço para lançamento de dados  
	for (let i = 0; i < antDiceValue; i++) {
		//Lança o valor do dado  
		let x = Math.floor(Math.random() * 10) + 1 
		diceArray[i] = x;
	}

	diceArray.sort(function(a, b) {
	  return b - a; // Para ordem decrescente
	});
	console.log(diceArray); 
  
	//Passagem dos dados ao vetor
	for (let i = 0; i < diceArray.length; i++) {
	  resultado += diceArray[i];
	  if (i < diceArray.length - 1) {
		resultado += ", ";
	  }
	}
	
	//Impressão do resultado na tela
	paragrafo.textContent = `${resultado}`;
	container.appendChild(paragrafo);
}

function limparCampos() {
	const inputsText = document.querySelectorAll('input[type="text"]');
	const inputsNumber = document.querySelectorAll('input[type="number"]');
	const textareas = document.querySelectorAll('textarea');
	const ranges = document.querySelectorAll('input[type="range"]');
	const inputsUrl = document.querySelectorAll('input[type="url"]');

	[...inputsText, ...inputsNumber, ...textareas, ...ranges, ...inputsUrl].forEach(element => {
		element.value = '';
    	if (element.id) {
    		localStorage.removeItem(element.id);
    	}
  	});

	sliderEl.value = 0;
	sliderValue1.textContent = "0";
	sliderE2.value = 0;
	sliderValue2.textContent = "0";

  	alert('Todos os campos foram limpos e os dados salvos foram removidos.');
}

// Salvar valores de input[type="number"], input[type="text"] e textarea
  function salvarCampos() {
    const inputsText = document.querySelectorAll('input[type="text"]');
    const inputsNumber = document.querySelectorAll('input[type="number"]');
    const textareas = document.querySelectorAll('textarea');
	const ranges = document.querySelectorAll('input[type="range"]');
	const inputsUrl = document.querySelectorAll('input[type="url"]');
	// const sliderE2 = document.querySelector("#fdv-range2");

	[...inputsText, ...inputsNumber, ...textareas, ...ranges, ...inputsUrl].forEach(element => {
    	if (element.id) {
    		localStorage.setItem(element.id, element.value);
      	}
    });

    alert('Todos os dados foram salvos com sucesso!');
  }

  // Carregar valores salvos nos campos
  function carregarCampos() {
    const inputsText = document.querySelectorAll('input[type="text"]');
    const inputsNumber = document.querySelectorAll('input[type="number"]');
    const textareas = document.querySelectorAll('textarea');
	const ranges = document.querySelectorAll('input[type="range"]');
	const inputsUrl = document.querySelectorAll('input[type="url"]');

    [...inputsText, ...inputsNumber, ...textareas, ...ranges, ...inputsUrl].forEach(element => {
      if (element.id && localStorage.getItem(element.id) !== null) {
        element.value = localStorage.getItem(element.id);
      }
    });

	const carregaFuria = document.getElementById('furia-range')
	sliderValue1.textContent = carregaFuria.value;

	const carregaFdv = document.getElementById('fdv-range2')
	sliderValue2.textContent = carregaFdv.value;

	const carregaGnose = document.getElementById('gnose-range')
	sliderValue3.textContent = carregaGnose.value;

	const carregaImgHumano = localStorage.getItem('img-homnideo');
	if (carregaImgHumano) {
		document.getElementById('formaImg').src = carregaImgHumano;	
  	}
}
// Exporta os dados dos inputs type="number" para um arquivo JSON
function exportarParaArquivo() {
	const inputsNumber = document.querySelectorAll('input[type="number"]');
	const inputsText = document.querySelectorAll('input[type="text"]');
	const textareas = document.querySelectorAll('textarea');
	const ranges = document.querySelectorAll('input[type="range"]');
	const inputsUrl = document.querySelectorAll('input[type="url"]');
  
	const data = {};

	[...inputsNumber, ...inputsText, ...textareas, ...ranges, ...inputsUrl].forEach(input => {
		if (input.id) {
		data[input.id] = input.value;
		}
	});

	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');

	a.href = url;
	a.download = 'dados_personagem.json';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function importarDeArquivo(input) {
	const file = input.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = function (e) {
		try {
			const data = JSON.parse(e.target.result);
			Object.keys(data).forEach(id => {
				const input = document.getElementById(id);
				if (input) {
				input.value = data[id];
				}		
			});
			alert('Dados importados com sucesso!');
		} catch (error) {
		alert('Erro ao importar arquivo.');
		}
	};
	reader.readAsText(file);
}

function retirarDados() {

	let dmgCont = parseInt(document.getElementById(dmg).value) || 0;
	gravidadeFerimentos(dmgCont);

}

function alterarParagrafo() {

	var paragrafo = document.getElementById('pConstusivo');
	paragrafo.textContent = "Aperte o botão";
	paragrafo = document.getElementById('pLetal');
	paragrafo.textContent = "Aperte o botão";
	paragrafo = document.getElementById('pAgravado');
	paragrafo.textContent = "Aperte o botão";

}

function gravidadeFerimentos(dmgCont) {

	var paragrafo = document.getElementById('pConstusivo');
	paragrafo.textContent = " ";
	paragrafo = document.getElementById('pLetal');
	paragrafo.textContent = " ";
	paragrafo = document.getElementById('pAgravado');
	paragrafo.textContent = " ";

	const tipoDano = document.getElementById(dmg).id;
	if (tipoDano == 'dmgContusivo') {
		const paragrafo = document.getElementById('pConstusivo');
		switch (dmgCont) {
			case 0:
				paragrafo.textContent = "Sem ferimentos";
				reduceDice = 0;
				break;
			case 1:
				paragrafo.textContent = "Escoriado";
				reduceDice = 0;
				break;
			case 2:
				paragrafo.textContent = "Machucado";
				reduceDice = 0;
				break;
			case 3:
				paragrafo.textContent = "Ferido";
				reduceDice = 0;
				break;
			case 4:
				paragrafo.textContent = "Ferido Gravemente(-1)";
				reduceDice = 1;
				break;
			case 5:
				paragrafo.textContent = "Espancado(-1)";
				reduceDice = 1;
				break;
			case 6:
				paragrafo.textContent = "Aleijado(-2)";
				reduceDice = 2;
				break;
			default:
				if (dmgCont >= 7) {
					paragrafo.textContent = "Máximo excedido";
				}
		}
	} else if (tipoDano == 'dmgLetal') {
		const paragrafo = document.getElementById('pLetal');
		switch (dmgCont) {
			case 0:
				paragrafo.textContent = "Sem ferimentos";
				reduceDice = 0;
				break;
			case 1:
				paragrafo.textContent = "Escoriado";
				reduceDice = 0;
				break;
			case 2:
				paragrafo.textContent = "Machucado(-1)";
				reduceDice = 1;
				break;
			case 3:
				paragrafo.textContent = "Ferido(-1)";
				reduceDice = 1;
				break;
			case 4:
				paragrafo.textContent = "Ferido Gravemente(-2)";
				reduceDice = 2;
				break;
			case 5:
				paragrafo.textContent = "Espancado(-2)";
				reduceDice = 2;
				break;
			case 6:
				paragrafo.textContent = "Aleijado(-5)";
				reduceDice = 5;
				break;
			default:
				if (dmgCont >= 7) {
					paragrafo.textContent = "Incapacitado";
				}
		}
	} else if (tipoDano == 'dmgAgravado') {
		const paragrafo = document.getElementById('pAgravado');
		switch (dmgCont) {
			case 0:
				paragrafo.textContent = "Sem ferimentos";
				reduceDice = 0;
				break;
			case 1:
				paragrafo.textContent = "Escoriado";
				reduceDice = 0;
				break;
			case 2:
				paragrafo.textContent = "Machucado(-1)";
				reduceDice = 1;
				break;
			case 3:
				paragrafo.textContent = "Ferido(-1)";
				reduceDice = 1;
				break;
			case 4:
				paragrafo.textContent = "Ferido Gravemente(-2)";
				reduceDice = 2;
				break;
			case 5:
				paragrafo.textContent = "Espancado(-2)";
				reduceDice = 2;
				break;
			case 6:
				paragrafo.textContent = "Aleijado(-5)";
				reduceDice = 5;
				break;
			default:
				if (dmgCont >= 7) {
					paragrafo.textContent = "Incapacitado";
				}
		}
	}

	return reduceDice;
}

negarDebuff.addEventListener('change', function(){
	if(this.checked) {
		noReduceDice = 1;
	} else {
		noReduceDice = 0;
	}

	console.log(noReduceDice);
})

const sliderEl = document.querySelector("#furia-range")
const sliderValue1 = document.querySelector(".furia-value")

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;
  sliderValue1.textContent = tempSliderValue;
  
  const progress = (tempSliderValue / sliderEl.max) * 100;
 
  sliderEl.style.background = `linear-gradient(to right, #d60101 ${progress}%, #ccc ${progress}%)`;
})

const sliderE2 = document.querySelector("#fdv-range2")
const sliderValue2 = document.querySelector(".fdv-value3")

sliderE2.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  sliderValue2.textContent = tempSliderValue;
  
  const progress = (tempSliderValue / sliderE2.max) * 100;
 
  sliderE2.style.background = `linear-gradient(to right, #d60101 ${progress}%, #ccc ${progress}%)`;
})

const sliderE3 = document.querySelector("#gnose-range")
const sliderValue3 = document.querySelector(".gnose-value")

sliderE3.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value; 
  sliderValue3.textContent = tempSliderValue;
  
  const progress = (tempSliderValue / sliderE3.max) * 100;
 
  sliderE3.style.background = `linear-gradient(to right, #d60101 ${progress}%, #ccc ${progress}%)`;
})

textColor.addEventListener('input', (event)=>{
	let cor = event.target.value;
	document.documentElement.style.setProperty('--title-text-color', cor);
});
mainColor.addEventListener('input', (event)=>{
	let cor = event.target.value;
	document.documentElement.style.setProperty('--main-color', cor);
});
secondaryColor.addEventListener('input', (event)=>{
	let cor = event.target.value;
	document.documentElement.style.setProperty('--secondary-color', cor);
});

function desmarcarCheckboxes(checkboxTable) {
	let conteiner = 0;
	if (checkboxTable === atrId) {
		conteiner = document.getElementById('atrTable');
	} else if (checkboxTable === habId) {
		conteiner = document.getElementById('habTable');
	} else if (checkboxTable === forma) {
		conteiner = document.getElementById('formaTable');
	}
	const checkboxes = conteiner.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', function() {
			if (this.checked){
				checkboxes.forEach(cb => {
					if (cb !== this) {
						cb.checked = false;
					}
				}
			)}
		});
	});
}

function atrMais(){
  	var atual = document.getElementById(atrId).value;
  	var totalXP = parseInt(document.getElementById('XP-pool').value);
	var totalPB = parseInt(document.getElementById('PB-pool').value);
	var consumo = 0;
	var novo = atual - (-1); //Evitando Concatenacoes

	const coluna = document.getElementById(atrId).closest('.atr-col')
	// Verifica se a coluna é a de atributos para aplicar o limite correto
	const inputs = coluna.querySelectorAll('.atr-row input[type="number"]');

	const total = Array.from(inputs).reduce((soma, input) => {
		return soma + (parseInt(input.value) || 0);
	}, 0);

	var headerValue = coluna.querySelector('.atr-col-header input[type="number"]').value;
	
	var limite = parseInt(headerValue) - 1;

	if (total <= limite) {
		document.getElementById(atrId).value = novo;
	} else {
		if(tipoPonto.checked){
			if (consumo > totalPB) {
				alert("Pontos bonus insuficiente! Você tem " + totalPB + " PB disponíveis.");
				return;
			} else{
				document.getElementById('PB-pool').value = totalPB - 5;
				document.getElementById(atrId).value = novo;
			}
		} else {
			if (novo == 1) {
				consumo = 3;
			} else {
				consumo = novo * 4;
			}
			console.log("consumo: " + consumo);
			if (consumo > totalXP) {
				alert("XP insuficiente! Você tem " + totalXP + " XP disponíveis.");
				return;
			} else if ( novo == 1 ) {
				document.getElementById('XP-pool').value = totalXP - 3;
				document.getElementById(atrId).value = novo;
			} else {
				document.getElementById('XP-pool').value = totalXP - consumo;
				document.getElementById(atrId).value = novo;
			}
		}
	}
	
}

function atrMenos(){
	var atual = document.getElementById(atrId).value;
	var consumo = atual * 2;
	var totalXP = parseInt(document.getElementById('XP-pool').value);

	const coluna = document.getElementById(atrId).closest('.atr-col')
	// Verifica se a coluna é a de atributos para aplicar o limite correto
	const inputs = coluna.querySelectorAll('.atr-row input[type="number"]');

	const total = Array.from(inputs).reduce((soma, input) => {
		return soma + (parseInt(input.value) || 0);
	}, 0);

	var headerValue = coluna.querySelector('.atr-col-header input[type="number"]').value;
	var limite = parseInt(headerValue) - 1;

	if (total <= limite) {
		document.getElementById(atrId).value = atual - 1;
		console.log("veio pra cá");
	} else {
		if(atual > 0) { //evita números negativos
			if(tipoPonto.checked){
				document.getElementById('PB-pool').value = parseInt(document.getElementById('PB-pool').value) + 2;
				document.getElementById(atrId).value = atual - 1;
			} else {
				var novo = atual - 1;
				if (novo == 0) {
					document.getElementById('XP-pool').value = totalXP + 3;
					document.getElementById(atrId).value = novo;
				} else {
				document.getElementById('XP-pool').value = totalXP + consumo;
				document.getElementById(atrId).value = novo;
				} 
			}
		}
	}
  	
}

function habMais(){
  	var atual = document.getElementById(habId).value;
  	var totalXP = parseInt(document.getElementById('XP-pool').value);
	var totalPB = parseInt(document.getElementById('PB-pool').value);
	var consumo = 0;
	var novo = atual - (-1); //Evitando Concatenacoes

	const coluna = document.getElementById(habId).closest('.hab-col')
	// Verifica se a coluna é a de habilidades ou talentos para aplicar o limite correto
	const inputs = coluna.querySelectorAll('.hab-row input[type="number"]');

	const total = Array.from(inputs).reduce((soma, input) => {
		return soma + (parseInt(input.value) || 0);
	}, 0);

	var headerValue = coluna.querySelector('.hab-col-header input[type="number"]').value;
	
	var limite = parseInt(headerValue) - 1;

	if (total <= limite) {
		document.getElementById(habId).value = novo;
	} else {
		if(tipoPonto.checked){
			if (consumo > totalPB) {
				alert("Pontos bonus insuficiente! Você tem " + totalPB + " PB disponíveis.");
				return;
			} else{
				document.getElementById('PB-pool').value = totalPB - 2;
				document.getElementById(habId).value = novo;
			}
		} else {
			if (novo == 1) {
				consumo = 3;
			} else {
				consumo = novo * 2;
			}
			console.log("consumo: " + consumo);
			if (consumo > totalXP) {
				alert("XP insuficiente! Você tem " + totalXP + " XP disponíveis.");
				return;
			} else if ( novo == 1 ) {
				document.getElementById('XP-pool').value = totalXP - 3;
				document.getElementById(habId).value = novo;
			} else {
				document.getElementById('XP-pool').value = totalXP - consumo;
				document.getElementById(habId).value = novo;
			}
		}
	}
	
}

function habMenos(){
	var atual = document.getElementById(habId).value;
	var consumo = atual * 2;
	var totalXP = parseInt(document.getElementById('XP-pool').value);

	const coluna = document.getElementById(habId).closest('.hab-col')
	// Verifica se a coluna é a de habilidades ou talentos para aplicar o limite correto
	const inputs = coluna.querySelectorAll('.hab-row input[type="number"]');

	const total = Array.from(inputs).reduce((soma, input) => {
		return soma + (parseInt(input.value) || 0);
	}, 0);

	var headerValue = coluna.querySelector('.hab-col-header input[type="number"]').value;
	var limite = parseInt(headerValue) - 1;

	if (total <= limite) {
		document.getElementById(habId).value = atual - 1;
		console.log("veio pra cá");
	} else {
		if(atual > 0) { //evita números negativos
			if(tipoPonto.checked){
				document.getElementById('PB-pool').value = parseInt(document.getElementById('PB-pool').value) + 2;
				document.getElementById(habId).value = atual - 1;
			} else {
				var novo = atual - 1;
				if (novo == 0) {
					document.getElementById('XP-pool').value = totalXP + 3;
					document.getElementById(habId).value = novo;
				} else {
				document.getElementById('XP-pool').value = totalXP + consumo;
				document.getElementById(habId).value = novo;
				} 
			}
		}
	}
  	
}

document.querySelector('input[type="number"]').addEventListener('wheel', function(e) {
  e.preventDefault();
});

function removerFundo() {
    document.body.style.backgroundImage = 'none';
    localStorage.removeItem('backgroundUser');
	document.documentElement.style.setProperty('--background-color', '#111');
}

const input = document.getElementById('selecionar-fundo');
 // 2. Escuta quando o usuário seleciona um novo arquivo
    input.addEventListener('change', function() {
        const arquivo = this.files[0];
        if (arquivo) {
        const leitor = new FileReader();
        
        leitor.onload = function(e) {
            const urlImagem = e.target.result;
            
            // Aplica no fundo da página
            document.body.style.backgroundImage = `url(${urlImagem})`;
            
            // Salva localmente no navegador
            localStorage.setItem('backgroundUser', urlImagem);
        };

		document.documentElement.style.setProperty('--background-color', 'transparent');
        
        leitor.readAsDataURL(arquivo);
        }
    });

contorno.addEventListener('change', function() {

	if (this.checked) {
		document.documentElement.style.setProperty('--background-color', 'transparent');
	} else {
		document.documentElement.style.setProperty('--background-color', '#111');
	}
});

// Carrega automaticamente os valores ao abrir a página
window.onload = () => {
		carregarCampos();
        const fundoSalvo = localStorage.getItem('backgroundUser');
        if (fundoSalvo) {
        document.body.style.backgroundImage = `url(${fundoSalvo})`;
        }
    };
