import classNames from "classnames";

const bannerPageButtonClass = classNames(
    'bg-logo-green',
    'px-5',
    'py-2.5',
    'rounded-md',
    'accent-white',
    'font-bold',
    'text-white',
    'hover:bg-logo-green-hover',
    'fit-content',
)

const bannerPageInputClass = classNames(
    'bg-primary',
    'h-10',
    'w-full',
    'rounded',
    'border-accent-color-one',
    'border',
    'focus:outline-none',
    'p-3',
    'max-w-sm',
)

export {
    bannerPageButtonClass,
    bannerPageInputClass
}