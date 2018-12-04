--SELECT 'EXEC MoveIndexToFileGroup '''
--    +TABLE_CATALOG+''','''
--    +TABLE_SCHEMA+''','''
--    +TABLE_NAME+''',NULL,''OnlineHRS_Indexes'';'
--    +char(13)+char(10)
--    +'GO'+char(13)+char(10)
--FROM INFORMATION_SCHEMA.TABLES
--WHERE TABLE_TYPE = 'BASE TABLE'
--ORDER BY TABLE_SCHEMA, TABLE_NAME;
---------------------------------------------------------------------------------------------------------------
SELECT 'EXEC MoveIndexToFileGroup '''
    +TABLE_CATALOG+''','''
    +TABLE_SCHEMA+''','''
    +TABLE_NAME+''',NULL,''OnlineHRS_Indexes'';'
    +char(13)+char(10)
    +' '+char(13)+char(10)
FROM INFORMATION_SCHEMA.TABLES t INNER JOIN (SELECT o.[name] [TableName], o.[type], i.name [IndexName], i.[index_id], f.[name] FilegroupName,
case when i.[type] = 1 then 'Clustered index'
when i.[type] = 2 then 'Nonclustered unique index'
when i.[type] = 3 then 'XML index'
when i.[type] = 4 then 'Spatial index'
when i.[type] = 5 then 'Clustered columnstore index'
when i.[type] = 6 then 'Nonclustered columnstore index'
when i.[type] = 7 then 'Nonclustered hash index'
end as index_type FROM sys.indexes i
INNER JOIN sys.filegroups f
ON i.data_space_id = f.data_space_id
INNER JOIN sys.all_objects o
ON i.[object_id] = o.[object_id] WHERE i.data_space_id = f.data_space_id
	AND o.type = 'U'/*User Created Tables*/ 
	AND i.type = 2/*Non Clustered Index*/ 
	AND f.name <> 'OnlineHRS_Indexes') I 
ON T.TABLE_NAME = I.[TableName]
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;
---------------------------------------------------------------------------------------------------------------

CREATE PROC [dbo].[MoveIndexToFileGroup]      
 @DBName varchar(100)  ,   
 @SchemaName sysname = 'dbo',       
 @ObjectNameList Varchar(Max),        
 @IndexName sysname = null,  
 @FileGroupName varchar(100)  
        
WITH RECOMPILE   
AS        
  
BEGIN  
     
SET NOCOUNT ON  
  
DECLARE @IndexSQL NVarchar(Max)  
DECLARE @IndexKeySQL NVarchar(Max)  
DECLARE @IncludeColSQL NVarchar(Max)  
DECLARE @FinalSQL NVarchar(Max)  
  
DECLARE @CurLoopCount Int  
DECLARE @MaxLoopCount Int  
DECLARE @StartPos Int  
DECLARE @EndPos Int  
  
DECLARE @ObjectName sysname  
DECLARE @IndName sysname  
DECLARE @IsUnique Varchar(10)  
DECLARE @Type Varchar(25)  
DECLARE @IsPadded Varchar(5)  
DECLARE @IgnoreDupKey Varchar(5) 
DECLARE @AllowRowLocks Varchar(5)  
DECLARE @AllowPageLocks Varchar(5) 
DECLARE @FillFactor Int  
DECLARE @ExistingFGName Varchar(Max) 
DECLARE @FilterDef NVarchar(Max)
  
DECLARE @ErrorMessage NVARCHAR(4000)  
DECLARE @SQL nvarchar(4000)  
DECLARE @RetVal Bit  
  
DECLARE @ObjectList Table(Id Int Identity(1,1),ObjectName sysname)  
  
DECLARE @WholeIndexData Table  
(  
ObjectName sysname  
,IndexName sysname  
,Is_Unique Bit  
,Type_Desc Varchar(25)  
,Is_Padded Bit  
,Ignore_Dup_Key Bit  
,Allow_Row_Locks Bit  
,Allow_Page_Locks Bit  
,Fill_Factor Int  
,Is_Descending_Key Bit  
,ColumnName sysname  
,Is_Included_Column Bit  
,FileGroupName Varchar(Max)
,Has_Filter Bit
,Filter_Definition NVarchar(Max)  
)  
  
DECLARE @DistinctIndexData Table  
(  
Id Int IDENTITY(1,1)  
,ObjectName sysname  
,IndexName sysname  
,Is_Unique Bit  
,Type_Desc Varchar(25)  
,Is_Padded Bit  
,Ignore_Dup_Key Bit  
,Allow_Row_Locks Bit  
,Allow_Page_Locks Bit  
,Fill_Factor Int  
,FileGroupName Varchar(Max) 
,Has_Filter Bit
,Filter_Definition NVarchar(Max)  
)  
  
-----Validate arguments------�-   
  
IF(@DBName IS NULL)  
BEGIN  
 SELECT @ErrorMessage = 'Database Name must be supplied.'   
 GOTO ABEND  
END  
  
IF(@ObjectNameList IS NULL)  
BEGIN  
 SELECT @ErrorMessage = 'Table or View Name(s) must be supplied.'   
 GOTO ABEND  
END  
  
IF(@FileGroupName IS NULL)  
BEGIN  
 SELECT @ErrorMessage = 'FileGroup Name must be supplied.'   
 GOTO ABEND  
END  
  
--Check for the existence of the Database  
IF NOT EXISTS(SELECT Name FROM sys.databases where Name = @DBName) 
BEGIN 
 SET @ErrorMessage = 'The specified Database does not exist'
 GOTO ABEND
END
  
--Check for the existence of the Schema  
IF(upper(@SchemaName) <> 'DBO')  
BEGIN  
 SET @SQL = 'SELECT @RetVal = COUNT(*) FROM ' + QUOTENAME(@DBName) + '.sys.schemas WHERE name = ''' + @SchemaName + ''''
 BEGIN TRY  
  EXEC sp_executesql @SQL,N'@RetVal Bit OUTPUT',@RetVal OUTPUT  
 END TRY  
 BEGIN CATCH  
  SELECT @ErrorMessage = ERROR_MESSAGE()   
  GOTO ABEND  
 END CATCH  
 IF(@RetVal = 0)  
 BEGIN  
  SELECT @ErrorMessage = 'No Schema with the name ' + @SchemaName + ' exists in the Database ' + @DBName   
  GOTO ABEND  
 END   
END  
  
--Check for the existence of the FileGroup  
SET @SQL = 'SELECT @RetVal=COUNT(*) FROM ' + QUOTENAME(@DBName) + '.sys.filegroups WHERE name = ''' + @FileGroupName + ''''
BEGIN TRY  
 EXEC sp_executesql @SQL,N'@RetVal Bit OUTPUT',@RetVal OUTPUT  
END TRY  
BEGIN CATCH  
 SELECT @ErrorMessage = ERROR_MESSAGE()   
 GOTO ABEND  
END CATCH  
  
IF(@RetVal = 0)  
BEGIN  
 SELECT @ErrorMessage = 'No FileGroup with the name ' + @FileGroupName + ' exists in the Database ' + @DBName   
 GOTO ABEND  
END  
  
--�-Get the objects from the concatenated list----------------�-  
  
SET @StartPos = 0  
SET @EndPos = 0  
  
WHILE(@EndPos >= 0)  
BEGIN  
  
 SELECT @EndPos = CHARINDEX(',',@ObjectNameList,@StartPos)  
 IF(@EndPos = 0) --Means, separator is not found  
 BEGIN  
  INSERT INTO @ObjectList  
  SELECT SUBSTRING(@ObjectNameList,@StartPos,(LEN(@ObjectNameList) - @StartPos)+1)   
     
  BREAK  
 END  
   
 INSERT INTO @ObjectList  
 SELECT SUBSTRING(@ObjectNameList,@StartPos,(@EndPos - @StartPos))  
    
 SET @StartPos = @EndPos + 1  
   
END  
  
-----Check for the validity of all the Objects------�-  
  
SET @StartPos = 1  
SELECT @EndPos = COUNT(*) FROM @ObjectList  
  
WHILE(@StartPos <= @EndPos)  
BEGIN  
  
 SELECT @ObjectName = ObjectName FROM @ObjectList WHERE Id = @StartPos  
  
 --Check for existence of the object  
 SET @SQL = 'SELECT @RetVal=COUNT(*) FROM ' + QUOTENAME(@DBName) + '.sys.Objects WHERE type IN (''U'',''V'') AND name = ''' + @ObjectName +''''
 BEGIN TRY  
  EXEC sp_executesql @SQL,N'@RetVal Int OUTPUT',@RetVal OUTPUT  
 END TRY  
 BEGIN CATCH  
  SELECT @ErrorMessage = ERROR_MESSAGE()   
  GOTO ABEND  
 END CATCH  
  
 IF(@RetVal = 0)  
 BEGIN  
  SELECT @ErrorMessage = 'No Table or View with the name ' + @ObjectName + ' exists in the Database ' + @DBName   
  GOTO ABEND  
 END   
  
 --Check for existence of Index  
 IF(@IndexName IS NOT NULL)  
 BEGIN  
  SET @SQL = 'SELECT @RetVal=COUNT(*) FROM ' + QUOTENAME(@DBName) + '.sys.Indexes si INNER JOIN ' + QUOTENAME(@DBName) + '.sys.Objects so '  
  SET @SQL = @SQL + ' ON si.Object_Id = so.Object_Id WHERE so.Schema_id = ' + CAST(Schema_Id(@Schemaname) as varchar(25))   
  SET @SQL = @SQL + ' AND so.name = ''' + @ObjectName +  'AND si.name = ''' + @IndexName + ''''   
  
  BEGIN TRY  
   EXEC sp_executesql @SQL,N'@RetVal Int OUTPUT',@RetVal OUTPUT  
  END TRY  
  BEGIN CATCH  
   SELECT @ErrorMessage = ERROR_MESSAGE()   
   GOTO ABEND  
  END CATCH  
  
  IF(@RetVal = 0)  
  BEGIN  
   SELECT @ErrorMessage = 'No Index with the name ' + @IndexName + ' exists on the Object ' + @ObjectName   
   GOTO ABEND  
  END  
 END  
   
 SET @StartPos = @StartPos + 1  
END  
  
-----Loop till all the Objects are processed------�-  
  
SET @StartPos = 1  
SELECT @EndPos = COUNT(*) FROM @ObjectList  
  
WHILE(@StartPos <= @EndPos)  
BEGIN  
  
 SELECT @ObjectName = ObjectName FROM @ObjectList WHERE Id = @StartPos  
 
 -----Build the SQL to get the index data based on the inputs provided------�-   
  
 SET @IndexSQL =   
 'SELECT so.Name as ObjectName, si.Name as IndexName,si.Is_Unique,si.Type_Desc'  
 + ',si.Is_Padded,si.Ignore_Dup_Key,si.Allow_Row_Locks,si.Allow_Page_Locks,si.Fill_Factor,sic.Is_Descending_Key'  
 + ',sc.Name as ColumnName,sic.Is_Included_Column,sf.Name as FileGroupName,si.Has_Filter,si.Filter_Definition FROM '
 + QUOTENAME(@DBName) + '.sys.Objects so INNER JOIN ' + QUOTENAME(@DBName) + '.sys.Indexes si ON so.Object_Id = si.Object_id INNER JOIN '  
 + QUOTENAME(@DBName) + '.sys.FileGroups sf ON sf.Data_Space_Id = si.Data_Space_Id INNER JOIN '   
 + QUOTENAME(@DBName) + '.sys.Index_columns sic ON si.Object_Id = sic.Object_Id AND si.Index_id = sic.Index_id INNER JOIN '  
 + QUOTENAME(@DBName) + '.sys.Columns sc ON sic.Column_Id = sc.Column_Id and sc.Object_Id = sic.Object_Id '  
 + ' WHERE so.Name = ''' + @ObjectName  + ''''
 + ' AND so.Schema_id = ' + CAST(Schema_Id(@Schemaname) as varchar(25)) + ' AND si.Type_Desc = ''NONCLUSTERED'''  
  
 IF(@IndexName IS NOT NULL)  
 BEGIN  
  SET @IndexSQL = @IndexSQL + ' AND si.Name = ''' + @IndexName + ''''
 END  
  
 SET @IndexSQL = @IndexSQL + ' ORDER BY ObjectName, IndexName'  
  
 --PRINT @IndexSQL  
  
 -----Insert the Index Data in to a variable------�-   
  
 BEGIN TRY  
  INSERT INTO @WholeIndexData  
  EXEC sp_executesql @IndexSQL  
 END TRY  
 BEGIN CATCH  
  SELECT @ErrorMessage = ERROR_MESSAGE()   
  GOTO ABEND  
 END CATCH  
  
 --Check if any indexes are there on the object. Otherwise exit  
 IF (SELECT COUNT(*) FROM @WholeIndexData) = 0  
 BEGIN  
  SELECT 'Object does not have any nonclustered indexes to move'   
  GOTO FINAL   
 END  
    
 -----Get the distinct index rows in to a variable------�-   
  
 INSERT INTO @DistinctIndexData  
 SELECT DISTINCT   
 ObjectName,IndexName,Is_Unique,Type_Desc,Is_Padded,Ignore_Dup_Key,Allow_Row_Locks,Allow_Page_Locks,Fill_Factor,FileGroupName,Has_Filter,Filter_Definition 
 FROM @WholeIndexData
 WHERE ObjectName = @ObjectName  
  
 SELECT @CurLoopCount = Min(Id), @MaxLoopCount = Max(Id) FROM @DistinctIndexData WHERE ObjectName = @ObjectName
  
 --SELECT @CurLoopCount, @MaxLoopCount  
  
 -----Loop till all the indexes are processed------�-   
  
 WHILE(@CurLoopCount <= @MaxLoopCount)  
 BEGIN  
  
  SET @IndexKeySQL =''
  SET @IncludeColSQL = ''
  
  -----Get the current index row to be processed------�-  
  SELECT   
   @IndName   = IndexName  
   ,@Type   = Type_Desc
   ,@ExistingFGName = FileGroupName
   ,@IsUnique  = CASE WHEN Is_Unique = 1 THEN 'UNIQUE ' ELSE '' END  
   ,@IsPadded  = CASE WHEN Is_Padded = 0 THEN 'OFF,' ELSE 'ON,'  END  
   ,@IgnoreDupKey = CASE WHEN Ignore_Dup_Key = 0 THEN 'OFF,' ELSE 'ON,' END  
   ,@AllowRowLocks = CASE WHEN Allow_Row_Locks = 0 THEN 'OFF,' ELSE 'ON,' END 
   ,@AllowPageLocks = CASE WHEN Allow_Page_Locks = 0 THEN 'OFF,' ELSE 'ON,' END  
   ,@FillFactor  = CASE WHEN Fill_Factor = 0 THEN 100 ELSE Fill_Factor END  
   ,@FilterDef  = CASE WHEN Has_Filter = 1 THEN (' WHERE ' + Filter_Definition) ELSE '' END  
  FROM @DistinctIndexData   
  WHERE Id = @CurLoopCount  
    
  -----Check if the index is already not part of that FileGroup------�-  
  
  IF(@ExistingFGName = @FileGroupName)  
  BEGIN  
   PRINT 'Index ' +  @IndName + ' is NOT moved as it is already part of the FileGroup ' + @FileGroupName + '.'  
   SET @CurLoopCount = @CurLoopCount + 1  
   CONTINUE  
  END  
  
  --- Construct the Index key string along with the direction--------  
  SELECT   
   @IndexKeySQL =   
   CASE  
   WHEN @IndexKeySQL = '' THEN (@IndexKeySQL + QUOTENAME(ColumnName) + CASE WHEN Is_Descending_Key = 0 THEN ' ASC' ELSE ' DESC' END)   
   ELSE (@IndexKeySQL + ',' + QUOTENAME(ColumnName) + CASE WHEN Is_Descending_Key = 0 THEN ' ASC' ELSE ' DESC' END)   
   END  
  FROM @WholeIndexData  
  WHERE ObjectName = @ObjectName   
  AND IndexName = @IndName   
  AND Is_Included_Column = 0  
    
  --PRINT @IndexKeySQL   
    
  -- Construct the Included Column string --------------  
  SELECT   
   @IncludeColSQL =   
   CASE  
   WHEN @IncludeColSQL = '' THEN (@IncludeColSQL + QUOTENAME(ColumnName))   
   ELSE (@IncludeColSQL + ',' + QUOTENAME(ColumnName))   
   END   
  FROM @WholeIndexData  
  WHERE ObjectName = @ObjectName   
  AND IndexName = @IndName   
  AND Is_Included_Column = 1   
    
  --PRINT @IncludeColSQL  
  
  -----Construct the final Create Index statement------�-  
  SELECT 
  @FinalSQL = 'CREATE ' + @IsUnique + @Type + ' INDEX ' + QUOTENAME(@IndName) 
  + ' ON ' + QUOTENAME(@DBName) + '.' + QUOTENAME(@SchemaName) + '.' + QUOTENAME(@ObjectName)  
  + '(' + @IndexKeySQL + ') '   
  + CASE WHEN LEN(@IncludeColSQL) <> 0 THEN  'INCLUDE(' + @IncludeColSQL + ') ' ELSE '' END
  + @FilterDef  
  + ' WITH ('   
  + 'PAD_INDEX = ' + @IsPadded   
  + 'IGNORE_DUP_KEY = ' + @IgnoreDupKey  
  + 'ALLOW_ROW_LOCKS  = ' + @AllowRowLocks   
  + 'ALLOW_PAGE_LOCKS  = ' + @AllowPageLocks   
  + 'SORT_IN_TEMPDB = OFF,'   
  + 'DROP_EXISTING = ON,'   
  + 'ONLINE = OFF,'  
  + 'FILLFACTOR = ' + CAST(@FillFactor AS Varchar(3))  
  + ') ON ' + QUOTENAME(@FileGroupName)  
  
  --PRINT @FinalSQL  
  
  -----Execute the Create Index statement to move to the specified filegroup------�-  
  BEGIN TRY  
   EXEC sp_executesql @FinalSQL  
  END TRY  
  BEGIN CATCH  
   SELECT @ErrorMessage = ERROR_MESSAGE()   
   GOTO ABEND  
  END CATCH   
  PRINT 'Index ' +  @IndName + ' on Object ' + @ObjectName + ' is moved successfully.'   
    
  SET @CurLoopCount = @CurLoopCount + 1  
  
 END  
   
 SET @StartPos = @StartPos + 1  
END  
 SELECT 'The procedure completed successfully.'  
 RETURN  
  
ABEND:  
 RAISERROR ( @ErrorMessage  ,16,1)
FINAL:  
 RETURN    
END 