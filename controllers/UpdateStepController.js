
const Step = require('../models/Steps')

const UpdateStep = async (req, res) => {
    try{
    let id = req.params.id
    const {title, content, image} = req.body
    await Step.findByIdAndUpdate(
        id, {
            title: title,
            content: content,
            image: image 
        }, (err, step) => {
            if (err){
                res.status(500);
                throw new Error(`Failed to update step database with step id: ${id}` )
            } else {
                res.status(200).json({ step: step})
            }
        })
    } catch (err) {
        res.status(500).json({ 
            message: err.message
        })
    }
}

export default UpdateStep;