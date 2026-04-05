export const errorMiddleware = (err, req, res, next) => {
    console.error(`[${req.method}] ${req.originalUrl}`);
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        status: err.status || 500,
        message: "Internal server error"
        // message: err.message || "Internal server error"
    })
}