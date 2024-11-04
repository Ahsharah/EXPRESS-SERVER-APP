// This is my custom logger - helps me see what's happening on my server
const logger = (req, res, next) => {
    // I like to see the time, method, and URL for each request
    const time = new Date().toLocaleString();
    console.log(`[${time}] ${req.method}: ${req.url}`);