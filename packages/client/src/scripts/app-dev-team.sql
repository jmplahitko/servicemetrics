
DECLARE @AppDev TABLE (
    id INT,
    username NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    active INT NULL,
    firstName NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    lastName NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
    email NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)

INSERT INTO @AppDev
SELECT 
    u.ID as 'id',
    u.[user_name] as 'username',
    u.active as 'active',
    u.first_name as 'firstName',
    u.last_name as 'lastName',
    u.email_address as 'email'
  FROM [Jira].[dbo].[cwd_user] u
  JOIN [Jira].[dbo].[cwd_membership] m ON u.id = m.child_id
  WHERE 1 = 1
    AND m.parent_id = 11810 -- app-dev
    AND u.active = 1
    -- AND u.id = 13312
ORDER BY u.id

SELECT * FROM @AppDev

DECLARE @Issues TABLE
(
    [id] INT,
    [projectId] INT,
    [projectName] NVARCHAR(255),
    [assignee] NVARCHAR(255) NULL,
    [assigneeId] INT,
    [type] NVARCHAR(255),
    [typeId] INT,
    [status] NVARCHAR(255),
    [statusId] INT,
    [issueNumber] NVARCHAR(255) NULL,
    [summary] NVARCHAR(255) NULL,
    [description] NTEXT NULL,
    [createdDate] DATETIME NULL,
    [updatedDate] DATETIME NULL,
    [dueDate] DATETIME NULL,
    [resolutionDate] DATETIME NULL,
    [timeSpent] NUMERIC(18,0) NULL
)

INSERT INTO @Issues
SELECT
    i.ID as 'id',
    p.ID as 'projectId',
    p.pname as 'projectName',
    i.ASSIGNEE as 'assignee',
    d.id as 'assigneeId',
    it.pname as 'type',
    it.id as 'typeId',
    iss.pname as 'status',
    iss.id as 'statusId',
    
    CONCAT(p.pkey, '-', i.issuenum) as 'issueNumber',
    i.summary as 'summary',
    i.[DESCRIPTION] as 'description',
    i.CREATED as 'createdDate',
    i.UPDATED as 'updatedDate',
    i.DUEDATE as 'dueDate',
    i.RESOLUTIONDATE as 'resolutionDate',
    i.TIMESPENT as 'timeSpent'
  FROM [Jira].[dbo].[jiraissue] i
  JOIN @AppDev d ON d.username = i.ASSIGNEE
  JOIN [Jira].[dbo].[issuetype] it ON i.issuetype = it.ID
  JOIN [Jira].[dbo].[project] p ON i.project = p.ID
  JOIN [Jira].[dbo].[issuestatus] iss ON iss.ID = i.issuestatus
  WHERE 1 = 1
    AND iss.id NOT IN (10004, 6, 10509)
    -- AND iss.id NOT IN (1, 10707, 10807, 10006, 10708, 10307)
    -- AND d.id = 10716
    -- AND d.id NOT IN (10716, 10812, 11512)
ORDER BY assignee, projectId

-- SELECT * FROM @Issues

-- DECLARE @IssueCountsByDev TABLE
-- (
--     [userId] INT,
--     [open] INT,
--     [backlog] INT,
--     [todo] INT,
--     [waitingOnAgency] INT,
--     [selectedForDevelopment] INT,
--     [inProgress] INT
-- )


-- INSERT INTO @IssueCountsByDev
-- SELECT 
--     assigneeId as 'userId',
--     ISNULL([10707], 0) AS 'backlog',
--     ISNULL([10006], 0) AS 'todo',
--     ISNULL([1], 0) AS 'open',
--     ISNULL([10807], 0) AS 'waitingOnAgency',
--     ISNULL([10708], 0) AS 'selectedForDevelopment',
--     ISNULL([10307], 0) AS 'inProgress'
-- FROM 
-- (
--     SELECT
--         i.assigneeId,
--         i.statusId AS IssueStatus,
--         COUNT(i.statusId) AS IssueCount
--       FROM @Issues i
--     GROUP BY i.assigneeId, i.statusId
-- ) as p
-- PIVOT
-- (
--     SUM(IssueCount)
--     FOR IssueStatus IN ([1], [10707], [10807], [10006], [10708], [10307])
-- ) AS pvt 
-- ORDER BY userId

-- -- SELECT * FROM @IssueCountsByDev

-- SELECT
--     d.*,
--     ISNULL(ic.[todo], 0) as 'todo',
--     ISNULL(ic.[backlog], 0) as 'backlog',
--     ISNULL(ic.[open], 0) as 'open',
--     ISNULL(ic.[waitingOnAgency], 0) as 'waitingOnAgency',
--     ISNULL(ic.[selectedForDevelopment], 0) as 'selectedForDevelopment',
--     ISNULL(ic.[inProgress], 0) as 'inProgress',
--     ISNULL(ic.[todo] + ic.[backlog] + ic.[waitingOnAgency] + ic.[open] + ic.[selectedForDevelopment] + ic.[inProgress], 0) as 'total'
--   FROM @AppDev d 
--   LEFT JOIN @IssueCountsByDev ic ON ic.userId = d.id