export function convertMilisecondsToDays(miliseconds: number): number {
    const totalSeconds: number = Math.floor(miliseconds / 1000);
    const totalMinutes: number = Math.floor(totalSeconds / 60);
    const totalHours: number = Math.floor(totalMinutes / 60);

    return Math.floor(totalHours / 24);
}
