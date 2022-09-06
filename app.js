import CustomLogger, { custom as newLogger} from './logger.js'

const logger = new CustomLogger('Info')

logger.log('server is up and running on port 3000')

newLogger('testing the normal esm export')