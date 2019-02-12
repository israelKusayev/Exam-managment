
USE Exam

 --SP

CREATE PROCEDURE sp_CreateTest
@language int,
@SubjectId int,
@testName nvarchar(200),
@passingGrade tinyint,
@showAnswres bit,
@header nvarchar(2000),
@certificate nvarchar(1000),
@sendCompletionMessage bit,
@successMessage nvarchar(300) =null,
@failureMessage nvarchar(300)=null,
@formEmail nvarchar(100) =null,
@successEmailTemplateId int = null,
@failureEmailTemplateId int = null,
@CreatorEmail nvarchar(100)
AS
 BEGIN 
INSERT INTO Test 
    (LanguageId, Name, PassingGrade,ShowAnswers,Instructions,SuccessMessage,FailureMessage,CertificateUrl,FromEmail,SendCompletionMessage,SuccessEmailTemplateId,FailureEmailTemplateId,SubjectId,CreatorEmail) 
VALUES 
    (@language,@testName,@passingGrade,@showAnswres,@header,@successMessage,@failureMessage,@certificate,@formEmail,@sendCompletionMessage,@successEmailTemplateId,@failureEmailTemplateId,@SubjectId,@CreatorEmail);
	SELECT SCOPE_IDENTITY() as id;
	END 
GO

CREATE PROCEDURE dbo.sp_CreateEmailTemplate
@Subject nvarchar(200),
@Body nvarchar(1500)

AS
 BEGIN 
INSERT INTO EmailTemplate 
    (Subject, Body)
VALUES 
    (@Subject,@Body);
	SELECT SCOPE_IDENTITY() as id;
	END 
GO


CREATE PROCEDURE dbo.sp_GetQuestions
AS 
BEGIN
SELECT * FROM Question
END
GO


CREATE PROCEDURE dbo.sp_AddQuestionsToTest
@questionsId AS ListId readonly,
@testId int
AS 
BEGIN

INSERT INTO QuestionToTest(TestId,QuestionId)
SELECT @testId,Id FROM @questionsId

END
GO


-- Create the data type
CREATE TYPE ListId AS TABLE 
(
Id int not null
)
GO
