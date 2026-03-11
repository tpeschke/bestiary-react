export default function getObstacleFromChallengeFlowchart(flowchart: string): string[] {
    let obstaclesArray: string[] = []

    let currentObstacleName = ""
    let isTracking = false

    flowchart.split('').forEach(letter => {
        if (letter === ')' || letter === ']' || letter === '}') {
            isTracking = false
            obstaclesArray.push(currentObstacleName)
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