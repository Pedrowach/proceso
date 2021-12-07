const KoaRouter = require('koa-router');

const router = new KoaRouter({ prefix: '/api' });
router.get('/', (ctx) => {
    ctx.body = { message: 'Laperapp API'}
});
module.exports = router;