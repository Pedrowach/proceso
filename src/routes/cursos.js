const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.curso = await ctx.orm.curso.findByPk(id);
  if (!ctx.state.curso) return ctx.throw(404);
  return next();
});

router.get('cursos.new', '/new', async (ctx) => {
  await ctx.render('cursos/new', {
    submitCursosPath: ctx.router.url('cursos.create'),
    cursosPath: ctx.router.url('cursos.list'),
  });
});

//CREATE curso
router.post('cursos.create', '/', async (ctx) => {
  const curso = ctx.orm.curso.build(ctx.request.body);
  await curso.save({ fields: ['nombrecurso', 'sigla', 'promediomin', 'promediometa']});
  ctx.redirect(ctx.router.url('cursos.list'));
});

//READ curso
router.get('cursos.list', '/', async (ctx) => {
  const cursos = await ctx.orm.curso.findAll();
  await ctx.render('cursos/index', {
    cursos: cursos,
    newCursosPath: ctx.router.url('cursos.new'),
    showCursosPath: (id) => ctx.router.url('cursos.show', { id }),
    
  });
});


router.get('cursos.show', '/:id', async (ctx) => {
  const curso = ctx.state.curso;
  await ctx.render('cursos/show', {
    curso: curso,
    cursosPath: ctx.router.url('cursos.list'),
    editCursosPath: (id) => ctx.router.url('cursos.edit', { id }),
    deleteCursosPath: (id) => ctx.router.url('cursos.delete', { id }),
  });
});

//Update
router.get('cursos.edit', '/:id/edit', async (ctx) => {
  const curso = ctx.state.curso;
  await ctx.render('cursos/edit', {
    curso: curso,
    submitCursosPath: (id) => ctx.router.url('cursos.update', { id }),
    showCursosPath: (id) => ctx.router.url('cursos.show', { id }),
  });
});

router.put('cursos.update', '/:id/update', async (ctx) => {
  const curso = ctx.state.curso;
  const {nombrecurso, sigla, promediomin, promediometa} = ctx.request.body;
  await curso.update({nombrecurso, sigla, promediomin, promediometa});
  ctx.redirect(ctx.router.url('cursos.list'));
});

//Delete
router.del('cursos.delete', '/:id', async (ctx) => {
  const curso = ctx.state.curso;
  await curso.destroy();
  ctx.redirect(ctx.router.url('cursos.list'));
});

module.exports = router;