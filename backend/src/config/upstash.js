import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import dotenv from 'dotenv'

dotenv.config();
//only allow 10 requests per hour

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(20, "1 h")
})

export default rateLimit