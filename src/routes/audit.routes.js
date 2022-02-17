import {Router} from 'express'
import {getDataAudit, getDataAuditCD, getDatabases}from '../controllers/audit.controller'

const router = Router()

router.get ('/integridadSD/:base', getDataAudit)

router.get('/integridadCD/:base', getDataAuditCD)

router.get('/integridad/dbs', getDatabases)
export default router

