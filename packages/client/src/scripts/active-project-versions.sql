DECLARE @ActiveProjectVersions TABLE 
(
    projectId INT,
    projectName NVARCHAR(255) NULL,
    projectKey NVARCHAR(255) NULL,
    projectUrl NVARCHAR(255) NULL,
    projectDescription NVARCHAR(255) NULL,
    projectAvatarId NVARCHAR(255) NULL,
    versionId INT,
    versionName NVARCHAR(255) NULL,
    versionDescription NTEXT NULL,
    releaseDate DATETIME NULL,
    startDate DATETIME NULL
)

INSERT INTO @ActiveProjectVersions 
SELECT
      p.Id as projectId,
      p.pname as projectName,
      p.pkey as projectKey,
      p.URL as projectUrl,
      p.[DESCRIPTION] as projectDescription,
      p.AVATAR as projectAvatarId,
      v.[ID] as versionId,
      v.[vname] as versionName,
      v.[DESCRIPTION] as versionDescription,
      v.[RELEASEDATE] as releaseDate,
      v.[STARTDATE] as startDate
  FROM [Jira].[dbo].[projectversion] v
  JOIN [Jira].[dbo].[project] p ON v.PROJECT = p.ID
  WHERE 1 = 1
    AND v.[RELEASED] IS NULL
    AND v.[ARCHIVED] IS NULL
  ORDER BY p.pkey

-- SELECT * FROM @ActiveProjectVersions 

------Minor Versions
DECLARE @MinorVersions TABLE 
(
    versionId INT,
    versionName NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS,
    projectId INT
)

INSERT INTO @MinorVersions
SELECT versionId, versionName, projectId
  FROM @ActiveProjectVersions
  WHERE 1 = 1
    AND [versionName] LIKE '[0-9][.][0-9]'
     OR [versionName] LIKE '[0-9][.][0-9][0-9]'

-- SELECT * FROM @MinorVersions

DECLARE @PatchVersions TABLE 
(
    versionId INT,
    versionName NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS,
    projectId INT
)

INSERT INTO @PatchVersions
SELECT versionId, versionName, projectId
  FROM @ActiveProjectVersions
  WHERE 1 = 1
    AND versionId NOT IN (
        SELECT versionId FROM @MinorVersions
    )

-- SELECT * FROM @PatchVersions

------Issues
DECLARE @Issues TABLE
(
    [id] INT,
    [versionId] INT,
    [projectId] INT,
    [assignee] NVARCHAR(255) NULL,
    [type] NVARCHAR(255),
    [status] NVARCHAR(255),
    [issueNumber] NUMERIC(18,0) NULL,
    [issueType] NVARCHAR(255),
    [summary] NVARCHAR(255) NULL,
    [description] NTEXT NULL,
    [createdDate] DATETIME NULL,
    [updatedDate] DATETIME NULL,
    [dueDate] DATETIME NULL,
    [resolutionDate] DATETIME NULL,
    [timeSpent] NUMERIC(18,0) NULL,
    [storyPoints] NUMERIC(18,0) NULL
)

INSERT INTO @Issues
SELECT
    i.ID as 'id',
    pv.versionId as 'versionId',
    i.PROJECT as 'projectId',
    i.ASSIGNEE as 'assignee',
    i.issuetype as 'type',
    i.issuestatus as 'status',
    i.issuenum as 'issueNumber',
    i.issuetype as 'issueType',
    i.summary as 'summary',
    i.[DESCRIPTION] as 'description',
    i.CREATED as 'createdDate',
    i.UPDATED as 'updatedDate',
    i.DUEDATE as 'dueDate',
    i.RESOLUTIONDATE as 'resolutionDate',
    i.TIMESPENT as 'timeSpent',
    ISNULL(cfv.NUMBERVALUE, 0) as 'storyPoints'
FROM [Jira].[dbo].[jiraissue] i
LEFT JOIN [Jira].[dbo].[customfieldvalue] cfv ON cfv.ISSUE = i.id AND cfv.CUSTOMFIELD = 10012
JOIN [Jira].[dbo].[nodeassociation] na ON na.source_node_id = i.id AND na.source_node_entity = 'Issue'
JOIN @ActiveProjectVersions pv ON pv.VersionId = na.sink_node_id AND na.association_type = 'IssueFixVersion'
WHERE 1 = 1
  AND i.issuetype IN (1, 10905, 3, 6)

-- SELECT * FROM @Issues

------Issue Count by Statuses

DECLARE @IssueStatusCountsByVersion TABLE
(
    VersionId INT,
    ToDo INT,
    SelectedForDevelopment INT,
    InProgress INT,
    Done INT
)

INSERT INTO @IssueStatusCountsByVersion
SELECT 
    VersionId,
    ISNULL([10006], 0) AS 'todo',
    ISNULL([10708], 0) AS 'selectedForDevelopment',
    ISNULL([10307], 0) AS 'inProgress',
    ISNULL([10004], 0) AS 'done'
FROM 
(
    SELECT
        pv.VersionId AS VersionId,
        iss.ID AS IssueStatus,
        COUNT(iss.ID) AS IssueCount
      FROM @Issues i
      JOIN @ActiveProjectVersions pv ON pv.VersionId = i.versionId
      JOIN [Jira].[dbo].[issuestatus] iss ON iss.ID COLLATE SQL_Latin1_General_CP1_CI_AS = i.status
    GROUP BY pv.VersionId, iss.ID
) as p
PIVOT
(
    SUM(IssueCount)
    FOR IssueStatus IN ([10006], [10708], [10307], [10004])
) AS pvt 
ORDER BY VersionId

-- SELECT * FROM @IssueStatusCountsByVersion

-- Issues found in a given major version
DECLARE @AffectedIssueCountByVersion Table 
(
    [affectedVersionId] INT,
    [versionName] NVARCHAR(255),
    [issueCount] INT
)

INSERT INTO @AffectedIssueCountByVersion
SELECT
    mv.versionId as 'affectedVersionId',
    mv.versionName,
    ISNULL(COUNT(mv.versionName), 0) as 'issueCount'
    FROM @MinorVersions mv
    JOIN [Jira].[dbo].[jiraissue] i ON mv.projectId = i.PROJECT
    JOIN [Jira].[dbo].[nodeassociation] na ON na.source_node_id = i.id AND na.source_node_entity = 'Issue'
    JOIN [Jira].[dbo].[projectversion] pv ON pv.ID = na.sink_node_id AND na.association_type = 'IssueVersion'
  WHERE 1 = 1
    AND i.issuetype IN (1)
    AND pv.vname LIKE CONCAT((mv.versionName), '%')
  GROUP BY mv.versionName, mv.versionId
UNION ALL
SELECT
    mv.versionId as 'affectedVersionId',
    mv.versionName,
    ISNULL(COUNT(mv.versionName), 0) as 'issueCount'
    FROM @PatchVersions mv
    JOIN [Jira].[dbo].[jiraissue] i ON mv.projectId = i.PROJECT
    JOIN [Jira].[dbo].[nodeassociation] na ON na.source_node_id = i.id AND na.source_node_entity = 'Issue'
    JOIN [Jira].[dbo].[projectversion] pv ON pv.ID = na.sink_node_id AND na.association_type = 'IssueVersion'
  WHERE 1 = 1
    AND i.issuetype IN (1)
    AND pv.vname = mv.versionName
  GROUP BY mv.versionName, mv.versionId
  
-- SELECT * FROM @AffectedIssueCountByVersion

DECLARE @TotalIssuesByType Table 
(
    versionId INT, 
    Stories INT, 
    Improvements INT, 
    Tasks INT, 
    Bugs INT
)

INSERT INTO @TotalIssuesByType
SELECT versionId, 
    ISNULL([6], 0) AS Stories,
    ISNULL([10905], 0) AS Improvements, 
    ISNULL([3], 0) AS Tasks, 
    ISNULL([1], 0) AS Bugs
FROM
(
    SELECT 
        i.versionId,
        i.type AS issueTypeId,
        COUNT(i.type) AS issueCount
    FROM @Issues i
    JOIN [Jira].[dbo].[issuestatus] iss on i.status COLLATE SQL_Latin1_General_CP1_CI_AS  = iss.id
    GROUP BY i.versionId, i.type
) AS p
PIVOT
(
    SUM(issueCount)
    FOR issueTypeId IN ([1], [10905], [3], [6])
) AS pvt
ORDER BY versionId

-- SELECT * FROM @TotalIssuesByType;

DECLARE @CompletedIssuesByType Table 
(
    versionId INT, 
    Stories INT, 
    Improvements INT, 
    Tasks INT, 
    Bugs INT
)

INSERT INTO @CompletedIssuesByType
SELECT versionId, 
    ISNULL([6], 0) AS Stories,
    ISNULL([10905], 0) AS Improvements, 
    ISNULL([3], 0) AS Tasks, 
    ISNULL([1], 0) AS Bugs
FROM
(
    SELECT 
        i.versionId,
        i.type AS issueTypeId,
        COUNT(i.type) AS issueCount
    FROM @Issues i
    JOIN [Jira].[dbo].[issuestatus] iss on i.status COLLATE SQL_Latin1_General_CP1_CI_AS  = iss.id AND iss.pname = 'Done'
    GROUP BY i.versionId, i.type
) AS p
PIVOT
(
    SUM(issueCount)
    FOR issueTypeId IN ([1], [10905], [3], [6])
) AS pvt
ORDER BY versionId

-- SELECT * FROM @CompletedIssuesByType

--IssueStatusCountsByVersion
SELECT 
  pv.*,
  ISNULL(iss.todo, 0) AS 'todo',
  ISNULL(iss.selectedForDevelopment, 0) AS 'selectedForDevelopment',
  ISNULL(iss.inProgress, 0) AS 'inProgress',
  ISNULL(iss.done, 0) AS 'done',
  ISNULL(ci.Stories, 0) as 'completedStories',
  ISNULL(ti.Stories, 0) as 'totalStories',
  ISNULL(ci.Improvements, 0) as 'completedImprovements',
  ISNULL(ti.Improvements, 0) as 'totalImprovements',
  ISNULL(ci.Tasks, 0) as 'completedTasks',
  ISNULL(ti.Tasks, 0) as 'totalTasks',
  ISNULL(ci.Bugs, 0) as 'completedBugs',
  ISNULL(ti.Bugs, 0) as 'totalBugs',
  ISNULL(ai.issueCount, 0) AS 'bugsFound',
  ISNULL(TRIM(STR(ai.issueCount / CASE WHEN ((ci.Stories + ci.Improvements + ci.Tasks) > 0) THEN CAST((ci.Stories + ci.Improvements + ci.Tasks) AS DECIMAL(10, 2)) ELSE 1 END, 5, 2)), 0.0) AS 'bugRate'
    FROM @ActiveProjectVersions pv 
    LEFT JOIN @IssueStatusCountsByVersion iss ON pv.VersionId = iss.VersionId
    LEFT JOIN @AffectedIssueCountByVersion ai ON ai.affectedVersionId = pv.versionId
    LEFT JOIN @CompletedIssuesByType ci ON ci.versionId = pv.versionId
    LEFT JOIN @TotalIssuesByType ti ON ti.versionId = pv.versionId
WHERE 1 = 1
--   AND pv.versionId IN (
--     SELECT versionId FROM @MinorVersions
--   )
ORDER BY projectName

--------Complexity vs Performance
DECLARE @SubTasks Table 
(
    id INT, 
    parentId INT,
    -- issueId INT,
    assignee NVARCHAR(255),
    issueType NVARCHAR(255),
    timeSpent NUMERIC(18,6) NULL
)

INSERT INTO @SubTasks
SELECT 
    i.id as 'id',
    l.SOURCE as 'parentId',
    -- i.issueNumber as ,
    i.assignee as 'assignee',
    i.issueType as 'issueType',
    (i.TIMESPENT/ 3600) AS 'timeSpent'
FROM @Issues i
JOIN [Jira].[dbo].[issuelink] l ON i.Id = l.DESTINATION
WHERE l.SOURCE IN (
    SELECT Id FROM @Issues
)

DECLARE @IssueTotals TABLE (
    id INT, 
    -- issueId INT,
    versionId INT,
    assignee NVARCHAR(255),
    issueType NVARCHAR(255),
    timeSpent NUMERIC(18,2) NULL,
    storyPoints DECIMAL(18,1) NULL
)

INSERT INTO @IssueTotals
SELECT 
    i.id as 'id',
    -- i.IssueId,
    i.versionId as 'versionId',
    i.assignee as 'assignee',
    i.issueType as 'issueType',
    ISNULL((SELECT SUM(TimeSpent)
        FROM @SubTasks
        WHERE ParentId = i.Id
        GROUP BY ParentID), 0) + ISNULL(i.TimeSpent / 3600, 0) AS 'timeSpent',
    i.storyPoints as 'storyPoints'
    FROM @Issues i
    ORDER BY i.Id

-- SELECT * FROM @IssueTotals ORDER BY StoryPoints;

SELECT 
    pv.versionId as 'versionId',
    i.storyPoints as 'storyPoints',
    MIN(i.TimeSpent) AS 'min',
    MAX(i.TimeSpent) AS 'max',
    CAST(AVG(i.TimeSpent) AS NUMERIC(18,1)) AS 'avg'
FROM @ActiveProjectVersions pv
JOIN @IssueTotals i ON i.versionId = pv.versionId
GROUP BY pv.versionId, i.storyPoints
ORDER BY pv.versionId