import {getConnection} from '../database/connection'
import {queries} from '../database/querys'

export const getDataAudit = async (req,res)=>{
   const pool = await getConnection(req.params.base);
   const result = await pool.request().query(queries.getAnomaliasSD(req.params['base']))
   console.log(result);
   res.json(result.recordset)

}

export const getDataAuditCD = async (req,res)=>{
   const pool = await getConnection(req.params.base);
   const result = await pool.request().query(queries.getAnomaliasCD(req.params['base']))
   console.log(result);
   res.json(result.recordset)
}

export const getDatabases = async (req,res)=>{
   const pool = await getConnection('master');
   const result = await pool.request().query(queries.listarDbs)
   console.log(result);
   res.json(result.recordset)
}

export const getRelacionentidades = async (req,res)=>{
   const pool = await getConnection(req.params.base);
   const result = await pool.request().query(queries.getRelacionesEntidades(req.params.base))
   console.log(result);
   res.json(result.recordset)
}
