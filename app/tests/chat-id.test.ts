import { GET, DELETE } from '../api/chats/[id]/route';

describe('GET /api/chats/:id', () => {
    test('should get chat by id successfully catching its id by the url', async () => {
        const req = {
            url: '/api/chats/1'
        } as unknown as Request;

        const response = await GET(req);

        expect(response.status).toBe(200);
    });
});

describe('DELETE /api/chats/:id', () => {
    test('should delete a chat successfully catching its id by the url', async () => {
        const req = {
            url: '/api/chats/1'
        } as unknown as Request;

        const response = await DELETE(req);

        expect(response.status).toBe(200);
    });
});
