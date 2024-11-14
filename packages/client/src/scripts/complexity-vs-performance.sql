SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- 1 bug
-- 10905 improvement
-- 3 task
-- 5 subtask
-- 6 story

DECLARE @ProjectVersionParam TABLE 
(
    ProjectKey NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS, 
    FixVersion NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS
)
INSERT INTO @ProjectVersionParam VALUES
    ('AI', '1.16'),
    ('IDPAD', '1.3'),
    ('IGCOL', '2.3'),
    -- ('SCP', '3.15'),
    ('IGCSE', '2.1'),
    ('VOUCH', '2.7'),
    ('FSSACCPP', '1.18'),
    -- ('BMVS', '2.5'),
    -- ('SOF', '1.6'),
    ('LRCL', '2.7')

-- Issues found in a given version
DECLARE @Issues Table 
(
    Id INT, 
    IssueId INT,
    Assignee NVARCHAR(255),
    IssueType NVARCHAR(255),
    Summary NVARCHAR(255) NULL,
    TimeSpent NUMERIC(18,6) NULL,
    StoryPoints NUMERIC(18,1) NULL
)

INSERT INTO @Issues
    SELECT 
        i.id,
        i.issuenum,
        i.assignee,
        i.issuetype,
        i.summary,
        (i.TIMESPENT/ 3600) AS TimeSpent,
        cfv.NUMBERVALUE as StoryPoints
    FROM [Jira].[dbo].[jiraissue] i
    JOIN [Jira].[dbo].[project] p ON i.PROJECT = p.ID
    JOIN @ProjectVersionParam pvp ON pvp.ProjectKey = p.pkey
    JOIN [Jira].[dbo].[customfieldvalue] cfv ON cfv.ISSUE = i.id AND cfv.CUSTOMFIELD = 10012
    JOIN [Jira].[dbo].[issuestatus] iss on iss.pname = 'Done'
    JOIN [Jira].[dbo].[nodeassociation] na ON na.source_node_id = i.id AND na.source_node_entity = 'Issue'
    JOIN [Jira].[dbo].[projectversion] pv ON pv.ID = na.sink_node_id AND na.association_type = 'IssueFixVersion'
    WHERE 1 = 1
        AND i.issuetype NOT IN (5)
        AND pv.vname = pvp.FixVersion;

-- SELECT * FROM @Issues
-- ORDER BY Id;

DECLARE @SubTasks Table 
(
    Id INT, 
    ParentId INT,
    IssueId INT,
    Assignee NVARCHAR(255),
    IssueType NVARCHAR(255),
    TimeSpent NUMERIC(18,6) NULL
)

INSERT INTO @SubTasks
SELECT 
    i.id,
    l.SOURCE AS ParentId,
    i.issuenum,
    i.assignee,
    i.issuetype,
    (i.TIMESPENT/ 3600) AS TimeSpent
FROM [Jira].[dbo].[jiraissue] i 
JOIN [Jira].[dbo].[issuelink] l ON i.Id = l.DESTINATION
WHERE l.SOURCE IN (
    SELECT Id FROM @Issues
)

-- SELECT * FROM @SubTasks
-- ORDER BY Id;

-- 

-- SELECT ParentId, SUM(TimeSpent)
-- FROM @SubTasks
-- WHERE ParentId = 78837
-- GROUP BY ParentID;

DECLARE @IssueTotals TABLE (
    Id INT, 
    IssueId INT,
    Assignee NVARCHAR(255),
    IssueType NVARCHAR(255),
    Summary NVARCHAR(255) NULL,
    TimeSpent NUMERIC(18,2) NULL,
    StoryPoints DECIMAL(18,1) NULL
)

INSERT INTO @IssueTotals
SELECT 
    i.Id,
    i.IssueId,
    i.Assignee,
    i.IssueType,
    i.Summary,
    ISNULL((SELECT SUM(TimeSpent)
        FROM @SubTasks
        WHERE ParentId = i.Id
        GROUP BY ParentID), 0) + ISNULL(i.TimeSpent, 0) AS TimeSpent,
    i.StoryPoints
    FROM @Issues i
    ORDER BY i.Id

SELECT * FROM @IssueTotals ORDER BY StoryPoints;

SELECT 
    i.StoryPoints,
    MIN(i.TimeSpent) AS 'Min',
    MAX(i.TimeSpent) AS 'Max',
    CAST(AVG(i.TimeSpent) AS NUMERIC(18,1)) AS 'Avg'
FROM @IssueTotals i
GROUP BY StoryPoints
ORDER BY StoryPoints;

-- SELECT
--     'Average Time Spent',
--     ISNULL([0.5], 0) AS '0.5',
--     ISNULL([1], 0) AS '1',
--     ISNULL([2], 0) AS '2', 
--     ISNULL([3], 0) AS '3', 
--     ISNULL([5], 0) AS '5',
--     ISNULL([8], 0) AS '8'
-- FROM (
--     SELECT 
--         i.StoryPoints,
--         i.TimeSpent
--      FROM @IssueTotals i
--      GROUP BY i.StoryPoints, i.TimeSpent
-- ) as p 
-- PIVOT
-- (
--     AVG(TimeSpent)
--     FOR StoryPoints IN ([0.5],[1], [2], [3], [5], [8])
-- ) AS pvt