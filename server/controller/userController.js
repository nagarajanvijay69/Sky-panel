const userModel = require('../model/userModel');

exports.addTicTacToe = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "User id required!"
    })

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { tic_total: 1 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Total match incremented!",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

exports.addWin = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "User id required!"
    })

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { tic_win: 1 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Total win match incremented!",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

exports.addDraw = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "User id required!"
    })

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { tic_draw: 1 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Total draw match incremented!",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}
exports.addChessTotal = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "User id required!"
    })

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { chess_total: 1 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Total match incremented!",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

exports.addChessWin = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "User id required!"
    })

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { chess_win: 1 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Total win match incremented!",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

exports.addChessDraw = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "User id required!"
    })

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { chess_draw: 1 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Total draw match incremented!",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

exports.incrementRating = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "UserId required!"
    });

    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $inc: { rating: 10 }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Rating Incremented!",
            user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
}
exports.decrementRating = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(200).json({
        success: false,
        message: "UserId required!"
    });

    try {
        const user = await userModel.findById(userId);
        user.rating = Math.max(0, user.rating - 10);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Rating Decremented!",
            user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
}