const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.users = await ctx.orm.users.findByPk(id);
  if (!ctx.state.users) return ctx.throw(404);
  return next();
});

router.get('users.new', '/new', async (ctx) => {
  await ctx.render('users/new', {
    submitUsersPath: ctx.router.url('users.create'),
    usersPath: ctx.router.url('users.list'),
  });
});

//CREATE User
router.post('users.create', '/', async (ctx) => {
  const user = ctx.orm.users.build(ctx.request.body);
  await user.save({ fields: ['name', 'username', 'password', 'email']});
  ctx.redirect(ctx.router.url('users.list'));
});

//READ User
router.get('users.list', '/', async (ctx) => {
  const users = await ctx.orm.users.findAll();
  await ctx.render('users/index', {
    users: users,
    newUsersPath: ctx.router.url('users.new'),
    showUsersPath: (id) => ctx.router.url('users.show', { id }),
    
  });
});


router.get('users.show', '/:id', async (ctx) => {
  const user = ctx.state.users;
  await ctx.render('users/show', {
    user: user,
    usersPath: ctx.router.url('users.list'),
    editUsersPath: (id) => ctx.router.url('users.edit', { id }),
    deleteUsersPath: (id) => ctx.router.url('users.delete', { id }),
  });
});

//Update
router.get('users.edit', '/:id/edit', async (ctx) => {
  const user = ctx.state.users;
  await ctx.render('users/edit', {
    user: user,
    submitUsersPath: (id) => ctx.router.url('users.update', { id }),
    showUsersPath: (id) => ctx.router.url('users.show', { id }),
  });
});

router.put('users.update', '/:id/update', async (ctx) => {
  const user = ctx.state.users;
  const {name, username, password, email} = ctx.request.body;
  await user.update({name, username, password, email});
  ctx.redirect(ctx.router.url('users.list'));
});

//Delete
router.del('users.delete', '/:id', async (ctx) => {
  const user = ctx.state.users;
  await user.destroy();
  ctx.redirect(ctx.router.url('users.list'));
});

module.exports = router;