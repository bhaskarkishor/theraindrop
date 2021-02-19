const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['login'] = require('../middleware/login.js')
middleware['login'] = middleware['login'].default || middleware['login']

export default middleware
