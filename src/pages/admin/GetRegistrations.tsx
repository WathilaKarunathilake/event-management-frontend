import { handleGettingRegistrationsByEventId } from "@/services/RegistrationService"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const GetRegistrations = () => {
  const { id } = useParams()

    useEffect(() => {
        const response = handleGettingRegistrationsByEventId(id!)
        console.log(response)
    }, [])

  return (
    <div>GetRegistrations</div>
  )
}
