// ===== Estado do personagem =====
var habId = 'Tecnologia';
var atrId = 'Forca';
var numLados = document.getElementById('NumLados')?.value || 10;
var numDice;
var antDice;
var dmg;
var saldoDanoTotal = 0;
var forma = 'homnideoCheck';
var reduceDice = 0;
var noReduceDice = 0;

// ===== Controles da interface =====
const textColor = document.getElementById('textColor');
const mainColor = document.getElementById('mainColor');
const secondaryColor = document.getElementById('secondaryColor');
const negarDebuff = document.getElementById('retirarDebuff');
const damageDebuff = document.getElementById('vitalidadeTable');
const containerAtr = document.getElementById('atrTable');
const containerHab = document.getElementById('habTable');
const containAntDice = document.getElementById('antecedenteTable');
const containerForma = document.getElementById('formaTable');
const tipoPonto = document.getElementById("tipoPonto");

damageDebuff.addEventListener('change', function(event) {
const idAlvo = event.target.id;
if (['dmgContusivo', 'dmgLetal', 'dmgAgravado'].includes(idAlvo)) {
	dmg = idAlvo;
}
});

const imgHomnideo = document.getElementById('img-homnideo');
const imgGlabro = document.getElementById('img-glabro');
const imgCrinos = document.getElementById('img-crinos');
const imgHispo = document.getElementById('img-hispo');
const imgLupino = document.getElementById('img-lupino');

// ===== Eventos de seleção de forma e atributos =====
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
// Verifica se o elemento clicado tem um ID ou atributo data-atr
if (event.target.checked){
	atrId = event.target.dataset.atr || event.target.id;
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

// Calcula o valor base da rolagem usando habilidade, atributo e bônus de forma.
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

function reduzirDadosJogados(valor) {
	const entrada = Number.parseInt(valor ?? document.getElementById('reduzirDados')?.value, 10) || 0;
	return Math.max(0, entrada);
}

// Executa a rolagem, aplica redução de dados e exibe os resultados na tela.
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
	const reducao = reduzirDadosJogados(document.getElementById('reduzirDados')?.value);
	let somaMod = soma - redutor - reducao;	
	let qDice = Math.max(0, somaMod);
	
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

// Converte os dados em sucesso, falha e bônus/penalidades de acordo com a dificuldade.
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
	const reducao = reduzirDadosJogados(document.getElementById('reduzirDados')?.value);
	const totalDados = Math.max(0, numDice - reducao);

	let diceArray = new Array(totalDados); //Vetor com tamanho igual ao numero de dados
  	let resultado = "";

	const container = document.getElementById('dadosManual');
  	const paragrafo = document.createElement('p');

	while (container.firstChild) {
	container.removeChild(container.firstChild);
	}

	//Laço para lançamento de dados  
	for (let i = 0; i < totalDados; i++) {
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
	const cardsQualidadesDefeitos = document.getElementById('qualidadesDefeitosCards');

	// Clear text-like inputs
	[...inputsText, ...textareas, ...ranges, ...inputsUrl].forEach(element => {
		element.value = '';
		if (element.id) localStorage.removeItem(element.id);
	});

	// Set attribute numeric inputs to 1 and persist
	const attrInputs = document.querySelectorAll('.atr-row input[type="number"]');
	attrInputs.forEach(i => {
		i.value = 1;
		if (i.id) localStorage.setItem(i.id, '1');
	});

	// Set skill numeric inputs to 0 and persist
	const habInputs = document.querySelectorAll('.hab-row input[type="number"]');
	habInputs.forEach(i => {
		i.value = 0;
		if (i.id) localStorage.setItem(i.id, '0');
	});

	// For any other number inputs (virtudes, pools), clear them
	const otherNumberInputs = Array.from(inputsNumber).filter(n => !n.closest('.atr-row') && !n.closest('.hab-row'));
	otherNumberInputs.forEach(n => {
		if (n.id) {
			n.value = '';
			localStorage.removeItem(n.id);
		}
	});

	localStorage.removeItem('qualidadesDefeitosSelecionados');
	if (typeof window.limparQualidadesDefeitos === 'function') {
		window.limparQualidadesDefeitos();
	}
	if (cardsQualidadesDefeitos) {
		cardsQualidadesDefeitos.replaceChildren();
		const mensagemVazia = document.createElement('p');
		mensagemVazia.className = 'qualidades-defeitos-vazio';
		mensagemVazia.textContent = 'Nenhuma qualidade ou defeito selecionado.';
		cardsQualidadesDefeitos.appendChild(mensagemVazia);
	}

	sliderEl.value = 0;
	sliderValue1.textContent = "0";
	sliderE2.value = 0;
	sliderValue2.textContent = "0";
	if (sliderE3) {
		sliderE3.value = 0;
		sliderValue3.textContent = "0";
	}

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

	// Save number inputs first (ensure numeric values for attributes/skills/virtudes)
	[...inputsNumber].forEach(element => {
		if (element.id) localStorage.setItem(element.id, element.value);
	});

	// Save other inputs (text, ranges, urls)
	[...inputsText, ...textareas, ...ranges, ...inputsUrl].forEach(element => {
		if (element.id) localStorage.setItem(element.id, element.value);
	});

	// Save checkboxes only if there is no number input with the same id (avoid overwriting numeric fields)
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	[...checkboxes].forEach(cb => {
		if (!cb.id) return;
		const numMatch = document.querySelector(`input[type="number"]#${cb.id.replace(/"/g,'\\"')}`);
		if (!numMatch) {
			localStorage.setItem(cb.id, cb.checked);
		}
	});

	// Also store grouped maps for attributes, skills and virtudes for easier export/import
	const attributes = {};
	const skills = {};
	const virtudes = {};
	document.querySelectorAll('.atr-row input[type="number"]').forEach(i => { if (i.id) attributes[i.id] = i.value; });
	document.querySelectorAll('.hab-row input[type="number"]').forEach(i => { if (i.id) skills[i.id] = i.value; });
	document.querySelectorAll('.virtude-row input[type="number"]').forEach(i => { if (i.id) virtudes[i.id] = i.value; });

	localStorage.setItem('attributes', JSON.stringify(attributes));
	localStorage.setItem('skills', JSON.stringify(skills));
	localStorage.setItem('virtudes', JSON.stringify(virtudes));

	// Save selected Qualidades/Defeitos cards (store array of item ids)
	const cardsContainer = document.getElementById('qualidadesDefeitosCards');
	if (cardsContainer) {
		const selectedIds = Array.from(cardsContainer.querySelectorAll('[data-item-id]'))
			.map(el => el.dataset.itemId)
			.filter(Boolean);
		localStorage.setItem('qualidadesDefeitosSelecionados', JSON.stringify(selectedIds));
	}

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

	// Carregar seleção de Qualidades/Defeitos (cards)
	try {
		const selecaoSalva = localStorage.getItem('qualidadesDefeitosSelecionados');
		if (selecaoSalva && typeof window.carregarQualidadesDefeitos === 'function') {
			const arr = JSON.parse(selecaoSalva);
			if (Array.isArray(arr)) window.carregarQualidadesDefeitos(arr);
		}
	} catch (e) {
		// ignore parse errors
	}
}
function aplicarSaldoDano(saldo) {
	const camposOrdem = ['dmgContusivo', 'dmgLetal', 'dmgAgravado'];
	const valorSaldo = Math.max(0, Math.min(parseInt(saldo, 10) || 0, 18));
	saldoDanoTotal = valorSaldo;

	let campoDestinoId = 'dmgContusivo';
	let valorParaProcessar = valorSaldo;

	if (valorSaldo >= 7 && valorSaldo <= 12) {
		campoDestinoId = 'dmgLetal';
		valorParaProcessar = valorSaldo - 6;
	} else if (valorSaldo >= 13) {
		campoDestinoId = 'dmgAgravado';
		valorParaProcessar = valorSaldo - 12;
	}

	camposOrdem.forEach(campoId => {
		const campo = document.getElementById(campoId);
		if (!campo) return;

		if (campoId === 'dmgContusivo') {
			campo.value = valorSaldo >= 7 ? 0 : valorSaldo;
		} else if (campoId === 'dmgLetal') {
			campo.value = valorSaldo >= 7 && valorSaldo <= 12 ? valorParaProcessar : 0;
		} else if (campoId === 'dmgAgravado') {
			campo.value = valorSaldo >= 13 ? valorParaProcessar : 0;
		}
	});

	dmg = campoDestinoId;
	gravidadeFerimentos(valorParaProcessar, campoDestinoId);
	alterarParagrafo();
}

// Exporta os dados dos inputs type="number" para um arquivo JSON
function exportarParaArquivo() {
	const inputsNumber = document.querySelectorAll('input[type="number"]');
	const inputsText = document.querySelectorAll('input[type="text"]');
	const textareas = document.querySelectorAll('textarea');
	const ranges = document.querySelectorAll('input[type="range"]');
	const inputsUrl = document.querySelectorAll('input[type="url"]');
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
	const data = {};

	[...inputsNumber, ...inputsText, ...textareas, ...ranges, ...inputsUrl, ...checkboxes].forEach(input => {
		if (!input.id) return;
		// If there's a number input with same id, prefer numeric value (avoid checkbox overwrite)
		const numMatch = document.querySelector(`input[type="number"]#${input.id.replace(/"/g,'\\"')}`);
		if (numMatch) {
			data[input.id] = numMatch.value;
			return;
		}
		data[input.id] = input.type === 'checkbox' ? input.checked : input.value;
	});

	const selecaoQualidadesDefeitos = JSON.parse(
		localStorage.getItem('qualidadesDefeitosSelecionados') || '[]'
	);
	data.qualidadesDefeitos = selecaoQualidadesDefeitos;
	data.qualidadesDefeitosSelecionados = selecaoQualidadesDefeitos;
	data.saldoVida = saldoDanoTotal;
	data.saldoDanoTotal = saldoDanoTotal;
	data.totalXP = document.getElementById('XP-pool')?.value || '0';
	data.totalPontosBonus = document.getElementById('PB-pool')?.value || '0';

	// also include grouped attribute/skill/virtude maps for export
	data.attributes = JSON.parse(localStorage.getItem('attributes') || '{}');
	data.skills = JSON.parse(localStorage.getItem('skills') || '{}');
	data.virtudes = JSON.parse(localStorage.getItem('virtudes') || '{}');

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
			const selecaoQualidades = Array.isArray(data.qualidadesDefeitos)
				? data.qualidadesDefeitos.map(item => typeof item === 'string' ? item : item.id).filter(Boolean)
				: Array.isArray(data.qualidadesDefeitosSelecionados)
					? data.qualidadesDefeitosSelecionados.map(item => typeof item === 'string' ? item : item.id).filter(Boolean)
					: [];

			if (selecaoQualidades.length > 0 || data.qualidadesDefeitos || data.qualidadesDefeitosSelecionados) {
				localStorage.setItem('qualidadesDefeitosSelecionados', JSON.stringify(selecaoQualidades));
				if (typeof window.carregarQualidadesDefeitos === 'function') {
					window.carregarQualidadesDefeitos(selecaoQualidades);
				}
			}

			// If file contains grouped attribute/skill/virtude objects, restore their inputs first
			if (data.attributes && typeof data.attributes === 'object') {
				Object.keys(data.attributes).forEach(id => {
					const el = document.getElementById(id);
					if (el && el.type === 'number') el.value = data.attributes[id];
				});
			}
			if (data.skills && typeof data.skills === 'object') {
				Object.keys(data.skills).forEach(id => {
					const el = document.getElementById(id);
					if (el && el.type === 'number') el.value = data.skills[id];
				});
			}
			if (data.virtudes && typeof data.virtudes === 'object') {
				Object.keys(data.virtudes).forEach(id => {
					const el = document.getElementById(id);
					if (el && el.type === 'number') el.value = data.virtudes[id];
				});
			}

			Object.keys(data).forEach(id => {
				if (id === 'qualidadesDefeitos' || id === 'qualidadesDefeitosSelecionados') {
					return;
				}

				const input = document.getElementById(id);
				if (input) {
					if (input.type === 'checkbox') {
						input.checked = Boolean(data[id]);
					} else {
						input.value = data[id];
					}
				}
			});

			if (data.totalXP !== undefined) {
				document.getElementById('XP-pool').value = data.totalXP;
			}
			if (data.totalPontosBonus !== undefined) {
				document.getElementById('PB-pool').value = data.totalPontosBonus;
			}

			const saldoImportado = data.saldoVida ?? data.saldoDanoTotal ?? null;
			if (saldoImportado !== null && saldoImportado !== '') {
				aplicarSaldoDano(saldoImportado);
			}

			alert('Dados importados com sucesso!');
		} catch (error) {
			alert('Erro ao importar arquivo.');
		}
	};
	reader.readAsText(file);
}

function inicializarQualidadesDefeitos() {
	const busca = document.getElementById('buscarQualidadeDefeito');
	const seletor = document.getElementById('selecionarQualidadeDefeito');
	const status = document.getElementById('statusQualidadeDefeito');
	const cards = document.getElementById('qualidadesDefeitosCards');

	if (!busca || !seletor || !status || !cards) return;

	let itens = [];
	let itensSelecionados = [];
	let selecaoPendente = null;
	const storageKey = 'qualidadesDefeitosSelecionados';

	function normalizarTexto(texto) {
		return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
	}

	function salvarSelecao() {
		localStorage.setItem(storageKey, JSON.stringify(itensSelecionados));
	}

	function alterarPontosBonus(valor) {
		const pontosBonus = document.getElementById('PB-pool');
		const saldoAtual = Number.parseInt(pontosBonus.value, 10) || 0;
		const novoSaldo = saldoAtual + valor;

		if (novoSaldo < 0) return false;

		pontosBonus.value = novoSaldo;
		return true;
	}

	function formatarNomeItem(item) {
		const valor = Number(item.valor) || 0;
		return `${item.nome} (${valor})`;
	}

	function renderizarCards() {
		cards.replaceChildren();

		if (itensSelecionados.length === 0) {
			const mensagemVazia = document.createElement('p');
			mensagemVazia.className = 'qualidades-defeitos-vazio';
			mensagemVazia.textContent = 'Nenhuma qualidade ou defeito selecionado.';
			cards.appendChild(mensagemVazia);
			return;
		}

		itensSelecionados.forEach(itemId => {
			const item = itens.find(qualidadeDefeito => qualidadeDefeito.id === itemId);
			if (!item) return;

			const card = document.createElement('article');
			card.className = `qualidade-defeito-card ${item.tipo.toLocaleLowerCase()}`;
			card.dataset.itemId = item.id;

			const tipo = document.createElement('span');
			tipo.className = 'qualidade-defeito-tipo';
			tipo.textContent = item.tipo;

			const titulo = document.createElement('h4');
			titulo.textContent = formatarNomeItem(item);

			const alternarDescricao = document.createElement('button');
			alternarDescricao.className = 'qualidade-defeito-alternar';
			alternarDescricao.type = 'button';
			alternarDescricao.setAttribute('aria-expanded', 'false');
			alternarDescricao.textContent = 'Mostrar descrição';

			const descricao = document.createElement('p');
			descricao.className = 'qualidade-defeito-descricao';
			descricao.textContent = item.descricao;
			descricao.hidden = true;
			alternarDescricao.addEventListener('click', () => {
				const expandido = alternarDescricao.getAttribute('aria-expanded') === 'true';
				alternarDescricao.setAttribute('aria-expanded', String(!expandido));
				alternarDescricao.textContent = expandido ? 'Mostrar descrição' : 'Ocultar descrição';
				descricao.hidden = expandido;
			});

			const remover = document.createElement('button');
			remover.className = 'qualidade-defeito-remover';
			remover.type = 'button';
			remover.title = `Remover ${item.nome}`;
			remover.setAttribute('aria-label', `Remover ${item.nome}`);
			remover.textContent = '×';
			remover.addEventListener('click', () => {
				alterarPontosBonus(-Number(item.valor) || 0);
				itensSelecionados = itensSelecionados.filter(id => id !== item.id);
				salvarSelecao();
				renderizarCards();
			});

			card.append(tipo, titulo, alternarDescricao, descricao, remover);
			cards.appendChild(card);
		});
	}

	window.limparQualidadesDefeitos = () => {
		itensSelecionados = [];
		salvarSelecao();
		renderizarCards();
	};

	window.carregarQualidadesDefeitos = selecao => {
		if (itens.length === 0) {
			selecaoPendente = selecao;
			return;
		}
		itensSelecionados = Array.isArray(selecao)
			? selecao.filter(itemId => itens.some(item => item.id === itemId))
			: [];
		salvarSelecao();
		renderizarCards();
	};

	function atualizarOpcoes() {
		const termo = normalizarTexto(busca.value.trim());
		const itensFiltrados = itens.filter(item =>
			normalizarTexto(item.nome).includes(termo)
		);

		seletor.replaceChildren();
		const opcaoInicial = document.createElement('option');
		opcaoInicial.value = '';
		opcaoInicial.textContent = itensFiltrados.length
			? 'Selecione uma qualidade ou defeito...'
			: 'Nenhum item encontrado';
		seletor.appendChild(opcaoInicial);

		itensFiltrados.forEach((item, indice) => {
			const opcao = document.createElement('option');
			opcao.value = item.id || String(indice);
			opcao.textContent = `${formatarNomeItem(item)} · ${item.tipo}`;
			seletor.appendChild(opcao);
		});

		seletor.disabled = itensFiltrados.length === 0;
	}

	busca.addEventListener('input', atualizarOpcoes);
	seletor.addEventListener('change', () => {
		const item = itens.find(qualidadeDefeito => qualidadeDefeito.id === seletor.value);

		if (!item) return;

		if (!itensSelecionados.includes(item.id)) {
			const valor = Number(item.valor) || 0;
			if (!alterarPontosBonus(valor)) {
				status.textContent = `Pontos Bonus insuficientes para ${item.nome}.`;
				seletor.value = '';
				return;
			}
			itensSelecionados.push(item.id);
			salvarSelecao();
			renderizarCards();
		}
		seletor.value = '';
	});

	fetch('./qualidades_defeitos.json')
		.then(resposta => {
			if (!resposta.ok) throw new Error('Não foi possível carregar o arquivo.');
			return resposta.json();
		})
		.then(dados => {
			if (Array.isArray(dados)) {
				itens = dados.map(item => ({
					...item,
					tipo: item.tipo?.toLocaleLowerCase() === 'defeito' ? 'Defeito' : 'Qualidade'
				}));
			} else {
				itens = [
					...(dados.qualidades || []).map(item => ({ ...item, tipo: 'Qualidade' })),
					...(dados.defeitos || []).map(item => ({ ...item, tipo: 'Defeito' }))
				];
			}
			try {
				const selecaoSalva = selecaoPendente || JSON.parse(localStorage.getItem(storageKey) || '[]');
				itensSelecionados = selecaoSalva.filter(itemId =>
					itens.some(item => item.id === itemId)
				);
				selecaoPendente = null;
			} catch {
				itensSelecionados = [];
			}
			atualizarOpcoes();
			renderizarCards();
			status.textContent = `${itens.length} itens disponíveis.`;
		})
		.catch(() => {
			seletor.replaceChildren();
			const opcaoErro = document.createElement('option');
			opcaoErro.textContent = 'Não foi possível carregar os itens';
			seletor.appendChild(opcaoErro);
			seletor.disabled = true;
			status.textContent = 'Abra a ficha por um servidor local para carregar o arquivo JSON.';
		});
}

inicializarQualidadesDefeitos();

function selecionarCampoDano(campoId) {
	if (['dmgContusivo', 'dmgLetal', 'dmgAgravado'].includes(campoId)) {
		dmg = campoId;
		alterarParagrafo();
	}
}

function alterarParagrafo() {
	const paragrafoConstusivo = document.getElementById('pConstusivo');
	const paragrafoLetal = document.getElementById('pLetal');
	const paragrafoAgravado = document.getElementById('pAgravado');

	const paragrafoDestino = {
		'dmgContusivo': paragrafoConstusivo,
		'dmgLetal': paragrafoLetal,
		'dmgAgravado': paragrafoAgravado
	}[dmg || 'dmgContusivo'];

	if (paragrafoDestino) {
		const texto = paragrafoDestino.dataset.mensagem || 'Aperte o botão para aplicar o dano.';
		paragrafoDestino.textContent = texto;
	}
}

function gravidadeFerimentos(dmgCont, campoId = dmg || 'dmgContusivo') {
	const paragrafoConstusivo = document.getElementById('pConstusivo');
	const paragrafoLetal = document.getElementById('pLetal');
	const paragrafoAgravado = document.getElementById('pAgravado');

	[paragrafoConstusivo, paragrafoLetal, paragrafoAgravado].forEach(paragrafo => {
		if (paragrafo) {
			paragrafo.dataset.mensagem = '';
			paragrafo.textContent = '';
		}
	});

	const tipoDano = document.getElementById(campoId)?.id;
	if (tipoDano == 'dmgContusivo') {
		const paragrafo = document.getElementById('pConstusivo');
		let mensagem = '';
		switch (dmgCont) {
			case 0:
				mensagem = 'Sem ferimentos';
				reduceDice = 0;
				break;
			case 1:
				mensagem = 'Escoriado';
				reduceDice = 0;
				break;
			case 2:
				mensagem = 'Machucado';
				reduceDice = 0;
				break;
			case 3:
				mensagem = 'Ferido';
				reduceDice = 0;
				break;
			case 4:
				mensagem = 'Ferido Gravemente(-1)';
				reduceDice = 1;
				break;
			case 5:
				mensagem = 'Espancado(-1)';
				reduceDice = 1;
				break;
			case 6:
				mensagem = 'Aleijado(-2)';
				reduceDice = 2;
				break;
			default:
				if (dmgCont >= 7) {
					mensagem = 'Máximo excedido';
				}
		}
		if (paragrafo && mensagem) {
			paragrafo.dataset.mensagem = mensagem;
			paragrafo.textContent = mensagem;
		}
	} else if (tipoDano == 'dmgLetal') {
		const paragrafo = document.getElementById('pLetal');
		let mensagem = '';
		switch (dmgCont) {
			case 1:
				mensagem = 'Escoriado';
				reduceDice = 0;
				break;
			case 2:
				mensagem = 'Machucado(-1)';
				reduceDice = 1;
				break;
			case 3:
				mensagem = 'Ferido(-1)';
				reduceDice = 1;
				break;
			case 4:
				mensagem = 'Ferido Gravemente(-2)';
				reduceDice = 2;
				break;
			case 5:
				mensagem = 'Espancado(-2)';
				reduceDice = 2;
				break;
			case 6:
				mensagem = 'Aleijado(-5)';
				reduceDice = 5;
				break;
			default:
				if (dmgCont >= 7) {
					mensagem = 'Incapacitado';
				}
		}
		if (paragrafo && mensagem) {
			paragrafo.dataset.mensagem = mensagem;
			paragrafo.textContent = mensagem;
		}
	} else if (tipoDano == 'dmgAgravado') {
		const paragrafo = document.getElementById('pAgravado');
		let mensagem = '';
		switch (dmgCont) {
			case 1:
				mensagem = 'Escoriado';
				reduceDice = 0;
				break;
			case 2:
				mensagem = 'Machucado(-1)';
				reduceDice = 1;
				break;
			case 3:
				mensagem = 'Ferido(-1)';
				reduceDice = 1;
				break;
			case 4:
				mensagem = 'Ferido Gravemente(-2)';
				reduceDice = 2;
				break;
			case 5:
				mensagem = 'Espancado(-2)';
				reduceDice = 2;
				break;
			case 6:
				mensagem = 'Aleijado(-5)';
				reduceDice = 5;
				break;
			default:
				if (dmgCont >= 7) {
					mensagem = 'Incapacitado';
				}
		}
		if (paragrafo && mensagem) {
			paragrafo.dataset.mensagem = mensagem;
			paragrafo.textContent = mensagem;
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

function inicializarPersonalizacaoDeCores() {
	const textColor = document.getElementById('textColor');
	const mainColor = document.getElementById('mainColor');
	const secondaryColor = document.getElementById('secondaryColor');

	if (textColor) {
		textColor.addEventListener('input', (event) => {
			console.log('alterando cor do texto do título');
			const cor = event.target.value;
			document.documentElement.style.setProperty('--title-text-color', cor);
		});
	}

	if (mainColor) {
		mainColor.addEventListener('input', (event) => {
			const cor = event.target.value;
			document.documentElement.style.setProperty('--main-color', cor);
		});
	}

	if (secondaryColor) {
		secondaryColor.addEventListener('input', (event) => {
			const cor = event.target.value;
			document.documentElement.style.setProperty('--secondary-color', cor);
		});
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', inicializarPersonalizacaoDeCores);
} else {
	inicializarPersonalizacaoDeCores();
}

// Mantém apenas uma seleção ativa por categoria, evitando múltiplos atributos/habilidades marcados.
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

function desmarcarCheckboxesAntecedente() {
	const container = document.getElementById('antecedenteTable');
	if (!container) return;

	const checkboxes = container.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
		if (checkbox.dataset.antecedenteListener === 'true') return;

		checkbox.addEventListener('change', function() {
			if (this.checked) {
				checkboxes.forEach(cb => {
					if (cb !== this) {
						cb.checked = false;
					}
				});
			}
		});

		checkbox.dataset.antecedenteListener = 'true';
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
	
	var limite = parseInt(headerValue) + 2;

	if (total <= limite) {
		document.getElementById(atrId).value = novo;
	} else {
		if(tipoPonto.checked){
			if (consumo >= totalPB) {
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
	var limite = parseInt(headerValue) + 2;

	if (total <= limite) {
		if (atual > 1) { //evita números negativos
			document.getElementById(atrId).value = atual - 1;
		}
	} else {
		if(atual > 1) { //evita números negativos
			if(tipoPonto.checked){
				document.getElementById('PB-pool').value = parseInt(document.getElementById('PB-pool').value) + 5;
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

// Aumenta uma habilidade e usa a mesma lógica de custo de pontos da área de atributos.
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
	console.log("total: " + total + " limite: " + limite);
	if (total <= limite) {
		document.getElementById(habId).value = novo;
	} else {
		if(tipoPonto.checked){
			if (consumo >= totalPB) {
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
		if (atual > 0) { //evita números negativos
			document.getElementById(habId).value = atual - 1;
		}
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

// Ajusta virtudes/traços com cobrança em PB ou XP e mantém os valores iniciais consistentes.
function ajustarPontoVirtude(campoId, custoPB, custoXP, operacao) {
	const input = document.getElementById(campoId);
	if (!input) return;

	const atual = parseInt(input.value) || 0;
	const totalXP = parseInt(document.getElementById('XP-pool').value) || 0;
	const totalPB = parseInt(document.getElementById('PB-pool').value) || 0;
	const inputInicial = document.getElementById(campoId.replace(/-perm$/, '-inicial'));
	const pontosIniciais = parseInt(inputInicial?.value, 10) || 0;

	if (operacao === 'mais') {
		if (atual < pontosIniciais) {
			input.value = atual + 1;
			return;
		}

		const custoXPAtual = custoXP(atual);
		if (tipoPonto.checked) {
			if (totalPB < custoPB) {
				alert('Pontos bonus insuficiente! Você tem ' + totalPB + ' PB disponíveis.');
				return;
			}
			document.getElementById('PB-pool').value = totalPB - custoPB;
			input.value = atual + 1;
		} else {
			if (totalXP < custoXPAtual) {
				alert('XP insuficiente! Você tem ' + totalXP + ' XP disponíveis.');
				return;
			}
			document.getElementById('XP-pool').value = totalXP - custoXPAtual;
			input.value = atual + 1;
		}
	} else if (operacao === 'menos') {
		if (atual <= 0) return;

		const novo = atual - 1;
		const custoXPReembolso = custoXP(novo);
		if (tipoPonto.checked) {
			document.getElementById('PB-pool').value = totalPB + custoPB;
			input.value = novo;
		} else {
			document.getElementById('XP-pool').value = totalXP + custoXPReembolso;
			input.value = novo;
		}
	}
}

function adicionarPontoVirtude(campoId, custoPB, custoXP) {
	ajustarPontoVirtude(campoId, custoPB, custoXP, 'mais');
}

function removerPontoVirtude(campoId, custoPB, custoXP) {
	ajustarPontoVirtude(campoId, custoPB, custoXP, 'menos');
}

// Incrementa o valor do antecedente selecionado usando o mesmo painel de consumo de pontos.
function antMais(){
	const container = document.getElementById('antecedenteTable');
	if (!container) return;

	const checkboxSelecionado = container.querySelector('input[type="checkbox"]:checked');
	if (!checkboxSelecionado) {
		alert('Selecione um antecedente para alterar.');
		return;
	}

	const inputAntecedente = checkboxSelecionado.closest('.ant-row').querySelector('input[type="number"]');
	if (!inputAntecedente) return;

	const atual = parseInt(inputAntecedente.value) || 0;
	const totalXP = parseInt(document.getElementById('XP-pool').value);
	const totalPB = parseInt(document.getElementById('PB-pool').value);
	const novo = atual + 1;

	if (tipoPonto.checked) {
		if (totalPB < 1) {
			alert('Pontos bonus insuficiente! Você tem ' + totalPB + ' PB disponíveis.');
			return;
		}
		document.getElementById('PB-pool').value = totalPB - 1;
		inputAntecedente.value = novo;
	} else {
		if (totalXP < 5) {
			alert('XP insuficiente! Você tem ' + totalXP + ' XP disponíveis.');
			return;
		}
		document.getElementById('XP-pool').value = totalXP - 5;
		inputAntecedente.value = novo;
	}
}

function antMenos(){
	const container = document.getElementById('antecedenteTable');
	if (!container) return;

	const checkboxSelecionado = container.querySelector('input[type="checkbox"]:checked');
	if (!checkboxSelecionado) {
		alert('Selecione um antecedente para alterar.');
		return;
	}

	const inputAntecedente = checkboxSelecionado.closest('.ant-row').querySelector('input[type="number"]');
	if (!inputAntecedente) return;

	const atual = parseInt(inputAntecedente.value) || 0;
	if (atual <= 0) return;

	const totalXP = parseInt(document.getElementById('XP-pool').value);
	const totalPB = parseInt(document.getElementById('PB-pool').value);
	const novo = atual - 1;

	if (tipoPonto.checked) {
		document.getElementById('PB-pool').value = totalPB + 1;
		inputAntecedente.value = novo;
	} else {
		document.getElementById('XP-pool').value = totalXP + 5;
		inputAntecedente.value = novo;
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

// Aplica a imagem de fundo escolhida e salva a preferência no navegador.
function aplicarFundo() {
	let imgOrigem = document.getElementById('img-Fundo').value;
	document.body.style.backgroundImage = `url(${imgOrigem})`;
	localStorage.setItem('backgroundUser', imgOrigem);
}

// Remove o contorno visual quando a opção de esconder fundo é ativada.
function retiraContorno() {
	const contorno = document.getElementById('retirarContorno');
	contorno.addEventListener('change', function() {
		if (this.checked) {
			document.documentElement.style.setProperty('--background-color', 'transparent');
		} else {
			document.documentElement.style.setProperty('--background-color', '#111');
		}
	});
}

// ===== Confirmação de conversão de pontos =====
function abrirModal() {
  document.getElementById("overlay-confirmacao").style.display = "flex";
}

function fecharModal() {
	var checkboxModal = document.getElementById("tipoPonto");
	checkboxModal.checked = true;
  	document.getElementById("overlay-confirmacao").style.display = "none";
}

function confirmacao() {
	var PBrestantes = parseInt(document.getElementById('PB-pool').value);
	var totalXP = parseInt(document.getElementById('XP-pool').value);
	totalXP = totalXP + PBrestantes * 3;
	document.getElementById('XP-pool').value = totalXP;
	document.getElementById('PB-pool').value = 0;
	document.getElementById("overlay-confirmacao").style.display = "none";
	document.getElementById('PB-pool').disabled = true;
	document.getElementById('tipoPonto').disabled = true;
}

// Iniciando atributos

function iniciarAtributos() {
	const inputs = document.querySelectorAll('.atr-row input[type="number"]');
	inputs.forEach(input => {
		if (input.value == 0) {
			input.value = 1;
		}
	});
}

// ===== Inicialização =====
window.onload = () => {
		carregarCampos();
		iniciarAtributos();
		desmarcarCheckboxesAntecedente();
        const fundoSalvo = localStorage.getItem('backgroundUser');
        if (fundoSalvo) {
        document.body.style.backgroundImage = `url(${fundoSalvo})`;
        }
    };
