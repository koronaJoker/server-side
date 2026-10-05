const logger = (req, res, next) => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    console.log(`${req.method} | ${req.url} | ${day}.${month}.${year} ${hours}:${minutes}`);

    next();
};

export default logger