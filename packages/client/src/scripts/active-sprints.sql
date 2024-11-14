
SELECT 
    [Id],
    [NAME], 
    [OWNER_USER_NAME],
    [SPRINTS_ENABLED],
    [SAVED_FILTER_ID]
FROM dbo.AO_60DB71_RAPIDVIEW 
WHERE ID IN (
            SELECT RAPID_VIEW_ID 
            FROM dbo.AO_60DB71_SPRINT 
            WHERE [CLOSED] = 'false' AND [STARTED] = 'true' 
            GROUP BY RAPID_VIEW_ID 
            )