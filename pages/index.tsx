import { useRouter } from "next/router";
import { useEffect } from "react"
import { authService } from "../services";

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    let control = authService.userValue.getValue();
    if (control === false || control === null) {
      router.push('/account/login');
    }
  }, [])

  return (
    <div className="card mt-4">
      <div className="card-body">

      </div>
    </div>
  )
}
