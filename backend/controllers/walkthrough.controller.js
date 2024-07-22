const WalkthroughService = require("../services/walkthrough/WalkthroughService");

const updateWalkthroughAction = async (req, res, next) => {
    try {
        const walkthroughData = req.body;   
        const service = new WalkthroughService();
        const result = await service.updateWalkthrough(walkthroughData);
        res.status(200).json({
            state: true,
            message: 'Walkthrough updated!',
            data: result,
        })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    updateWalkthroughAction,
}