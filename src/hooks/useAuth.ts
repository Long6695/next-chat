import { currentUser } from "@/redux/features/userSlice"
import { useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"

const useAuth = () => {
    const user = useAppSelector(currentUser)
    return useMemo(() => user , [user])
}

export default useAuth