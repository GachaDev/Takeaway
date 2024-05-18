'use client';

export default function Button({
    text,
    handleClick,
    style,
    widthAssign
}: {
    text: string;
    handleClick?: () => void;
    style: Style;
    widthAssign?: boolean;
}) {
    const buttonStyle =
        style === 'greenDark'
            ? 'bg-[--cartel] text-white'
            : style === 'greenLigth'
            ? 'bg-[--header] text-white'
            : style === 'black'
            ? 'bg-white border border-black'
            : 'bg-[--cartel] text-white';

    const buttonType = handleClick ? 'button' : 'submit';
    const additionalWidthClass = widthAssign
        ? '2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6'
        : '';

    const canClick = () => {
        if (handleClick) {
            handleClick();
        }
    };

    return (
        <button
            onClick={canClick}
            type={buttonType}
            className={`${buttonStyle} py-3 px-10 rounded-xl font-bold capitalize ${additionalWidthClass}`}
        >
            <span>{text}</span>
        </button>
    );
}
