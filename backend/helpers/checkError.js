module.exports = (app) => {
  app.use(function (req, res, next) {
    process.once('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection:', reason.stack)
      res.status(500).json({ messages: 'An unexpected error occured. Please try again.' })
      // next(reason);
    })
    next()
  })
}
