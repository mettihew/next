import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login"); // force login if not authenticated
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard, {user.username}!</h1>
      <p className="text-gray-700 mb-6">
        Here’s your personal space where you can see updates, orders, and saved items.
      </p>

      {/* Example dashboard widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p>You have no recent orders.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <p>No new notifications.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Saved Items</h2>
          <p>You haven’t saved anything yet.</p>
        </div>
      </div>
    </div>
  );
}
