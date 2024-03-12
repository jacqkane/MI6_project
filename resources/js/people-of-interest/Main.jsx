import People from "./People";
import "/resources/scss/Main.scss";

export default function Main({ content }) {
    const header = 'Welcome to MI6'
    let selectedContent = <h1>{header}</h1>;
    switch (content) {
        case "people-of-interest":
            selectedContent = <People />
            break;

        default:
            break;
    }
    return (
        <div className="main">
            <div className="main_content">{selectedContent}</div>
        </div>
    );
}
