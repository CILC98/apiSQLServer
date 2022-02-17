import {Router} from 'express'
import {getDataAudit}from '../controllers/audit.controller'

const router = Router()

router.get ('/integridad/:base', getDataAudit)
export default router