USE [Exam]
GO
/****** Object:  StoredProcedure [dbo].[sp_ActivateManagerByEmail]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[sp_ActivateManagerByEmail] @Email nvarchar(100)
AS

UPDATE Manager 
SET IsActive=1 
where Email=@Email AND IsActive=0

SELECT  @@ROWCOUNT as RowsCount, iif(@@ERROR=0,1,0) as Success


GO
/****** Object:  StoredProcedure [dbo].[sp_AddQuestionsToTest]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_AddQuestionsToTest]
@questionsId AS ListId readonly,
@testId int
AS 
BEGIN

INSERT INTO QuestionToTest(TestId,QuestionId)
SELECT @testId,Id FROM @questionsId

END
GO
/****** Object:  StoredProcedure [dbo].[sp_CalcGrade]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




 CREATE proc [dbo].[sp_CalcGrade]
@testId int,
@testExecId int
as
begin
select QuestionId as questionId ,AnswerId as answerId from UserAnswer where TestExecutionId = @testExecId
order by questionId,answerId


 SELECT pa.Id AS answerId,  
               pa.QuestionId AS questionId, 
               pa.IsCorrect as isCorrect,
			   q.CorrectCount as correctCount,
			   q.MultipleChoice as multipleChoice
        FROM dbo.PossibleAnswer AS pa
		INNER JOIN dbo.Question as q on q.Id = pa.QuestionId
        INNER JOIN dbo.QuestionToTest AS qt ON qt.QuestionId = pa.QuestionId
        WHERE qt.TestId = @testId and  pa.IsCorrect =1
		order by questionId, answerId

		select Count(distinct QuestionId) questionCount
		from QuestionToTest 
		where TestId =@testId
		group by TestId
		end
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateQuestion]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[sp_CreateQuestion] 
@SubjectId int,
@PossibleAnswers as PossibleAnswerTableType readonly,
@Title nvarchar(300),
@TextBelow nvarchar(400),
@MultipleChoice bit,
@Tags nvarchar(150),
@HorizontalDisplay bit
AS

begin

insert into Question (SubjectId, Title,TextBelow,CorrectCount,MultipleChoice,
Tags,HorizontalDisplay,IsActive,LastUpdate)
values (@SubjectId, @Title,@TextBelow,0,@MultipleChoice,@Tags,@HorizontalDisplay,
0,GETDATE())
;

insert into PossibleAnswer (QuestionId, IsCorrect, Title)
Select IDENT_CURRENT('Question'),IsCorrect,Title
from @PossibleAnswers
;

update Question set CorrectCount=
(select count(*) from @PossibleAnswers where IsCorrect=1)

where Id=IDENT_CURRENT('Question')
;


end


GO
/****** Object:  StoredProcedure [dbo].[sp_CreateTest]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[sp_CreateTest] @language              INT, 
                                      @SubjectId             INT, 
                                      @testName              NVARCHAR(200), 
                                      @passingGrade          TINYINT, 
                                      @showAnswres           BIT, 
                                      @header                NVARCHAR(2000), 
                                      @certificate           NVARCHAR(1000), 
                                      @sendCompletionMessage BIT, 
                                      @successMessage        NVARCHAR(300), 
                                      @failureMessage        NVARCHAR(300), 
                                      @formEmail             NVARCHAR(100)  = NULL, 
                                      @passingMessageSubject NVARCHAR(200)  = NULL, 
                                      @passingMessageBody    NVARCHAR(1500) = NULL, 
                                      @failingMessageSubject NVARCHAR(200)  = NULL, 
                                      @failingMessageBody    NVARCHAR(1500) = NULL, 
                                      @CreatorEmail          NVARCHAR(100)
AS
    BEGIN
        INSERT INTO Test
        (LanguageId, 
         Name, 
         PassingGrade, 
         ShowAnswers, 
         Instructions, 
         SuccessMessage, 
         FailureMessage, 
         CertificateUrl, 
         FromEmail, 
         SendCompletionMessage, 
         SubjectId, 
         CreatorEmail, 
         LastUpdate, 
         IsActive, 
         PassingMessageSubject, 
         PassingMessageBody, 
         FailingMessageSubject, 
         FailingMessageBody
        )
        VALUES
        (@language, 
         @testName, 
         @passingGrade, 
         @showAnswres, 
         @header, 
         @successMessage, 
         @failureMessage, 
         @certificate, 
         @formEmail, 
         @sendCompletionMessage, 
         @SubjectId, 
         @CreatorEmail, 
         CURRENT_TIMESTAMP, 
         0, 
         @passingMessageSubject, 
         @passingMessageBody, 
         @failingMessageSubject, 
         @failingMessageBody
        );
        SELECT SCOPE_IDENTITY() AS id;
    END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateTestExecution]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_CreateTestExecution] @testId INT, 
                                               @userId NVARCHAR(200)
AS
    BEGIN
        INSERT INTO TestExecution
        (TestId, 
         UserEmail, 
         StartTime
		)
        VALUES
        (@testId, 
         @userId, 
         GETDATE()
		
        );
        SELECT SCOPE_IDENTITY() AS id;
    END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CreateUserAnswer]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_CreateUserAnswer]
 @testExecutionId INT,
 @questionId int,
 @answerIds AS ListId readonly
AS
    BEGIN
        INSERT INTO UserAnswer
        (QuestionId, AnswerId, TestExecutionId)
       SELECT @questionId,Id,@testExecutionId FROM @answerIds
		
        
       
    END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteQuestion]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE procedure [dbo].[sp_DeleteQuestion] 
@QuestionId int
AS

begin

delete from QuestionToTest where QuestionId =@QuestionId
delete from PossibleAnswer where QuestionId=@QuestionId
;

Delete from Question where Id=@QuestionId
;

end


GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteTest]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[sp_DeleteTest]



@testId int
AS
 BEGIN

delete from QuestionToTest where TestId =@testId
delete from Test where Id=@testId

	END 
GO
/****** Object:  StoredProcedure [dbo].[sp_FinishTestExecution]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE procedure [dbo].[sp_FinishTestExecution]
@TestExecutionId int

as

Declare @TestId int;
declare @PassingGrade int;
declare @ShowAnswers bit;

set @TestId=(select TestId from TestExecution where TestExecution.Id=@TestExecutionId)
;

select @PassingGrade =Test.PassingGrade, @ShowAnswers=Test.ShowAnswers from
Test where Test.Id=@TestId
;

Declare @nTestQuestions int;
set @nTestQuestions=(select count(*) from QuestionToTest where QuestionToTest.TestId=@TestId)
;

declare @nCorrectAnswers int;
set @nCorrectAnswers=(select count(*) from UserQuestionResult where UserQuestionResult.TestExecutionId=@TestExecutionId and UserQuestionResult.Correct=1)
;

Declare @nQuestionAnswered int
set @nQuestionAnswered=(select count(*) from UserQuestionResult where UserQuestionResult.TestExecutionId=@TestExecutionId)

Declare @Grade int
set @Grade=@nCorrectAnswers*100/@nTestQuestions


Update TestExecution
set Grade=@Grade, NumOfQuestionsAnswered=@nQuestionAnswered
where TestExecution.id=@TestExecutionId
;

select @Grade as Grade, @PassingGrade as PassingGrade,  @nCorrectAnswers as NumOfCorrectAnswers,@nTestQuestions as NumOfTestQuestions, @ShowAnswers as ShowAnswers,@nQuestionAnswered as NumOfQuestionsAnswered
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllLanguages]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_GetAllLanguages]
AS
SELECT * FROM Languages
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAnswers]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_GetAnswers]
@questionId int
AS
BEGIN

SELECT * FROM PossibleAnswer 
WHERE QuestionId = @questionId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetManagerByEmail]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE  PROCEDURE [dbo].[sp_GetManagerByEmail] @Email nvarchar(100)
AS
SELECT * FROM Manager WHERE Email = @Email

GO
/****** Object:  StoredProcedure [dbo].[sp_GetOrganizations]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_GetOrganizations]
@managerId nvarchar
AS
BEGIN

select o.[Name] as [name], om.OrganizationId as organizationId
from OrganizationToManager om
join Organization o on om.ManagerId = managerId
where o.Id = om.OrganizationId

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetQuestionById]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[sp_GetQuestionById]
@QuestionId int
As
Select * from Question where Id=@QuestionId
GO
/****** Object:  StoredProcedure [dbo].[sp_GetQuestionPossibleAnswers]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[sp_GetQuestionPossibleAnswers]
@QuestionId int
As
Select * from PossibleAnswer where QuestionId=@QuestionId
GO
/****** Object:  StoredProcedure [dbo].[sp_GetQuestions]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[sp_GetQuestions]
@SubjectId int
AS 
BEGIN
SELECT Question.*, QuestionToTestCount.TestCount FROM Question left join (Select q.Id, count(distinct qtt.TestId) as TestCount from Question q left join QuestionToTest qtt on q.Id=qtt.QuestionId group by q.Id) as QuestionToTestCount
on Question.Id=QuestionToTestCount.Id
where Question.SubjectId=@SubjectId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetSubject]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- get subject
CREATE PROCEDURE [dbo].[sp_GetSubject]
@organizationId nvarchar
AS
BEGIN
select Id as id,Name as name from Subject where Subject.OrganizationId = @organizationId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTest]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_GetTest]
@id int
AS
BEGIN
SELECT
Test.Id as id ,SubjectId as subjectId,LanguageId as language ,Name as testName,  Instructions as header,
PassingGrade as passingGrade,ShowAnswers as showAnswres,
CertificateUrl as certificate,SuccessMessage as successMessage,FailureMessage as failureMessage,
SendCompletionMessage as sendCompletionMessage,
FromEmail as formEmail,
FailingMessageSubject as failingMessageSubject, FailingMessageBody as failingMessageBody,PassingMessageSubject as passingMessageSubject,PassingMessageBody as passingMessageBody
FROM Test 
WHERE Test.Id = @id

SELECT
QuestionId as questionId

FROM  QuestionToTest q
WHERE q.TestId = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTestExecutionResults]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_GetTestExecutionResults]
@TestExecutionId int
AS
--select UserAnswer.QuestionId, Question.Title as QuestionTitle,Question.TextBelow as QuestionTextBelow, UserAnswer.AnswerId, UserAnswer.Answer, PossibleAnswer.IsCorrect,PossibleAnswer.Title as AnswerTitle
--from PossibleAnswer  join UserAnswer on UserAnswer.AnswerId=PossibleAnswer.Id
--				join Question on PossibleAnswer.QuestionId=Question.Id

--where UserAnswer.TestExecutionId=@TestExecutionId 
--order by UserAnswer.TestExecutionId

select Question.Id as QuestionId, Question.Title as QuestionTitle, Question.TextBelow as QuestionTextBelow,  Question.HorizontalDisplay as HorizontalDisplay, Question.Tags as QuestionTags, PossibleAnswer.Id as AnswerId, PossibleAnswer.Title as AnswerTitle, PossibleAnswer.IsCorrect as IsCorrect, UserAnswer.Answer as UserAnswer

from TestExecution 
	join Test on Test.Id=TestExecution.TestId
	join QuestionToTest on QuestionToTest.TestId=Test.Id
	join Question on Question.Id = QuestionToTest.QuestionId
	join PossibleAnswer on PossibleAnswer.QuestionId=QuestionToTest.QuestionId
	left join UserAnswer on UserAnswer.AnswerId=PossibleAnswer.Id and UserAnswer.QuestionId=PossibleAnswer.QuestionId and UserAnswer.TestExecutionId=@TestExecutionId

where TestExecution.Id=@TestExecutionId 
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTestExecutionsByDateRange]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[sp_GetTestExecutionsByDateRange]
@TestId int,
@FromDate datetime,
@ToDate datetime,
@SubjectId int
AS

select TestExecution.Id, [User].FirstName,[User].LastName,TestExecution.StartTime, TestExecution.NumOfQuestionsAnswered, TestExecution.Grade
from Test join TestExecution on Test.Id = TestExecution.TestId join [User] on TestExecution.UserEmail=[User].Email 
where Test.SubjectId = @SubjectId and TestExecution.TestId=@TestId and
		(@FromDate IS NULL OR TestExecution.StartTime>=@FromDate) and (@ToDate IS NULL OR TestExecution.StartTime<=DATEADD(day, 1, @ToDate))
		;

GO
/****** Object:  StoredProcedure [dbo].[sp_GetTestExecutionsQuestionsStats]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	

CREATE procedure [dbo].[sp_GetTestExecutionsQuestionsStats]
@SubjectId int,
@TestId int,
@FromDate datetime,
@ToDate datetime


	
AS


select A.QuestionId,QuestionTitle,QuestionTextBelow,QuestionTags, NumOfSubmissions ,CorrectlyAnsweredPercentage,AnswerTitle,AnswerId,IsCorrect,NumTimesAnswered from

	(select Question.Id as QuestionId, Question.Title as QuestionTitle,Question.TextBelow as QuestionTextBelow, Question.Tags as QuestionTags, count(UserQuestionResult.TestExecutionId) as NumOfSubmissions,count(case when UserQuestionResult.Correct=1 then UserQuestionResult.TestExecutionId end)*100/count(UserQuestionResult.TestExecutionId) as CorrectlyAnsweredPercentage
	from Question
	join QuestionToTest on QuestionToTest.QuestionId=Question.Id
	join Test on Test.Id = QuestionToTest.TestId
	join TestExecution on TestExecution.TestId=Test.Id
	left join UserQuestionResult on UserQuestionResult.QuestionId=Question.Id and UserQuestionResult.TestExecutionId=TestExecution.Id
	
	
	where  Test.SubjectId=@SubjectId and TestExecution.TestId=@TestId and (@FromDate IS NULL or TestExecution.StartTime>=@FromDate) and (@ToDate is null or TestExecution.StartTime<=DATEADD(day, 1, @ToDate))
	group by Question.Id, Question.Title,Question.TextBelow, Question.Tags
	) as A

join

	(select Question.Id as QuestionId, PossibleAnswer.Title as AnswerTitle, PossibleAnswer.Id as AnswerId,PossibleAnswer.IsCorrect ,  count( case when UserAnswer.Answer=1 then UserAnswer.TestExecutionId end) as NumTimesAnswered
	from Question
	join QuestionToTest on QuestionToTest.QuestionId=Question.Id
	join Test on Test.Id = QuestionToTest.TestId
	join TestExecution on TestExecution.TestId=Test.Id
	join PossibleAnswer on PossibleAnswer.QuestionId=Question.Id
	full join UserAnswer on  UserAnswer.AnswerId=PossibleAnswer.Id and UserAnswer.QuestionId=Question.Id and UserAnswer.TestExecutionId=TestExecution.Id
	
	
	where  Test.SubjectId=@SubjectId and TestExecution.TestId=@TestId and (@FromDate IS NULL or TestExecution.StartTime>=@FromDate) and (@ToDate is null or TestExecution.StartTime<=DATEADD(day, 1, @ToDate))
	group by Question.Id, PossibleAnswer.Title , PossibleAnswer.Id, PossibleAnswer.Title,PossibleAnswer.IsCorrect
	) 
	as B

on
A.QuestionId=B.QuestionId
order by A.QuestionId
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTestExecutionsReportHeader]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_GetTestExecutionsReportHeader]
@SubjectId int,
@TestId int,
@FromDate datetime,
@ToDate datetime
AS


--declare @TestId int;
--set @TestId = (Select TestExecution.TestId from TestExecution where TestExecution.Id=@TestExecutionId);


declare @TestName nvarchar(200);
set @TestName=(select Name from Test 
where Test.Id=@TestId and Test.SubjectId=@SubjectId);

declare @NumOfQuestion int;
set @NumOfQuestion = (select count(*) from QuestionToTest join Test on QuestionToTest.TestId=Test.Id  
where QuestionToTest.TestId=@TestId  and Test.SubjectId=@SubjectId);

declare @PassingGrade int;
set @PassingGrade=(select PassingGrade from Test where 
Test.Id=@TestId and Test.SubjectId=@SubjectId);

(select * from

(select 
	@TestName as TestName,
	@NumOfQuestion as NumOfQuestions,
	@PassingGrade as PassingGrade,
	count(*) as NumberOfSubmissions, 
	count(distinct case when TestExecution.Grade>=@PassingGrade then TestExecution.UserEmail end) as NumberOfRespondentsPassed,
	(count(distinct case when TestExecution.Grade>=@PassingGrade then TestExecution.UserEmail end)*100/count(distinct TestExecution.UserEmail)) as PassingPercentage,
	avg(TestExecution.Grade) as AverageGrade

from TestExecution join Test on TestExecution.TestId=Test.Id
where Test.SubjectId=@SubjectId and TestExecution.TestId=@TestId and (@FromDate IS NULL or TestExecution.StartTime>=@FromDate) and (@ToDate is null or TestExecution.StartTime<=DATEADD(day, 1, @ToDate))
) as A

cross join


(SELECT 
	DISTINCT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Grade) OVER () as MedianGrade

FROM TestExecution join Test on TestExecution.TestId=Test.Id
where  Test.SubjectId=@SubjectId and TestExecution.TestId=@TestId and (@FromDate IS NULL or TestExecution.StartTime>=@FromDate) and (@ToDate is null or TestExecution.StartTime<=DATEADD(day, 1, @ToDate))
) as B

) 


GO
/****** Object:  StoredProcedure [dbo].[sp_GetTestExecutionsResults]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE procedure [dbo].[sp_GetTestExecutionsResults]
	@SubjectId int,
	@TestId int,
	@FromDate datetime,
	@ToDate datetime

	AS
	select TestExecution.Id as TestExecutionId, Question.Id as QuestionId, Question.Title as QuestionTitle,Question.TextBelow as QuestionTextBelow, UserAnswer.AnswerId, UserAnswer.Answer as UserAnswer, PossibleAnswer.IsCorrect,PossibleAnswer.Title as AnswerTitle
	--from UserAnswer join TestExecution on UserAnswer.TestExecutionId=TestExecution.Id 
	--				join Test on TestExecution.TestId=Test.Id 
	--				join PossibleAnswer on UserAnswer.AnswerId=PossibleAnswer.Id
	--				join Question on PossibleAnswer.QuestionId=Question.Id
	from TestExecution 
		join Test on Test.Id=TestExecution.TestId
		join QuestionToTest on QuestionToTest.TestId=Test.Id
		join Question on Question.Id = QuestionToTest.QuestionId
		join PossibleAnswer on PossibleAnswer.QuestionId=QuestionToTest.QuestionId
		left join UserAnswer on UserAnswer.AnswerId=PossibleAnswer.Id and UserAnswer.QuestionId=PossibleAnswer.QuestionId and UserAnswer.TestExecutionId=TestExecution.Id

		where  Test.SubjectId=@SubjectId and TestExecution.TestId=@TestId and (@FromDate IS NULL or TestExecution.StartTime>=@FromDate) and (@ToDate is null or TestExecution.StartTime<=DATEADD(day, 1, @ToDate))

GO
/****** Object:  StoredProcedure [dbo].[sp_GetTestQuestionsAndAnswers]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_GetTestQuestionsAndAnswers] @testId INT
AS
    BEGIN
        SELECT Test.Id AS id, 
               Test.Name AS name, 
               Test.Instructions AS instructions, 
               Test.PassingGrade AS passingGrade, 
               Test.SuccessMessage AS successMessage, 
               Test.FailureMessage AS failureMessage
        FROM dbo.Test
        WHERE Test.Id = @testId;
        SELECT q.Id AS id, 
               q.HorizontalDisplay AS horizontalDisplay, 
               q.MultipleChoice AS multipleChoice, 
               q.TextBelow AS textBelow, 
               q.Title AS title
        FROM dbo.Question q
             LEFT JOIN dbo.QuestionToTest qt ON(qt.QuestionId = q.Id)
        WHERE qt.TestId = @testId;
        SELECT pa.Id AS id, 
               pa.QuestionId AS questionId, 
               pa.Title AS title
        FROM dbo.PossibleAnswer AS PA
             INNER JOIN dbo.QuestionToTest AS qt ON qt.QuestionId = pa.QuestionId
        WHERE qt.TestId = @testId;
        UPDATE Test
          SET 
              IsActive = 1
        WHERE Id = @testId;
    END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetTests]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE  PROCEDURE [dbo].[sp_GetTests]
@subjectId int
AS
BEGIN

SELECT t.Id as id, t.LastUpdate as lastUpdate,t.Name as name,t.IsActive as isActive, count(q.QuestionId) as questionsCount
from Test t
left join QuestionToTest q
 on (q.TestId = t.Id)
where t.SubjectId = @subjectId
group by t.Id ,t.LastUpdate,t.Name,t.IsActive

END
GO
/****** Object:  StoredProcedure [dbo].[sp_ManagerRegister]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE  PROCEDURE [dbo].[sp_ManagerRegister]
@Email NVarChar(100),
@PasswordHash NVarChar(100),
@Name NVarChar(50)
AS
	INSERT INTO Manager (Email, PasswordHash ,Name,IsActive) 
	VALUES (@Email,@PasswordHash,@Name,0);
	Return  IIF(@@Error<>0, 1 , 0)


GO
/****** Object:  StoredProcedure [dbo].[sp_ManagerResetPassword]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE  PROCEDURE [dbo].[sp_ManagerResetPassword] 
	-- Add the parameters for the stored procedure here
	@Email nvarchar(100),
	@PasswordHash nvarchar(100)
AS
	UPDATE Manager 
	SET PasswordHash=@PasswordHash
	WHERE Email=@Email

GO
/****** Object:  StoredProcedure [dbo].[sp_StudentLogin]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE  procedure [dbo].[sp_StudentLogin] 
@Email nvarchar(100),
@FirstName nvarchar(50),
@LastName nvarchar(50),
@Phone nvarchar(50)
AS

if not exists (select * from [User]  where Email =@Email)
begin
INSERT INTO [dbo].[User]
(Email, FirstName,LastName,Phone)
VALUES
(@Email,@FirstName,@LastName,@Phone)
end

SELECT * from [User] where Email = @Email

GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateAnswersInTestExec]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






/****** Object:  StoredProcedure [dbo].[sp_DeleteQuestionsFromTest]    Script Date: 2/14/2019 3:28:13 PM ******/

CREATE PROCEDURE [dbo].[sp_UpdateAnswersInTestExec] @TestExecutionId INT, 
                                                    @QuestionId      INT, 
                                                    @Answers AS       UserAnswerTableType READONLY
AS
    BEGIN
        DELETE FROM UserAnswer
        WHERE TestExecutionId = @TestExecutionId and QuestionId = @QuestionId
              AND AnswerId IN
        (
            SELECT AnswerId
            FROM @Answers
        );

			INSERT INTO UserAnswer
			(AnswerId, QuestionId, TestExecutionId,Answer)
				   SELECT AnswerId, @QuestionId, @TestExecutionId,Answer
				   FROM @Answers;

			delete  from UserQuestionResult
			where QuestionId=@QuestionId and TestExecutionId=@TestExecutionId
			;

			if exists (select * from @Answers)
			begin
				declare @IsQuestionAnswerCorrect bit;
				declare @CorrectAnswersCount int;

				set @CorrectAnswersCount=
				(select count(*) from 
				(select * from UserAnswer where UserAnswer.QuestionId=@QuestionId and UserAnswer.TestExecutionId=@TestExecutionId)  as UA 
				join  
				(select * from PossibleAnswer where PossibleAnswer.QuestionId=@QuestionId) as PA 
				on 
				UA.AnswerId=PA.Id 
				where UA.Answer=PA.IsCorrect);
		
				set @IsQuestionAnswerCorrect=iif(@CorrectAnswersCount=
				(select count(*) from PossibleAnswer where QuestionId=@QuestionId)
				,1,0);
			
				insert into UserQuestionResult (QuestionId,TestExecutionId,Correct)
				values (@QuestionId,@TestExecutionId,@IsQuestionAnswerCorrect);
			end
    END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateQuestion]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[sp_UpdateQuestion] 
@QuestionId int,
@PossibleAnswers as PossibleAnswerTableType readonly,
@Title nvarchar(300),
@TextBelow nvarchar(400),
@MultipleChoice bit,
@Tags nvarchar(150),
@HorizontalDisplay bit
AS

begin

update Question set  Title=@Title,TextBelow=@TextBelow,MultipleChoice=@MultipleChoice,
Tags=@Tags,HorizontalDisplay=@HorizontalDisplay,LastUpdate=GETDATE()
where Id=@QuestionId
;

delete from PossibleAnswer where QuestionId=@QuestionId
;

insert into PossibleAnswer (QuestionId, IsCorrect, Title)
Select @QuestionId,IsCorrect,Title
from @PossibleAnswers
;

update Question set CorrectCount=
(select count(*) from @PossibleAnswers where IsCorrect=1)

where Id=@QuestionId
;

end


GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateQuestionsInTest]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



 create PROCEDURE [dbo].[sp_UpdateQuestionsInTest]
@questionsId AS ListId readonly,
@testId int

AS
 BEGIN 
  delete from QuestionToTest  where TestId = @testId and
   QuestionId not in (select Id from @questionsId);

   insert into QuestionToTest (TestId,QuestionId)
   select @testId, id from @questionsId
   where not exists (select * from QuestionToTest where TestId = @testId  and QuestionId = Id)
END 
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateTest]    Script Date: 4/14/2019 10:30:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[sp_UpdateTest]
@testId int,
@language int,
@SubjectId int,
@testName nvarchar(200),
@passingGrade tinyint,
@showAnswres bit,
@header nvarchar(2000),
@certificate nvarchar(1000),
@sendCompletionMessage bit,
@successMessage nvarchar(300),
@failureMessage nvarchar(300),
@formEmail nvarchar(100) =null,
@passingMessageSubject nvarchar(200) = null,
@passingMessageBody nvarchar(1500) = null,
@failingMessageSubject nvarchar(200) = null,
@failingMessageBody nvarchar(1500) = null,
@CreatorEmail nvarchar(100)
AS
BEGIN

UPDATE Test
SET 
LanguageId =@language, Name= @testName,PassingGrade=@passingGrade,ShowAnswers=@showAnswres,
Instructions=@header,CertificateUrl = @certificate,SendCompletionMessage=@sendCompletionMessage,
SuccessMessage=@successMessage,FailureMessage=@failureMessage,FromEmail=@formEmail,
PassingMessageSubject = @passingMessageSubject, PassingMessageBody = @passingMessageBody,
FailingMessageSubject = @failingMessageSubject, FailingMessageBody = @failingMessageBody
WHERE Id = @testId;
END
GO
