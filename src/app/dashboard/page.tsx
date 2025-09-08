// import { getUserFromToken } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const user = await getUserFromToken();

//   if (!user) {
//     redirect("/login"); // force login if not authenticated
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard, {user.username}!</h1>
//       <p className="text-gray-700 mb-6">
//         Here’s your personal space where you can see updates, orders, and saved items.
//       </p>

//       {/* Example dashboard widgets */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Orders</h2>
//           <p>You have no recent orders.</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Notifications</h2>
//           <p>No new notifications.</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Saved Items</h2>
//           <p>You haven’t saved anything yet.</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  ShoppingBag, 
  Bell, 
  Heart, 
  User, 
  Settings, 
  CreditCard,
  Package,
  TrendingUp,
  Star,
  Clock
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUserFromToken();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.username}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your account today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/profile" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Items</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">In wishlist</p>
              </div>
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
                <p className="text-xs text-gray-500 mt-1">This year</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">Unread</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-gray-600" />
                    Recent Orders
                  </h2>
                  <Link href="/orders" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No orders yet</p>
                  <p className="text-gray-400 text-xs mt-1">Start shopping to see your orders here</p>
                  <Link 
                    href="/products" 
                    className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  href="/products" 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-500 group-hover:text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                    Browse Products
                  </span>
                </Link>
                
                <Link 
                  href="/wishlist" 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-colors group"
                >
                  <Heart className="w-5 h-5 text-gray-500 group-hover:text-pink-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700">
                    View Wishlist
                  </span>
                </Link>
                
                <Link 
                  href="/profile" 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                >
                  <User className="w-5 h-5 text-gray-500 group-hover:text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    Edit Profile
                  </span>
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Account Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Verified</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Login</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Just now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}