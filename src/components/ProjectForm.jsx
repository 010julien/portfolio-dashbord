import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { projectsApi, uploadApi, resolveAssetUrl } from '../lib/api'
import { Upload, X } from 'lucide-react'

const ProjectForm = ({ project, onClose }) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    role: project?.role || 'developer',
    roleDescription: project?.roleDescription || '',
    team: project?.team || '',
    duration: project?.duration || '',
    githubLink: project?.githubLink || '',
    demoLink: project?.demoLink || '',
    status: project?.status || 'termine',
    icon: project?.icon || '',
    color: project?.color || 'from-blue-500 to-purple-500',
    order: project?.order || 0,
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(project?.icon || null)
  const [uploading, setUploading] = useState(false)

  const mutation = useMutation({
    mutationFn: (data) => {
      const payload = {
        ...data,
        technologies: data.technologies.split(',').map(t => t.trim()).filter(Boolean),
      }
      return project
        ? projectsApi.update(project.id, payload)
        : projectsApi.create(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
      onClose()
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let iconUrl = formData.icon

    // Upload image if a new file is selected
    if (selectedFile) {
      try {
        setUploading(true)
        const response = await uploadApi.uploadProjectIcon(selectedFile)
        iconUrl = response.data.url
      } catch (error) {
        alert('Erreur lors de l\'upload de l\'image')
        setUploading(false)
        return
      }
      setUploading(false)
    }

    mutation.mutate({ ...formData, icon: iconUrl })
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setFormData(prev => ({ ...prev, icon: '' }))
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="TogoSchool"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Catégorie *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Plateforme Éducative"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="input-field"
          placeholder="Description détaillée du projet..."
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Technologies (séparées par des virgules) *</label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="React, Node.js, MongoDB, Tailwind CSS"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rôle *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="developer">Développeur</option>
            <option value="manager">Manager</option>
            <option value="both">Les deux</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description du rôle</label>
          <input
            type="text"
            name="roleDescription"
            value={formData.roleDescription}
            onChange={handleChange}
            className="input-field"
            placeholder="Chef de Projet & Développeur"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Équipe</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="input-field"
            placeholder="Équipe de 5 personnes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Durée</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="input-field"
            placeholder="6 mois"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Lien GitHub</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="input-field"
            placeholder="https://github.com/username/project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lien Démo</label>
          <input
            type="url"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleChange}
            className="input-field"
            placeholder="https://demo.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Statut *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="termine">Terminé</option>
            <option value="en_cours">En cours</option>
            <option value="futur">Futur</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ordre</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="input-field"
            min="0"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Icône du projet</label>
        <div className="flex items-start gap-4">
          {/* Preview */}
          {previewUrl && (
            <div className="relative">
              <img
                src={previewUrl.startsWith('data:') ? previewUrl : resolveAssetUrl(previewUrl)}
                alt="Preview"
                className="w-20 h-20 object-contain rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Upload Button */}
          <label className="flex-1 flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Cliquez pour uploader une image
              <br />
              <span className="text-xs">(PNG, JPG, SVG, WebP - Max 5MB)</span>
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Couleur (gradient Tailwind)</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="input-field"
          placeholder="from-blue-500 to-purple-500"
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={mutation.isPending || uploading}
          className="btn-primary flex-1"
        >
          {uploading ? 'Upload en cours...' : mutation.isPending ? 'Enregistrement...' : project ? 'Mettre à jour' : 'Créer'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Annuler
        </button>
      </div>

      {mutation.isError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          <p className="font-semibold mb-2">Erreur : {mutation.error.message}</p>
          {mutation.error.response?.data?.message && (
            <p className="text-sm">{JSON.stringify(mutation.error.response.data.message)}</p>
          )}
        </div>
      )}
    </form>
  )
}

export default ProjectForm
