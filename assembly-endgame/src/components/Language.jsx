export default function Language(props) {
    const styling = {
        color: props.color,
        backgroundColor: props.bgColor,
    }

    return (
        <span
            style={styling}
            className={props.className} 
        >
            {props.name}
        </span>
    );
}
