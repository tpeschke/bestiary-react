export default function SubStep2() {
    return (
        <div>
            <p>I typically don’t think in terms of the absolute size of the map but in terms of the relative spaces between objects. This is an art so it's okay if there is a 2-square space in a large map.</p>
            <br />
            <p><strong>For small battlefields</strong>, think in terms of 1 and 2 square segments.</p>
            <p>(default) <strong>For medium battlefields</strong>, think in terms of 2 and 4 square segments.</p>
            <p><strong>For large battlefields</strong>, think in terms of 4 and 8 square segments. Note that large battlefields can also be broken down into smaller ‘zones’ that are basically medium and small battlefields.</p>
            <br />
            <p>The size does affect difficulty: it’ll be based on both the enemy Roles you’re using and the players so keep an eye on that but larger battlefields will favor the side with more enemies.</p>
            <h1 className="italic">Example</h1>
            <p className="italic">I’m going with a medium battlefield since that’s default.</p>
        </div>
    )
}