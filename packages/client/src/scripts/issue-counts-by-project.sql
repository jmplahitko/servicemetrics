SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- 1 bug
-- 10905 improvement
-- 3 task
-- 6 story

SELECT ProjectName, 
    ISNULL([6], 0) AS Stories,
    ISNULL([10905], 0) AS Improvements, 
    ISNULL([3], 0) AS Tasks, 
    ISNULL([1], 0) AS Bugs
FROM
(
    SELECT 
        CONCAT(p.pname, ' (', p.pkey, ')') AS ProjectName,
        it.id AS IssueTypeId,
        COUNT(it.id) AS IssueCount
    FROM [Jira].[dbo].[jiraissue] i
    JOIN [Jira].[dbo].[project] p ON i.PROJECT = p.ID
    JOIN [Jira].[dbo].[issuetype] it ON it.id = i.issuetype
    WHERE 1 = 1
        AND i.CREATED > '2024-01-01'
        AND i.issuetype NOT IN (5)
    GROUP BY p.pname, p.pkey, it.pname, it.id
) AS p
PIVOT
(
    SUM(IssueCount)
    FOR IssueTypeId IN ([1], [10905], [3], [6])
) AS pvt
ORDER BY ProjectName

SELECT ProjectName, 
    ISNULL([6], 0) AS Stories,
    ISNULL([10905], 0) AS Improvements, 
    ISNULL([3], 0) AS Tasks, 
    ISNULL([1], 0) AS Bugs
FROM
(
    SELECT 
        CONCAT(p.pname, ' (', p.pkey, ')') AS ProjectName,
        it.id AS IssueTypeId,
        COUNT(it.id) AS IssueCount
    FROM [Jira].[dbo].[jiraissue] i
    JOIN [Jira].[dbo].[project] p ON i.PROJECT = p.ID
    JOIN [Jira].[dbo].[issuetype] it ON it.id = i.issuetype
    WHERE 1 = 1
        AND i.RESOLUTIONDATE > '2024-01-01'
        AND i.issuetype NOT IN (5)
    GROUP BY p.pname, p.pkey, it.pname, it.id
) AS p
PIVOT
(
    SUM(IssueCount)
    FOR IssueTypeId IN ([1], [10905], [3], [6])
) AS pvt
ORDER BY ProjectName