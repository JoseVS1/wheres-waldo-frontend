export const NotificationBox = ({ visible, text, error }) => {
  return (
    <>
        {visible && <div className={`notification ${error && "notification-error"}`}>{text}</div> }
    </>
  )
}
