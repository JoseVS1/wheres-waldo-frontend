import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Marker = ({coordinates, isVisible, id}) => {
  return (
    <>
      <div style={{
            left: coordinates.x - 10 + "px",
            top: coordinates.y + 75 + "px",
            display: isVisible && isVisible.visible ? "block" : "none"
        }} className="marker"><FontAwesomeIcon icon={faLocationDot} /></div>
    </>
  )
}
