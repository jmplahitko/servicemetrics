SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- 1 bug
-- 10905 improvement
-- 3 task
-- 6 story

DECLARE @ProjectVersionParam TABLE 
(
    ProjectKey NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS, 
    FixVersion NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS, 
    AffectsVersion NVARCHAR(255) COLLATE SQL_Latin1_General_CP1_CI_AS
)
INSERT INTO @ProjectVersionParam VALUES
    -- ('AI', '1.16', '1.16'),
    -- ('IDPAD', '1.3', '1.3'), 
    -- ('IGCOL', '2.2', '2.2'), 
    ('SCP', '3.15', '3.15'), 
    ('IGCSE', '2.0', '2.0'), 
    -- ('VOUCH', '2.7', '2.7'), 
    -- ('FSSACCPP', '1.18', '1.18'), 
    -- ('BMVS', '2.5', '2.5'), 
    -- ('SOF', '1.6', '1.6'), 
    ('LRCL', '2.7', '2.7')

-- Issues found in a given version - Include all issue types to see where affectedVersion is added erroneously
DECLARE @AffectedIssues Table 
(
    ProjectName NVARCHAR(255), 
    -- Stories INT, 
    -- Improvements INT, 
    -- Tasks INT, 
    Bugs INT
)

INSERT INTO @AffectedIssues
SELECT ProjectName, 
    -- ISNULL([6], 0) AS Stories,
    -- ISNULL([10905], 0) AS Improvements, 
    -- ISNULL([3], 0) AS Tasks, 
    ISNULL([1], 0) AS Bugs
FROM
(
    SELECT 
        CONCAT(p.pname, ' (', p.pkey, ') - ', pvp.AffectsVersion) AS ProjectName,
        it.id AS IssueTypeId,
        COUNT(it.id) AS IssueCount
    FROM [Jira].[dbo].[jiraissue] i
    JOIN [Jira].[dbo].[project] p ON i.PROJECT = p.ID
    JOIN @ProjectVersionParam pvp ON pvp.ProjectKey = p.pkey
    JOIN [Jira].[dbo].[issuetype] it ON it.id = i.issuetype
    JOIN [Jira].[dbo].[nodeassociation] na ON na.source_node_id = i.id AND na.source_node_entity = 'Issue'
    JOIN [Jira].[dbo].[projectversion] pv ON pv.ID = na.sink_node_id AND na.association_type = 'IssueVersion'
    WHERE 1 = 1
        AND i.issuetype NOT IN (5)
        AND pv.vname LIKE CONCAT((pvp.AffectsVersion), '%')
    GROUP BY p.pname, p.pkey, it.pname, it.id, pvp.AffectsVersion
) AS p
PIVOT
(
    SUM(IssueCount)
    FOR IssueTypeId IN ([1])
    -- FOR IssueTypeId IN ([1], [10905], [3], [6])
) AS pvt
ORDER BY ProjectName

-- Issues completed in a given version. Bugs completed may not be related to the version the are completed in
DECLARE @CompletedIssues Table 
(
    ProjectName NVARCHAR(255), 
    Stories INT, 
    Improvements INT, 
    Tasks INT, 
    Bugs INT
)

INSERT INTO @CompletedIssues
SELECT ProjectName, 
    ISNULL([6], 0) AS Stories,
    ISNULL([10905], 0) AS Improvements, 
    ISNULL([3], 0) AS Tasks, 
    ISNULL([1], 0) AS Bugs
FROM
(
    SELECT 
        CONCAT(p.pname, ' (', p.pkey, ') - ', pvp.FixVersion) AS ProjectName,
        it.id AS IssueTypeId,
        COUNT(it.id) AS IssueCount
    FROM [Jira].[dbo].[jiraissue] i
    JOIN [Jira].[dbo].[project] p ON i.PROJECT = p.ID
    JOIN @ProjectVersionParam pvp ON pvp.ProjectKey = p.pkey
    JOIN [Jira].[dbo].[issuetype] it ON it.id = i.issuetype
    JOIN [Jira].[dbo].[issuestatus] iss on iss.pname = 'Done'
    JOIN [Jira].[dbo].[nodeassociation] na ON na.source_node_id = i.id AND na.source_node_entity = 'Issue'
    JOIN [Jira].[dbo].[projectversion] pv ON pv.ID = na.sink_node_id AND na.association_type = 'IssueFixVersion'
    WHERE 1 = 1
        AND i.issuetype NOT IN (5)
        AND pv.vname = pvp.FixVersion
    GROUP BY p.pname, p.pkey, it.pname, it.id, pvp.FixVersion
) AS p
PIVOT
(
    SUM(IssueCount)
    FOR IssueTypeId IN ([1], [10905], [3], [6])
) AS pvt
ORDER BY ProjectName

SELECT 
    ci.*,
    ci.Stories + ci.Improvements + ci.Tasks + ci.Bugs AS 'Total Completed',
    ai.Bugs AS 'Bugs Found',
    TRIM(STR(ai.Bugs / CAST((ci.Stories + ci.Improvements + ci.Tasks) AS DECIMAL(10, 2)), 5, 2)) AS 'Bug Rate'
FROM @CompletedIssues ci 
JOIN @AffectedIssues ai ON ai.ProjectName = ci.ProjectName