import { useState } from "react"

export default function PlayerInfo({ name, symbol, isActive, onNameChange }) {
    const [initialName, setInitialName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)
    const handleEdit = () => {
        setIsEditing(editing => !editing)
        if (isEditing) {
            onNameChange(symbol, initialName)
        }
    }
    const handleChange = (event) => {
        setInitialName(event.target.value)
    }
    let btnCaption = "Edit"
    if (isEditing) {
        btnCaption = "Save"
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {isEditing ?
                    <input type="text" required value={initialName} onChange={handleChange} />
                    :
                    <span className="player-name" >{initialName}</span>
                }
                <span className="player-symbol" value={symbol}>{symbol}</span>
            </span>
            <button onClick={handleEdit}>{btnCaption}</button>
        </li>

    )
}