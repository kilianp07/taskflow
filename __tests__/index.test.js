const request = require('supertest');
const { app, server } = require('../src/index');

afterAll((done) => {
    server.close(() => {
        console.log("Server closed after tests");
        done();
    });
});

describe('API Tasks', () => {
    it('📌 GET /tasks - Récupérer toutes les tâches', async () => {
        const res = await request(app).get('/tasks');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: '1', title: 'Mock Task', completed: false }]);
    });

    it('📌 POST /tasks - Créer une tâche', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ id: `mocked-id-${Math.floor(Math.random() * 1000)}`, title: 'New Task' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('New Task');
    });

    it('📌 PATCH /tasks/:id - Modifier une tâche existante', async () => {
        const res = await request(app)
            .patch('/tasks/1')
            .send({ completed: true });

        expect(res.status).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    it('📌 DELETE /tasks/:id - Supprimer une tâche', async () => {
        const res = await request(app).delete('/tasks/1');
        expect(res.status).toBe(204);
    });

    it('❌ PATCH /tasks/:id - Erreur si la tâche n’existe pas', async () => {
        const res = await request(app).patch('/tasks/999').send({ completed: true });
        expect(res.status).toBe(404);
    });
});
