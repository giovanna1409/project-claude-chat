import { GET } from '../api/chats/[id]/answers/route';

describe('GET /api/chats/:id/answers', () => {
    test('should get all chat answers successfully catching its id by the url', async () => {
        const req = {
            url: '/api/chats/1/answers'
        } as unknown as Request;

        const response = await GET(req);

        expect(response.status).toBe(200);
    });
});