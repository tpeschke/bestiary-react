import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"

test('Sanity check', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})
