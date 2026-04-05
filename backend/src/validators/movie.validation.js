export const validateMovie = (data) => {
    const { title, year, genre, description } = data;
    const errors = [];
    const validGenres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];

    if (!title || !title.trim()) errors.push("Title is required");

    const yearNumber = Number(year);
    if (!year || isNaN(yearNumber)) errors.push("Year is invalid");

    if (!genre || !genre.trim()) errors.push("Genre is required");
    else if (!validGenres.includes(genre)) errors.push(`Genre must be one of: ${validGenres.join(", ")}`);

    if (!description || !description.trim()) errors.push("Description is required");

    return errors.length ? errors : null;
};
