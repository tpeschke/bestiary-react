export default function getObstacleFromChallengeFlowchart(flowchart: string): string[] {
    let obstaclesArray: string[] = []

    let currentObstacleName = ""
    let isTracking = false

    flowchart.split('').forEach(letter => {
        if (letter === ')' || letter === ']' || letter === '}') {
            isTracking = false
            obstaclesArray.push(getObstacleName(currentObstacleName))
            currentObstacleName = ""
        } else if (isTracking) {
            currentObstacleName += letter
        }
        if (letter === '(' || letter === '[' || letter === '{') {
            isTracking = true
        }
    })

    return obstaclesArray
}

function getObstacleName(name: string) {
    if (name.includes('/')) {
        const [_, obstacle] = name.split('/')
        return obstacle
    }
    return name
}