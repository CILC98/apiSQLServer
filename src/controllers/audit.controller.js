import {getConnection} from '../database/connection'
import {queries} from '../database/querys'

export const getDataAudit = async (req,res)=>{
   const pool = await getConnection(req.params.base);
   const result = await pool.request().query(queries.getAuditData)
   console.log(result);
   res.json(result.recordset)

}