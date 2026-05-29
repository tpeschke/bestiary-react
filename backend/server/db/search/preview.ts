export const getGMPreview = `select b.id, b.name, intro, patreon, rarity, b.size, canplayerview, thumbnail, b.hash,
	mincombatskull, maxcombatskull, minsocialskull, maxsocialskull, minskillskull, maxskillskull,
	mincombatep, maxcombatep, minsocialep, maxsocialep, minskillep, maxskillep,
	CASE WHEN (sp_atk is not null or attack is not null) THEN true ELSE false END as hasCombatAttack, 
	CASE WHEN (sp_def is not null or defense is not null) THEN true ELSE false END as hasCombatDefense,
	CASE WHEN (atk_skill is not null or attack_skill is not null) THEN true ELSE false END as hasSkillAttack, 
	CASE WHEN (def_skill is not null or defense_skill is not null) THEN true ELSE false END as hasSkillDefense,
	CASE WHEN (atk_conf is not null or attack_conf is not null) THEN true ELSE false END as hasConfAttack, 
	CASE WHEN (def_conf is not null or defense_conf is not null) THEN true ELSE false END as hasConfDefense
from bbindividualbeast b
join (	select id, 	min(combatSkulls) as mincombatskull, max(combatSkulls) as maxcombatskull, 
					min(socialSkulls) as minsocialskull, max(socialSkulls) as maxsocialskull, 
					min(skillSkulls) as minskillskull, max(skillSkulls) as maxskillskull,
					min(combatEpValue) as mincombatep, max(combatEpValue) as maxcombatep, 
					min(socialEpValue) as minsocialep, max(socialEpValue) as maxsocialep, 
					min(skillEpValue) as minskillep, max(skillEpValue) as maxskillep
		from bbindividualbeast b
		where b.socialSkulls >= 0 and NOT EXISTS (	SELECT 1 
                   									FROM   bbroles r 
                  									WHERE  b.id = r.beastid
                  									group by b.id)
		group by b.id
		union
		select beastid as id, 	min(combatSkulls) as mincombatskull, max(combatSkulls) as maxcombatskull, 
								min(socialSkulls) as minsocialskull, max(socialSkulls) as maxsocialskull, 
								min(skillSkulls) as minskillskull, max(skillSkulls) as maxskillskull,
								min(combatEpValue) as mincombatep, max(combatEpValue) as maxcombatep, 
								min(socialEpValue) as minsocialep, max(socialEpValue) as maxsocialep, 
								min(skillEpValue) as minskillep, max(skillEpValue) as maxskillep
		from bbroles r
		where r.socialSkulls >= $2
		group by r.beastid
	) t on t.id = b.id
left join bbroles r on r.beastid = b.id
where 
	b.id = $1
	and patreon < 20 
	and (userid is null or userid = 1)
	and notUpdating is false
order by b.name`

export const getPlayerPreview = `select b.id, b.name, intro, patreon, rarity, b.size, canplayerview, thumbnail, 
	mincombatskull, maxcombatskull, minsocialskull, maxsocialskull, minskillskull, maxskillskull,
	mincombatep, maxcombatep, minsocialep, maxsocialep, minskillep, maxskillep,
	CASE WHEN (sp_atk is not null or attack is not null) THEN true ELSE false END as hasCombatAttack, 
	CASE WHEN (sp_def is not null or defense is not null) THEN true ELSE false END as hasCombatDefense,
	CASE WHEN (atk_skill is not null or attack_skill is not null) THEN true ELSE false END as hasSkillAttack, 
	CASE WHEN (def_skill is not null or defense_skill is not null) THEN true ELSE false END as hasSkillDefense,
	CASE WHEN (atk_conf is not null or attack_conf is not null) THEN true ELSE false END as hasConfAttack, 
	CASE WHEN (def_conf is not null or defense_conf is not null) THEN true ELSE false END as hasConfDefense
from bbindividualbeast b
join (	select id, 	min(combatSkulls) as mincombatskull, max(combatSkulls) as maxcombatskull, 
					min(socialSkulls) as minsocialskull, max(socialSkulls) as maxsocialskull, 
					min(skillSkulls) as minskillskull, max(skillSkulls) as maxskillskull,
					min(combatEpValue) as mincombatep, max(combatEpValue) as maxcombatep, 
					min(socialEpValue) as minsocialep, max(socialEpValue) as maxsocialep, 
					min(skillEpValue) as minskillep, max(skillEpValue) as maxskillep
		from bbindividualbeast b
		where b.socialSkulls >= 0 and NOT EXISTS (	SELECT 1 
                   									FROM   bbroles r 
                  									WHERE  b.id = r.beastid
                  									group by b.id)
		group by b.id
		union
		select beastid as id, 	min(combatSkulls) as mincombatskull, max(combatSkulls) as maxcombatskull, 
								min(socialSkulls) as minsocialskull, max(socialSkulls) as maxsocialskull, 
								min(skillSkulls) as minskillskull, max(skillSkulls) as maxskillskull,
								min(combatEpValue) as mincombatep, max(combatEpValue) as maxcombatep, 
								min(socialEpValue) as minsocialep, max(socialEpValue) as maxsocialep, 
								min(skillEpValue) as minskillep, max(skillEpValue) as maxskillep
		from bbroles r
		where r.socialSkulls >= $2
		group by r.beastid
	) t on t.id = b.id
left join bbroles r on r.beastid = b.id
where 
	t.id = $1 
	and canplayerview = true 
	and userid is null
	and notUpdating is false
order by b.name`