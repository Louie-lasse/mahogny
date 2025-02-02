import { useRouter } from "next/navigation";
import { useAuth } from "./providers";


export default function Home() {

    const { user, connection, logout } = useAuth();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold">Welcome, {user?.name}! Connection: {connection?.show()}</h1>
            <button
                onClick={() => {
                    logout();
                    router.push("/login");
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

            <button
                onClick={() => {
                    router.push("/book");
                }}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Make a new booking
            </button>
        </div>
    );
}