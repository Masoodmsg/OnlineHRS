EXEC sp_configure 'clr enabled' ,1
GO

RECONFIGURE
GO
EXEC sp_configure 'clr enabled'   -- make sure it took
GO


EXEC sp_changedbowner 'sa'

GO

ALTER DATABASE OnlineHRS SET TRUSTWORTHY ON;

GO