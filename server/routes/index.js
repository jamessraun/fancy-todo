var express = require('express')
 ,  router = express.Router()
 ,  api_user = require('../controllers/users_controller')
 ,  api_memo =  require('../controllers/memos_controller')
 ,  authorize = require('../helpers/authorize')


router.post('/signup',api_user.signup)
router.post('/login',api_user.login)
router.post('/memos/:id',api_memo.createMemo)
router.get('/memos/:id',api_memo.getAllMemoByUser)
router.put('/memos/:id/edit',api_memo.updateMemo)
router.put('/memos/:id/complete',api_memo.completeMemo)
router.put('/memos/:id/uncomplete',api_memo.uncompleteMemo)
router.delete('/memos/:id',api_memo.deleteMemo)
router.post('/validation',authorize)
router.post('/loginfb', api_user.loginFacebook)

module.exports = router;
