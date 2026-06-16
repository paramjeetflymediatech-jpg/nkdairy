import { 
  Users, 
  Package, 
  TrendingUp, 
  Eye, 
  ArrowUpRight 
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Products', value: '124', change: '+12%', icon: Package, trend: 'up' },
    { name: 'Total Leads', value: '892', change: '+24%', icon: Users, trend: 'up' },
    { name: 'Website Visitors', value: '45.2K', change: '+8%', icon: Eye, trend: 'up' },
    { name: 'Conversion Rate', value: '2.4%', change: '+1.2%', icon: TrendingUp, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <stat.icon size={24} />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                <ArrowUpRight size={16} className="ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Leads</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 font-medium whitespace-nowrap">Name</th>
                  <th className="pb-3 font-medium whitespace-nowrap">Product Interest</th>
                  <th className="pb-3 font-medium whitespace-nowrap">Date</th>
                  <th className="pb-3 font-medium whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium text-gray-900 whitespace-nowrap">John Doe {item}</td>
                    <td className="py-4 text-gray-600 whitespace-nowrap">Milk Pasteurizer 500L</td>
                    <td className="py-4 text-gray-500 whitespace-nowrap">Today, 10:23 AM</td>
                    <td className="py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-700">
                <Package size={20} />
                <span className="font-medium">Add New Product</span>
              </div>
              <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-700">
                <Users size={20} />
                <span className="font-medium">Export Leads (CSV)</span>
              </div>
              <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
