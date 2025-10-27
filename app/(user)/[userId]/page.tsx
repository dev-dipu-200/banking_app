
export default function UserPage({ params }: { params: { userId: string } }) {
    return (
        
        <div>
            <h1>user {params.userId}</h1>
        </div>
    )
}
