'use client';

export default function Button({
    text,
    handleClick,
    style
}: {
    text: string;
    handleClick(): void;
    style: Style;
}) {
    return (
        <button
            onClick={() => {
                handleClick();
            }}
            className={`${
                style === 'greenDark'
                    ? 'bg-[--cartel] text-white'
                    : style === 'greenLigth'
                    ? 'bg-[--header] text-white'
                    : 'bg-yellow-400 text-black'
            } py-3 px-10 rounded-xl font-bold capitalize`}
        >
            <span>{text}</span>
        </button>
    );
}
