import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");//normaly user auth goes here
    if (!success)
      return res.status(429).json({ message: "too many requests, try later" });
    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimiter;