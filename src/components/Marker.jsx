import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Marker = ({currentDimensions, coordinates, isVisible, id}) => {
  const actualX = currentDimensions.currentWidth * coordinates.x;
  const actualY = currentDimensions.currentHeight * coordinates.y;

  return (
    <>
      <div style={{
            left: actualX - 10 + "px",
            top: actualY + 75 + "px",
            display: isVisible && isVisible.visible ? "block" : "none"
        }} className="marker"><FontAwesomeIcon icon={faLocationDot} /></div>
    </>
  )
}
