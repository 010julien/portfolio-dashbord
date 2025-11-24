import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { skillsApi, resolveAssetUrl } from '../lib/api'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import SkillForm from '../components/SkillForm'

const Skills = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const queryClient = useQueryClient()

  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => skillsApi.getAll().then(res => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => skillsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills'])
    },
  })

  const handleEdit = (skill) => {
    setEditingSkill(skill)
    setIsFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingSkill(null)
  }

  const getLevelBadge = (level) => {
    const badges = {
      'beginner': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      'intermediate': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'advanced': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'expert': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    }
    const labels = {
      'beginner': 'Débutant',
      'intermediate': 'Intermédiaire',
      'advanced': 'Avancé',
      'expert': 'Expert',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[level]}`}>
        {labels[level]}
      </span>
    )
  }

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Compétences</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos compétences techniques et soft skills
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvelle compétence
        </button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills || {}).map(([category, categorySkills]) => (
          <div key={category} className="card">
            <h2 className="text-xl font-bold mb-4 text-primary">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      {skill.icon && (
                        <img
                          src={resolveAssetUrl(skill.icon)}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
                        {getLevelBadge(skill.level)}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Maîtrise</span>
                      <span className="font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {skill.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {skill.description}
                    </p>
                  )}

                  <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {skills?.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Aucune compétence pour le moment
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter votre première compétence
          </button>
        </div>
      )}

      {/* Skill Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold">
                {editingSkill ? 'Modifier la compétence' : 'Nouvelle compétence'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SkillForm
              skill={editingSkill}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Skills
