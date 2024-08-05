/**
 * to be fair this has no collision detection, but I mean it shouldn't cause problems right?
 */
export function ranID() {
    return Math.floor(Math.random() * 100000000);
}

export function getRandomPastelColor(): string {
    // Funktion zur Generierung einer zufälligen Zahl im Bereich [128, 255]
    const randomChannelValue = (): number => Math.floor(Math.random() * 128 + 110);

    // Generierung der RGB-Werte
    const r = randomChannelValue();
    const g = randomChannelValue();
    const b = randomChannelValue();

    // Konvertierung der RGB-Werte in einen Hex-String
    const toHex = (value: number): string => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    // Zusammenfügen der Hex-Werte in einen Farbcode
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}