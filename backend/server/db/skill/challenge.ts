export const getMonsterChallenges = `select * from bbSkillBeast b
join obChallenges c on c.id = b.challengeID
where beastID = $1`

export const getObstacleComplications = `select * from obComplications
where stringID = $1
order by index asc`

export const getObstaclePairs = `select * from obPairs
where stringID = $1 and type = $2
order by index asc`