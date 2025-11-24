import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { skillsApi, uploadApi, resolveAssetUrl } from '../lib/api'
import { Upload, X } from 'lucide-react'

const SkillForm = ({ skill, onClose }) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    category: skill?.category || 'Frontend',
    level: skill?.level || 'intermediate',
    percentage: skill?.percentage || 50,
    description: skill?.description || '',
    icon: skill?.icon || '',
    color: skill?.color || '',
    order: skill?.order || 0,
    isActive: skill?.isActive ?? true,
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(skill?.icon || null)
  const [uploading, setUploading] = useState(false)

  const mutation = useMutation({
    mutationFn: (data) => {
      return skill
        ? skillsApi.update(skill.id, data)
        : skillsApi.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['skills'])
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
        const response = await uploadApi.uploadSkillIcon(selectedFile)
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
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? (value === '' ? 0 : Number(value)) : value
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
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="React"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Catégorie *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database & Other">Database & Other</option>
            <option value="Management">Management</option>
            <option value="Cybersécurité">Cybersécurité</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Niveau *</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="input-field"
          >
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pourcentage (0-100) *</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
            min="0"
            max="100"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Description de la compétence..."
        ></textarea>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Icône de la compétence</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Couleur</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="input-field"
            placeholder="blue"
          />
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="w-4 h-4 text-primary focus:ring-primary rounded"
          id="isActive"
        />
        <label htmlFor="isActive" className="text-sm font-medium">
          Compétence active (affichée sur le portfolio)
        </label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={mutation.isPending || uploading}
          className="btn-primary flex-1"
        >
          {uploading ? 'Upload en cours...' : mutation.isPending ? 'Enregistrement...' : skill ? 'Mettre à jour' : 'Créer'}
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

export default SkillForm
