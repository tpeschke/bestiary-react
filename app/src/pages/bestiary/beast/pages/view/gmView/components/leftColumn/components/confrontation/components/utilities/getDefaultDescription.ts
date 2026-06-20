export default (attack: string, defense: string): string | undefined => {
    const defaultDescriptionDictionary: any = {
        Depression: {
            Depression: "Nihilistic",
            Disgust: "Iconoclastic",
            Anger: "Detached",
            Joy: "Depressed",
            Surprise: "Jaded",
            Fear: "Resigned"
        },
        Disgust: {
            Disgust: "Gross",
            Anger: "Apathetic",
            Joy: "Self-flagellant",
            Surprise: "Cynic",
            Fear: "Barbaric",
            Depression: "Hedonistic"
        },
        Anger: {
            Anger: "Infuriating",
            Joy: "Hurt",
            Surprise: "Cool",
            Fear: "Self-righteous",
            Depression: "Anger",
            Disgust: "Patronizing"
        },
        Joy: {
            Joy: "Self-sacrificing",
            Surprise: "Optimistic",
            Fear: "Brave",
            Depression: "Grateful",
            Disgust: "Curious",
            Anger: "Accepting"
        },
        Surprise: {
            Surprise: "Expectant",
            Fear: "Audacious",
            Depression: "Wild",
            Disgust: "Depraved",
            Anger: "Irresponsible",
            Joy: "Heartless"
        },
        Fear: {
            Fear: "Terrifying",
            Depression: "Unhinged",
            Disgust: "Ruthless",
            Anger: "Calm",
            Joy: "Hopeless",
            Surprise: "Grim"
        }
    };

    return defaultDescriptionDictionary[attack][defense]
}