const mailAiResponse = require('../services/mailAI');
const codeAiResponse = require('../services/codeEditorAI')

exports.mailResponse = async (req, res) => {
    const { query } = req.body;
    try {
        const response = await mailAiResponse(query);
        res.status(200).json({
            success: true,
            response
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
}

exports.codeEditorResponse = async (req, res) => {
    const { query, code } = req.body;
    if (!query) return res.status(401).json({
        success: false,
        message: "Query required!"
    })

    try {
        const response = await codeAiResponse({query, code});

        res.status(200).json({
            success: true,
            response
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}