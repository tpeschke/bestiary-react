-- 5 Example Monsters for Bonfire Bestiary development
-- Run: psql -U bestiary -d bestiary -f backend/server/db/seed/seed-example-monsters.sql

INSERT INTO bbindividualbeast (name, intro, habitat, ecology, senses, diet, size, patreon, canplayerview, rarity, role, secondaryrole, socialrole, skillrole, plural, tactics, sp_atk, sp_def, combatskulls, socialskulls, skillskulls, combatpoints, socialpoints, skillpoints, hash)
VALUES
(
    'Ashenwyrm',
    '<p>A serpentine dragon wreathed in smoldering embers, the Ashenwyrm dwells in volcanic tunnels and scorched wastelands. Its scales are blackened obsidian, cracked with veins of molten light. When enraged, its body erupts in gouts of flame that can melt stone.</p>',
    '<p>Volcanic caves, lava tubes, and scorched badlands. Ashenwyrms prefer geothermally active regions where they can bask in natural heat.</p>',
    '<p>Long and sinuous with a flattened, wedge-shaped head. Its obsidian-black scales are lined with cracks that glow orange-red. Two vestigial wings fold tight against its body. Its tail ends in a cluster of crystallized magma.</p>',
    '<p>Tremorsense 60ft, Darkvision 120ft. Can detect heat signatures through solid rock up to 30ft thick.</p>',
    '<p>Feeds onite minerals and calcium-rich stones. Will consume metal weapons and armor when available.</p>',
    'Large', 0, true, 4,
    'Striker', 'Controller', 'Intimidator', 'Ambusher',
    'Ashenwyrms',
    '<p>Opens with a burrowing ambush, erupting from below to scatter enemies. Focuses fire breath on clustered foes, then coils around isolated targets.</p>',
    '<p>Magma Spit: Ranged attack that leaves burning patches on the ground.</p>',
    '<p>Heat Shimmer: Attacks against the Ashenwyrm have disadvantage when it stands on heated ground.</p>',
    5, 3, 4, 12, 6, 8,
    'ashenwyrm-001'
),
(
    'Boggart, Thornback',
    '<p>A squat, moss-covered fey creature that haunts marshlands and overgrown ruins. The Thornback Boggart is covered in sharp bramble-like spines that it can launch at prey. Despite its small size, it is cunning and territorial.</p>',
    '<p>Swamps, bogs, overgrown ruins, and dense thickets. Thornback Boggarts build nests from woven thorns in hollow trees or beneath fallen logs.</p>',
    '<p>Roughly 3 feet tall with mottled green-brown skin. Its back and shoulders bristle with wooden thorns. Large yellow eyes with slit pupils peer out from beneath a crown of tangled roots.</p>',
    '<p>Darkvision 60ft. Keen Smell. Can sense vibrations through standing water within 30ft.</p>',
    '<p>Omnivorous scavenger. Prefers insects, small fish, and fungi. Will eat carrion or raid travelers'' rations.</p>',
    'Small', 0, true, 2,
    'Skirmisher', 'Lurker', 'Trickster', 'Trapper',
    'Boggarts',
    '<p>Uses guerrilla tactics--hit and run from concealment. Launches thorn volleys then retreats into difficult terrain where larger foes cannot follow.</p>',
    '<p>Thorn Volley: Launches a spray of barbed thorns in a cone.</p>',
    '<p>Briar Armor: Melee attackers take piercing damage when they hit the Boggart.</p>',
    2, 2, 3, 4, 3, 6,
    'boggart-thornback-001'
),
(
    'Cinderstag',
    '<p>A majestic cervid creature whose antlers perpetually smolder with pale fire. The Cinderstag is a guardian spirit of ancient forests recovering from wildfire. It is generally peaceful but fiercely protective of regrowth areas.</p>',
    '<p>Recovering forests, charred meadows, and the edges of firebreaks. Often found near young saplings growing from scorched earth.</p>',
    '<p>The size of a large elk with ash-grey fur that fades to white at the extremities. Its branching antlers glow with a soft amber flame that does not burn living wood. Hoofprints leave small patches of fertile ash.</p>',
    '<p>Darkvision 90ft. Can sense fire and heat within 1 mile. Tremorsense 30ft through root networks.</p>',
    '<p>Herbivore. Feeds on charcoal, ash, and the first green shoots that emerge after a fire.</p>',
    'Large', 0, true, 3,
    'Defender', 'Leader', 'Guardian', 'Sentinel',
    'Cinderstags',
    '<p>Prefers to warn intruders away with displays of flame before resorting to violence. Charges with burning antlers and uses hooves to create walls of fire between threats and the forest.</p>',
    '<p>Ember Charge: A rushing antler attack that ignites the target.</p>',
    '<p>Ashen Ward: Allies within 15ft gain resistance to fire damage.</p>',
    4, 4, 3, 8, 8, 5,
    'cinderstag-001'
),
(
    'Gloomweaver',
    '<p>A spider-like aberration that spins webs of solidified shadow. The Gloomweaver lurks in places where darkness pools unnaturally--abandoned mines, sealed crypts, and the spaces between worlds. Its bite drains not blood but light itself.</p>',
    '<p>Deep underground caverns, abandoned mines, sealed crypts, and any location where natural darkness is unusually deep. Avoids direct sunlight.</p>',
    '<p>Eight-legged with a body of pure matte black that seems to absorb surrounding light. Its eight eyes glow a dim violet. Shadow trails behind it like ink in water. Approximately the size of a large dog.</p>',
    '<p>Blindsight 60ft. Darkvision 120ft. Can sense light sources within 300ft and is drawn to extinguish them.</p>',
    '<p>Feeds on ambient light and the life-force of creatures caught in its shadow webs.</p>',
    'Medium', 0, true, 3,
    'Lurker', 'Controller', 'Deceiver', 'Ambusher',
    'Gloomweavers',
    '<p>Extinguishes light sources first, then attacks from darkness. Wraps shadow webs around isolated targets to restrain and drain them. Retreats if exposed to bright light.</p>',
    '<p>Shadow Bite: Melee attack that reduces the target''s darkvision range.</p>',
    '<p>Light Eater: Can suppress magical and mundane light within 30ft as a reaction.</p>',
    3, 2, 4, 6, 4, 8,
    'gloomweaver-001'
),
(
    'Ironhide Troll',
    '<p>A massive, heavily armored troll whose skin has calcified into overlapping plates of iron-hard stone. Unlike its regenerating cousins, the Ironhide Troll has traded healing for near-impervious defense. It is slow but devastatingly powerful.</p>',
    '<p>Mountain passes, rocky highlands, and ancient bridge crossings. Ironhide Trolls are territorial and often claim chokepoints as their domain.</p>',
    '<p>Stands 12 feet tall with a hunched posture. Its grey-brown skin is covered in thick, overlapping plates resembling rusted iron. Small, deep-set eyes glow faintly orange. Its oversized fists can shatter stone.</p>',
    '<p>Darkvision 60ft. Tremorsense 30ft. Poor eyesight but excellent hearing.</p>',
    '<p>Carnivorous. Prefers large game but will eat anything organic. Known to demand tolls of food from travelers.</p>',
    'Huge', 0, true, 5,
    'Brute', 'Defender', 'Bully', 'Enforcer',
    'Ironhide Trolls',
    '<p>Stands its ground and absorbs punishment. Uses the terrain to funnel enemies into melee range. Throws boulders at distant foes, then closes to crush them.</p>',
    '<p>Boulder Hurl: Ranged attack with a massive thrown stone.</p>',
    '<p>Iron Skin: Reduces all physical damage by a flat amount. Immune to critical hits from slashing weapons.</p>',
    6, 3, 2, 14, 5, 4,
    'ironhide-troll-001'
)
ON CONFLICT DO NOTHING;
