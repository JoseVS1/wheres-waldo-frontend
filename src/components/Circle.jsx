import { useFloating } from "@floating-ui/react";

export const Circle = ({coordinates, setShowDropdown}) => {
  const {refs} = useFloating();

    const handleClick = () => {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }
  return (
    <div ref={refs.setReference} onClick={handleClick} style={{
        position: "absolute",
        left: coordinates.x - 35 + "px",
        top: coordinates.y + 65 + "px"
    }} className="circle"></div>
  )
}
