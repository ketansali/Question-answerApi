const { askNewQuestion, getAllQuestions,getSingleQuestion,likeQuestion,undoLikeQuestion,editQuestion,deleteQuestion } = require('../controller/question');
const { getAccessToRoute, getQuestionOwnerAccess } = require('../middlewares/authorization/auth');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');
const questionQueryMiddleware = require('../middlewares/query/questionQueryMiddleware')
const answerQueryMiddleware = require('../middlewares/query/answerQueryMiddleware')
const Question = require('../models/Question') 
const router = require('express').Router()
const answer = require('./answer')

router.get("/",questionQueryMiddleware(Question, {
    population : {
        path:"user",
        select:"name profile_image"
    }
}),getAllQuestions);
router.post("/ask",getAccessToRoute,askNewQuestion);
router.get("/:id",[checkQuestionExist,answerQueryMiddleware(Question,{
    array : "answers",
    populate: [{
        path: "user",
        select : "name profile_image"
    },
    {
        path : "answers",
        populate : {
            path:"user"  
        },
        
        select : "content user" 
        
    }]

})],getSingleQuestion);

router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExist],undoLikeQuestion);

router.put("/:id/edit",
[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],
editQuestion);
router.delete("/:id/delete",
[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],
deleteQuestion);
router.use("/:question_id/answers",checkQuestionExist,answer);

module.exports = router