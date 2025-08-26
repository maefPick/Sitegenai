
// toto.js - Générateur de site HTML via LLM (API OpenAI ou HuggingFace)
// Documentation : voir index.html

const apiKeyInput = document.getElementById('apiKey');
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const statusDiv = document.getElementById('status');
const previewFrame = document.getElementById('preview');

// Choisissez ici le modèle et l'API (OpenAI par défaut)
const API_TYPE = 'openai'; // 'openai' ou 'huggingface'
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo';
// Pour HuggingFace, adapter la requête si besoin

function showStatus(msg, isError = false) {
	statusDiv.textContent = msg;
	statusDiv.style.color = isError ? 'red' : 'black';
}

function buildPrompt(userPrompt) {
	// Prompt pour demander du HTML complet
	return `Génère un fichier HTML complet et minimaliste pour : ${userPrompt}\nLe code doit être prêt à être utilisé, sans explications, uniquement le code HTML.`;
}

async function callOpenAI(apiKey, prompt) {
	const body = {
		model: OPENAI_MODEL,
		messages: [
			{ role: 'system', content: 'Tu es un assistant qui génère des sites web HTML complets.' },
			{ role: 'user', content: prompt }
		],
		max_tokens: 2048,
		temperature: 0.7
	};
	const res = await fetch(OPENAI_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error('Erreur API OpenAI : ' + res.status);
	const data = await res.json();
	// On récupère le code généré
	return data.choices[0].message.content;
}

// Pour HuggingFace, il faudrait adapter la fonction (voir doc HuggingFace Inference API)

async function generateSite() {
	const apiKey = apiKeyInput.value.trim();
	const userPrompt = promptInput.value.trim();
	if (!apiKey || !userPrompt) {
		showStatus('Veuillez saisir la clé API et la description.');
		return;
	}
	showStatus('Génération en cours...');
	generateBtn.disabled = true;
	downloadBtn.style.display = 'none';
	try {
		let htmlCode = '';
		if (API_TYPE === 'openai') {
			htmlCode = await callOpenAI(apiKey, buildPrompt(userPrompt));
		} else {
			throw new Error('API non supportée dans ce script.');
		}
		// Nettoyage éventuel du code (enlève balises markdown)
		htmlCode = htmlCode.replace(/^```html[\r\n]+|```$/g, '').trim();
		// Affiche dans l'iframe
		previewFrame.srcdoc = htmlCode;
		// Stocke pour téléchargement
		downloadBtn.dataset.html = htmlCode;
		downloadBtn.style.display = '';
		showStatus('Site généré !');
	} catch (e) {
		showStatus(e.message, true);
	} finally {
		generateBtn.disabled = false;
	}
}

function downloadHTML() {
	const html = downloadBtn.dataset.html || '';
	const blob = new Blob([html], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'site_genere.html';
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 100);
}

generateBtn.addEventListener('click', generateSite);
downloadBtn.addEventListener('click', downloadHTML);

