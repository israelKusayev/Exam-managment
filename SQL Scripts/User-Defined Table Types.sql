USE [Exam]
GO
/****** Object:  UserDefinedTableType [dbo].[ListId]    Script Date: 4/14/2019 10:32:02 AM ******/
CREATE TYPE [dbo].[ListId] AS TABLE(
	[Id] [int] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[PossibleAnswerTableType]    Script Date: 4/14/2019 10:32:03 AM ******/
CREATE TYPE [dbo].[PossibleAnswerTableType] AS TABLE(
	[Title] [nvarchar](300) NOT NULL,
	[IsCorrect] [bit] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[UserAnswerTableType]    Script Date: 4/14/2019 10:32:03 AM ******/
CREATE TYPE [dbo].[UserAnswerTableType] AS TABLE(
	[AnswerId] [int] NOT NULL,
	[Answer] [bit] NOT NULL
)
GO
