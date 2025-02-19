export const Circle = ({coordinates, setShowDropdown}) => {
    const handleClick = () => {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }
  return (
    <div onClick={handleClick} style={{
        left: coordinates.x - 35 + "px",
        top: coordinates.y + 65 + "px"
    }} className="circle"></div>
  )
}
