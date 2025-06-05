import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import dotenv from 'dotenv'

dotenv.config();
//only allow 20 requests per hour

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100, "1 h")
})

export default rateLimit