import { GET, POST } from '../api/chats/[id]/messages/route';

describe('GET /api/chats/:id/messages', () => {
    test('should get all chat messages successfully catching its id by the url', async () => {
        const req = {
            url: '/api/chats/1/messages'
        } as unknown as Request;

        const response = await GET(req);

        expect(response.status).toBe(200);
    });
});

describe('POST /api/chats/:id', () => {
    test('should return error 500 se POST method is not called correctly', async () => {
        const reqMessage = {
            url: '/api/chats/1/messages',
            json: jest.fn().mockReturnValue
        } as unknown as Request;

        const response = await POST(reqMessage);

        // without mocking anthropic answer creation

        expect(response.status).toBe(500);
    });
});
