import jest from 'eslint-plugin-jest';

jest.mock('firebase-admin', () => {
    return {
        initializeApp: jest.fn(),
        credential: {
            cert: jest.fn(() => ({})),
        },
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                orderBy: jest.fn().mockReturnThis(),
                get: jest.fn(() =>
                    Promise.resolve({
                        forEach: (callback) => {
                            callback({
                                id: '1',
                                data: () => ({ title: 'Mock Task', completed: false }),
                            });
                        },
                    })
                ),
                doc: jest.fn((id) => {
                    const newId = id || `mocked-id-${Math.floor(Math.random() * 1000)}`;
                    let taskData = { title: 'Mock Task', completed: false };
                    return {
                        get: jest.fn(() =>
                            Promise.resolve({
                                exists: id === '1',
                                id: newId,
                                data: () => (id === '1' ? taskData: null),
                            })
                        ),
                        set: jest.fn(() =>
                            Promise.resolve({
                                id: newId,
                                title: 'New Task',
                                completed: false,
                                createdAt: new Date().toISOString(),
                            })
                        ),
                        update: jest.fn((updates) => {
                            taskData = { ...taskData, ...updates };
                            return Promise.resolve();
                        }),
                        delete: jest.fn(),
                    };
                }),
            })),
        })),
    };
});
