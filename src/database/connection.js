import sql from 'mssql'
import config from '../config';

const dbSettings ={
    user : config.bdUser,
    password : config.bdPassword,
    server: config.bdServer,
    database: '',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export async function getConnection(bd){
    try{
    dbSettings.database = bd
    const pool = await sql.connect(dbSettings);
    return pool;
    }catch(error){
        console.error({error});
    }
}

