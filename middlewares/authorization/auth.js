const CustomError = require("../../helpers/error/customError");
const errorWrapper = require("../../helpers/error/errorWrapper");
const jwt = require('jsonwebtoken')
const Question= require('../../models/Question')
const Answer = require('../../models/Answer')

const getAccessToRoute = errorWrapper(async(req,res,next)=>{
    //Is Token Include
    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this pages",403))
    }

    // Get Token From Header
    const accessToken = getAccessTokenFromHeader(req);
   
    jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decodedToken) => {
        
        if (err) {
            return next(new CustomError("You are not authorized to access this page",401));
        }
        req.user = {
            id : decodedToken.id,
            name : decodedToken.name
        };
        next();
    });
})
const getAccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization;
    
    const accessToken = authorization.split(" ")[1];
    return accessToken;

}
const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer")
}
const getQuestionOwnerAccess = errorWrapper(async (req,res,next) => {

    const userId = req.user.id;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);
    
    if (question.user != userId) {
        return next(new CustomError("Only owner can handle this operation",403));

    }
    return next(); 
});
const getAnswerOwnerAccess = errorWrapper(async (req,res,next) => {

    const userId = req.user.id;
    const answerId = req.params.answer_id;

    const answer = await Answer.findById(answerId);
    
    if (answer.user != userId) {
        return next(new CustomError("Only owner can handle this operation",403));

    }
    return next(); 
});
module.exports = {
    getAccessToRoute,
    getQuestionOwnerAccess,
    getAnswerOwnerAccess
}