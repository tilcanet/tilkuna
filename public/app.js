/* ========================================================
   TILKUNA - LÓGICA DE LA APLICACIÓN, JUEGO Y WEBSOCKETS
   Escuela Normal Superior "Dr. Eduardo Casanova" - Tilcara
   ======================================================== */

// --- 1. BANCO DE DATOS: LOS 12 PUNTOS PATRIMONIALES ---
const placesData = [
    {
        id: "pucara",
        name: "Pucará de Tilcara",
        category: "Sitio Arqueológico",
        location: "A 1 km al sur de Tilcara, confluencia de ríos Huasamayo y Grande",
        image: "img/Pucara de Tilcara.jpg",
        description: "Antigua fortaleza y poblado prehispánico construido por los tilcaras hace más de 900 años. Ocupa una colina estratégica con viviendas de piedra, talleres artesanales, corrales y un centro ceremonial.",
        curiousFact: "En 1935 se erigió un monumento piramidal en su cima en homenaje a los arqueólogos Ambrosetti y Debenedetti que estudiaron el sitio."
    },
    {
        id: "garganta",
        name: "Garganta del Diablo",
        category: "Monumento Natural",
        location: "Cañón del río Huasamayo, a 5 km al este del pueblo",
        image: "img/Garganta del Diablo.jpg",
        description: "Impresionante cañón profundo excavado por el cauce del río Huasamayo en la roca viva, culminando en una hermosa cascada natural de agua pura que desciende de los cerros.",
        curiousFact: "Según la tradición oral local recopilada por los estudiantes, los antiguos pobladores contaban leyendas sobre espíritus protectores del agua en las profundidades del cañadón."
    },
    {
        id: "wayra",
        name: "Cueva del Wayra",
        category: "Sitio Sagrado y Trekking",
        location: "Quebrada de Sarahuaico, a 3 km al oeste de Tilcara",
        image: "img/Cueva del Wayra.jpg",
        description: "Profunda cavidad natural en las laderas andinas donde el viento zumba constantemente (Wayra significa viento en quechua). Posee vestigios prehispánicos y vistas panorámicas de la Quebrada.",
        curiousFact: "Era considerado por los ancestros como un refugio espiritual y de observación astronómica y climática."
    },
    {
        id: "iglesia",
        name: "Iglesia Nuestra Señora del Rosario",
        category: "Patrimonio Colonial",
        location: "Frente a la Plaza Manuel Álvarez Prado, centro de Tilcara",
        image: "img/Iglesia Local.jpg",
        description: "Templo histórico edificado alrededor del año 1797. Construida con gruesos muros de adobe, tirantes de madera de cardón ensamblados sin clavos y techumbre de paja y barro.",
        curiousFact: "Guarda en su interior valiosas pinturas de la escuela cuzqueña del siglo XVII y los restos del coronel Manuel Álvarez Prado."
    },
    {
        id: "museo_casanova",
        name: "Museo Arqueológico Dr. Eduardo Casanova",
        category: "Museo y Ciencia",
        location: "Calle Belgrano 445, frente a la plaza principal",
        image: "img/Museo Arqueologico.jpg",
        description: "Dependiente del Instituto Interdisciplinario Tilcara (UBA), alberga más de 5.000 piezas arqueológicas de las culturas andinas prehispánicas de la Quebrada y el Noroeste Argentino.",
        curiousFact: "Lleva el nombre del Dr. Eduardo Casanova, arqueólogo que impulsó los estudios en la zona y quien también da nombre a nuestra Escuela Normal."
    },
    {
        id: "museo_terry",
        name: "Museo Regional de Pintura José Antonio Terry",
        category: "Arte y Pintura",
        location: "Calle Rivadavia 352, Tilcara",
        image: "img/Museo Terry.jpg",
        description: "Antigua casona colonial donde residió el pintor sordo José Antonio Terry. Exhibe su magnífica obra pictórica que retrata los rostros, costumbres y faenas de la comunidad tilcareña.",
        curiousFact: "Terry se comunicaba con los lugareños mediante el dibujo y la pintura, logrando capturar la profunda alma y dignidad del pueblo quebradeño."
    },
    {
        id: "museo_soto",
        name: "Museo Escultor Soto Avendaño",
        category: "Escultura y Memoria",
        location: "Calle Belgrano esq. Sorpresa",
        image: "img/Museo Soto Avendaño.jpg",
        description: "Espacio cultural que rinde homenaje a Ernesto Soto Avendaño, ilustre escultor argentino creador del célebre Monumento a los Héroes de la Independencia de Humahuaca.",
        curiousFact: "La casa conserva sus bocetos originales, herramientas de tallado y moldes de fundición en yeso y bronce."
    },
    {
        id: "plaza",
        name: "Plaza Central Manuel Álvarez Prado",
        category: "Espacio Público e Histórico",
        location: "Centro cívico y neurálgico de Tilcara",
        image: "img/Plaza Central.jpg",
        description: "Corazón social de la localidad, arbolada con sauces y molles. Alrededor de ella se ubican los edificios históricos más representativos, la Iglesia y ferias artesanales.",
        curiousFact: "Lleva el nombre del héroe gaucho jujeño que defendió la Quebrada durante las invasiones realistas de las Guerras de la Independencia."
    },
    {
        id: "lavalle",
        name: "Salón donde Velaron al Gral. Lavalle",
        category: "Hito Histórico Nacional",
        location: "Casco histórico, calle Belgrano",
        image: "img/Salón donde Velaron a Lavalle.jpg",
        description: "Solar histórico colonial donde en octubre de 1841 fue descarnado y velado provisionalmente el cuerpo del General Juan Galo Lavalle por sus leales tropas unitarias en su retirada hacia Bolivia.",
        curiousFact: "Sus restos fueron resguardados en Tilcara para evitar que las fuerzas federales enemigas profanaran su cuerpo decapitándolo."
    },
    {
        id: "escalinata",
        name: "Escalinata de Tilcara",
        category: "Arquitectura Urbana",
        location: "Sector alto, conexión hacia el Cerro de la Cruz",
        image: "img/escalinata.jpg",
        description: "Pintoresca escalinata de piedra rústica que asciende por la ladera del cerro, ofreciendo una perspectiva aérea inolvidable de los techos de adobe y las huertas de Tilcara.",
        curiousFact: "Punto de encuentro habitual de jóvenes y músicos locales al atardecer para contemplar la caída del sol sobre la Quebrada."
    },
    {
        id: "monolito",
        name: "Monolito Histórico",
        category: "Monumento Conmemorativo",
        location: "Acceso y senderos históricos de Tilcara",
        image: "img/Monolito.jpg",
        description: "Monumento de piedra tallada que conmemora los hitos históricos, las batallas patrias libradas en suelo tilcareño y la memoria de las generaciones ancestrales.",
        curiousFact: "Marca uno de los puntos limítrofes del circuito urbano y patrimonial protegido por la comunidad."
    },
    {
        id: "olla",
        name: "Olla de la Calle Sorpresa",
        category: "Rincón Urbano Tradicional",
        location: "Calle Sorpresa, barrio tradicional",
        image: "img/olla calle Sorpresa.jpg",
        description: "Emblemático punto barrial donde convergen las calles empedradas más antiguas de Tilcara. Representa la arquitectura típica de esquinas ochavadas y pircas de piedra pircada.",
        curiousFact: "Es protagonista de leyendas de barrio y paso obligado durante las comparsas del desentierro del Carnaval."
    }
];

// --- 2. BANCO DE PREGUNTAS DEL JUEGO EDUCATIVO ---
const questionsBank = [
    {
        question: "¿Qué civilización ancestral construyó el Pucará de Tilcara hace más de 900 años?",
        options: ["Los Incas del Cuzco", "El pueblo de los Tilcaras", "Los Diaguitas calchaquíes", "Los Guaraníes"],
        correct: 1,
        placeId: "pucara"
    },
    {
        question: "¿Qué accidente geográfico culmina en una gran cascada en la Garganta del Diablo?",
        options: ["El Cañón del río Huasamayo", "El cauce del Río Grande", "La Quebrada de Humahuaca", "El Salar de Olaroz"],
        correct: 0,
        placeId: "garganta"
    },
    {
        question: "¿Qué significado tiene la palabra quechua 'Wayra' que da nombre a la famosa cueva?",
        options: ["Sol ardiente", "Tierra fértil", "Viento", "Agua sagrada"],
        correct: 2,
        placeId: "wayra"
    },
    {
        question: "¿Qué material tradicional y autóctono se utilizó en los tirantes del techo de la Iglesia de Tilcara?",
        options: ["Hierro forjado", "Madera de cardón", "Pino misionero", "Quebracho colorado"],
        correct: 1,
        placeId: "iglesia"
    },
    {
        question: "¿A qué universidad nacional pertenece el Museo Arqueológico Dr. Eduardo Casanova de Tilcara?",
        options: ["Universidad de Buenos Aires (UBA)", "Universidad Nacional de Jujuy", "Universidad Nacional de Córdoba", "Universidad de La Plata"],
        correct: 0,
        placeId: "museo_casanova"
    },
    {
        question: "¿Qué condición personal distinguía al pintor José Antonio Terry, quien retrató la vida de Tilcara?",
        options: ["Era ciego de nacimiento", "Era una persona sorda", "Pintaba únicamente de noche", "Fue soldado de la independencia"],
        correct: 1,
        placeId: "museo_terry"
    },
    {
        question: "¿Qué célebre monumento nacional esculpió Ernesto Soto Avendaño, recordado en su museo de Tilcara?",
        options: ["El Monumento a la Bandera", "Monumento a los Héroes de la Independencia en Humahuaca", "Monumento a San Martín", "El Obelisco de Buenos Aires"],
        correct: 1,
        placeId: "museo_soto"
    },
    {
        question: "¿Qué prócer y defensor gaucho da su nombre a la Plaza Central de Tilcara?",
        options: ["Martín Miguel de Güemes", "Coronel Manuel Álvarez Prado", "Eduardo Casanova", "José María Pérez"],
        correct: 1,
        placeId: "plaza"
    },
    {
        question: "¿Qué importante general unitario fue velado y descarnado en un histórico solar de Tilcara en 1841?",
        options: ["General Juan Galo Lavalle", "General Manuel Belgrano", "General José de San Martín", "General Mariano Necochea"],
        correct: 0,
        placeId: "lavalle"
    },
    {
        question: "¿Hacia qué mirador y punto devocional conduce la tradicional Escalinata de piedra de Tilcara?",
        options: ["Hacia el Cerro de la Cruz", "Hacia el Pucará", "Hacia las Salinas Grandes", "Hacia Purmamarca"],
        correct: 0,
        placeId: "escalinata"
    },
    {
        question: "¿Qué función cumple el Monolito Histórico ubicado en Tilcara?",
        options: ["Torre de telecomunicaciones", "Conmemorar hechos históricos y límites patrimoniales", "Observatorio astronómico", "Almacén de granos"],
        correct: 1,
        placeId: "monolito"
    },
    {
        question: "¿En qué calle tradicional se encuentra la llamada 'Olla', escenario de mitos barriales y comparsas?",
        options: ["Calle Belgrano", "Calle Rivadavia", "Calle Sorpresa", "Avenida Costanera"],
        correct: 2,
        placeId: "olla"
    }
];

// --- 3. MOTOR DE AUDIO (WEB AUDIO API SINTÉTICA) ---
class TilkunaAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.15) {
        if (!this.enabled) return;
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn('Audio no disponible', e);
        }
    }

    playCorrect() {
        if (!this.enabled) return;
        // Acorde arpegiado alegre andino (Pentatónica)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playTone(note, 0.35, 'triangle', 0.2);
            }, index * 90);
        });
    }

    playWrong() {
        if (!this.enabled) return;
        // Buzz descendente tipo circuito abierto
        try {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.35);

            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.35);
        } catch (e) {}
    }

    playClick() {
        this.playTone(600, 0.05, 'sine', 0.08);
    }

    playFanfare() {
        if (!this.enabled) return;
        const melody = [
            { f: 523.25, d: 0.15 },
            { f: 659.25, d: 0.15 },
            { f: 783.99, d: 0.2 },
            { f: 1046.50, d: 0.45 }
        ];
        melody.forEach((item, i) => {
            setTimeout(() => {
                this.playTone(item.f, item.d, 'triangle', 0.25);
            }, i * 160);
        });
    }
}

const audio = new TilkunaAudioEngine();

// --- 4. MOTOR DE CONFETI Y PARTÍCULAS EN CANVAS ---
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function launchConfetti(x = canvas.width / 2, y = canvas.height / 3, count = 55) {
    const colors = ['#FFB703', '#FB8500', '#06D6A0', '#2EC4B6', '#EF476F', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            size: Math.random() * 7 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 12,
            life: 1,
            decay: Math.random() * 0.015 + 0.01
        });
    }
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // Gravedad
        p.rotation += p.vRot;
        p.life -= p.decay;

        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
    }
    requestAnimationFrame(updateParticles);
}
requestAnimationFrame(updateParticles);

// --- 5. BANCO DE DATOS: EQUIPO DE ESTUDIANTES CREADORES (4.° 3.ª) ---
const studentsData = [
    { name: "ALANCAY, Alexis Fabian", gender: "M", role: "Estudiante Investigador" },
    { name: "ARAMAYO, Alexander Uziel", gender: "M", role: "Estudiante Investigador" },
    { name: "CAZON SERAPIO, María José", gender: "F", role: "Alumna Expositora Nacional", isExpositora: true },
    { name: "FIGUEROA, Bruno Horacio Abraham", gender: "M", role: "Estudiante Investigador" },
    { name: "FLORES, Román Alexander", gender: "M", role: "Estudiante Investigador" },
    { name: "FLORES HUALAMPA, Alexander Santiago", gender: "M", role: "Estudiante Investigador" },
    { name: "GREGORIO, Víctor Aram", gender: "M", role: "Estudiante Investigador" },
    { name: "HOYOS, Elber Lautaro", gender: "M", role: "Estudiante Investigador" },
    { name: "LAMAS, Natalia Johanna", gender: "F", role: "Estudiante Investigadora" },
    { name: "LLAMPA, Isis Laila", gender: "F", role: "Alumna Expositora Nacional", isExpositora: true },
    { name: "MENDOZA, Alexis Gabriel", gender: "M", role: "Estudiante Investigador" },
    { name: "MENDOZA, Luisana Solange", gender: "F", role: "Estudiante Investigadora" },
    { name: "NUÑEZ SEGOVIA, Patricia", gender: "F", role: "Estudiante Investigadora" },
    { name: "QUISPE, Jonás Zair", gender: "M", role: "Estudiante Investigador" },
    { name: "QUISPE, Sofía Luisana", gender: "F", role: "Estudiante Investigadora" },
    { name: "RAMOS, Gabriel Esteban", gender: "M", role: "Estudiante Investigador" },
    { name: "ROBLES, Gimena Magdalena", gender: "F", role: "Estudiante Investigadora" },
    { name: "SAJAMA GUTIERREZ, Fabiana Soledad", gender: "F", role: "Estudiante Investigadora" },
    { name: "SARDINA HUMANA, Miski Killay", gender: "F", role: "Estudiante Investigadora" },
    { name: "SOCOMPI, Aarón Andrés", gender: "M", role: "Estudiante Investigador" },
    { name: "TOLABA, Benjamín Elihu", gender: "M", role: "Estudiante Investigador" },
    { name: "VILTE, Tiago Lautaro David", gender: "M", role: "Estudiante Investigador" },
    { name: "ZERPA, Jonatan Enrique", gender: "M", role: "Estudiante Investigador" }
];

// Siluetas SVG elegantes y nítidas
const maleSilhouetteSvg = `
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="20" r="12" fill="currentColor"/>
  <path d="M14 54C14 43 22 37 32 37C42 37 50 43 50 54" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
</svg>`;

const femaleSilhouetteSvg = `
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="19" r="11" fill="currentColor"/>
  <path d="M19 24C17 29 16 35 18 39C20 40 22 37 23 35" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <path d="M45 24C47 29 48 35 46 39C44 40 42 37 41 35" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <path d="M15 54C15 44 22 38 32 38C42 38 49 44 49 54" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
</svg>`;

function renderStudentsGrid() {
    const container = document.getElementById('students-grid');
    if (!container) return;
    container.innerHTML = '';

    studentsData.forEach(student => {
        const card = document.createElement('div');
        const isExp = !!student.isExpositora;
        card.className = `student-card ${isExp ? 'expositora-card' : ''}`;

        const isMale = student.gender === 'M';
        const avatarClass = isMale ? 'male' : 'female';
        const svgIcon = isMale ? maleSilhouetteSvg : femaleSilhouetteSvg;
        const roleBadgeClass = isExp ? 'role-expositora' : 'role-creator';

        card.innerHTML = `
            <div class="student-avatar ${avatarClass}" title="${isMale ? 'Estudiante' : 'Estudiante'}">
                ${svgIcon}
            </div>
            <div class="student-details">
                <div class="student-name">${student.name}</div>
                <span class="student-badge-role ${roleBadgeClass}">${student.role}</span>
                <span class="student-school-tag">4.° 3.ª • Esc. Normal Casanova</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 6. RENDERIZADO BÁSICO DE LOS 12 PUNTOS (INFO COMPLETA EN EL JUEGO) ---
function renderPlacesGallery() {
    const container = document.getElementById('places-grid');
    if (!container) return;
    container.innerHTML = '';

    placesData.forEach((place, index) => {
        const card = document.createElement('div');
        card.className = 'place-card place-card-basic';
        card.innerHTML = `
            <div class="place-thumb-box">
                <img src="${place.image}" alt="${place.name}" class="place-thumb" loading="lazy" />
                <span class="place-number-badge">Sitio #${index + 1}</span>
            </div>
            <div class="place-content">
                <span class="place-category">${place.category}</span>
                <h3 class="place-title">${place.name}</h3>
                <p style="font-size:0.83rem; color:var(--text-secondary); margin-bottom: 6px;">📍 ${place.location}</p>
                <div class="place-locked-banner">
                    <span>🔒</span>
                    <span>Historia completa y datos curiosos se revelan en el juego.</span>
                </div>
                <a href="#juego-seccion" class="btn-unlock-place">🎮 Desbloquear en el Desafío</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 6. GESTIÓN DE MODALES EDUCATIVOS Y DOCUMENTOS ---
function openPlaceEducationalModal(place, fromCorrectAnswer = false) {
    const modal = document.getElementById('modal-place-success');
    document.getElementById('modal-place-img').src = place.image;
    document.getElementById('modal-place-badge').innerText = place.category;
    document.getElementById('modal-place-name').innerText = place.name;
    document.getElementById('modal-place-location').innerText = `📍 ${place.location}`;
    document.getElementById('modal-place-description').innerText = place.description;
    document.getElementById('modal-place-fact').innerText = place.curiousFact;

    const continueBtn = document.getElementById('modal-place-continue-btn');
    if (fromCorrectAnswer) {
        continueBtn.innerText = 'Continuar Desafío ➜';
        continueBtn.onclick = () => {
            audio.playClick();
            closeModal('modal-place-success');
            gameState.advanceNextTurn();
        };
    } else {
        continueBtn.innerText = 'Cerrar Ficha';
        continueBtn.onclick = () => {
            audio.playClick();
            closeModal('modal-place-success');
        };
    }

    modal.classList.remove('hidden');
}

function openMinutaModal() {
    audio.playClick();
    document.getElementById('modal-minuta').classList.remove('hidden');
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('hidden');
}

// --- 7. COMUNICACIÓN EN TIEMPO REAL (WEBSOCKETS) ---
let myUserId = null;
let currentUsername = 'Estudiante';
let onlineUsersList = [];
let pendingChallenge = null;
let lobbyAutoTimer = null;

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new WebSocket(`${protocol}//${window.location.host}`);

socket.onopen = () => {
    console.log('✅ Conexión con servidor TILKUNA establecida');
};

socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);

        if (data.type === 'WELCOME') {
            myUserId = data.userId;
            currentUsername = data.username;
        }

        if (data.type === 'ONLINE_USERS_UPDATE') {
            const count = data.count || 1;
            document.getElementById('header-online-count').innerText = count;
            document.getElementById('lobby-online-count').innerText = count;
            onlineUsersList = data.users || [];
            renderMultiplayerUsersList();
        }

        if (data.type === 'MATCH_FOUND') {
            if (lobbyAutoTimer) clearInterval(lobbyAutoTimer);
            closeModal('modal-challenge');
            gameState.startMatch(data.opponent, 'multi', data.roomId, data.role);
        }

        if (data.type === 'CHALLENGE_RECEIVED') {
            audio.playClick();
            pendingChallenge = {
                challengerId: data.challengerId,
                challengerName: data.challengerName
            };
            document.getElementById('challenge-sender-name').innerText = data.challengerName;
            document.getElementById('modal-challenge').classList.remove('hidden');
        }

        if (data.type === 'CHALLENGE_REJECTED') {
            alert(data.reason || 'El desafío no pudo concretarse.');
        }

        if (data.type === 'RIVAL_ACTION') {
            if (data.action === 'ANSWER_GIVEN') {
                gameState.handleRivalAnswer(data.payload);
            }
        }

        if (data.type === 'OPPONENT_LEFT') {
            alert('⚠️ ' + data.message);
            if (gameState.active) {
                gameState.rivalDisconnected();
            }
        }
    } catch (err) {
        console.error('Error procesando socket:', err);
    }
};

function renderMultiplayerUsersList() {
    const listContainer = document.getElementById('players-list');
    if (!listContainer) return;

    const availableUsers = onlineUsersList.filter(u => u.id !== myUserId);

    if (availableUsers.length === 0) {
        listContainer.innerHTML = `
            <div class="loading-users">
                Eres el único usuario en línea ahora. ¡Invita a un compañero o juega contra el Bot!
            </div>
        `;
        return;
    }

    listContainer.innerHTML = '';
    availableUsers.forEach(u => {
        const row = document.createElement('div');
        row.className = 'player-row';

        const statusClass = u.inGame ? 'status-ingame' : 'status-avail';
        const statusText = u.inGame ? 'En Partida' : 'Disponible';

        row.innerHTML = `
            <div class="player-row-info">
                <span>👤</span>
                <strong>${u.username}</strong>
                <span class="player-status-badge ${statusClass}">${statusText}</span>
            </div>
            <div>
                ${!u.inGame ? `<button class="btn-challenge-action" data-id="${u.id}">Desafiar ⚔️</button>` : `<small style="color:var(--text-muted)">Ocupado</small>`}
            </div>
        `;

        const challengeBtn = row.querySelector('.btn-challenge-action');
        if (challengeBtn) {
            challengeBtn.addEventListener('click', () => {
                sendChallenge(u.id);
            });
        }

        listContainer.appendChild(row);
    });
}

function sendChallenge(targetId) {
    audio.playClick();
    socket.send(JSON.stringify({
        type: 'CHALLENGE_PLAYER',
        targetId: targetId
    }));
    alert('Desafío enviado. Esperando respuesta del contrincante...');
}

// --- 8. ESTADO Y LÓGICA DEL JUEGO (GAME ENGINE) ---
const gameState = {
    active: false,
    mode: 'single', // 'single' o 'multi'
    roomId: null,
    myRole: 1,
    p1Name: 'Jugador',
    p2Name: 'Bot Quebradeño',
    p1Score: 0,
    p2Score: 0,
    currentRound: 0,
    totalRounds: 5,
    currentQuestion: null,
    answeredInCurrentRound: false,
    selectedQuestions: [],

    initSingle() {
        const inputName = document.getElementById('username-input').value.trim();
        const finalName = inputName || 'Estudiante Tilcara';
        this.p1Name = finalName;
        currentUsername = finalName;
        socket.send(JSON.stringify({ type: 'REGISTER', username: finalName }));
        this.startMatch('Bot Quebradeño', 'single');
    },

    initMultiLobby() {
        const inputName = document.getElementById('username-input').value.trim();
        const finalName = inputName || 'Estudiante Tilcara';
        this.p1Name = finalName;
        currentUsername = finalName;
        socket.send(JSON.stringify({ type: 'REGISTER', username: finalName }));
        socket.send(JSON.stringify({ type: 'JOIN_LOBBY' }));

        showScreen('screen-lobby');

        // Contador regresivo para emparejamiento automático
        let secondsWaiting = 0;
        const timerLabel = document.getElementById('match-timer-label');
        if (lobbyAutoTimer) clearInterval(lobbyAutoTimer);
        lobbyAutoTimer = setInterval(() => {
            secondsWaiting++;
            if (timerLabel) {
                timerLabel.innerText = `Esperando contrincante (${secondsWaiting}s)...`;
            }
            if (secondsWaiting >= 12) {
                // Si pasaron 12s sin emparejar con humano, ofrecer fallback o emparejar
                clearInterval(lobbyAutoTimer);
                socket.send(JSON.stringify({ type: 'LEAVE_LOBBY' }));
                this.startMatch('Bot Quebradeño (Auto)', 'single');
            }
        }, 1000);
    },

    startMatch(opponentName, mode = 'single', roomId = null, role = 1) {
        this.active = true;
        this.mode = mode;
        this.roomId = roomId;
        this.myRole = role;
        this.p2Name = opponentName;
        this.p1Score = 0;
        this.p2Score = 0;
        this.currentRound = 0;

        // Barajar preguntas aleatorias para esta partida
        this.selectedQuestions = [...questionsBank].sort(() => 0.5 - Math.random()).slice(0, this.totalRounds);

        // Actualizar HUD
        document.getElementById('p1-name').innerText = this.p1Name;
        document.getElementById('p2-name').innerText = this.p2Name;
        document.getElementById('p1-score').innerText = '0 pts';
        document.getElementById('p2-score').innerText = '0 pts';

        showScreen('screen-game');
        this.nextQuestion();
    },

    nextQuestion() {
        if (this.currentRound >= this.totalRounds) {
            this.finishGame();
            return;
        }

        this.answeredInCurrentRound = false;
        this.currentQuestion = this.selectedQuestions[this.currentRound];
        this.currentRound++;

        // Actualizar texto de HUD
        document.getElementById('round-text').innerText = `Ronda ${this.currentRound} / ${this.totalRounds}`;
        document.getElementById('turn-text').innerText = '¡Tu Turno!';
        this.setLed('none');

        const feedbackBar = document.getElementById('circuit-feedback-bar');
        feedbackBar.classList.add('hidden');

        // Buscar información del sitio
        const place = placesData.find(p => p.id === this.currentQuestion.placeId);
        document.getElementById('circuit-title').innerText = place ? `📍 Circuito: ${place.name}` : '📍 Circuito Tilcara';
        document.getElementById('question-text').innerText = this.currentQuestion.question;

        // Renderizar opciones
        const optContainer = document.getElementById('options-container');
        optContainer.innerHTML = '';

        this.currentQuestion.options.forEach((optText, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.innerHTML = `<span style="opacity:0.6;font-size:0.8rem">${String.fromCharCode(65 + index)}.</span> ${optText}`;
            btn.addEventListener('click', () => {
                this.selectAnswer(index, btn);
            });
            optContainer.appendChild(btn);
        });

        // Si es vs Bot, programar jugada del Bot en paralelo
        if (this.mode === 'single') {
            this.triggerBotTurn();
        }
    },

    selectAnswer(selectedIndex, buttonElem) {
        if (this.answeredInCurrentRound) return;
        this.answeredInCurrentRound = true;

        // Deshabilitar todos los botones de opciones
        const allBtns = document.querySelectorAll('.btn-option');
        allBtns.forEach(b => (b.disabled = true));

        const isCorrect = selectedIndex === this.currentQuestion.correct;
        const place = placesData.find(p => p.id === this.currentQuestion.placeId);

        if (isCorrect) {
            // ACIERTO: Luz verde, sonido y modal educativo
            buttonElem.classList.add('correct');
            this.setLed('green');
            audio.playCorrect();
            launchConfetti();
            this.p1Score += 100;
            document.getElementById('p1-score').innerText = `${this.p1Score} pts`;

            // Sincronizar en multijugador si aplica
            if (this.mode === 'multi' && this.roomId) {
                socket.send(JSON.stringify({
                    type: 'GAME_SYNC',
                    action: 'ANSWER_GIVEN',
                    payload: { scoreGained: 100, isCorrect: true }
                }));
            }

            // Mostrar el Modal Educativo con la imagen del lugar
            setTimeout(() => {
                if (place) {
                    openPlaceEducationalModal(place, true);
                } else {
                    this.advanceNextTurn();
                }
            }, 600);

        } else {
            // ERROR: Luz roja, sonido buzz y animación shake
            buttonElem.classList.add('wrong', 'shake-error');
            this.setLed('red');
            audio.playWrong();

            // Resaltar la correcta
            if (allBtns[this.currentQuestion.correct]) {
                allBtns[this.currentQuestion.correct].classList.add('correct');
            }

            const feedbackBar = document.getElementById('circuit-feedback-bar');
            feedbackBar.classList.remove('hidden');
            document.getElementById('feedback-message').innerText = `Circuito interrumpido. La opción correcta era: "${this.currentQuestion.options[this.currentQuestion.correct]}"`;

            // Sincronizar en multijugador si aplica
            if (this.mode === 'multi' && this.roomId) {
                socket.send(JSON.stringify({
                    type: 'GAME_SYNC',
                    action: 'ANSWER_GIVEN',
                    payload: { scoreGained: 0, isCorrect: false }
                }));
            }

            setTimeout(() => {
                this.advanceNextTurn();
            }, 2600);
        }
    },

    advanceNextTurn() {
        this.nextQuestion();
    },

    triggerBotTurn() {
        const botDelay = Math.random() * 1500 + 1200; // 1.2 a 2.7 segundos
        setTimeout(() => {
            if (!this.active) return;
            // 75% probabilidad de acierto del bot
            const botCorrect = Math.random() < 0.75;
            if (botCorrect) {
                this.p2Score += 100;
            } else {
                this.p2Score += 0;
            }
            document.getElementById('p2-score').innerText = `${this.p2Score} pts`;
        }, botDelay);
    },

    handleRivalAnswer(payload) {
        if (payload.isCorrect) {
            this.p2Score += payload.scoreGained;
            document.getElementById('p2-score').innerText = `${this.p2Score} pts`;
        }
    },

    setLed(state) {
        const greenLed = document.getElementById('hud-green-led');
        const redLed = document.getElementById('hud-red-led');
        greenLed.className = 'circuit-light light-green' + (state === 'green' ? ' active-green' : '');
        redLed.className = 'circuit-light light-red' + (state === 'red' ? ' active-red' : '');
    },

    finishGame() {
        this.active = false;
        showScreen('screen-results');

        audio.playFanfare();
        launchConfetti(canvas.width / 2, canvas.height / 3, 90);

        document.getElementById('final-p1-name').innerText = this.p1Name;
        document.getElementById('final-p2-name').innerText = this.p2Name;
        document.getElementById('final-p1-score').innerText = this.p1Score;
        document.getElementById('final-p2-score').innerText = this.p2Score;

        const p1Card = document.getElementById('final-p1-card');
        const p2Card = document.getElementById('final-p2-card');
        p1Card.classList.remove('winner-card');
        p2Card.classList.remove('winner-card');

        let winnerText = '¡Empate Histórico en la Quebrada!';
        let subText = 'Ambos jugadores demostraron gran conocimiento de Tilcara.';

        if (this.p1Score > this.p2Score) {
            winnerText = `¡Victoria para ${this.p1Name}! 🏆`;
            subText = '¡Excelente dominio del patrimonio y circuitos de Tilcara!';
            p1Card.classList.add('winner-card');
        } else if (this.p2Score > this.p1Score) {
            winnerText = `¡Ganador: ${this.p2Name}!`;
            subText = '¡Buen intento! Te invitamos a repasar los 12 puntos y volver a jugar.';
            p2Card.classList.add('winner-card');
        }

        document.getElementById('winner-announcement').innerText = winnerText;
        document.getElementById('winner-subtitle').innerText = subText;

        // Guardar récord
        this.saveScore(this.p1Name, this.p1Score);
        this.renderHighScores();
    },

    saveScore(name, score) {
        try {
            const raw = localStorage.getItem('tilkuna_scores');
            const scores = raw ? JSON.parse(raw) : [];
            scores.push({ name, score, date: new Date().toLocaleDateString() });
            scores.sort((a, b) => b.score - a.score);
            localStorage.setItem('tilkuna_scores', JSON.stringify(scores.slice(0, 5)));
        } catch (e) {}
    },

    renderHighScores() {
        const list = document.getElementById('high-scores-list');
        if (!list) return;
        list.innerHTML = '';
        try {
            const raw = localStorage.getItem('tilkuna_scores');
            const scores = raw ? JSON.parse(raw) : [
                { name: "Laila (Expositora)", score: 500, date: "2026" },
                { name: "María José (Expositora)", score: 500, date: "2026" },
                { name: "Estudiante Casanova", score: 400, date: "2026" }
            ];
            scores.forEach((s, idx) => {
                const li = document.createElement('li');
                li.className = 'score-item';
                li.innerHTML = `
                    <span><strong>#${idx + 1} ${s.name}</strong> <small style="color:var(--text-muted)">(${s.date})</small></span>
                    <strong style="color:var(--primary-gold)">${s.score} pts</strong>
                `;
                list.appendChild(li);
            });
        } catch (e) {}
    },

    rivalDisconnected() {
        this.p1Score += 100;
        this.finishGame();
        document.getElementById('winner-announcement').innerText = '¡Victoria por abandono del rival!';
    }
};

// --- 9. CONTROL DE PANTALLAS ---
function showScreen(screenId) {
    const screens = ['screen-register', 'screen-lobby', 'screen-game', 'screen-results'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === screenId) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
}

// --- 10. VINCULACIÓN DE EVENTOS DEL DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderizar galería de los 12 puntos y equipo de estudiantes
    renderPlacesGallery();
    renderStudentsGrid();

    // 2. Control de sonido
    const btnSound = document.getElementById('btn-toggle-sound');
    const soundIcon = document.getElementById('sound-icon');
    btnSound.addEventListener('click', () => {
        audio.init();
        audio.enabled = !audio.enabled;
        soundIcon.innerText = audio.enabled ? '🔊' : '🔇';
    });

    // 3. Botones de Inicio de Juego
    document.getElementById('btn-single').addEventListener('click', () => {
        audio.playClick();
        gameState.initSingle();
    });

    document.getElementById('btn-multi').addEventListener('click', () => {
        audio.playClick();
        gameState.initMultiLobby();
    });

    document.getElementById('btn-cancel-lobby').addEventListener('click', () => {
        audio.playClick();
        if (lobbyAutoTimer) clearInterval(lobbyAutoTimer);
        socket.send(JSON.stringify({ type: 'LEAVE_LOBBY' }));
        showScreen('screen-register');
    });

    document.getElementById('btn-play-bot-fallback').addEventListener('click', () => {
        audio.playClick();
        if (lobbyAutoTimer) clearInterval(lobbyAutoTimer);
        socket.send(JSON.stringify({ type: 'LEAVE_LOBBY' }));
        gameState.startMatch('Bot Quebradeño', 'single');
    });

    document.getElementById('btn-refresh-users').addEventListener('click', () => {
        audio.playClick();
        socket.send(JSON.stringify({ type: 'GET_ONLINE_USERS' }));
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        audio.playClick();
        showScreen('screen-register');
    });

    // 4. Modales de Minuta Oficial
    const btnMinutaHero = document.getElementById('btn-open-minuta-hero');
    if (btnMinutaHero) btnMinutaHero.addEventListener('click', openMinutaModal);

    const btnMinutaCard = document.getElementById('btn-open-minuta-card');
    if (btnMinutaCard) btnMinutaCard.addEventListener('click', openMinutaModal);

    const footerMinuta = document.getElementById('footer-btn-minuta');
    if (footerMinuta) footerMinuta.addEventListener('click', openMinutaModal);

    document.getElementById('modal-minuta-close').addEventListener('click', () => closeModal('modal-minuta'));
    document.getElementById('btn-close-minuta-action').addEventListener('click', () => closeModal('modal-minuta'));

    // Modal de Lugar
    document.getElementById('modal-place-close').addEventListener('click', () => closeModal('modal-place-success'));

    // Modal de Desafío
    document.getElementById('btn-accept-challenge').addEventListener('click', () => {
        audio.playClick();
        if (pendingChallenge) {
            socket.send(JSON.stringify({
                type: 'ACCEPT_CHALLENGE',
                challengerId: pendingChallenge.challengerId
            }));
            closeModal('modal-challenge');
        }
    });

    document.getElementById('btn-reject-challenge').addEventListener('click', () => {
        audio.playClick();
        pendingChallenge = null;
        closeModal('modal-challenge');
    });

    // Cargar puntuaciones iniciales
    gameState.renderHighScores();
});