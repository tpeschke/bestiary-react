import blankSquare from '../../../../../assets/images/encounterDesign/roleSelection/blank square.jpg'
import oppositeSquare from '../../../../../assets/images/encounterDesign/roleSelection/opposite square.jpg'
import cornersSquare from '../../../../../assets/images/encounterDesign/roleSelection/corners square.jpg'
import exampleSquare from '../../../../../assets/images/encounterDesign/roleSelection/example square.jpg'

export default function Step3() {
    return (
        <div>
            <p>Now you’re going to select the Role Types the enemies have. Take a look at following diagram:</p>
            <img className='inline' src={blankSquare} alt='A square showing the roles' />
            <h1>Draw Some Lines</h1>
            <p>Pick a Role Type and then draw lines connecting them to other Role Types. Typically, you’ll want 3 Role Types as that’s enough to cover <em>most bases</em> but still provide openings that the players might identify and exploit - which is good. Having fewer Roles will make the combat easier; more will have it harder.</p>
            <p>There are a lot of ways to draw lines but here are two suggested patterns:</p>
            <h2>Opposite Pairs</h2>
            <p>Starting at your first Role Type, draw a link to the opposite Role Type. From there, draw a line to one of the Role Types that were adjacent to your original pick. It’ll look something like this:</p>
            <img className='inline' src={oppositeSquare} alt='A square showing the roles some of the roles circled' />
            <p className="italic">I started at Artillery, which meant my next choice is Duelist. From there, I could have picked between Shock or Defender but I went with Defender for speed.</p>
            <h2>Corners</h2>
            <p>Start at any corner and then pick the Role Types on either side. It’s recommended to start at the bottom-left corner for speedy Role Types  or up-right for slower, more durable Role Types.</p>
            <img className='inline' src={cornersSquare} alt='A square showing the roles some of the roles circled' />
            <h1>Offense vs Defense</h1>
            <p>The Lines method will give you a mixed group, suitable in most cases but note that the difficulty of the encounter will change based on the Roles and whether the enemy is on the offense or defense. Note that these set-ups match the Corners method above.</p>
            <h2>On Defense</h2>
            <p>+ Artillery</p>
            <p>+ Defender</p>
            <p>+ Brute</p>
            <h2>On Offense</h2>
            <p>- Shock</p>
            <p>- Skirmisher</p>
            <p>- Duelist</p>
            <h1>But the Role Type Doesn’t Exist</h1>
            <p>In this case, you have four choices:</p>
            <h2>Just Let it Be</h2>
            <p>It’s okay to have a hole in an enemy’s Role Types because, over the long term, players might learn what that is and how to exploit it - meaning that their characters will evolve to suit the campaign, which is awesome.</p>
            <p>So, you can just have only 2 Role Types available or you can select the next available, adjacent Role Type.</p>
            <h2>Pair with Another Enemy</h2>
            <p>As mentioned in Step 1, you can pair with another enemy type. I use this rarely unless I’ve set this up ahead of time so the players have some forewarning, although, if they’re completely obvious to the enemy’s Role Types, it’s probably not an issue. What you don’t want to do is this:</p>
            <p>“The players have been really exploiting those grunzen Brutes: I should give them some Defenders”.</p>
            <p>Again, you <em>can</em> do that <em>but</em> you have to give players a heads up and, ideally, a chance to stop it.</p>
            <h2>Sub-in Another Role Type</h2>
            <p>If an enemy doesn’t have a Role Type but they might have a Role Type that could sub-in for it, you can do that. What specific Role Type really depends on what you need: if you need a ranged option, you can swap Artillery and Skirmisher; if you need a quick, damage dealer, Shock and Duelist can be swapped.</p>
            <h2>Create a New Role Type for the Enemy</h2>
            <p>This pretty much follows the same rules as Pair with Another Enemy but is much harder so this is an option of last resort.</p>
            <h1 className="italic">Example</h1>
            <p className="italic">For the outlaws, based on their objective, I think they want to protect their prisoner, which is more defensive so I’m going to use the Corners method and start with Defender, which also gives me Artillery and Brutes to work with.</p>
            <img className='inline' src={exampleSquare} alt='A square showing the roles some of the roles circled' />
            <p className="italic">For gaunt outlaws, they have Brutes (Thugs) and Artillery (Sharpshooters), but no Defenders so I’m going to swap them with their Duelists (Looters) because they’re sort of Defenders (but only against one person at a time, really).</p>
        </div>
    )
}