const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index', { 
    usersPath: ctx.router.url('users.list'),
    cursosPath: ctx.router.url('cursos.list'),    
   });

});

module.exports = router;
