import express from 'express'
import env from 'dotenv'
import { bootstrap } from './bootstrap.js'
import connection from './DB connection/DBconnection.js'
env.config()
connection
const app= express()
bootstrap(app)

