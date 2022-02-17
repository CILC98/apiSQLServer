
export const queries={
    getAnomaliasSD(nombreBase){
        return `USE ${nombreBase} --CAMBBIAR AQUI EL NOMBRE
        DECLARE @DBNAME VARCHAR(255);
        SET @DBNAME = '${nombreBase}' --CAMBIAR AQUI EL NOMBRE
        
        --NO CAMBIAR NADA DESDE ESTE COMENTARIO HACIA ABAJO
        drop view if exists dbo.TablasyColumnas;
        DECLARE @PLANTILLA_VISTA VARCHAR(MAX), @PLANTILLA_ANOMALIAsDATOS VARCHAR(MAX), @PLANTILLA_BASE VARCHAR(MAX);
        SET @PLANTILLA_BASE  = 'USE {DBNAME};'
        SET @PLANTILLA_VISTA = 'CREATE VIEW TablasyColumnas AS SELECT tabs.[TABLE_NAME], cols.COLUMN_NAME FROM [{DBNAME}].[INFORMATION_SCHEMA].[TABLES] as tabs JOIN [{DBNAME}].[INFORMATION_SCHEMA].[COLUMNS] AS cols ON tabs.TABLE_NAME like cols.TABLE_NAME WHERE tabs.TABLE_TYPE like ''BASE_TABLE'';'
        SET @PLANTILLA_ANOMALIAsDATOS = 'select tc.TABLE_NAME, ct.TABLE_NAME, "Posible columna anomala"= tc.COLUMN_NAME from TablasyColumnas tc join TablasyColumnas ct on tc.COLUMN_NAME like ct.COLUMN_NAME where tc.TABLE_NAME not like ct.TABLE_NAME AND (tc.COLUMN_NAME in (select CU.COLUMN_NAME FROM [{DBNAME}].[INFORMATION_SCHEMA].[TABLE_CONSTRAINTS] AS TC JOIN [{DBNAME}].[INFORMATION_SCHEMA].[KEY_COLUMN_USAGE] AS CU ON TC.CONSTRAINT_NAME LIKE CU.CONSTRAINT_NAME
        where (TC.CONSTRAINT_TYPE like ''PRIMARY KEY'') and (CU.TABLE_NAME like tc.TABLE_NAME )
        ) AND ct.COLUMN_NAME not in (select CU.COLUMN_NAME FROM [{DBNAME}].[INFORMATION_SCHEMA].[TABLE_CONSTRAINTS] AS TC JOIN [{DBNAME}].[INFORMATION_SCHEMA].[KEY_COLUMN_USAGE] AS CU ON TC.CONSTRAINT_NAME LIKE CU.CONSTRAINT_NAME
        where (TC.CONSTRAINT_TYPE like ''FOREIGN KEY'') and (CU.TABLE_NAME like ct.TABLE_NAME )));'
        DECLARE @SCRIPT_USO1 VARCHAR(MAX),@SCRIPT_USO2 VARCHAR(MAX)
        
        SET @SCRIPT_USO1 = REPLACE(@PLANTILLA_VISTA,'{DBNAME}',@DBNAME)
        SET @SCRIPT_USO2 = REPLACE(@PLANTILLA_ANOMALIAsDATOS,'{DBNAME}',@DBNAME)
        EXECUTE(@SCRIPT_USO1)
        EXECUTE(@SCRIPT_USO2)`
    },
    getAnomaliasCD(nombreBase){
        return `USE ${nombreBase}
        DBCC CHECKCONSTRAINTS WITH ALL_CONSTRAINTS;
        `
    },
    listarDbs:'select name from sys.databases',

    getRelacionesEntidades(nombreBase){
        return `
            USE ${nombreBase}
            drop table if exists dbo.estructura

  
            SELECT
              fk.name as 'Nombre de la restriccion',
              tp.name as 'Tabla' ,
              tr.name as 'Columna' ,
            tr.name 'Tabla de referencia',
              cr.name as 'Columna de referencia',
            fk.delete_referential_action_desc as 'Acccion al eliminar',
            fk.update_referential_action_desc as 'Accion al actualizar'
            into estructura
          
            FROM 
              sys.foreign_keys fk
            INNER JOIN 
              sys.tables tp ON fk.parent_object_id = tp.object_id
            INNER JOIN 
              sys.tables tr ON fk.referenced_object_id = tr.object_id
            INNER JOIN 
              sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
            INNER JOIN 
              sys.columns cp ON fkc.parent_column_id = cp.column_id AND fkc.parent_object_id = cp.object_id
            INNER JOIN 
              sys.columns cr ON fkc.referenced_column_id = cr.column_id AND fkc.referenced_object_id = cr.object_id
            ORDER BY
              tp.name, cp.column_id
          
          
            select * from estructura
        `
    }
    
}