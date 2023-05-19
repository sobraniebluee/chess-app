export const getFigurePreview = (name: string) => `./chess/${name}.png`;

export function clsx(...styles: (string | undefined | number)[]): string {
    return styles.join(" ")
}

export function getTranslateByCords(x: number, y: number) {
    return `translate(${100 * x}%, ${100 * y}%)`;
}

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export function createId(): string {
    return (Math.random() * 10000).toString(12).replace(".", "");
}