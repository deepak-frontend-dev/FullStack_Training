export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";

    console.error(`[ERROR] [${req.method}] ${req.originalUrl} - ${status}: ${message}`);
    
    if (status === 500) {
        console.error(err.stack);
    }

    res.status(status).json({
        success: false,
        status,
        message,
    });
};