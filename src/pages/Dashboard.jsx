import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../lib/api'
import { FolderKanban, Award, CheckCircle, Clock, Zap } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardApi.getStats().then(res => res.data),
  })

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: () => dashboardApi.getRecentActivity().then(res => res.data),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Projets',
      value: stats?.overview.totalProjects || 0,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      title: 'Projets Terminés',
      value: stats?.overview.completedProjects || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'En Cours',
      value: stats?.overview.inProgressProjects || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Compétences',
      value: stats?.overview.totalSkills || 0,
      icon: Award,
      color: 'bg-purple-500',
    },
  ]

  // Data for projects chart
  const projectsData = [
    { name: 'Terminés', value: stats?.charts.projectsByStatus.completed || 0 },
    { name: 'En cours', value: stats?.charts.projectsByStatus.inProgress || 0 },
    { name: 'Futurs', value: stats?.charts.projectsByStatus.future || 0 },
  ]

  const COLORS = ['#10B981', '#F59E0B', '#6366F1']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vue d'ensemble de votre portfolio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Status Chart */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Répartition des projets</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {projectsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Skills by Category Chart */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Compétences par catégorie</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.charts.skillsByCategory || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1b9abe" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Activité récente</h2>
        </div>
        <div className="space-y-3">
          {recentActivity?.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'project' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.type === 'project' ? 'Projet' : 'Compétence'} • {activity.action}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(activity.date).toLocaleDateString('fr-FR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
