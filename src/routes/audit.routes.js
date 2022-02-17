import {Router} from 'express'
import {getDataAudit, getDataAuditCD, getDatabases, getRelacionentidades}from '../controllers/audit.controller'

const router = Router()

router.get ('/integridadSD/:base', getDataAudit)

router.get('/integridadCD/:base', getDataAuditCD)

router.get('/integridad/dbs', getDatabases)

router.get('/relacionentidades/:base',getRelacionentidades)
export default router

