import { useSession } from "next-auth/react"

const ProfilePage = () => {
  const { data }: any = useSession();
  
  return (
    <div>
      <h1>Profile Page</h1>
      <div>{data?.user?.fullname}</div>
    </div>
  )
}

export default ProfilePage