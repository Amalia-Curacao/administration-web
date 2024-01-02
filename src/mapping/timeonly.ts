export default function Map(date: string | undefined): Date | undefined {
    if (date === undefined || date === null || date.length === 0) return;
    if (date.includes('T')) date = date.split('T')[1].split('.')[0];
    return new Date("0001-01-01T" + date);
}