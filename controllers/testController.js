const asyncHandler =  require('express-async-handler')

/**
 * @desc Get study list
 * @route POST
 * @route /api/test
 * @access Private
 */
 const CheckTest = asyncHandler(async(req, res) => {
     const { name } = req.body;

     if(!name) {
        res.status(400)
        throw new Error('No Name inputed')
     }

     return res.status(200).json({msg:`HI there ${name}, welcome to HNG I9`})
})



module.exports = {
   CheckTest
}