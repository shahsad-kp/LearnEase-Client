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
    'max-w-xs',
)

const homePageTextAreaClass = classNames(
    'bg-primary',
    'h-10',
    'w-full',
    'resize-none',
    'rounded',
    'focus:outline-none',
    'border-accent-color-one',
    'border',
    'h-[30vh]',
    'p-3',
)

const homePageButton = classNames(
    'bg-logo-green',
    'box-border',
    'px-5',
    'py-2',
    'rounded-md',
    'accent-white',
    'font-semibold',
    'text-white',
    'hover:bg-logo-green-hover',
    'w-fit',

)

export {
    bannerPageButtonClass,
    bannerPageInputClass,
    homePageButton,
    homePageTextAreaClass
}