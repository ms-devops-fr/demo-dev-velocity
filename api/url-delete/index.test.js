const httpFunction = require('./index');
const context = require('../testing/defaultContext');

test('Delete new short URL', async () => {
    const request = {
        params: { slug: 'ms' }
    };

    await httpFunction(context, request);

    expect(context.res.status).toEqual(200);
    context.db.close();
});