import './ProgressBar.css'

// eslint-disable-next-line react/prop-types
export const ProgressBar = ({current, max, color}) => {
    const progress = (current >= max ? 100 : (current / max) * 100);

    const colors = [
        "#FF0000",
        "#FF3300",
        "#FF6600",
        "#FF9900",
        "#FFCC00",
        "#FFFF00",
        "#CCFF00",
        "#99FF00",
        "#66FF00",
        "#00FF00",
    ];
    if (!color) {
        color = colors[current >= max ? colors.length - 1 : Math.floor((current / max) * colors.length)]
    }
    return (
        <div className={'w-full h-2 bg-gray-200 rounded-full max-w-xs'}>
            <div className={`h-full rounded-full progress-bar max-w-full`}
                 style={{width: `${progress}%`, backgroundColor: color, minWidth: '1px'}}/>
        </div>
    )
}