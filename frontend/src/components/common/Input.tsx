import { HTMLInputTypeAttribute } from 'react';

export default function Input({
    id,
    label,
    placeholder,
    type,
    minLength,
    widthAssign,
    required
}: {
    id: string;
    label: string;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    minLength?: number;
    widthAssign?: boolean;
    required?: boolean;
}) {
    return (
        <div
            className={`flex flex-col gap-2 ${
                widthAssign && '2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6'
            }`}
        >
            <label className="font-semibold" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                name={id}
                required={required || undefined}
                minLength={minLength || undefined}
                type={type}
                className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                placeholder={placeholder}
            />
        </div>
    );
}
