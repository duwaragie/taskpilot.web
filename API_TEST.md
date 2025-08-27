# JSONPlaceholder API Integration Test

You can test the JSONPlaceholder integration using these API endpoints:

## Test the API directly:

1. **Fetch tasks**: 
   ```
   curl https://jsonplaceholder.typicode.com/todos
   ```

2. **Create a task**:
   ```
   curl -X POST https://jsonplaceholder.typicode.com/todos \
     -H "Content-Type: application/json" \
     -d '{"title": "Test task", "completed": false, "userId": 1}'
   ```

3. **Update a task**:
   ```
   curl -X PUT https://jsonplaceholder.typicode.com/todos/1 \
     -H "Content-Type: application/json" \
     -d '{"title": "Updated task", "completed": true, "userId": 1}'
   ```

4. **Delete a task**:
   ```
   curl -X DELETE https://jsonplaceholder.typicode.com/todos/1
   ```

## What's integrated:

✅ **Real HTTP requests** to JSONPlaceholder
✅ **English task titles** - Latin titles automatically translated to meaningful English
✅ **Error handling** for network failures
✅ **TypeScript types** for API responses
✅ **CORS support** (no proxy needed)
✅ **RESTful endpoints** for all CRUD operations

## Limitations of JSONPlaceholder:

- **Fake responses**: Changes are not persisted
- **Read-only**: POST/PUT/DELETE return fake success responses
- **Limited data**: Only provides sample todo items
- **Latin titles**: Original titles are in Latin/Lorem Ipsum (we translate these to English)
- **No authentication**: No auth headers needed

This is perfect for prototyping and development. When ready for production, simply update the `API_BASE_URL` in `src/utils/api.ts` to point to your real backend API.
