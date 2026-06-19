export default (attack: string, defense: string): string | undefined => {
    const defaultDescriptionDictionary: any = {
        Depression: {
            Depression: "Nihilistic",
            Disgust: "Iconoclastic",
            Anger: "Detached",
            Joy: "Depressed",
            Surprise: "Jaded",
            Terror: "Resigned"
        },
        Disgust: {
            Disgust: "Gross",
            Anger: "Apathetic",
            Joy: "Self-flagellant",
            Surprise: "Cynic",
            Terror: "Barbaric",
            Depression: "Hedonistic"
        },
        Anger: {
            Anger: "Infuriating",
            Joy: "Hurt",
            Surprise: "Cool",
            Terror: "Self-righteous",
            Depression: "Anger",
            Disgust: "Patronizing"
        },
        Joy: {
            Joy: "Self-sacrificing",
            Surprise: "Optimistic",
            Terror: "Brave",
            Depression: "Grateful",
            Disgust: "Curious",
            Anger: "Accepting"
        },
        Surprise: {
            Surprise: "Expectant",
            Terror: "Audacious",
            Depression: "Wild",
            Disgust: "Depraved",
            Anger: "Irresponsible",
            Joy: "Heartless"
        },
        Terror: {
            Terror: "Terrifying",
            Depression: "Unhinged",
            Disgust: "Ruthless",
            Anger: "Calm",
            Joy: "Hopeless",
            Surprise: "Grim"
        }
    };

    return defaultDescriptionDictionary[attack][defense]
}