import { useState } from "react"

const useNotification = () => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const showNotification = (text, ms, error) => {
        setError(error);
        setVisible(true);
        setText(text);
        setTimeout(() => {
            setVisible(false);
        }, ms);
    }

    return {
        visible,
        text,
        error,
        showNotification
    }
}

export default useNotification;