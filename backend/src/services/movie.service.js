import prisma from "../prisma.js";

export const getAllMovieService = async (page, limit, search, genre) => {
    const skip = (page - 1) * limit;

    const where = {};
    if (search) {
        where.title = { contains: search, mode: "insensitive" };
    }
    if (genre) {
        where.genre = genre;
    }

    const [movies, totalMovies] = await Promise.all([
        prisma.movie.findMany({
            where,
            skip: skip,
            take: limit,
            orderBy: { createdAt: "desc" }
        }),
        prisma.movie.count({ where })
    ]);

    const totalPages = Math.ceil(totalMovies / limit);

    return {
        page: page,
        totalPages: totalPages,
        limit: limit,
        totalMovies: totalMovies,
        data: movies,
    }
};

export const getMovieByIdService = async (id) => {
    const movie = await prisma.movie.findUnique({
        where: { id: Number(id) }
    });

    if (!movie) {
        const error = new Error(`Movie with id ${id} not found`);
        error.status = 404;
        throw error;
    }

    return movie;
};

export const createMovieService = async (data) => {
    return await prisma.movie.create({
        data: {
            title: data.title,
            year: data.year,
            genre: data.genre,
            description: data.description
        }
    });
};

export const updateMovieService = async (id, data) => {

    const isMovieExist = await prisma.movie.findUnique({
        where: { id: Number(id) }
    })

    if (!isMovieExist) {
        const error = new Error(`Movie with id ${id} not found`);
        error.status = 404;
        throw error;
    }

    return await prisma.movie.update({
        where: { id: Number(id) },
        data: {
            title: data.title,
            year: data.year,
            genre: data.genre,
            description: data.description
        }
    })
};

export const deleteMovieService = async (id) => {

    const isMovieExist = await prisma.movie.findUnique({
        where: { id: Number(id) }
    })

    if (!isMovieExist) {
        const error = new Error(`Movie with id ${id} not found`);
        error.status = 404;
        throw error;
    }

    return await prisma.movie.delete({
        where: { id: Number(id) }
    })
};

export const syncMoviesService = async (keyword = "batman") => {
    const apiKey = process.env.OMDB_API_KEY || "demo";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;

    const externalResponse = await fetch(url);
    const externalData = await externalResponse.json();
    const list = externalData.Search || [];

    if (list.length === 0) return 0;

    const result = await prisma.movie.createMany({
        data: list.map((item) => ({
            title: item.Title,
            year: Number(item.Year) || null,
            genre: "Unknown",
            externalId: item.imdbID,
            description: "Synced from OMDb"
        })),
        skipDuplicates: true,
    });

    return result.count;
};