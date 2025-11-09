// app/(user)/user/[user_id]/page.tsx
export default async function UserPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;

  return (
    <div className="p-8">
      <h1 className="text-3xl text-center font-bold text-zinc-800 dark:text-zinc-200">
        User: <span className="text-blue-600 text-capitalize">{user_id}</span>
      </h1>

      {/* Example: fetch user data */}
      {/* const user = await fetchUser(user_id); */}
      {/* <p>{user?.name}</p> */}
    </div>
  );
}
