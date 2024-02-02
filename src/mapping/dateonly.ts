export default function Map(date: string): Date | undefined {
    if(date === undefined || date.length === 0) return;
    console.log(date);
    return new Date(date.split('T')[0] + 'T00:00:00.000');
}