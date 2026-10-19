const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir archivos estáticos de public
app.use(express.static(path.join(__dirname, 'public')));

// Servir diseño de los estudiantes y documentos PDF directamente
app.get('/img/diseño_tilkuna.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'diseño_tilkuna.jpg'));
});
app.get('/diseño_tilkuna.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'diseño_tilkuna.jpg'));
});
app.get('/documentos/tilkuna.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'tilkuna.pdf'));
});
app.get('/documentos/proyecto.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'proyecto_pdf.pdf'));
});

// socket -> { id, username, inGame, roomId }
const connectedUsers = new Map();
let waitingQueue = [];
const activeRooms = new Map(); // roomId -> { p1: ws, p2: ws, p1Name, p2Name, scores: { p1: 0, p2: 0 } }

function getOnlineUsersList() {
    const list = [];
    connectedUsers.forEach((user, ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            list.push({
                id: user.id,
                username: user.username,
                inGame: !!user.inGame
            });
        }
    });
    return list;
}

function broadcastOnlineState() {
    const users = getOnlineUsersList();
    const data = JSON.stringify({
        type: 'ONLINE_USERS_UPDATE',
        count: users.length,
        users: users
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

wss.on('connection', (ws) => {
    const userId = 'usr_' + Math.random().toString(36).substring(2, 7);
    connectedUsers.set(ws, { id: userId, username: `Estudiante ${userId.substring(4)}`, inGame: false, roomId: null });

    // Enviar bienvenida con su propio ID
    ws.send(JSON.stringify({
        type: 'WELCOME',
        userId: userId,
        username: connectedUsers.get(ws).username
    }));

    broadcastOnlineState();

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            const user = connectedUsers.get(ws);
            if (!user) return;

            if (data.type === 'REGISTER') {
                if (data.username && data.username.trim().length > 0) {
                    user.username = data.username.trim().substring(0, 20);
                }
                broadcastOnlineState();
            }

            if (data.type === 'GET_ONLINE_USERS') {
                ws.send(JSON.stringify({
                    type: 'ONLINE_USERS_UPDATE',
                    count: connectedUsers.size,
                    users: getOnlineUsersList()
                }));
            }

            if (data.type === 'JOIN_LOBBY') {
                // Evitar duplicados en cola
                waitingQueue = waitingQueue.filter(p => p.ws !== ws && p.ws.readyState === WebSocket.OPEN);

                if (waitingQueue.length > 0) {
                    const opponentObj = waitingQueue.shift();
                    const opponentWs = opponentObj.ws;
                    const opponentUser = connectedUsers.get(opponentWs);

                    if (opponentUser && opponentWs.readyState === WebSocket.OPEN) {
                        const roomId = `room_${Date.now()}`;
                        user.inGame = true;
                        user.roomId = roomId;
                        opponentUser.inGame = true;
                        opponentUser.roomId = roomId;

                        activeRooms.set(roomId, {
                            p1: opponentWs,
                            p2: ws,
                            p1Name: opponentUser.username,
                            p2Name: user.username,
                            scores: { p1: 0, p2: 0 }
                        });

                        opponentWs.send(JSON.stringify({
                            type: 'MATCH_FOUND',
                            role: 1,
                            roomId,
                            opponent: user.username,
                            opponentId: user.id
                        }));

                        ws.send(JSON.stringify({
                            type: 'MATCH_FOUND',
                            role: 2,
                            roomId,
                            opponent: opponentUser.username,
                            opponentId: opponentUser.id
                        }));

                        broadcastOnlineState();
                        return;
                    }
                }
                waitingQueue.push({ ws, id: user.id });
            }

            if (data.type === 'CHALLENGE_PLAYER') {
                const targetId = data.targetId;
                let targetWs = null;
                connectedUsers.forEach((u, sock) => {
                    if (u.id === targetId && sock.readyState === WebSocket.OPEN && !u.inGame) {
                        targetWs = sock;
                    }
                });

                if (targetWs) {
                    targetWs.send(JSON.stringify({
                        type: 'CHALLENGE_RECEIVED',
                        challengerId: user.id,
                        challengerName: user.username
                    }));
                } else {
                    ws.send(JSON.stringify({
                        type: 'CHALLENGE_REJECTED',
                        reason: 'El jugador ya no está disponible.'
                    }));
                }
            }

            if (data.type === 'ACCEPT_CHALLENGE') {
                const challengerId = data.challengerId;
                let challengerWs = null;
                let challengerUser = null;

                connectedUsers.forEach((u, sock) => {
                    if (u.id === challengerId && sock.readyState === WebSocket.OPEN && !u.inGame) {
                        challengerWs = sock;
                        challengerUser = u;
                    }
                });

                if (challengerWs && challengerUser) {
                    const roomId = `room_${Date.now()}`;
                    user.inGame = true;
                    user.roomId = roomId;
                    challengerUser.inGame = true;
                    challengerUser.roomId = roomId;

                    activeRooms.set(roomId, {
                        p1: challengerWs,
                        p2: ws,
                        p1Name: challengerUser.username,
                        p2Name: user.username,
                        scores: { p1: 0, p2: 0 }
                    });

                    challengerWs.send(JSON.stringify({
                        type: 'MATCH_FOUND',
                        role: 1,
                        roomId,
                        opponent: user.username,
                        opponentId: user.id
                    }));

                    ws.send(JSON.stringify({
                        type: 'MATCH_FOUND',
                        role: 2,
                        roomId,
                        opponent: challengerUser.username,
                        opponentId: challengerUser.id
                    }));

                    broadcastOnlineState();
                }
            }

            if (data.type === 'LEAVE_LOBBY') {
                waitingQueue = waitingQueue.filter(p => p.ws !== ws);
                if (user.roomId && activeRooms.has(user.roomId)) {
                    const room = activeRooms.get(user.roomId);
                    const rivalWs = room.p1 === ws ? room.p2 : room.p1;
                    if (rivalWs && rivalWs.readyState === WebSocket.OPEN) {
                        rivalWs.send(JSON.stringify({
                            type: 'OPPONENT_LEFT',
                            message: 'Tu rival se ha desconectado o abandonó la partida.'
                        }));
                        const rivalUser = connectedUsers.get(rivalWs);
                        if (rivalUser) {
                            rivalUser.inGame = false;
                            rivalUser.roomId = null;
                        }
                    }
                    activeRooms.delete(user.roomId);
                }
                user.inGame = false;
                user.roomId = null;
                broadcastOnlineState();
            }

            if (data.type === 'GAME_SYNC') {
                // Sincronizar jugadas en la misma sala (puntajes, respuestas de rival)
                if (user.roomId && activeRooms.has(user.roomId)) {
                    const room = activeRooms.get(user.roomId);
                    const rivalWs = room.p1 === ws ? room.p2 : room.p1;
                    if (rivalWs && rivalWs.readyState === WebSocket.OPEN) {
                        rivalWs.send(JSON.stringify({
                            type: 'RIVAL_ACTION',
                            action: data.action,
                            payload: data.payload
                        }));
                    }
                }
            }
        } catch (e) {
            console.error('Error en socket:', e);
        }
    });

    ws.on('close', () => {
        const user = connectedUsers.get(ws);
        if (user && user.roomId && activeRooms.has(user.roomId)) {
            const room = activeRooms.get(user.roomId);
            const rivalWs = room.p1 === ws ? room.p2 : room.p1;
            if (rivalWs && rivalWs.readyState === WebSocket.OPEN) {
                rivalWs.send(JSON.stringify({
                    type: 'OPPONENT_LEFT',
                    message: 'El contrincante se ha desconectado.'
                }));
                const rivalUser = connectedUsers.get(rivalWs);
                if (rivalUser) {
                    rivalUser.inGame = false;
                    rivalUser.roomId = null;
                }
            }
            activeRooms.delete(user.roomId);
        }
        waitingQueue = waitingQueue.filter(p => p.ws !== ws);
        connectedUsers.delete(ws);
        broadcastOnlineState();
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`TILKUNA - Proyecto Educativo Tecnológico`);
    console.log(`Escuela Normal Dr. Eduardo Casanova - Tilcara`);
    console.log(`Servidor activo en http://localhost:${PORT}`);
    console.log(`===============================================`);
});