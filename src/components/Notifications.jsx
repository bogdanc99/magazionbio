import { useEffect } from "react"

export default function Notifications({ message, clearNotification }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearNotification()
    }, 2000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <div
      className="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3 show"
      role="alert"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  )
}
