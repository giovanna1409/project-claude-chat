
import { GET, POST } from '../api/chats/route';

describe('GET /api/chats', () => {
    test('should get all chats successfully', async () => {
        const response = await GET();

        expect(response.status).toBe(200);
    });
});

describe('POST /api/chats', () => {
    test('should create a new chat', async () => {
        const req = {
            json: jest.fn().mockReturnValue
        } as unknown as Request;

        const response = await POST(req);

        expect(response.status).toBe(201);
    });
});
