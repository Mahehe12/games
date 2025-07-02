import Language from "./Language";
import { clsx } from "clsx";

export default function LanguageChips({ languages, wrongGuessesCount }) {
    
    return languages.map((langObj, index) => {
        const isLost = index < wrongGuessesCount;
        const className = clsx("chip", isLost && "lost")

        return (
            <Language
                key={langObj.name}
                name={langObj.name}
                color={langObj.color}
                bgColor={langObj.backgroundColor}
                className={className}
            />
        );
    });
}