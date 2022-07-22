const { addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer ,editAnswer,deleteAnswer,likeAnswer,undoLikeAnswer} = require('../controller/answer');
const { getAccessToRoute ,getAnswerOwnerAccess} = require('../middlewares/authorization/auth');
const { checkQuestionExist,checkQuestionAndAnswerExist } = require('../middlewares/database/databaseErrorHelpers');

const router = require('express').Router({mergeParams:true})


router.get("/",checkQuestionExist,getAllAnswersByQuestion);
router.post("/",[getAccessToRoute,checkQuestionExist],addNewAnswerToQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);
router.get("/:answer_id/like",[checkQuestionAndAnswerExist,getAccessToRoute],likeAnswer);
router.get("/:answer_id/undo_like",[checkQuestionAndAnswerExist,getAccessToRoute],undoLikeAnswer);

module.exports = router