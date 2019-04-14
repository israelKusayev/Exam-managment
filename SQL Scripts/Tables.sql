USE [Exam]
GO
/****** Object:  Table [dbo].[Languages]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Languages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IsRtl] [bit] NOT NULL,
 CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manager]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manager](
	[Email] [nvarchar](100) NOT NULL,
	[PasswordHash] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[Name] [nvarchar](50) NULL,
 CONSTRAINT [PK_Manager] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organization]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organization](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationToManager]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationToManager](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationId] [int] NOT NULL,
	[ManagerId] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_OrganizationToManager_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PossibleAnswer]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PossibleAnswer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[QuestionId] [int] NOT NULL,
	[IsCorrect] [bit] NOT NULL,
	[Title] [nvarchar](300) NOT NULL,
 CONSTRAINT [PK_PossibleAnswer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Question]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Question](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](300) NOT NULL,
	[TextBelow] [nvarchar](400) NULL,
	[CorrectCount] [int] NULL,
	[MultipleChoice] [bit] NOT NULL,
	[HorizontalDisplay] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[LastUpdate] [datetime] NOT NULL,
	[SubjectId] [int] NOT NULL,
	[Tags] [nvarchar](150) NULL,
 CONSTRAINT [PK_Question] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuestionToTest]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuestionToTest](
	[TestId] [int] NOT NULL,
	[QuestionId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TestId] ASC,
	[QuestionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subject]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subject](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[OrganizationId] [int] NOT NULL,
 CONSTRAINT [PK_Subject] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Test]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Test](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SubjectId] [int] NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CreatorEmail] [nvarchar](100) NOT NULL,
	[LanguageId] [int] NOT NULL,
	[Instructions] [nvarchar](2000) NOT NULL,
	[PassingGrade] [tinyint] NOT NULL,
	[ShowAnswers] [bit] NOT NULL,
	[CertificateUrl] [nvarchar](1000) NOT NULL,
	[SuccessMessage] [nvarchar](300) NULL,
	[FailureMessage] [nvarchar](300) NULL,
	[FromEmail] [nvarchar](100) NULL,
	[SendCompletionMessage] [bit] NOT NULL,
	[LastUpdate] [datetime] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[PassingMessageSubject] [nvarchar](200) NULL,
	[PassingMessageBody] [nvarchar](1500) NULL,
	[FailingMessageSubject] [nvarchar](200) NULL,
	[FailingMessageBody] [nvarchar](1500) NULL,
 CONSTRAINT [PK_Test] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TestExecution]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TestExecution](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TestId] [int] NOT NULL,
	[UserEmail] [nvarchar](100) NOT NULL,
	[Grade] [int] NULL,
	[StartTime] [datetime] NOT NULL,
	[NumOfQuestionsAnswered] [int] NOT NULL,
 CONSTRAINT [PK_TestExecution] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Email] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAnswer]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAnswer](
	[QuestionId] [int] NOT NULL,
	[AnswerId] [int] NOT NULL,
	[TestExecutionId] [int] NOT NULL,
	[Answer] [bit] NOT NULL,
 CONSTRAINT [PK_UserAnswer] PRIMARY KEY CLUSTERED 
(
	[QuestionId] ASC,
	[AnswerId] ASC,
	[TestExecutionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserQuestionResult]    Script Date: 4/14/2019 10:29:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserQuestionResult](
	[QuestionId] [int] NOT NULL,
	[TestExecutionId] [int] NOT NULL,
	[Correct] [bit] NOT NULL,
 CONSTRAINT [PK_UserQuestionResult] PRIMARY KEY CLUSTERED 
(
	[QuestionId] ASC,
	[TestExecutionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TestExecution] ADD  DEFAULT ((0)) FOR [NumOfQuestionsAnswered]
GO
ALTER TABLE [dbo].[OrganizationToManager]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationToManager_Manager1] FOREIGN KEY([ManagerId])
REFERENCES [dbo].[Manager] ([Email])
GO
ALTER TABLE [dbo].[OrganizationToManager] CHECK CONSTRAINT [FK_OrganizationToManager_Manager1]
GO
ALTER TABLE [dbo].[OrganizationToManager]  WITH CHECK ADD  CONSTRAINT [FK_OrganizationToManager_Organization1] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organization] ([Id])
GO
ALTER TABLE [dbo].[OrganizationToManager] CHECK CONSTRAINT [FK_OrganizationToManager_Organization1]
GO
ALTER TABLE [dbo].[PossibleAnswer]  WITH CHECK ADD  CONSTRAINT [FK_PossibleAnswer_Question] FOREIGN KEY([QuestionId])
REFERENCES [dbo].[Question] ([Id])
GO
ALTER TABLE [dbo].[PossibleAnswer] CHECK CONSTRAINT [FK_PossibleAnswer_Question]
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD FOREIGN KEY([SubjectId])
REFERENCES [dbo].[Subject] ([Id])
GO
ALTER TABLE [dbo].[QuestionToTest]  WITH CHECK ADD  CONSTRAINT [FK_QuestionToTest_Question] FOREIGN KEY([QuestionId])
REFERENCES [dbo].[Question] ([Id])
GO
ALTER TABLE [dbo].[QuestionToTest] CHECK CONSTRAINT [FK_QuestionToTest_Question]
GO
ALTER TABLE [dbo].[QuestionToTest]  WITH CHECK ADD  CONSTRAINT [FK_QuestionToTest_Test] FOREIGN KEY([TestId])
REFERENCES [dbo].[Test] ([Id])
GO
ALTER TABLE [dbo].[QuestionToTest] CHECK CONSTRAINT [FK_QuestionToTest_Test]
GO
ALTER TABLE [dbo].[Subject]  WITH CHECK ADD  CONSTRAINT [FK_Subject_Organization] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Organization] ([Id])
GO
ALTER TABLE [dbo].[Subject] CHECK CONSTRAINT [FK_Subject_Organization]
GO
ALTER TABLE [dbo].[Test]  WITH CHECK ADD  CONSTRAINT [FK_Test_Languages] FOREIGN KEY([LanguageId])
REFERENCES [dbo].[Languages] ([Id])
GO
ALTER TABLE [dbo].[Test] CHECK CONSTRAINT [FK_Test_Languages]
GO
ALTER TABLE [dbo].[Test]  WITH CHECK ADD  CONSTRAINT [FK_Test_Manager] FOREIGN KEY([CreatorEmail])
REFERENCES [dbo].[Manager] ([Email])
GO
ALTER TABLE [dbo].[Test] CHECK CONSTRAINT [FK_Test_Manager]
GO
ALTER TABLE [dbo].[Test]  WITH CHECK ADD  CONSTRAINT [FK_Test_Subject] FOREIGN KEY([SubjectId])
REFERENCES [dbo].[Subject] ([Id])
GO
ALTER TABLE [dbo].[Test] CHECK CONSTRAINT [FK_Test_Subject]
GO
ALTER TABLE [dbo].[TestExecution]  WITH CHECK ADD  CONSTRAINT [FK_TestExecution_User] FOREIGN KEY([UserEmail])
REFERENCES [dbo].[User] ([Email])
GO
ALTER TABLE [dbo].[TestExecution] CHECK CONSTRAINT [FK_TestExecution_User]
GO
ALTER TABLE [dbo].[UserAnswer]  WITH CHECK ADD  CONSTRAINT [FK_UserAnswer_PossibleAnswer] FOREIGN KEY([AnswerId])
REFERENCES [dbo].[PossibleAnswer] ([Id])
GO
ALTER TABLE [dbo].[UserAnswer] CHECK CONSTRAINT [FK_UserAnswer_PossibleAnswer]
GO
ALTER TABLE [dbo].[UserAnswer]  WITH CHECK ADD  CONSTRAINT [FK_UserAnswer_TestExecution] FOREIGN KEY([TestExecutionId])
REFERENCES [dbo].[TestExecution] ([Id])
GO
ALTER TABLE [dbo].[UserAnswer] CHECK CONSTRAINT [FK_UserAnswer_TestExecution]
GO
ALTER TABLE [dbo].[UserQuestionResult]  WITH CHECK ADD FOREIGN KEY([QuestionId])
REFERENCES [dbo].[Question] ([Id])
GO
ALTER TABLE [dbo].[UserQuestionResult]  WITH CHECK ADD FOREIGN KEY([TestExecutionId])
REFERENCES [dbo].[TestExecution] ([Id])
GO
