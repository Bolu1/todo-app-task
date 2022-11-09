const colors = require ('colors')
import express,{Request, Response, NextFunction} from 'express'
const bodyParser = require('body-parser')
const v1 = require('./routes/index')
const web = require('./routes/web')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
import ErrorHandler from './middleware/errorHandler';
import { NotFoundError } from './core/ApiError';

// security depenedecies

import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
 
// taskkill /F /IM node.exe

const app = express() 


app.use(cors())
app.use(helmet())
app.use(morgan('dev'))


app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
// sanitize data sql or mongo injection
app.use(mongoSanitize());

// set security headers for api security
// app.use(helmet());

// prevent XSS attacks
app.use(xss());

// api request rate limiting default : 100 requests in 10minutes
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());


//main routes
app.use('/api', v1)
//database routes
app.use('/', web)
// app.use('/db', DB)
app.use(express.static(__dirname + '/static'))
// startMetricsServer()

// Handle 404 Requests
app.use('*', (req, res, next) => next(new NotFoundError()));

// error handler
app.use(ErrorHandler);



module.exports = app
