export const validatePagination = (query) => {
    let { page, limit } = query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    if (isNaN(page) || page < 1) {
        return "Page must be a number greater than or equal to 1";
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
        return "Limit must be a number greater than or equal to 1 and less than or equal to 100";
    }

    return null;
};