import { useState } from "react";
import Main from "./Main";
import Navigation from "./Navigation";

function App() {
    const [content, setContent] = useState("");
    return (
        <>
            <Navigation content={content} setContent={setContent} />
            <Main content={content} setContent={setContent} />
        </>
    );
}

export default App;